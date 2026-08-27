'use client';

import { useState } from 'react';
import styles from './get-involved.module.css';

const roles = [
  {
    icon: '👨‍🏫',
    title: 'Teaching & Student Mentorship',
    description: 'Help rural students with after-school tutoring, English speaking, mathematics, and basic science concepts at our community learning centers in Nandyal.',
  },
  {
    icon: '🎨',
    title: 'Vocational & Arts Instructor',
    description: 'Share your skills in tailoring, arts and crafts, music, digital literacy, or basic computing with youth and women seeking self-reliance.',
  },
  {
    icon: '📦',
    title: 'Distribution & Field Operations',
    description: 'Assist our team during book distribution drives, health awareness camps, and community relief material distributions across rural hamlets.',
  },
  {
    icon: '📢',
    title: 'Advocacy & Content Creation',
    description: 'Help amplify our impact stories, photograph community programs, write reports, or organize local cultural events and workshops.',
  },
];

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'teaching',
    availability: 'weekends',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <section className="page-hero" id="get-involved-hero">
        <div className="container">
          <h1>Get Involved</h1>
          <p>Join hands with Chaithanya Kala Bharathi to make a meaningful difference in the lives of underserved communities</p>
        </div>
      </section>

      <section className="section" id="volunteer-section">
        <div className={styles.volunteerGrid}>
          {/* Left Column: Volunteer Roles */}
          <div className={styles.rolesSection}>
            <h2>Volunteer Opportunities</h2>
            <p>
              Whether you can contribute a few hours on weekends or offer specialized training,
              your time and skills can bring about positive transformation in Nandyal.
            </p>

            <div className={styles.rolesList}>
              {roles.map((role, idx) => (
                <div className={styles.roleCard} key={idx}>
                  <div className={styles.roleHeader}>
                    <div className={styles.roleIcon}>{role.icon}</div>
                    <h3>{role.title}</h3>
                  </div>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Signup Form */}
          <div className={styles.formCard} id="volunteer-form-card">
            <h3>Become a Volunteer</h3>
            <p>Fill out this short form and our coordinator will connect with you.</p>

            {submitted ? (
              <div className={styles.successMessage} id="volunteer-success">
                <h4>🎉 Thank You for Stepping Forward!</h4>
                <p>
                  We have received your details. Our team at Chaithanya Kala Bharathi will reach out to you shortly via phone or email.
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
                      interest: 'teaching',
                      availability: 'weekends',
                      message: '',
                    });
                  }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="volunteer-form">
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    className={styles.formControl}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className={styles.formControl}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="name@example.com"
                      className={styles.formControl}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="interest">Area of Interest</label>
                    <select
                      id="interest"
                      className={styles.formControl}
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="teaching">Teaching & Mentoring</option>
                      <option value="skills">Vocational Skills</option>
                      <option value="field">Field Operations</option>
                      <option value="digital">Digital / Content</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="availability">Availability</label>
                    <select
                      id="availability"
                      className={styles.formControl}
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <option value="weekends">Weekends Only</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="flexible">Flexible / Project-based</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Any message or previous experience?</label>
                  <textarea
                    id="message"
                    rows="3"
                    placeholder="Tell us a little about your background..."
                    className={styles.formControl}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} id="submit-volunteer-btn">
                  Submit Volunteer Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className={styles.partnerships} id="partnerships">
        <div className="section-header">
          <h2>Ways to Partner</h2>
          <p>Collaborating with schools, institutions, and CSR partners to scale our impact</p>
        </div>
        <div className={styles.partnerGrid}>
          <div className={styles.partnerCard}>
            <div className={styles.partnerIcon}>🏢</div>
            <h3>Corporate CSR</h3>
            <p>
              Partner with us on targeted educational infrastructure, digital labs, and women empowerment centers aligned with CSR goals.
            </p>
          </div>
          <div className={styles.partnerCard}>
            <div className={styles.partnerIcon}>🏫</div>
            <h3>Schools & Colleges</h3>
            <p>
              Engage youth in community service, student mentorship drives, and social internships in and around Nandyal.
            </p>
          </div>
          <div className={styles.partnerCard}>
            <div className={styles.partnerIcon}>🌐</div>
            <h3>Community Groups</h3>
            <p>
              Collaborate on local health camps, cultural festivals, environmental drives, and awareness campaigns.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
