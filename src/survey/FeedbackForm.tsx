"use client";

import { useCallback, useState, type FormEvent } from "react";
import { TextArea, TextField, Turnstile, useFormMeta } from "@/forms/Fields";
import { PAYMENT_OPTIONS, PILOT_SIZE, SURVEYS, type SurveyId } from "@/survey/surveys";

type Errors = Record<string, string[] | undefined>;

/** Product feedback survey. Answers are stored server-side and read in Operations → Surveys. */
export function FeedbackForm({ survey }: { survey: SurveyId }) {
  const cfg = SURVEYS[survey];
  const { startedAtRef } = useFormMeta();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Errors>({});
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    setStatus("sending");
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          survey,
          name: get("name"),
          business: get("business"),
          contact: get("contact"),
          liked: get("liked"),
          unclear: get("unclear"),
          change: get("change"),
          pilotSize: get("pilotSize"),
          pilotFeedback: get("pilotFeedback"),
          payment: get("payment"),
          paymentNote: get("paymentNote"),
          price: get("price"),
          suggestions: get("suggestions"),
          website_confirm: get("website_confirm"),
          startedAt: startedAtRef.current,
          turnstileToken: token || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (!res.ok || !data.ok) {
        setFields(data.fields ?? {});
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="panel p-8 text-center sm:p-12" role="status">
        <p className="t-h2">Thank you. Your feedback is in.</p>
        <p className="t-lead mx-auto mt-4 max-w-[520px]">This genuinely helps us improve the product. JazakAllah khair for taking the time.</p>
      </div>
    );
  }

  const err = (k: string) => fields[k]?.[0];
  return (
    <form
      onSubmit={submit}
      onChange={(e) => {
        const name = (e.target as unknown as HTMLInputElement).name;
        if (fields[name]) setFields((f) => ({ ...f, [name]: undefined }));
      }}
      noValidate
      className="panel space-y-7 p-6 sm:p-10"
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name="website_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="name" label="Your name" autoComplete="name" required error={err("name")} />
        <TextField name="business" label="Agency / business" autoComplete="organization" optional error={err("business")} />
      </div>
      <TextField name="contact" label="Email or WhatsApp" hint="Only if you are happy for us to follow up." optional error={err("contact")} />

      <TextArea name="liked" label="A. What do you like about it?" rows={3} required error={err("liked")} />
      <TextArea name="unclear" label="B. What is unclear, unattractive, or needs improvement?" rows={3} required error={err("unclear")} />
      <TextArea name="change" label="C. What would you change?" rows={3} required error={err("change")} />


      <TextField name="price" label={cfg.price} hint={cfg.priceHint} required error={err("price")} />
      <Choice
        name="pilotSize"
        legend="E. Our pilot campaign is 40 qualified RFQs. What do you think of that size?"
        options={PILOT_SIZE}
        error={err("pilotSize")}
      />
      <TextArea name="pilotFeedback" label="What should the pilot look like, and why?" rows={2} optional error={err("pilotFeedback")} />

      <Choice name="payment" legend="F. Which payment option would you prefer?" options={PAYMENT_OPTIONS} error={err("payment")} />
      <TextArea name="paymentNote" label="Any payment concerns, or another option you would prefer?" rows={2} optional error={err("paymentNote")} />

      <TextArea
        name="suggestions"
        label="G. What additions would make this product better for you?"
        hint="For example extra details on each RFQ, faster delivery, specific regions or product types."
        rows={3}
        required
        error={err("suggestions")}
      />

      <Turnstile onToken={onToken} />
      {error ? (
        <p role="alert" className="text-[14px] text-danger">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[linear-gradient(100deg,#00b4ff,#00e5ff)] px-7 font-display text-[16px] font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgb(0_180_255/0.65)] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}

function Choice({ name, legend, options, error }: { name: string; legend: string; options: readonly string[]; error?: string }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[14px] font-medium text-ink">{legend}</legend>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-center gap-2.5 rounded-full border border-line-strong px-5 py-2.5 text-[15px] has-[:checked]:border-[color:var(--accent)] has-[:checked]:bg-[rgb(0_180_255/0.1)]"
          >
            <input type="radio" name={name} value={o} required className="accent-[#00b4ff]" />
            {o}
          </label>
        ))}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
