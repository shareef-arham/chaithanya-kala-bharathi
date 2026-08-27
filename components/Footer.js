import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <h3>Chaithanya Kala Bharathi</h3>
          <p>
            Established in 1992 in Nandyal, Andhra Pradesh. Dedicated to empowering
            vulnerable communities, tribal groups, Dalits, women, and children through
            education, health, child rights, and sustainable livelihoods.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Facebook" id="footer-facebook">📘</a>
            <a href="#" className={styles.socialLink} aria-label="Twitter" id="footer-twitter">🐦</a>
            <a href="#" className={styles.socialLink} aria-label="Instagram" id="footer-instagram">📷</a>
            <a href="#" className={styles.socialLink} aria-label="YouTube" id="footer-youtube">▶️</a>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/about">About Us & Legal Status</Link></li>
            <li><Link href="/programs">Interventions & Programs</Link></li>
            <li><Link href="/gallery">Gallery & Impact</Link></li>
            <li><Link href="/reports">Reports & Audits</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Interventions</h4>
          <ul>
            <li><Link href="/programs">School & Education (Badi Bata)</Link></li>
            <li><Link href="/programs">Mother & Child Health</Link></li>
            <li><Link href="/programs">Health & Nutrition</Link></li>
            <li><Link href="/programs">Economic Empowerment & FPO</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Official Contact</h4>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span>📍</span>
              <span>D.No. 29/178-22H, S.B.I. Colony, Opp. Ramalayam Temple, Nandyal - 518 501, Andhra Pradesh</span>
            </div>
            <div className={styles.contactItem}>
              <span>📧</span>
              <span>ckb_ndl@yahoo.com</span>
            </div>
            <div className={styles.contactItem}>
              <span>📞</span>
              <span>+91 9440464877</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Chaithanya Kala Bharathi (CKB). All rights reserved. Registered NGO.</p>
        <p>
          Regd. with 12A, 80G, CSR & FCRA | Nandyal, AP
        </p>
      </div>
    </footer>
  );
}
