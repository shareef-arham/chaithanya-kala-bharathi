import styles from './about.module.css';

export const metadata = {
  title: 'About Us & Legal Status | Chaithanya Kala Bharathi',
  description: 'Learn about Chaithanya Kala Bharathi (CKB) - founded in 1992 in Nandyal, AP. Discover our legal status, 12A, 80G, CSR, FCRA certifications, vision, mission, and leadership.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.aboutHero} id="about-hero">
        <div className={styles.aboutHeroContent}>
          <div className={styles.aboutHeroText}>
            <h1>
              About <span className={styles.accent}>Chaithanya Kala Bharathi</span>
            </h1>
            <p>
              Founded in 1992 in Nandyal, Andhra Pradesh, Chaithanya Kala Bharathi (CKB) is a non-profit,
              non-governmental organization committed to the holistic empowerment of Dalits, tribal groups,
              women, children, and vulnerable rural communities.
            </p>
          </div>
          <div className={styles.aboutHeroImage}>
            <img src="/about-team.jpg" alt="Chaithanya Kala Bharathi Organization" />
          </div>
        </div>
      </section>

      {/* Organization Story & Profile */}
      <section className={styles.story} id="our-story">
        <div className={styles.storyContent}>
          <h2>Organization Profile</h2>
          <p>
            Chaithanya Kala Bharathi (CKB) was established in 1992 with the objective of addressing persistent
            socio-economic inequalities in the Rayalaseema region of Andhra Pradesh. Headquartered in Nandyal,
            CKB has spearheaded grassroots interventions across education, health and nutrition, mother and child
            welfare, water sanitation, and rural livelihoods.
          </p>
          <p>
            Over three decades of active service, CKB has built strong grassroots networks with village anganwadis,
            government primary schools, local health workers, and international donor agencies. Through evidence-based
            programs like <em>Badi Bata</em> (Back to School), school nutrition demonstrations, health and fluorosis
            screenings, and women&apos;s self-help cooperatives, CKB continues to champion inclusive growth and social justice.
          </p>
        </div>
      </section>

      {/* Legal Status & Certifications */}
      <section className={styles.values} id="legal-status" style={{ background: 'var(--color-surface)' }}>
        <div className="section-header">
          <h2>Legal Status & Statutory Compliance</h2>
          <p>Full transparency and statutory compliance across Indian and international regulatory bodies</p>
        </div>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueCardIcon}>📜</div>
            <h4>Society Registration</h4>
            <p>Registered NGO under the Societies Registration Act since 1992.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueCardIcon}>🏛️</div>
            <h4>12A &amp; 80G Certified</h4>
            <p>Tax-exempt non-profit status under Sections 12A and 80G of the Income Tax Act.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueCardIcon}>🌐</div>
            <h4>FCRA Registered</h4>
            <p>Registered under the Foreign Contribution (Regulation) Act with SBI Sansad Marg New Delhi.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueCardIcon}>🏢</div>
            <h4>CSR-1 &amp; NGO Darpan</h4>
            <p>Eligible for Corporate Social Responsibility funding with Ministry of Corporate Affairs and NITI Aayog Unique ID.</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={styles.visionMission} id="vision-mission">
        <div className="section-header">
          <h2>Vision &amp; Mission</h2>
          <p>Guiding principles that drive our community interventions</p>
        </div>
        <div className={styles.vmGrid}>
          <div className={styles.vmCard} id="vision-card">
            <div className={styles.vmIcon}>🔭</div>
            <h3>Our Vision</h3>
            <p>
              A just, equitable, and empowered society where vulnerable communities, children, women, and
              rural families live with dignity, self-reliance, optimal health, and access to quality education.
            </p>
          </div>
          <div className={styles.vmCard} id="mission-card">
            <div className={styles.vmIcon}>🎯</div>
            <h3>Our Mission</h3>
            <p>
              To implement sustainable, participatory development programs in education, maternal and infant health,
              adolescent welfare, sustainable agriculture, and economic empowerment in Nandyal and adjoining rural districts.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Executive Committee */}
      <section className={styles.team} id="our-team">
        <div className="section-header">
          <h2>Governance &amp; Executive Committee</h2>
          <p>Guided by a dedicated governing body with strong community and female representation</p>
        </div>
        <div className={styles.teamGrid}>
          <div className={styles.teamCard}>
            <div className={styles.teamAvatar}>VB</div>
            <h4>Mr. V. Vijaya Bhaskar</h4>
            <div className={styles.teamRole}>Executive Secretary / Chief Functionary</div>
            <p>Leading CKB&apos;s strategic direction, institutional partnerships, and grassroots program implementation since inception.</p>
          </div>
          <div className={styles.teamCard}>
            <div className={styles.teamAvatar}>EC</div>
            <h4>Executive Committee</h4>
            <div className={styles.teamRole}>Governing Body</div>
            <p>Comprising experienced educators, social workers, and community leaders ensuring compliance and program efficacy.</p>
          </div>
          <div className={styles.teamCard}>
            <div className={styles.teamAvatar}>FD</div>
            <h4>Field Operations Team</h4>
            <div className={styles.teamRole}>Community Coordinators</div>
            <p>Active field staff coordinating directly with local schools, ICDS anganwadis, and primary health centers in Nandyal.</p>
          </div>
        </div>
      </section>
    </>
  );
}
