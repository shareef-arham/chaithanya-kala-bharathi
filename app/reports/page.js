'use client';

import { useState } from 'react';
import styles from './reports.module.css';

const dynamicReportList = [
  {
    id: 'dynamic-report',
    title: 'Dynamic Master Report',
    category: 'ckbndl.org/DynamicReport',
    icon: '📊',
    badge: 'Live Master Report',
    file: '/reports/DynamicReport.pdf',
    description: 'The official Dynamic Report published at ckbndl.org/DynamicReport — compiling real-time program summaries, project milestones, and community development statistics.',
    source: 'https://www.ckbndl.org/DynamicReport',
  },
  {
    id: 'our-supporters',
    title: 'Our Supporters & Donor Partners',
    category: 'Partners & Grants',
    icon: '🤝',
    badge: 'Donor Directory',
    file: '/reports/OurSupporters.pdf',
    description: 'Comprehensive report acknowledging domestic CSR partners, government bodies, and international grant agencies collaborating with Chaithanya Kala Bharathi.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/OurSupporters.pdf',
  },
  {
    id: 'school-education',
    title: 'School & Education Program Report',
    category: 'Education & Literacy',
    icon: '🎒',
    badge: 'Badi Bata Report',
    file: '/reports/SchoolEducation.pdf',
    description: 'Detailed analysis of Badi Bata ("Back to School") enrolment drives, school sports, study material distributions, and child-friendly classroom initiatives.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/SchoolEducation.pdf',
  },
  {
    id: 'health-nutrition',
    title: 'Health, Nutrition & Fluorosis Intervention',
    category: 'Healthcare & Nutrition',
    icon: '🩺',
    badge: 'Medical Outreach',
    file: '/reports/HealthNutrition.pdf',
    description: 'Complete data from dental and eye checkup camps for students in fluoride-affected villages, adolescent Iron Folic Acid distributions, and nutrition cooking demos.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/HealthNutrition.pdf',
  },
  {
    id: 'community-welfare',
    title: 'Community Welfare & Mother Care Report',
    category: 'Maternal Welfare',
    icon: '🤱',
    badge: 'Mother & Infant Care',
    file: '/reports/CommunityWelfare.pdf',
    description: 'Community tracking of institutional deliveries, infant immunizations, Breast Feeding Week outreach, and Saamuhika Seemanthalu & Anna Prasana celebrations.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/CommunityWelfare.pdf',
  },
  {
    id: 'economic-empowerment',
    title: 'Women & Economic Empowerment Report',
    category: 'Livelihoods & FPO',
    icon: '🌾',
    badge: 'Self-Reliance',
    file: '/reports/EconomicEmpowerment.pdf',
    description: 'Field report covering tailoring skill centers, handicraft self-help groups, Farmer Producer Organisations (FPO), and pool & sale agricultural linkages.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/EconomicEmpowerment.pdf',
  },
  {
    id: 'org-profile',
    title: 'Complete Organization Profile (1992 - Present)',
    category: 'Institutional Dossier',
    icon: '🏢',
    badge: '30+ Year Profile',
    file: '/reports/OrganizationProfile.pdf',
    description: 'Comprehensive institutional dossier detailing CKB’s 30+ years of social service history, governance principles, and rural development trajectory.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/OrganizationProfile.pdf',
  },
];

const certificates = [
  { name: 'Registration Certificate', file: '/reports/Registration.pdf', type: 'Society Reg.', badge: 'Verified', icon: '📜' },
  { name: '12A Certificate', file: '/reports/12A.pdf', type: 'Income Tax', badge: 'Active', icon: '🏛️' },
  { name: '80G Certificate', file: '/reports/80G.pdf', type: 'Tax Exemption', badge: 'Active', icon: '🧾' },
  { name: 'FCRA Certificate', file: '/reports/FCRA.pdf', type: 'MHA Approved', badge: 'Designated SBI', icon: '🌐' },
  { name: 'CSR-1 Registration', file: '/reports/CSR.pdf', type: 'MCA Compliant', badge: 'Eligible', icon: '🏢' },
  { name: 'NITI Aayog Unique ID', file: '/reports/UniqueID.pdf', type: 'NGO Darpan', badge: 'Registered', icon: '🆔' },
  { name: 'Board Members List', file: '/reports/BoardMembers.pdf', type: 'Governance', badge: 'Governing Body', icon: '👥' },
  { name: 'PAN & TAN Verification', file: '/reports/PAN.pdf', type: 'Tax Identification', badge: 'Compliant', icon: '💳' },
  { name: 'Vision & Mission Charter', file: '/reports/VisionMission.pdf', type: 'Charter', badge: 'Official Charter', icon: '🎯' },
];

export default function ReportsPage() {
  const [selectedDoc, setSelectedDoc] = useState(dynamicReportList[0]);

  return (
    <>
      <section className="page-hero" id="reports-hero">
        <div className="container">
          <h1>Dynamic Reports &amp; Legal Compliance</h1>
          <p>
            Direct access to all reports, real-time program summaries, and statutory certificates from{' '}
            <strong>ckbndl.org/DynamicReport</strong>
          </p>
        </div>
      </section>

      <section className="section" id="reports-content">
        <div className={styles.reportsContainer}>
          {/* Interactive Report Selection Tabs */}
          <div className={styles.reportTabs}>
            {dynamicReportList.map((doc) => (
              <button
                key={doc.id}
                className={`${styles.tabBtn} ${selectedDoc.id === doc.id ? styles.active : ''}`}
                onClick={() => setSelectedDoc(doc)}
                id={`tab-${doc.id}`}
              >
                {doc.icon} {doc.title}
              </button>
            ))}
          </div>

          {/* Embedded Interactive PDF Viewer */}
          <div className={styles.dynamicViewerCard} id="dynamic-viewer">
            <div className={styles.viewerHeader}>
              <div className={styles.viewerTitle}>
                <h3>{selectedDoc.icon} {selectedDoc.title}</h3>
                <p>{selectedDoc.description}</p>
              </div>
              <div className={styles.viewerActions}>
                <a
                  href={selectedDoc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: 'var(--text-xs)', padding: '8px 16px' }}
                >
                  ↗️ Open in Full Screen
                </a>
                <a
                  href={selectedDoc.file}
                  download
                  className="btn btn-primary"
                  style={{ fontSize: 'var(--text-xs)', padding: '8px 16px' }}
                >
                  📥 Download PDF
                </a>
              </div>
            </div>

            <div className={styles.viewerFrameContainer}>
              <iframe
                src={`${selectedDoc.file}#toolbar=1&view=FitH`}
                title={selectedDoc.title}
                className={styles.viewerFrame}
              >
                <p>
                  Your browser does not support embedded PDFs. You can{' '}
                  <a href={selectedDoc.file} target="_blank" rel="noopener noreferrer">
                    click here to view the document directly
                  </a>.
                </p>
              </iframe>
            </div>
          </div>

          {/* Statutory Certificates Grid */}
          <div style={{ marginBottom: 'var(--space-4xl)' }}>
            <div className="section-header">
              <h2>Official Statutory Certificates</h2>
              <p>Authenticated legal, tax, and governance documents from the official CKB registry</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-2xl)'
            }}>
              {certificates.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--color-surface)',
                    padding: 'var(--space-lg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border-light)',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'block',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: 'var(--space-xs)' }}>{cert.icon}</div>
                  <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: '2px' }}>{cert.name}</h4>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>{cert.type}</div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    background: 'var(--color-primary-bg)',
                    color: 'var(--color-primary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {cert.badge} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Downloadable Reports Grid */}
          <div className="section-header">
            <h2>Download All Field &amp; Program Reports</h2>
            <p>Direct download access to verified program evaluations and institutional audits</p>
          </div>

          <div className={styles.reportsGrid}>
            {dynamicReportList.map((report, idx) => (
              <div className={styles.reportCard} key={idx} id={`report-card-${idx}`}>
                <span className={styles.reportBadge}>{report.badge}</span>
                <div className={styles.reportIcon}>{report.icon}</div>
                <h3>{report.title}</h3>
                <div className={styles.reportYear}>{report.category}</div>
                <p>{report.description}</p>
                <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'auto' }}>
                  <button
                    className={styles.downloadBtn}
                    style={{ flex: 1, background: 'var(--color-primary-bg)', border: 'none' }}
                    onClick={() => {
                      setSelectedDoc(report);
                      document.getElementById('dynamic-viewer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    👁️ View Above
                  </button>
                  <a
                    href={report.file}
                    download
                    className={styles.downloadBtn}
                    style={{ flex: 1 }}
                    id={`download-btn-${idx}`}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory and Compliance Details */}
          <div className={styles.complianceSection} id="statutory-compliance">
            <h2>Headquarters &amp; Regulatory Jurisdiction</h2>
            <p>
              Chaithanya Kala Bharathi (CKB) is registered under the Societies Registration Act, serving the community
              from Nandyal, Andhra Pradesh since 1992.
            </p>
            <div className={styles.complianceGrid}>
              <div className={styles.complianceItem}>
                <h4>Registration</h4>
                <p>Regd. Society (1992), Nandyal, AP</p>
              </div>
              <div className={styles.complianceItem}>
                <h4>Tax Exemption</h4>
                <p>Sec 12A &amp; 80G Certified, Income Tax Dept.</p>
              </div>
              <div className={styles.complianceItem}>
                <h4>Foreign Grants</h4>
                <p>FCRA Regd. with SBI Sansad Marg New Delhi</p>
              </div>
              <div className={styles.complianceItem}>
                <h4>CSR Approval</h4>
                <p>Registered with Ministry of Corporate Affairs (CSR-1)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
