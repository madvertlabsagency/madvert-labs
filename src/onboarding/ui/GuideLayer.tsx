"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Art3D } from "./art3d";
import { Btn, Confetti, GlowMark, Icon } from "./kit";
import type { View } from "./PortalApp";
import { usePortal } from "./store";

/**
 * Client guidance:
 * 1. A congratulations popup on first arrival: "Guide me step by step" or "I'll do it myself".
 * 2. A spotlight tour with arrows pointing at the real controls (progress, next step, cards, stepper, autosave, help).
 * 3. In guide mode, a short hint for every step the client opens.
 * 4. An always-available, chat-style help widget: next action, how it works, FAQs, restart tour, contact Madvert, book a call.
 * Answers are written by Madvert (no AI). Choices are remembered per onboarding on this device.
 */

type Mode = "guided" | "self";
const key = (id: string, k: string) => `mv-onb-${k}:${id}`;
const read = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};

type TourStep = { target: string; title: string; body: string; view?: View };
const TOUR: TourStep[] = [
  { target: "progress", title: "Your progress", body: "This ring shows how much of onboarding is done. It fills up as you go, and every answer saves automatically." },
  { target: "next", title: "Start here", body: "This button always takes you to the next thing to do. If you are ever unsure, just press it." },
  { target: "cards", title: "Five simple steps", body: "Business, Access, Assets, Strategy (optional) and Kickoff. Do them in any order and come back any time." },
  { target: "stepper", title: "Jump between steps", body: "Use these steps at the top to move around. A tick means that step is complete." },
  { target: "missing", title: "What is still needed", body: "This list shows exactly what is left. Click any item to go straight to it." },
  { target: "assistant", title: "Help is always here", body: "Stuck or have a question? Tap this button any time for the guide, answers and a direct line to the Madvert team." },
];

const HINTS: Record<string, { title: string; body: string }> = {
  home: { title: "Start with step 01", body: "Tap “Business Information” (or the blue button). It takes about 5 minutes." },
  business: { title: "Tell us about the business", body: "Fill sections A to D. Answers save as you type, and you can skip anything you are unsure about." },
  access: {
    title: "Connect your accounts",
    body: "Tap a card, start with Meta. Follow the picture steps, then press “I’ve given access”. Not your area? Use “Send instructions to my technical person”.",
  },
  assets: { title: "Share what you already have", body: "Drag in files, take photos, or paste a Google Drive / Dropbox link. Don’t have something? Tick “We don’t have this”." },
  offer: { title: "Optional: build your offer", body: "Answer what you can and press “Generate my offer”, or choose to complete it with us during kickoff." },
  kickoff: { title: "The finish line", body: "Pick a time in the calendar. Our team reviews everything before the call." },
};

export function GuideLayer({ view, go }: { view: View; go: (v: View) => void }) {
  const { state } = usePortal();
  const id = state.onboarding.id;
  const [mode, setMode] = useState<Mode | null>(null);
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState(false);
  const [tour, setTour] = useState<number | null>(null);
  const [chat, setChat] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const m = read(key(id, "guide")) as Mode | null;
    // Browser-only preference, read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(m);
    setReady(true);
  }, [id]);

  // First arrival on the overview: congratulations + choice.
  useEffect(() => {
    if (ready && !mode && view === "home") {
      const t = setTimeout(() => setChoice(true), 500);
      return () => clearTimeout(t);
    }
  }, [ready, mode, view]);

  // Guided mode: one hint per step, shown the first time the client opens it.
  useEffect(() => {
    if (mode !== "guided" || tour !== null || choice) return;
    const k = key(id, `hint-${view}`);
    if (!HINTS[view] || read(k)) return;
    const t = setTimeout(() => {
      setHint(view);
      write(k, "1");
    }, 900);
    return () => clearTimeout(t);
  }, [mode, view, tour, choice, id]);

  const choose = (m: Mode) => {
    write(key(id, "guide"), m);
    setMode(m);
    setChoice(false);
    if (m === "guided") {
      write(key(id, "hint-home"), "1");
      setTimeout(() => setTour(0), 350);
    } else setHint("self");
  };

  const startTour = useCallback(() => {
    setChat(false);
    setHint(null);
    if (view !== "home") go("home");
    setTimeout(() => setTour(0), view === "home" ? 50 : 700);
  }, [view, go]);

  if (view === "welcome") return null;

  return (
    <>
      {choice ? <ChoiceModal name={state.onboarding.firstName} company={state.onboarding.companyName} onChoose={choose} /> : null}
      {tour !== null ? (
        <Tour
          step={tour}
          onNext={() => (tour + 1 < TOUR.length ? setTour(tour + 1) : (setTour(null), setHint("tour-done")))}
          onBack={() => setTour(Math.max(0, tour - 1))}
          onClose={() => setTour(null)}
        />
      ) : null}
      <Assistant open={chat} setOpen={setChat} hint={hint} clearHint={() => setHint(null)} view={view} go={go} startTour={startTour} />
    </>
  );
}

/* ───────── Congratulations + choice ───────── */

function ChoiceModal({ name, company, onChoose }: { name: string; company: string; onChoose: (m: Mode) => void }) {
  return createPortal(
    <div className="ob !min-h-0" style={{ background: "none" }}>
      <div className="ob-overlay" />
      <div className="ob-guide-modal" role="dialog" aria-modal="true" aria-label="Welcome">
        <Confetti />
        <div className="relative grid justify-items-center gap-3 text-center">
          <Art3D name="kickoff" size={110} />
          <p className="ob-eyebrow">Congratulations</p>
          <h2 className="ob-h2">
            Welcome aboard, <span className="ob-grad-text">{name}!</span>
          </h2>
          <p className="max-w-md text-[15.5px] leading-relaxed text-[var(--ob-ink-2)]">
            {company} is officially a Madvert Labs client. Onboarding takes five simple steps, saves automatically, and you can stop and come back any time.
          </p>
          <p className="mt-2 text-[14px] font-semibold">How would you like to get onboarded?</p>
        </div>
        <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" className="ob-guide-option" data-primary="true" onClick={() => onChoose("guided")}>
            <Art3D name="access" size={56} float={false} />
            <span>
              <span className="block text-[16px] font-bold">Guide me step by step</span>
              <span className="block text-[13px] opacity-80">A quick tour with arrows, then a tip on every step.</span>
            </span>
          </button>
          <button type="button" className="ob-guide-option" onClick={() => onChoose("self")}>
            <Art3D name="business" size={56} float={false} />
            <span>
              <span className="block text-[16px] font-bold">I’ll do it myself</span>
              <span className="block text-[13px] text-[var(--ob-ink-3)]">Jump straight in. Help is one tap away.</span>
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ───────── Spotlight tour ───────── */

function findTarget(name: string) {
  const all = Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${name}"]`));
  return all.find((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
}

function Tour({ step, onNext, onBack, onClose }: { step: number; onNext: () => void; onBack: () => void; onClose: () => void }) {
  const s = TOUR[step];
  const [rect, setRect] = useState<DOMRect | null>(null);
  const card = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = findTarget(s.target);
    if (!el) {
      // Target not on screen (e.g. hidden on mobile): skip it.
      onNext();
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const update = () => setRect(el.getBoundingClientRect());
    const t = setTimeout(update, 380);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "Enter") onNext();
      if (e.key === "ArrowLeft") onBack();
    };
    window.addEventListener("keydown", onKey);
    card.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onBack, onClose]);

  if (!rect) return null;
  const pad = 10;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardW = Math.min(340, vw - 24);
  const below = rect.bottom + 200 < vh || rect.top < 220;
  const top = below ? Math.min(rect.bottom + pad + 16, vh - 200) : Math.max(12, rect.top - pad - 16 - 190);
  const left = Math.min(Math.max(12, rect.left + rect.width / 2 - cardW / 2), vw - cardW - 12);
  const arrowX = Math.min(Math.max(20, rect.left + rect.width / 2 - left), cardW - 20);

  return createPortal(
    <div className="ob !min-h-0" style={{ background: "none" }}>
      <div className="fixed inset-0 z-[90]" onClick={onClose} aria-hidden="true" />
      <div
        className="ob-spot"
        style={{ top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }}
        aria-hidden="true"
      />
      <div ref={card} tabIndex={-1} role="dialog" aria-label={s.title} className="ob-tour-card" style={{ top, left, width: cardW }}>
        <span className="ob-tour-arrow" data-dir={below ? "up" : "down"} style={{ left: arrowX }} />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--ob-blue)]">
            STEP {step + 1} OF {TOUR.length}
          </span>
          <button type="button" className="text-[12px] font-semibold text-[var(--ob-ink-3)] hover:text-[var(--ob-ink)]" onClick={onClose}>
            Skip tour
          </button>
        </div>
        <p className="mt-2 text-[17px] font-bold">{s.title}</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ob-ink-2)]">{s.body}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            {TOUR.map((_, n) => (
              <span key={n} className="h-1.5 rounded-full transition-all" style={{ width: n === step ? 18 : 6, background: n <= step ? "var(--ob-grad)" : "var(--ob-line-2)" }} />
            ))}
          </div>
          <div className="flex gap-2">
            {step > 0 ? (
              <Btn size="xs" variant="ghost" onClick={onBack}>
                Back
              </Btn>
            ) : null}
            <Btn size="xs" arrow onClick={onNext}>
              {step + 1 < TOUR.length ? "Next" : "Got it"}
            </Btn>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ───────── Help assistant (chat-style) ───────── */

type Msg = { from: "bot" | "me"; text: ReactNode; actions?: { label: string; run: () => void; primary?: boolean }[] };

function Assistant({
  open,
  setOpen,
  hint,
  clearHint,
  view,
  go,
  startTour,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  hint: string | null;
  clearHint: () => void;
  view: View;
  go: (v: View) => void;
  startTour: () => void;
}) {
  const { state, progress, missing } = usePortal();
  const o = state.onboarding;
  const i = state.integrations;
  const wa = i.supportWhatsApp.replace(/[^\d]/g, "");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const list = useRef<HTMLDivElement>(null);

  const contact = () => {
    if (wa) window.open(`https://wa.me/${wa}?text=${encodeURIComponent(`Hi Madvert, I have a question about onboarding for ${o.companyName}.`)}`, "_blank", "noopener");
    else window.location.href = `mailto:${o.accountManager.email || i.supportEmail}?subject=${encodeURIComponent(`Onboarding question · ${o.companyName}`)}`;
  };
  const book = () => window.open(i.bookingUrl, "_blank", "noopener");
  const close = (then: () => void) => () => {
    setOpen(false);
    then();
  };

  const nextAction = (): Msg => {
    const order = ["business", "access", "assets", "kickoff"] as const;
    const n = order.find((k) => progress.byKey[k].status !== "completed");
    if (!n) return { from: "bot", text: "Everything required is done. Thank you! Our team is reviewing it. You can still add more files or complete the optional Offer Workshop." };
    const labels = { business: "Business Information", access: "Access & Connections", assets: "Brand & Marketing Assets", kickoff: "Kickoff Call" };
    const openItems = missing.filter((m) => m.phase === n && m.required).slice(0, 3);
    return {
      from: "bot",
      text: (
        <>
          Your next step is <strong>{labels[n]}</strong> ({progress.byKey[n].percent}% done).
          {openItems.length ? (
            <ul className="mt-1.5 list-disc pl-4">
              {openItems.map((m) => (
                <li key={m.key}>{m.label}</li>
              ))}
            </ul>
          ) : null}
        </>
      ),
      actions: [{ label: `Go to ${labels[n]}`, run: close(() => go(n)), primary: true }],
    };
  };

  const FAQ: { q: string; keys: RegExp; a: () => Msg }[] = [
    { q: "What should I do next?", keys: /next|now|start|where/i, a: nextAction },
    {
      q: "How does onboarding work?",
      keys: /how.*work|steps|process|onboard/i,
      a: () => ({
        from: "bot",
        text: "There are five steps: 01 Business (about 5 min), 02 Access (connect your accounts), 03 Assets (logos, photos, files), 04 Strategy (optional), 05 Kickoff (book the call). Do them in any order; everything saves automatically.",
        actions: [{ label: "Show me with the tour", run: startTour, primary: true }],
      }),
    },
    {
      q: "Do I have to share my passwords?",
      keys: /password|login|secure|safe|privacy/i,
      a: () => ({
        from: "bot",
        text: "No. We ask you to add Madvert as a partner or user inside each platform, so you stay the owner and can remove us any time. Your link is private, and anything sensitive is encrypted.",
      }),
    },
    {
      q: "How do I give Meta access?",
      keys: /meta|facebook|instagram|partner/i,
      a: () => ({
        from: "bot",
        text: `In Access, open the Meta card and choose “Yes” if you have a Business Portfolio. Follow the picture steps: Business settings → Partners → Add → enter our ID ${i.metaPartnerId} → choose assets → Assign. No portfolio yet? Choose “No” and we’ll help.`,
        actions: [{ label: "Open Access", run: close(() => go("access")), primary: true }],
      }),
    },
    {
      q: "Someone else manages our accounts",
      keys: /developer|someone|team|agency|manager|technical|send/i,
      a: () => ({
        from: "bot",
        text: "No problem. On any technical step, press “Need help?” → “Send instructions to my technical person”. They get a secure link to just that task, and you’ll see when they open and finish it.",
        actions: [{ label: "Open Access", run: close(() => go("access")) }],
      }),
    },
    {
      q: "Can I stop and continue later?",
      keys: /later|stop|save|continue|leave/i,
      a: () => ({ from: "bot", text: "Yes. Every answer saves as you type. Close the page any time and open the same link to continue where you left off." }),
    },
    {
      q: "How long does it take?",
      keys: /long|time|minutes|hours/i,
      a: () => ({ from: "bot", text: `Most clients finish in ${o.estimatedMinutes[0]}–${o.estimatedMinutes[1]} minutes, often over a couple of sittings. The Strategy step is optional.` }),
    },
    {
      q: "How do I upload files?",
      keys: /upload|file|logo|photo|video|drive|dropbox/i,
      a: () => ({
        from: "bot",
        text: "In Assets, drag files into a box, tap Camera on your phone, or paste a Google Drive / Dropbox / OneDrive folder link. Big folders? Just paste the link.",
        actions: [{ label: "Open Assets", run: close(() => go("assets")), primary: true }],
      }),
    },
    {
      q: "How do I book the kickoff call?",
      keys: /book|kickoff|call|meeting|calendar/i,
      a: () => ({
        from: "bot",
        text: "Open Kickoff and pick a time in the calendar. We recommend finishing Business Information first so the call is about decisions, not questions.",
        actions: [
          { label: "Open Kickoff", run: close(() => go("kickoff")), primary: true },
          { label: "Open calendar", run: book },
        ],
      }),
    },
  ];

  const say = (q: string, answer: () => Msg) => {
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, answer()]);
    }, 650);
  };

  const ask = (q: string) => {
    const hit = FAQ.find((f) => f.keys.test(q));
    say(
      q,
      hit
        ? hit.a
        : () => ({
            from: "bot",
            text: `Good question. ${o.accountManager.name} and the team can answer that directly.`,
            actions: [
              { label: wa ? "Message us on WhatsApp" : "Email the team", run: contact, primary: true },
              { label: "Book a call", run: book },
            ],
          }),
    );
  };

  useEffect(() => {
    if (open && !msgs.length)
      // Greeting when the widget is first opened.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMsgs([
        {
          from: "bot",
          text: (
            <>
              Hi {o.firstName}! I’m your Madvert onboarding guide. You are <strong>{progress.overall}%</strong> done. What can I help with?
            </>
          ),
        },
      ]);
  }, [open, msgs.length, o.firstName, progress.overall]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const hintContent =
    hint === "self"
      ? { title: "You’re all set", body: "Need a hand later? Tap this button for the guide, answers and the Madvert team." }
      : hint === "tour-done"
        ? { title: "Tour complete", body: "I’ll pop up with a tip on each step. Tap me any time you need help." }
        : hint
          ? HINTS[hint]
          : null;

  return (
    <>
      {hintContent && !open ? (
        <div className="ob-hint" role="status">
          <button type="button" className="absolute right-2 top-2 text-[var(--ob-ink-3)] hover:text-[var(--ob-ink)]" aria-label="Dismiss tip" onClick={clearHint}>
            <Icon name="x" size={14} />
          </button>
          <p className="pr-5 text-[11px] font-bold tracking-[0.18em] text-[var(--ob-blue)]">TIP</p>
          <p className="mt-1 text-[14.5px] font-bold">{hintContent.title}</p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--ob-ink-2)]">{hintContent.body}</p>
          <div className="mt-3 flex gap-2">
            <Btn size="xs" onClick={clearHint}>
              Got it
            </Btn>
            <Btn
              size="xs"
              variant="ghost"
              onClick={() => {
                clearHint();
                setOpen(true);
              }}
            >
              Ask a question
            </Btn>
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="ob-assistant" role="dialog" aria-label="Onboarding help">
          <div className="ob-assistant-head">
            <GlowMark size={38} />
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-bold text-white">Madvert Guide</p>
              <p className="flex items-center gap-1.5 text-[12px] text-[#9fdcff]">
                <span className="h-2 w-2 rounded-full bg-[#34d399]" /> Here to help · {o.accountManager.name}’s team
              </p>
            </div>
            <button type="button" className="grid h-8 w-8 place-items-center rounded-full text-white/80 hover:bg-white/10" aria-label="Close help" onClick={() => setOpen(false)}>
              <Icon name="x" size={16} />
            </button>
          </div>
          <div ref={list} className="ob-assistant-body">
            {msgs.map((m, n) => (
              <div key={n} className={`ob-bubble ${m.from === "me" ? "ob-bubble-me" : ""}`}>
                <div>{m.text}</div>
                {m.actions?.length ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.actions.map((a) => (
                      <Btn key={a.label} size="xs" variant={a.primary ? "primary" : "ghost"} onClick={a.run}>
                        {a.label}
                      </Btn>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {typing ? (
              <div className="ob-bubble ob-typing" aria-label="Typing">
                <i />
                <i />
                <i />
              </div>
            ) : null}
            <div className="mt-1 flex flex-wrap gap-1.5">
              {FAQ.map((f) => (
                <button key={f.q} type="button" className="ob-quick" onClick={() => say(f.q, f.a)}>
                  {f.q}
                </button>
              ))}
              <button type="button" className="ob-quick" onClick={startTour}>
                ↺ Restart the guided tour
              </button>
              <button type="button" className="ob-quick" onClick={contact}>
                Talk to a human
              </button>
            </div>
          </div>
          <form
            className="ob-assistant-input"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              ask(text.trim());
              setText("");
            }}
          >
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question…" aria-label="Your question" />
            <button type="submit" aria-label="Send" className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: "var(--ob-grad)" }}>
              <Icon name="send" size={15} />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        data-tour="assistant"
        className="ob-fab"
        aria-label={open ? "Close help" : "Open the onboarding guide"}
        aria-expanded={open}
        onClick={() => {
          clearHint();
          setOpen(!open);
        }}
      >
        {open ? <Icon name="x" size={22} /> : <Icon name="chat" size={24} />}
        {!open ? <span className="ob-fab-label">Need help?</span> : null}
        {view !== "kickoff" && !open ? <span className="ob-fab-ping" aria-hidden="true" /> : null}
      </button>
    </>
  );
}
