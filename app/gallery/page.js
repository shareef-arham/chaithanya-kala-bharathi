'use client';

import { useState } from 'react';
import styles from './gallery.module.css';

const galleryDocuments = [
  {
    id: 'ourgallery',
    title: 'Official Photo Gallery Report',
    category: 'Complete Photo Archive',
    icon: '📸',
    badge: 'Flagship Document',
    file: '/ourgallery.pdf',
    description: 'The complete official photographic archive of Chaithanya Kala Bharathi directly from ckbndl.org/OurGallery — covering rural schools, health camps, volunteer distribution drives, and community gatherings.',
    source: 'https://www.ckbndl.org/OurGallery',
  },
  {
    id: 'school-education',
    title: 'School & Education Photo Report',
    category: 'Education & Literacy',
    icon: '🎒',
    badge: 'Badi Bata Photos',
    file: '/reports/SchoolEducation.pdf',
    description: 'Photo documentation and program summary of the Badi Bata ("Back to School") enrolment drives, student study material distribution, school sports, and child rights rallies.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/SchoolEducation.pdf',
  },
  {
    id: 'health-nutrition',
    title: 'Health & Nutrition Camp Photos',
    category: 'Healthcare & Fluorosis',
    icon: '🩺',
    badge: 'Medical Outreach',
    file: '/reports/HealthNutrition.pdf',
    description: 'Visual report of student dental and eye checkup camps in fluoride-affected villages, adolescent menstrual hygiene drives, and community nutrition cooking demonstrations.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/HealthNutrition.pdf',
  },
  {
    id: 'economic-empowerment',
    title: 'Women & Livelihood Training Report',
    category: 'Economic Empowerment',
    icon: '🌾',
    badge: 'Self-Reliance',
    file: '/reports/EconomicEmpowerment.pdf',
    description: 'Photographs of tailoring workshops, handicraft training centers, and Farmer Producer Organisation (FPO) value addition and cooperative activities.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/EconomicEmpowerment.pdf',
  },
  {
    id: 'community-welfare',
    title: 'Community Welfare & Mother Care',
    category: 'Community Outreach',
    icon: '🤝',
    badge: 'Maternal Welfare',
    file: '/reports/CommunityWelfare.pdf',
    description: 'Field activity photos covering Breast Feeding Week celebrations, Saamuhika Seemanthalu, Healthy Baby Meets with Anganwadi ICDS workers, and village support.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/CommunityWelfare.pdf',
  },
  {
    id: 'org-profile',
    title: 'Organization Profile & 30-Year Journey',
    category: 'Institutional Report',
    icon: '🏢',
    badge: 'Since 1992',
    file: '/reports/OrganizationProfile.pdf',
    description: 'Comprehensive institutional dossier and historical photo review of Chaithanya Kala Bharathi’s 30+ years of social service across Andhra Pradesh.',
    source: 'https://ckbndl.s3.us-east-1.amazonaws.com/OrganizationProfile.pdf',
  },
];

const visualStories = [
  {
    title: 'Badi Bata ("Back to School") Enrolments',
    category: 'Education',
    img: '/hero-education.jpg',
    desc: 'Mobilizing rural communities, school teachers, and Anganwadi workers to ensure every school-age child enters the formal education system.',
    docIndex: 1,
  },
  {
    title: 'Women\'s Skill & Tailoring Workshops',
    category: 'Livelihoods',
    img: '/programs-community.jpg',
    desc: 'Vocational training sessions enabling rural women to generate steady household income through garment making and crafts.',
    docIndex: 3,
  },
  {
    title: 'Community Book & Supply Distributions',
    category: 'School Support',
    img: '/gallery-volunteer.jpg',
    desc: 'Distribution of school bags, notebooks, plates, glasses, and uniforms to economically underprivileged students in Nandyal.',
    docIndex: 0,
  },
];

export default function GalleryPage() {
  const [selectedDoc, setSelectedDoc] = useState(galleryDocuments[0]);

  return (
    <>
      <section className="page-hero" id="gallery-hero">
        <div className="container">
          <h1>Official Gallery &amp; Field Reports</h1>
          <p>
            Direct access to all visual reports and photo documentation archives from{' '}
            <strong>ckbndl.org/OurGallery</strong>
          </p>
        </div>
      </section>

      <section className="section" id="gallery-hub">
        <div className={styles.galleryContainer}>
          {/* Category Filter Tabs */}
          <div className={styles.galleryTabs}>
            {galleryDocuments.map((doc) => (
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

          {/* Embedded Interactive PDF & Report Viewer */}
          <div className={styles.pdfViewerCard} id="document-viewer">
            <div className={styles.pdfHeader}>
              <div className={styles.pdfTitle}>
                <h3>{selectedDoc.icon} {selectedDoc.title}</h3>
                <p>{selectedDoc.description}</p>
              </div>
              <div className={styles.pdfActions}>
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

            <div className={styles.pdfFrameContainer}>
              <iframe
                src={`${selectedDoc.file}#toolbar=1&view=FitH`}
                title={selectedDoc.title}
                className={styles.pdfFrame}
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

          {/* Visual Highlights Grid with direct links */}
          <div className="section-header">
            <h2>Intervention Highlights &amp; Field Stories</h2>
            <p>Key moments of community upliftment captured across our project villages</p>
          </div>

          <div className={styles.highlightsGrid}>
            {visualStories.map((story, idx) => (
              <div className={styles.highlightCard} key={idx}>
                <div className={styles.highlightImg}>
                  <img src={story.img} alt={story.title} />
                  <span className={styles.highlightBadge}>{story.category}</span>
                </div>
                <div className={styles.highlightBody}>
                  <h4>{story.title}</h4>
                  <p>{story.desc}</p>
                  <button
                    className={styles.openDocBtn}
                    onClick={() => {
                      setSelectedDoc(galleryDocuments[story.docIndex]);
                      document.getElementById('document-viewer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    📄 View Full Photo Report →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Source Attribution Notice */}
          <div style={{
            background: 'var(--color-bg-alt)',
            padding: 'var(--space-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-light)',
            textAlign: 'center',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-light)'
          }}>
            <strong>📌 Data &amp; Archive Source:</strong> All reports and photo records on this page are authenticated
            records of Chaithanya Kala Bharathi (CKB), archived directly from the official portal at{' '}
            <a href="https://www.ckbndl.org/OurGallery" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              ckbndl.org/OurGallery
            </a>.
          </div>
        </div>
      </section>
    </>
  );
}
