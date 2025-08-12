import React from "react";
import styles from "./ServicesSection.module.css";
import {
  GraduationCap,
  Briefcase,
  Network,
  Code,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "College & Corporate Trainings",
    description:
      "Upskilling students and professionals with industry-relevant technologies.",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    description:
      "Connecting talented graduates with top hiring partners for rewarding careers.",
  },
  {
    icon: Network,
    title: "Industry Connects",
    description:
      "Bridging the gap between academia and industry through events and partnerships.",
  },
  {
    icon: Code,
    title: "IT Solutions",
    description:
      "Delivering custom software, web, and mobile solutions for businesses.",
  },
];

interface ServiceCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <div className={styles.card}>
    <div className={styles.iconWrapper}>
      <Icon size={28} className={styles.icon} />
    </div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
  </div>
);

export const ServicesSection = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Core Services</h2>
          <p className={styles.subtitle}>
            We provide a comprehensive suite of services to foster growth for
            individuals and organizations.
          </p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};