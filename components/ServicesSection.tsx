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
    title: "College & Corporate Training",
    description:
      "Outcome-driven programs designed to build industry-ready skills for students and professionals.",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    description:
      "Structured placement assistance connecting graduates with top recruiters and hiring partners.",
  },
  {
    icon: Network,
    title: "Industry Connects",
    description:
      "Strong industry-academia collaboration through expert sessions, events, and partnerships.",
  },
  {
    icon: Code,
    title: "IT Solutions",
    description:
      "Custom software, web, and mobile solutions tailored to business and institutional needs.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Our Core Services</h2>
          <p className={styles.subtitle}>
            Comprehensive solutions designed to empower students, institutions,
            and organizations.
          </p>
        </header>

        <div className={styles.servicesGrid}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
