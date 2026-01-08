import React from "react";
import styles from "./DetailedServicesSection.module.css";
import {
  Target,
  Users,
  Briefcase,
  Layers,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Outcome-Driven Training Model",
    description:
      "Our programs are designed with measurable outcomes, ensuring students gain job-ready skills aligned with industry needs.",
  },
  {
    icon: Users,
    title: "Strong Academic Partnerships",
    description:
      "We collaborate closely with colleges to complement academic learning with real-world exposure and skill development.",
  },
  {
    icon: Briefcase,
    title: "Placement-Focused Approach",
    description:
      "From aptitude training to interview readiness, our structured process maximizes placement success.",
  },
  {
    icon: Layers,
    title: "Customized Learning Programs",
    description:
      "Tailor-made training modules for colleges, corporates, and institutions based on specific requirements.",
  },
  {
    icon: Rocket,
    title: "Industry Exposure & Live Projects",
    description:
      "Students gain hands-on experience through industry projects, hackathons, and expert-led sessions.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Institutions & Employers",
    description:
      "Our credibility is built on long-term partnerships with colleges and corporate hiring partners.",
  },
];

export const WhatWeOfferSection = () => {
  return (
    <section id="details" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>What We Offer</h2>
          <p className={styles.subtitle}>
            A closer look at how BKIT Solutions empowers students, institutions,
            and industry partners.
          </p>
        </header>

        <div className={styles.grid}>
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={styles.featureCard}>
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                  <p className={styles.featureDescription}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
