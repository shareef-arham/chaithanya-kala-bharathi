import styles from './donate.module.css';

export const metadata = {
  title: 'Donate & Support | Chaithanya Kala Bharathi',
  description: 'Contribute to Chaithanya Kala Bharathi (CKB). Official Indian (SBI & Syndicate Bank) and Foreign (FCRA SBI New Delhi) bank account details for donations.',
};

const tiers = [
  {
    amount: '₹ 500',
    title: 'School Kit & Materials',
    description: 'Provides notebooks, school bags, plates, glasses, and study kits for one student enrolled through the Badi Bata campaign.',
  },
  {
    amount: '₹ 1,500',
    title: 'Nutrition & Mother Care Kit',
    description: 'Sponsors nutritional supplements, Iron Folic Acid tablets, and pre/post-natal healthcare guidance for an expecting mother in a rural hamlet.',
  },
  {
    amount: '₹ 3,500',
    title: 'School Health & Dental Camp',
    description: 'Funds dental, eye, and general pediatric checkups for children studying in fluoride-affected schools around Nandyal.',
  },
  {
    amount: '₹ 10,000',
    title: 'Women Skill & Microenterprise Grant',
    description: 'Sponsors vocational tailoring machinery, raw materials, and self-help group training for women seeking financial independence.',
  },
];

export default function DonatePage() {
  return (
    <>
      <section className="page-hero" id="donate-hero">
        <div className="container">
          <h1>Support Our Interventions</h1>
          <p>Your contribution directly supports children’s education, maternal healthcare, and rural empowerment across Nandyal</p>
        </div>
      </section>

      <section className="section" id="donate-details">
        <div className={styles.donateGrid}>
          {/* Left Column: Impact Tiers */}
          <div>
            <h2 className={styles.tiersTitle}>Sponsor a Cause</h2>
            <p>
              Contributions can be made by individuals, corporations (CSR), and international supporters.
              Choose an impact area or transfer directly to our verified bank accounts.
            </p>

            <div className={styles.tiersGrid}>
              {tiers.map((tier, idx) => (
                <div className={styles.tierCard} key={idx} id={`tier-card-${idx}`}>
                  <div className={styles.tierAmount}>{tier.amount}</div>
                  <div className={styles.tierTitle}>{tier.title}</div>
                  <div className={styles.tierDesc}>{tier.description}</div>
                </div>
              ))}
            </div>

            <div className={styles.taxNotice}>
              <strong>📜 Tax Exemption &amp; Receipts:</strong> Donations to Chaithanya Kala Bharathi are eligible
              for tax benefits under Section 80G of the Income Tax Act. Please email your transfer reference details
              to <code>ckb_ndl@yahoo.com</code> or call <code>+91 9440464877</code> to receive your official 80G receipt.
            </div>
          </div>

          {/* Right Column: Official Bank Accounts */}
          <div className={styles.bankDetailsCard} id="bank-info-box">
            <h3>Official Bank Accounts</h3>
            <p>Direct electronic transfer (NEFT / RTGS / IMPS / SWIFT / Wire):</p>

            {/* Indian Account 1: SBI */}
            <div className={styles.accountBox} style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontWeight: '700', color: 'var(--color-primary-dark)', marginBottom: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}>
                🇮🇳 Indian Donations — State Bank of India
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Name:</span>
                <span className={styles.accountValue}>CHAITHANYA KALA BHARATHI</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Number:</span>
                <span className={styles.accountValue}>30861193442</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Branch:</span>
                <span className={styles.accountValue}>Main Branch, Nandyal</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>IFSC Code:</span>
                <span className={styles.accountValue}>SBIN000883</span>
              </div>
            </div>

            {/* Indian Account 2: Syndicate Bank */}
            <div className={styles.accountBox} style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontWeight: '700', color: 'var(--color-primary-dark)', marginBottom: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}>
                🇮🇳 Indian Donations — Syndicate Bank
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Name:</span>
                <span className={styles.accountValue}>CHAITHANYA KALA BHARATHI</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Number:</span>
                <span className={styles.accountValue}>3374-22000-75141</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Branch:</span>
                <span className={styles.accountValue}>Main Branch, Nandyal</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>IFSC Code:</span>
                <span className={styles.accountValue}>SYNB0003374</span>
              </div>
            </div>

            {/* Foreign Account: FCRA SBI New Delhi */}
            <div className={styles.accountBox} style={{ borderColor: 'var(--color-secondary)' }}>
              <div style={{ fontWeight: '700', color: 'var(--color-secondary-dark)', marginBottom: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}>
                🌍 Foreign Donations (FCRA Designated Account)
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Name:</span>
                <span className={styles.accountValue}>CHAITHANYA KALA BHARATHI</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Bank Name:</span>
                <span className={styles.accountValue}>State Bank of India</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Number:</span>
                <span className={styles.accountValue}>40117327176</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Branch:</span>
                <span className={styles.accountValue}>11 Sansad Marg, New Delhi 110001</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>IFSC Code:</span>
                <span className={styles.accountValue}>SBIN0000691</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>SWIFT Code:</span>
                <span className={styles.accountValue}>SBININBB104</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Accountability */}
      <section className={styles.transparency} id="trust-section">
        <div className="section-header">
          <h2>Statutory Approvals &amp; Compliance</h2>
          <p>Our organization strictly adheres to all statutory requirements for non-profits in India</p>
        </div>
        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>📜</div>
            <h4>Section 12A &amp; 80G</h4>
            <p>Official tax exemption granted by the Income Tax Department of India.</p>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>🌐</div>
            <h4>FCRA Registration</h4>
            <p>Authorized by Ministry of Home Affairs to receive foreign grants into designated SBI Sansad Marg account.</p>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>🏢</div>
            <h4>CSR Eligible</h4>
            <p>Registered for CSR-1 with the Ministry of Corporate Affairs for Corporate Social Responsibility partnerships.</p>
          </div>
        </div>
      </section>
    </>
  );
}
