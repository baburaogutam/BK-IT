import React from "react";
import styles from "./PartnersSection.module.css";
import { Badge } from "./Badge";

const partners = [
  {
    name: "Tata Consultancy Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg",
    category: "Platinum Partner",
    type: "hiring"
  },
  {
    name: "Infosys",
    logo: "https://naf.org/wp-content/uploads/2024/05/infosys-logo-png.png",
    category: "Gold Partner",
    type: "hiring"
  },
  {
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/640px-Wipro_Primary_Logo_Color_RGB.svg.png",
    category: "Gold Partner", 
    type: "hiring"
  },
  {
    name: "HCL Technologies",
    logo: "https://1000logos.net/wp-content/uploads/2023/03/HCL-logo.jpg",
    category: "Silver Partner",
    type: "hiring"
  },
  {
    name: "Tech Mahindra",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tech_Mahindra_New_Logo.svg",
    category: "Silver Partner",
    type: "hiring"
  },
  {
    name: "Cognizant",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg",
    category: "Silver Partner",
    type: "hiring"
  },
  {
    name: "Microsoft",
    logo: "https://1000logos.net/wp-content/uploads/2023/01/Microsoft-Azure-logo.png",
    category: "Technology Partner",
    type: "technology"
  },
  {
    name: "Amazon Web Services",
    logo: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png",
    category: "Cloud Partner",
    type: "technology"
  },
  {
    name: "Google Cloud",
    logo: "https://logos-world.net/wp-content/uploads/2021/02/Google-Cloud-Logo.png",
    category: "Cloud Partner",
    type: "technology"
  },
  {
    name: "VIT University",
    logo: "https://findlogovector.com/wp-content/uploads/2022/05/vellore-institute-of-technology-vit-logo-vector-2022.png",
    category: "Academic Partner",
    type: "academic"
  },
  {
    name: "SRM University",
    logo: "https://images.seeklogo.com/logo-png/38/1/srm-institute-of-science-and-technology-logo-png_seeklogo-381994.png",
    category: "Academic Partner",
    type: "academic"
  },
  {
    name: "KL University",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/KL_University_logo.svg/375px-KL_University_logo.svg.png",
    category: "Academic Partner",
    type: "academic"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Platinum Partner': return 'default';
    case 'Gold Partner': return 'warning';
    case 'Silver Partner': return 'outline';
    case 'Technology Partner': return 'secondary';
    case 'Cloud Partner': return 'secondary';
    case 'Academic Partner': return 'success';
    default: return 'outline';
  }
};

interface PartnerCardProps {
  partner: typeof partners[0];
  index: number;
}

const PartnerCard = ({ partner, index }: PartnerCardProps) => (
  <div 
    className={styles.partnerCard}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className={styles.logoContainer}>
      <img 
        src={partner.logo} 
        alt={`${partner.name} logo`}
        className={styles.partnerLogo}
        
      />
    </div>
    <div className={styles.partnerInfo}>
      <h3 className={styles.partnerName}>{partner.name}</h3>
      <Badge variant={getCategoryColor(partner.category) as any} className={styles.categoryBadge}>
        {partner.category}
      </Badge>
    </div>
  </div>
);

export const PartnersSection = () => {
  const hiringPartners = partners.filter(p => p.type === 'hiring');
  const technologyPartners = partners.filter(p => p.type === 'technology');
  const academicPartners = partners.filter(p => p.type === 'academic');

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Trusted Partners</h2>
          <p className={styles.subtitle}>
            We collaborate with leading companies and institutions to provide 
            the best opportunities and training for our students.
          </p>
        </div>

        <div className={styles.partnerCategories}>
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>🤝</span>
              Hiring Partners
            </h3>
            <div className={styles.partnersGrid}>
              {hiringPartners.map((partner, index) => (
                <PartnerCard key={partner.name} partner={partner} index={index} />
              ))}
            </div>
          </div>

          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>⚡</span>
              Technology Partners
            </h3>
            <div className={styles.partnersGrid}>
              {technologyPartners.map((partner, index) => (
                <PartnerCard key={partner.name} partner={partner} index={index} />
              ))}
            </div>
          </div>

          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>🎓</span>
              Academic Partners
            </h3>
            <div className={styles.partnersGrid}>
              {academicPartners.map((partner, index) => (
                <PartnerCard key={partner.name} partner={partner} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.partnershipCTA}>
          <h3 className={styles.ctaTitle}>Hire From Us</h3>
          <p className={styles.ctaDescription}>
            Tap into our pool of skilled, job-ready talent and empower your organization with the next generation of tech professionals.
          </p>
        </div>
      </div>
    </section>
  );
};