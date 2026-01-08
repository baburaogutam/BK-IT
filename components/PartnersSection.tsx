import React from "react";
import styles from "./PartnersSection.module.css";
import { Badge } from "./Badge";

const partners = [
  // Hiring + Tech (carousel)
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg", type: "carousel" },
  { name: "Infosys", logo: "https://naf.org/wp-content/uploads/2024/05/infosys-logo-png.png", type: "carousel" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/640px-Wipro_Primary_Logo_Color_RGB.svg.png", type: "carousel" },
  { name: "HCL", logo: "https://1000logos.net/wp-content/uploads/2023/03/HCL-logo.jpg", type: "carousel" },
  { name: "Tech Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tech_Mahindra_New_Logo.svg", type: "carousel" },
  { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg", type: "carousel" },
  { name: "AWS", logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png", type: "carousel" },
  { name: "Google Cloud", logo: "https://logos-world.net/wp-content/uploads/2021/02/Google-Cloud-Logo.png", type: "carousel" },
  { name: "Microsoft Azure", logo: "https://1000logos.net/wp-content/uploads/2023/01/Microsoft-Azure-logo.png", type: "carousel" },

  // Academic (grid)
  { name: "Sri Indhu Engineering College", logo: "https://cdn.universitykart.com//Content/upload/admin/ffp1xy2s.hyj.jpeg", type: "academic" },
  { name: "St. Mary’s Engineering College", logo: "https://image-static.collegedunia.com/public/college_data/images/logos/1560227941logo.png", type: "academic" },
  { name: "Chadalawada Engineering College", logo: "https://crectirupati.ac.in/wp-content/uploads/2021/09/CREC-1.jpg", type: "academic" },
  { name: "Vemu Institute of Technology", logo: "https://cdn.universitykart.com//Content/upload/admin/ojqijync.4wz.jpg", type: "academic" },
  { name: "Shanthiram Engineering College", logo: "https://www.srecnandyal.edu.in/images/sreclogo.jpg", type: "academic" },
  { name: "RGM College", logo: "https://cdn.universitykart.com//Content/upload/admin/3lfqctwx.d5f.jpg", type: "academic" },
];

export const PartnersSection = () => {
  const carouselPartners = partners.filter(p => p.type === "carousel");
  const academicPartners = partners.filter(p => p.type === "academic");

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 className={styles.title}>Our Trusted Partners</h2>
          <p className={styles.subtitle}>
            Industry leaders and academic institutions powering outcomes, placements, and innovation.
          </p>
        </header>

        {/* Unified Carousel */}
        <h3 className={styles.sectionTitle}>Hiring & Technology Partners</h3>

        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack}>
            {[...carouselPartners, ...carouselPartners].map((partner, i) => (
              <div key={i} className={styles.carouselItem}>
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Academic Partners */}
        <h3 className={styles.sectionTitle}>Academic Partners</h3>

        <div className={styles.academicGrid}>
          {academicPartners.map(partner => (
            <div key={partner.name} className={styles.academicCard}>
              <img src={partner.logo} alt={partner.name} />
              <h4>{partner.name}</h4>
              <Badge variant="success">Academic Partner</Badge>
            </div>
          ))}
        </div>

        {/* CTA */}
       <div className={styles.hireCTA}>
  <div className={styles.hireInner}>
    <h3 className={styles.hireTitle}>Hire From BKIT Solutions</h3>
    <p className={styles.hireDescription}>
      Access a pool of job-ready, industry-trained professionals equipped with
      real-world skills and proven competencies.
    </p>

    <div className={styles.hireActions}>
      <a href="/contact" className={styles.primaryBtn}>
        Partner With Us →
      </a>
      <a href="/programs" className={styles.secondaryBtn}>
        Explore Talent
      </a>
    </div>
  </div>
</div>

    </section>
  );
};
