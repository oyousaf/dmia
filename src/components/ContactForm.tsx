import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ENQUIRIES = [
  "Transaction advisory",
  "Strategic advisory",
  "Programme management",
  "Commercial & procurement",
  "Something else",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cut bg-deep p-8 text-paper [--cut:28px] sm:p-12"
          role="status"
        >
          <p className="label text-coral">Concept only</p>
          <p className="display mt-4 text-4xl sm:text-5xl">
            Nothing was <em>sent.</em>
          </p>
          <p className="mt-4 max-w-md text-paper/75">
            This is an unofficial design concept. To reach DM Infrastructure Advisory, use the contact page on their
            official site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://dminfrastructureadvisory.com/contact"
              className="label rounded-full bg-coral px-5 py-3 text-night hover:bg-paper"
            >
              Official contact page →
            </a>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="label rounded-full border border-paper/30 px-5 py-3 hover:border-coral"
            >
              Back to form
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          exit={{ opacity: 0, y: -12 }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <label className="block">
            <span className="label text-muted">Name *</span>
            <input required name="name" autoComplete="name" className="field" />
          </label>
          <label className="block">
            <span className="label text-muted">Email *</span>
            <input required type="email" name="email" autoComplete="email" className="field" />
          </label>
          <label className="block">
            <span className="label text-muted">Organisation</span>
            <input name="org" autoComplete="organization" className="field" />
          </label>
          <label className="block">
            <span className="label text-muted">Enquiry</span>
            <select name="enquiry" className="field">
              {ENQUIRIES.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="label text-muted">Message *</span>
            <textarea required name="message" placeholder="Tell us about the asset, the deal or the programme…" className="field" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
            <p className="label text-muted">Concept form · submissions are not sent</p>
            <button
              type="submit"
              className="group label flex items-center gap-3 rounded-full bg-fg px-6 py-4 text-bg transition-colors hover:bg-coral hover:text-night"
            >
              Send enquiry
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
