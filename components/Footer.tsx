import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { CodeXml, Mail, Phone, Globe } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.about}>
            <Link to="/" className={styles.logo}>
             {/* <img
                src="pages/bkitLogo.png"
                alt="BKIT Solutions Logo"
                className={styles.logoIcon}
                       /> */}
              <div className={styles.logoIcon}></div>         
              <span className={styles.logoText}>BKIT Solutions</span>
            </Link>
            <p className={styles.description}>
              Empowering students and institutions through innovative training
              programs and IT solutions.
            </p>
          </div>
          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Services</h3>
              <Link to="/#services" className={styles.link}>
                Corporate Training
              </Link>
              <Link to="/#services" className={styles.link}>
                Placement Support
              </Link>
              <Link to="/#services" className={styles.link}>
                Industry Connects
              </Link>
              <Link to="/#services" className={styles.link}>
                IT Solutions
              </Link>
            </div>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Contact Us</h3>
              <a
                href="mailto:bkitsolutions1000cr@gmail.com"
                className={styles.link}
              >
                <Mail size={16} />
                <span>info@bkitsolutions.in</span>
              </a>
              <a href="tel:+918121034516" className={styles.link}>
                <Phone size={16} />
                <span>+91 8121034516</span>
              </a>
              <a
                href="https://bkitsolutions.in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <Globe size={16} />
                <span>bkitsolutions.in</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 BKIT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
