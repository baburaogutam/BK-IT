import React from "react";
import { Helmet } from "react-helmet";
import styles from "./_index.module.css";
import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { ServicesSection } from "../components/ServicesSection";
import { DetailedServicesSection } from "../components/DetailedServicesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { PartnersSection } from "../components/PartnersSection";
import { ContactSection } from "../components/ContactSection";
import { Separator } from "../components/Separator";

export default function IndexPage() {
  return (
    <>
      <Helmet>
        <title>BKIT Solutions | Next-Gen IT Training & Solutions</title>
        <meta
          name="description"
          content="BKIT Solutions offers premier college and corporate training, placement support, and custom IT solutions to build the next generation of developers in India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className={styles.pageContainer}>
        <HeroSection />
        <main className={styles.mainContent}>
          <StatsSection />
          <Separator className={styles.separator} />
          <ServicesSection />
          <Separator className={styles.separator} />
          <DetailedServicesSection />
          <Separator className={styles.separator} />
          <TestimonialsSection />
          <Separator className={styles.separator} />
          <PartnersSection />
          <Separator className={styles.separator} />
          <ContactSection />
        </main>
      </div>
    </>
  );
}