"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Message form state
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Newsletter state
  const [newsletter, setNewsletter] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulate async submit
    setTimeout(() => {
      setFormLoading(false);
      setFormSent(true);
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter) return;
    setNewsletterSent(true);
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-200 bg-transparent placeholder:text-foreground/30 text-foreground";
  const inputStyle = {
    background: "var(--glass-bg)",
    border: "1px solid var(--glass-border)",
  };
  const inputFocusClass = "focus:ring-2 focus:ring-[#3B82F6]/40 focus:border-[#3B82F6]/60";

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.07), transparent)",
        }}
      />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-3xl"
        >
          <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest font-heading">
            Contact
          </span>
          <h2 className="font-heading tracking-tighter text-4xl md:text-5xl font-bold text-foreground">
            Let&apos;s build{" "}
            <span className="text-[#3B82F6]">something great</span>
          </h2>
          <p className="text-foreground/60 text-lg sm:text-xl font-sans leading-relaxed">
            Have a project in mind? We&apos;d love to hear about it. Drop us a message and we&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Send a message ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 rounded-3xl p-8 flex flex-col gap-6"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <Send className="size-4 text-[#3B82F6]" />
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground">Send us a message</h3>
            </div>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <CheckCircle2 className="size-12 text-[#10B981]" />
                <p className="text-lg font-semibold font-heading text-foreground">Message sent!</p>
                <p className="text-sm text-foreground/50 font-sans">We&apos;ll be in touch within 24 hours.</p>
                <button
                  onClick={() => { setFormSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-sm text-[#3B82F6] hover:underline font-medium mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium font-heading text-foreground/50 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`${inputBase} ${inputFocusClass}`}
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium font-heading text-foreground/50 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={`${inputBase} ${inputFocusClass}`}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium font-heading text-foreground/50 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={`${inputBase} ${inputFocusClass}`}
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium font-heading text-foreground/50 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project, timeline, and budget..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${inputBase} ${inputFocusClass} resize-none`}
                    style={{ ...inputStyle, paddingTop: "14px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="ml-auto inline-flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
                  style={{
                    background: "#3B82F6",
                    filter: "drop-shadow(0 0 10px rgba(59,130,246,0.35))",
                  }}
                >
                  {formLoading ? (
                    <>
                      <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="size-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Right column ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-7 flex flex-col gap-5"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <h3 className="text-base font-bold font-heading text-foreground">Prefer email?</h3>
              <a
                href="mailto:hello@codephilic.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:underline"
              >
                <Mail className="size-4" />
                hello@codephilic.com
              </a>
              <div className="flex flex-col gap-3 pt-2" style={{ borderTop: "1px solid var(--glass-border)" }}>
                {[
                  ["Response time", "Within 24 hours"],
                  ["Availability", "Mon – Fri, 9am – 6pm IST"],
                  ["Project intake", "Open for Q2 2026"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/50 font-sans">{label}</span>
                    <span className="font-medium text-foreground font-sans">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04))",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-8 -right-8 size-32 rounded-full pointer-events-none opacity-30"
                style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
              />

              <div className="flex flex-col gap-1 relative z-10">
                <h3 className="text-base font-bold font-heading text-foreground">Stay in the loop</h3>
                <p className="text-sm text-foreground/55 font-sans leading-relaxed">
                  Get monthly insights on software engineering, product design, and what we&apos;re shipping.
                </p>
              </div>

              {newsletterSent ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-medium text-[#10B981]"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  You&apos;re subscribed — welcome aboard!
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 relative z-10">
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={newsletter}
                    onChange={e => setNewsletter(e.target.value)}
                    className="flex-1 rounded-xl px-4 py-2.5 text-sm font-sans outline-none text-foreground placeholder:text-foreground/30 focus:ring-2 focus:ring-[#3B82F6]/40 transition-all"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid rgba(59,130,246,0.25)",
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 size-10 rounded-xl flex items-center justify-center text-white transition-all hover:brightness-110"
                    style={{ background: "#3B82F6" }}
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              )}

              <p className="text-xs text-foreground/35 font-sans relative z-10">
                No spam, ever. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
