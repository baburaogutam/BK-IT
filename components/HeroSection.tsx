import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import styles from "./HeroSection.module.css";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.background} />

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>College & Industry Enablement</span>

          <h1 className={styles.headline}>
            Building <span>Industry-Ready Talent</span>
            <br />
            for India’s Future
          </h1>

          <p className={styles.subheadline}>
            BKIT Solutions partners with colleges to transform students into
            skilled professionals through outcome-driven training, real-world
            exposure, and placement-focused programs.
          </p>

          <div className={styles.actions}>
            <Button size="lg" asChild>
              <Link to="/#contact">
                Partner With Us <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/#programs">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
