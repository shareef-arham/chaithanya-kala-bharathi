'use client';

import { useState } from 'react';
import styles from './contact.module.css';

const faqs = [
  {
    q: 'What is Chaithanya Kala Bharathi (CKB)?',
    a: 'CKB is a non-governmental, non-profit society established in 1992 in Nandyal, Andhra Pradesh, working on school education, child rights, maternal healthcare, nutrition, and women/farmer economic empowerment.',
  },
  {
    q: 'Where is the registered office of CKB?',
    a: 'Our registered office is located at D.No.29/178-22H, S.B.I. Colony, Opposite Ramalayam Temple, Nandyal - 518 501, Andhra Pradesh.',
  },
  {
    q: 'Are donations to CKB eligible for 80G tax benefits?',
    a: 'Yes, CKB holds valid Section 12A and Section 80G registrations from the Income Tax Department of India, allowing domestic donors to claim tax deductions.',
  },
  {
    q: 'Can foreign donors or overseas organizations contribute?',
    a: 'Yes, CKB is registered under the Foreign Contribution (Regulation) Act (FCRA) with its designated foreign contribution account at State Bank of India, 11 Sansad Marg, New Delhi.',
  },
  {
    q: 'How can I connect with the CKB team for partnerships?',
    a: 'You can email us directly at ckb_ndl@yahoo.com or call our Chief Functionary at +91 9440464877.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && (formData.email || formData.phone)) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <section className="page-hero" id="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with Chaithanya Kala Bharathi in Nandyal, Andhra Pradesh</p>
        </div>
      </section>

      <section className="section" id="contact-details-section">
        <div className={styles.contactGrid}>
          {/* Left: Contact Info */}
          <div className={styles.contactInfoCard}>
            <h2>Registered Office Details</h2>
            <p>Our doors are always open for community members, volunteers, and institutional partners.</p>

            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <h4>Registered Address</h4>
                  <p>
                    <strong>Chaithanya Kala Bharathi (CKB)</strong><br />
                    D.No. 29/178-22H, S.B.I. Colony,<br />
                    Opposite Ramalayam Temple, Nandyal,<br />
                    Pin - 518 501, Andhra Pradesh, India
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <h4>Phone Number</h4>
                  <p>
                    Mobile / WhatsApp: <a href="tel:+919440464877" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>+91 9440464877</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📧</div>
                <div>
                  <h4>Official Email</h4>
                  <p>
                    <a href="mailto:ckb_ndl@yahoo.com" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>ckb_ndl@yahoo.com</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>🕒</div>
                <div>
                  <h4>Office Timings</h4>
                  <p>
                    Monday – Saturday: 9:30 AM – 6:00 PM<br />
                    Sunday: Closed (Field interventions only)
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.mapBox} id="map-preview">
              <h4>🗺️ Landmark &amp; Accessibility</h4>
              <p>Opposite Ramalayam Temple in S.B.I. Colony, Nandyal. Readily accessible from Nandyal Bus Station and Railway Junction.</p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className={styles.formCard} id="message-form-card">
            <h3>Send a Direct Message</h3>
            <p>Have a question or wish to partner with CKB? Reach out below.</p>

            {submitted ? (
              <div className={styles.successMessage} id="message-success">
                <h4>✉️ Thank You for Your Message!</h4>
                <p>
                  We have received your communication and will respond promptly to your email or phone.
                </p>
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: 'var(--space-md)' }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: '',
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <div className={styles.formGroup}>
                  <label htmlFor="c-name">Full Name *</label>
                  <input
                    type="text"
                    id="c-name"
                    required
                    placeholder="Enter your name"
                    className={styles.formControl}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="c-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="c-phone"
                      placeholder="+91 94404 64877"
                      className={styles.formControl}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="c-email">Email Address *</label>
                    <input
                      type="email"
                      id="c-email"
                      required
                      placeholder="your.email@example.com"
                      className={styles.formControl}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="c-subject">Subject</label>
                  <input
                    type="text"
                    id="c-subject"
                    placeholder="E.g., Volunteering, Donations, Badi Bata Program"
                    className={styles.formControl}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="c-message">Your Message *</label>
                  <textarea
                    id="c-message"
                    required
                    rows="4"
                    placeholder="How can we assist you or collaborate?"
                    className={styles.formControl}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} id="submit-contact-btn">
                  Send Message to CKB
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className={styles.faqs} id="faqs">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers about Chaithanya Kala Bharathi&apos;s legal status and operations in Nandyal</p>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((faq, idx) => (
            <div className={styles.faqItem} key={idx} id={`faq-${idx}`}>
              <h4>Q: {faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
