/**
 * EMAIL_FROM may be a full sender ("Madvert Labs <onboarding@madvertlabs.com>"), a bare address,
 * or just a verified domain ("onboarding.madvertlabs.com"), which becomes "Madvert Labs <hello@that-domain>".
 */
export function senderAddress(raw?: string) {
  const v = (raw ?? "").trim().replace(/^["']|["']$/g, "");
  if (!v) return null;
  if (v.includes("@")) return v.includes("<") ? v : `Madvert Labs <${v}>`;
  return `Madvert Labs <hello@${v.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}>`;
}

type Mail = { to: string | string[]; subject: string; html: string; replyTo?: string };

/** Sends through Resend and reports why it failed (used by the Operations "Send test email" check). */
export async function sendEmailResult({ to, subject, html, replyTo }: Mail): Promise<{ ok: boolean; error?: string; from?: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = senderAddress(process.env.EMAIL_FROM);
  if (!key || !from) return { ok: false, error: "RESEND_API_KEY or EMAIL_FROM is not set." };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html, reply_to: replyTo ?? process.env.EMAIL_REPLY_TO ?? "info@madvertlabs.com" }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[email] failed", res.status, text);
      let message = text;
      try {
        message = (JSON.parse(text) as { message?: string }).message ?? text;
      } catch {}
      return { ok: false, error: `Resend ${res.status}: ${message.slice(0, 300)}`, from };
    }
    return { ok: true, from };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error", from };
  }
}

/** Transactional email through Resend's HTTP API. Silently skipped when not configured. */
export async function sendEmail(mail: Mail) {
  return (await sendEmailResult(mail)).ok;
}

export const esc = (s?: string) => (s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function emailShell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#0a0f1c;font-family:Inter,Arial,sans-serif;color:#e8eef6">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#101827;border:1px solid #1f2a3d;border-radius:16px">
<tr><td style="padding:32px 32px 8px;font-size:12px;letter-spacing:.2em;color:#3fd4ff">MADVERT LABS</td></tr>
<tr><td style="padding:8px 32px 0;font-size:22px;font-weight:700;color:#fff">${esc(title)}</td></tr>
<tr><td style="padding:16px 32px 32px;font-size:15px;line-height:1.6;color:#a9b6c9">${body}</td></tr>
</table><p style="font-size:12px;color:#5d6b80;margin-top:16px">Madvert Labs · Digital Marketing &amp; Growth Systems</p></td></tr></table></body></html>`;
}
