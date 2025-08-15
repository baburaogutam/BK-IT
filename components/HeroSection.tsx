import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import styles from "./HeroSection.module.css";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            <span className={styles.gradientText}>Building the Next Generation</span>
            <br />
            of India's Tech Leaders
          </h1>
          {/* <h1 className={styles.headline}>
            <span className={styles.gradientText}>We Train. We Place. We Build.<br/> Your Success Starts Here.

            </span>
          </h1> */}
           <p className={styles.subheadline}>
            BKIT Solutions is a dynamic organization dedicated to empowering
            students and institutions through innovative IT training and
            solutions.
          </p>
          {/* <p className={styles.subheadline}>
            BKIT Solutions transforms potential into performance—delivering future-ready IT talent, innovative solutions, and lasting impact for students and institutions alike.
          </p> */}
          <div className={styles.actions}>
            <Button asChild size="lg">
              <Link to="/#contact">
                Get in Touch <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/#services">Explore Services</Link>
            </Button>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <img
               //src="./pages/bkitMainImage3.png"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="A team of young Indian professionals collaborating in a modern office."
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
          {/* <div className={styles.floatingStats}>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>15K+</span>
              <span className={styles.statLabel}>Students</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNumber}>95%</span>
              <span className={styles.statLabel}>Success Rate</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};