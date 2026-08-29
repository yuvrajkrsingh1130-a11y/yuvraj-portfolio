import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact"
      style={{
        background: 'var(--ivory)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top rule */}
      <motion.div
        style={{
          height: '1px',
          background: 'var(--ivory-deeper)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />

      {/* Hero statement */}
      <div style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 90px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background number */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-3%',
            bottom: '-8%',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(180px, 28vw, 380px)',
            fontWeight: 400,
            color: 'var(--ivory-dark)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          04
        </div>

        <motion.div
          style={{ marginBottom: '40px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '1px', width: '32px', background: 'var(--charcoal)' }} />
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--warm-gray)',
            }}>
              CHAPTER 04 — CONTACT
            </p>
          </div>
        </motion.div>

        <motion.h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(44px, 7.5vw, 104px)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--charcoal)',
            marginBottom: '48px',
            position: 'relative',
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          LET'S MAKE<br />
          SOMETHING<br />
          <em style={{ fontStyle: 'italic', color: 'var(--burgundy)', fontWeight: 400 }}>
            WORTH OPENING.
          </em>
        </motion.h2>

        {/* Contacts + CTAs */}
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {/* Social links */}
          <div style={{ display: 'flex', gap: '28px', marginBottom: '36px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="mailto:hello@yuvraj.design"
              data-cursor="hover"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 300,
                color: 'var(--charcoal)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--charcoal)',
                paddingBottom: '2px',
              }}
            >
              hello@yuvraj.design
            </a>

            <div style={{ width: '1px', height: '14px', background: 'var(--ivory-deeper)' }} />

            {[
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'Behance', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor="hover"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 300,
                  color: 'var(--warm-gray)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'color 0.25s',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#contact-form" className="btn-solid" data-cursor="hover">
              START A PROJECT →
            </a>
            <button
              className="btn-editorial"
              data-cursor="hover"
              onClick={() => {
                // CV download placeholder
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'Yuvraj_CV_2026.pdf';
                link.click();
              }}
            >
              DOWNLOAD CV
            </button>
          </div>
        </motion.div>
      </div>

      {/* Contact form */}
      <ContactForm inView={inView} />

      {/* Footer */}
      <Footer />
    </section>
  );
}

function ContactForm({ inView }: { inView: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="contact-form"
      style={{
        borderTop: '1px solid var(--ivory-deeper)',
        padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px)',
      }}
    >
      <motion.p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray)',
          marginBottom: '48px',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        SEND A MESSAGE
      </motion.p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '40px 0', maxWidth: '480px' }}
        >
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '40px',
            fontWeight: 400,
            color: 'var(--charcoal)',
            marginBottom: '20px',
          }}>
            Thank you.
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 300,
            color: 'var(--warm-gray)',
            lineHeight: 1.8,
          }}>
            Your message has been received. I'll review it and get back to you within a couple of days.
          </p>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            maxWidth: '680px',
          }}
          aria-label="Contact form"
          noValidate
        >
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <FormField
              label="NAME"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
            <FormField
              label="EMAIL"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <FormField
              label="COMPANY / BUSINESS"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Optional"
            />
            <div>
              <label htmlFor="projectType" className="form-label">
                PROJECT TYPE
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="form-field"
                style={{ cursor: 'none', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="">Select a type</option>
                <option value="brand">Brand Identity</option>
                <option value="ui">UI / UX Design</option>
                <option value="web">Web Design</option>
                <option value="creative">Creative Direction</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="form-label">
              MESSAGE <span style={{ color: 'var(--burgundy)' }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="form-field"
              placeholder="Tell me about your project…"
              style={{ resize: 'vertical', lineHeight: 1.7 }}
            />
          </div>

          {/* Submit */}
          <div>
            <motion.button
              type="submit"
              className="btn-solid"
              data-cursor="hover"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND MESSAGE →
            </motion.button>
          </div>
        </motion.form>
      )}
    </div>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span style={{ color: 'var(--burgundy)', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="form-field"
        style={{ cursor: 'none' }}
      />
    </div>
  );
}

function Footer() {
  const year = 2026;

  return (
    <div style={{
      borderTop: '1px solid var(--ivory-deeper)',
      padding: '28px clamp(24px, 6vw, 80px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '9px',
        letterSpacing: '0.15em',
        color: 'var(--warm-gray-light)',
      }}>
        YUVRAJ © {year} — Graphic & UI/UX Designer
      </p>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '12px',
        fontStyle: 'italic',
        color: 'var(--warm-gray-light)',
      }}>
        A digital book of ideas, experiments, identities, and interfaces.
      </p>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-cursor="hover"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray)',
          background: 'none',
          border: 'none',
          cursor: 'none',
          transition: 'color 0.25s',
        }}
      >
        ↑ TOP
      </button>
    </div>
  );
}
