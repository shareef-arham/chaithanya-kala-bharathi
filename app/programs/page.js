import Link from 'next/link';
import styles from './programs.module.css';

export const metadata = {
  title: 'Interventions & Programs | Chaithanya Kala Bharathi',
  description: 'Explore the 4 core intervention pillars of CKB: School & Education, Mother & Child Care, Health & Nutrition, and Economic Empowerment in Nandyal, AP.',
};

const programs = [
  {
    title: '🎒 School & Education (Badi Bata)',
    badge: 'Education',
    image: '/hero-education.jpg',
    description: 'Our flagship Badi Bata ("Back to School") drive ensures 100% school enrolment for village children. We run campaigns against child labour, organize Teacher-Parents meetings, distribute books, plates, glasses, and study kits, conduct school sports, advocate "No Stick" child-friendly classrooms, and raise awareness on ChildLine 1098.',
    beneficiaries: 'Thousands of Students Enrolled',
    locations: 'Across Nandyal Schools',
  },
  {
    title: '🤱 Mother & Child Care',
    badge: 'Maternal Welfare',
    image: '/programs-community.jpg',
    description: 'Promoting institutional deliveries to eliminate maternal and infant mortality (MMR/IMR). We conduct regular Mothers Meetings on pre/post-natal care, Breast Feeding Week campaigns, Saamuhika Seemanthalu and Anna Prasana celebrations, Healthy Baby Meets with ICDS anganwadi workers, and Adolescent Week guidance.',
    beneficiaries: 'Pregnant Women & Infants',
    locations: 'Anganwadis & Hamlets',
  },
  {
    title: '🩺 Health & Nutrition Camps',
    badge: 'Healthcare',
    image: '/gallery-volunteer.jpg',
    description: 'Conducting specialized dental and eye checkup camps for school children in fluoride-affected regions of Nandyal. We partner with local Primary Health Centres for infant immunizations, distribute Iron Folic Acid tablets to anemic adolescent girls, and hold Nutrition Week cooking demonstrations.',
    beneficiaries: 'Children & Community Members',
    locations: 'Fluoride-affected Villages',
  },
  {
    title: '🌾 Economic Empowerment & FPOs',
    badge: 'Livelihoods',
    image: '/donate-impact.jpg',
    description: 'Empowering rural women through tailoring, handicraft training, and legal rights awareness under women protection acts. Additionally, CKB promotes Farmer Producer Organisations (FPO), member cooperatives, agricultural value addition, processing, and pool & sale (MSP) market linkages.',
    beneficiaries: 'Women & Smallholder Farmers',
    locations: 'District-wide Cooperatives',
  },
  {
    title: '🤝 HIV-Affected Children Support',
    badge: 'Special Care',
    image: '/about-team.jpg',
    description: 'Dedicated socio-educational and nutritional support for vulnerable children affected or infected by HIV/AIDS. We provide school supplies, nutritional supplements, and psychological counseling to ensure they grow without stigma.',
    beneficiaries: 'Vulnerable Children & Families',
    locations: 'Nandyal & Kurnool',
  },
  {
    title: '🚰 Potable Water & Sanitation',
    badge: 'Infrastructure',
    image: '/hero-education.jpg',
    description: 'Improving access to safe drinking water and hygienic sanitation in rural schools and community centers, specifically targeting fluoride-affected zones to protect children from dental and skeletal fluorosis.',
    beneficiaries: 'Rural School Children',
    locations: 'Targeted Gram Panchayats',
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="page-hero" id="programs-hero">
        <div className="container">
          <h1>CKB Core Interventions</h1>
          <p>Comprehensive grassroots programs designed for sustainable community transformation in Nandyal</p>
        </div>
      </section>

      <section className="section" id="programs-list">
        <div className={styles.programsGrid}>
          {programs.map((program, index) => (
            <div className={styles.programCardFull} key={index} id={`program-card-${index}`}>
              <div className={styles.programImage}>
                <img src={program.image} alt={program.title} />
                <span className={styles.programBadge}>{program.badge}</span>
              </div>
              <div className={styles.programBody}>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className={styles.programMeta}>
                  <div className={styles.metaItem}>
                    <span>👥</span>
                    <span>{program.beneficiaries}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span>📍</span>
                    <span>{program.locations}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.impactSection} id="programs-impact">
        <div className={styles.impactGrid}>
          <div className={styles.impactCard}>
            <div className={styles.impactNumber}>1992</div>
            <div className={styles.impactLabel}>Serving Since</div>
          </div>
          <div className={styles.impactCard}>
            <div className={styles.impactNumber}>100%</div>
            <div className={styles.impactLabel}>Grassroots Focus</div>
          </div>
          <div className={styles.impactCard}>
            <div className={styles.impactNumber}>30+</div>
            <div className={styles.impactLabel}>Years of Experience</div>
          </div>
          <div className={styles.impactCard}>
            <div className={styles.impactNumber}>4</div>
            <div className={styles.impactLabel}>Key Intervention Pillars</div>
          </div>
        </div>
      </section>
    </>
  );
}
