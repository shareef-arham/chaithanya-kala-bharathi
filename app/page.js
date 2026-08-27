import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <img src="/hero-education.jpg" alt="Children studying in school in Andhra Pradesh" />
        </div>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              🌱 Serving Communities in Andhra Pradesh Since 1992
            </div>
            <h1>
              Chaithanya Kala Bharathi{' '}
              <span className={styles.highlight}>(CKB)</span>
            </h1>
            <p>
              Dedicated to the socio-economic advancement and sustainable development of vulnerable
              communities, tribal groups, Dalits, women, and children across Nandyal and Kurnool districts.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/donate" className="btn btn-accent" id="hero-donate-btn">
                ❤️ Support Our Interventions
              </Link>
              <Link href="/about" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }} id="hero-learn-btn">
                Our 30+ Year Journey →
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardInner}>
                <div className={styles.impactItem}>
                  <div className={`${styles.impactIcon} ${styles.green}`}>📚</div>
                  <div className={styles.impactInfo}>
                    <h4>10,000+</h4>
                    <p>Children Enrolled (Badi Bata)</p>
                  </div>
                </div>
                <div className={styles.impactItem}>
                  <div className={`${styles.impactIcon} ${styles.amber}`}>👶</div>
                  <div className={styles.impactInfo}>
                    <h4>5,000+</h4>
                    <p>Mothers & Infants Supported</p>
                  </div>
                </div>
                <div className={styles.impactItem}>
                  <div className={`${styles.impactIcon} ${styles.blue}`}>🏥</div>
                  <div className={styles.impactInfo}>
                    <h4>100+</h4>
                    <p>Health & Nutrition Camps</p>
                  </div>
                </div>
                <div className={styles.impactItem}>
                  <div className={`${styles.impactIcon} ${styles.red}`}>🌾</div>
                  <div className={styles.impactInfo}>
                    <h4>30+</h4>
                    <p>Years of Continuous Service</p>
                  </div>
                </div>
              </div>
              <div className={styles.floatingBadge}>
                📜 Regd. 12A • 80G • CSR • FCRA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar} id="stats">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>1992</div>
            <div className={styles.statLabel}>Established Year</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>30+</div>
            <div className={styles.statLabel}>Years of Impact</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>4+</div>
            <div className={styles.statLabel}>Core Interventions</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Statutory Transparency</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission} id="mission">
        <div className={styles.missionGrid}>
          <div className={styles.missionImage}>
            <img src="/programs-community.jpg" alt="Women skill development and community welfare" />
          </div>
          <div className={styles.missionContent}>
            <h2>
              Our <span className={styles.accent}>Vision & Mission</span>
            </h2>
            <p>
              Chaithanya Kala Bharathi (CKB) is a registered non-governmental organization based in Nandyal,
              Andhra Pradesh. Since its inception in 1992, CKB has focused on holistic rural transformation,
              child welfare, education, healthcare, and women’s empowerment.
            </p>
            <p>
              We work in close collaboration with local Gram Panchayats, Anganwadis (ICDS), Primary Health Centres,
              and global philanthropic partners to implement grassroots programs that create long-term social equity.
            </p>

            <div className={styles.missionValues}>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>🏫</div>
                <div>
                  <h4>School & Education</h4>
                  <p>Badi Bata &quot;Back to School&quot; & Child Rights</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>🤰</div>
                <div>
                  <h4>Mother & Child Care</h4>
                  <p>Nutrition, Immunization & Safe Deliveries</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>🩺</div>
                <div>
                  <h4>Health & Fluorosis Care</h4>
                  <p>Dental, Eye & Health Checkup Camps</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>🌾</div>
                <div>
                  <h4>Economic Empowerment</h4>
                  <p>Women Livelihoods & Farmer Producer Groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className={styles.programsPreview} id="programs-preview">
        <div className="section-header">
          <h2>Core Intervention Areas</h2>
          <p>Targeted programs addressing key social determinants in Nandyal district</p>
        </div>

        <div className={styles.programsGrid}>
          <div className={styles.programCard} id="program-education">
            <div className={styles.programIcon} style={{ background: 'var(--color-primary-bg)' }}>🎒</div>
            <h3>School & Education</h3>
            <p>
              Enrolment drives (Badi Bata), anti-child labour campaigns, books &amp; study material distribution,
              school sports, &quot;No Stick&quot; child-friendly school advocacy, and ChildLine 1098 awareness.
            </p>
          </div>
          <div className={styles.programCard} id="program-mother-child">
            <div className={styles.programIcon} style={{ background: 'rgba(232, 168, 56, 0.12)' }}>🤱</div>
            <h3>Mother &amp; Child Care</h3>
            <p>
              Breast feeding promotion, mothers meetings, pre/post-natal care education, institutional deliveries to reduce
              IMR/MMR, and traditional scientific community celebrations (Seemanthalu &amp; Anna Prasana).
            </p>
          </div>
          <div className={styles.programCard} id="program-health">
            <div className={styles.programIcon} style={{ background: 'rgba(45, 106, 159, 0.12)' }}>🏥</div>
            <h3>Health &amp; Nutrition</h3>
            <p>
              Comprehensive dental and eye camps for students in fluoride-affected regions, adolescent menstrual hygiene,
              Iron Folic Acid distribution, and community cooking nutrition demonstrations.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
          <Link href="/programs" className="btn btn-primary" id="view-all-programs-btn">
            View All Interventions →
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className={styles.testimonial} id="testimonial">
        <div className={styles.testimonialContent}>
          <div className={styles.quoteIcon}>❝</div>
          <blockquote>
            &ldquo;CKB&apos;s relentless dedication to children&apos;s education and maternal healthcare in Nandyal
            has brought hope and tangible progress to thousands of families across the rural belt.&rdquo;
          </blockquote>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>CKB</div>
            <div className={styles.authorInfo}>
              <strong>Community Welfare Partner</strong>
              <span>Nandyal, Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} id="cta">
        <div className={styles.ctaContent}>
          <h2>Join Hands with Chaithanya Kala Bharathi</h2>
          <p>
            Your support empowers vulnerable children, adolescent girls, and rural women to live with dignity,
            education, and good health.
          </p>
          <div className={styles.ctaCtas}>
            <Link href="/donate" className="btn btn-accent" id="cta-donate-btn">
              ❤️ Support Our Work (FCRA / 80G)
            </Link>
            <Link href="/contact" className="btn btn-white" id="cta-contact-btn">
              📍 Contact Our Office in Nandyal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
