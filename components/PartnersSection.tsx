import React from "react";
import styles from "./PartnersSection.module.css";
import { Badge } from "./Badge";

const partners = [
  // Hiring
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg", type: "hiring" },
  { name: "Infosys", logo: "https://naf.org/wp-content/uploads/2024/05/infosys-logo-png.png", type: "hiring" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg", type: "hiring" },
  { name: "HCL", logo: "https://1000logos.net/wp-content/uploads/2023/03/HCL-logo.jpg", type: "hiring" },
  { name: "Tech Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tech_Mahindra_New_Logo.svg", type: "hiring" },
  { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg", type: "hiring" },

  // Technology
  { name: "Microsoft", logo: "https://1000logos.net/wp-content/uploads/2023/01/Microsoft-Azure-logo.png", type: "technology" },
  { name: "AWS", logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png", type: "technology" },
  { name: "Google Cloud", logo: "https://logos-world.net/wp-content/uploads/2021/02/Google-Cloud-Logo.png", type: "technology" },

  // Academic
  { name: "Sri Indhu Engineering College", logo: "https://cdn.universitykart.com//Content/upload/admin/ffp1xy2s.hyj.jpeg", type: "academic" },
  { name: "St. Mary’s Engineering College", logo: "https://image-static.collegedunia.com/public/college_data/images/logos/1560227941logo.png", type: "academic" },
  { name: "Chadalawada Engineering College", logo: "https://crectirupati.ac.in/wp-content/uploads/2021/09/CREC-1.jpg", type: "academic" },
  { name: "Vemu Institute of Technology", logo: "https://cdn.universitykart.com//Content/upload/admin/ojqijync.4wz.jpg", type: "academic" },
  { name: "Shanthiram Engineering College", logo: "https://www.srecnandyal.edu.in/images/sreclogo.jpg", type: "academic" },
  { name: "RGM College", logo: "https://cdn.universitykart.com//Content/upload/admin/3lfqctwx.d5f.jpg", type: "academic" },
];

export const PartnersSection = () => {
  const hiring = partners.filter(p => p.type === "hiring");
  const technology = partners.filter(p => p.type === "technology");
  const academic = partners.filter(p => p.type === "academic");

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Our Trusted Partners</h2>
          <p className={styles.subtitle}>
            Strong collaborations that power placements, innovation, and industry-ready talent.
          </p>
        </header>

        {/* Hiring Partners */}
        <div className={styles.carouselSection}>
          <h3 className={styles.sectionTitle}>🤝 Hiring Partners</h3>
          <div className={styles.carousel}>
            <div className={styles.track}>
              {[...hiring, ...hiring].map((p, i) => (
                <div key={i} className={styles.logoCard}>
                  <img src={p.logo} alt={p.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Partners */}
        <div className={styles.carouselSection}>
          <h3 className={styles.sectionTitle}>⚡ Technology Partners</h3>
          <div className={styles.carousel}>
            <div className={`${styles.track} ${styles.slow}`}>
              {[...technology, ...technology].map((p, i) => (
                <div key={i} className={styles.logoCard}>
                  <img src={p.logo} alt={p.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Partners */}
        <div className={styles.academicSection}>
          <h3 className={styles.sectionTitle}>🎓 Academic Partners</h3>
          <div className={styles.academicGrid}>
            {academic.map(p => (
              <div key={p.name} className={styles.academicCard}>
                <img src={p.logo} alt={p.name} />
                <h4>{p.name}</h4>
                <Badge variant="success">Academic Partner</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h3>Hire From BKIT Solutions</h3>
          <p>
            Access a pool of job-ready, industry-trained professionals equipped
            with real-world skills and proven competencies.
          </p>
        </div>
      </div>
    </section>
  );
};
