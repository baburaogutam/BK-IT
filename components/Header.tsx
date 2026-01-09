import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../helpers/useAuth";
import styles from "./Header.module.css";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { authState } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <div className={styles.logoIcon} />
          <span className={styles.logoText}>BKIT Solutions</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link to="/#about" className={styles.navLink}>About Us</Link>
          <Link to="/#services" className={styles.navLink}>Services</Link>
          <Link to="/#partners" className={styles.navLink}>Partners</Link>
          <Link to="/#testimonials" className={styles.navLink}>Testimonials</Link>
          <Link to="/#contact" className={styles.navLink}>Contact</Link>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/#">LMS</Link>
          </Button>

          {/* Increased padding on desktop */}
          <Button size="md" asChild>
            <Link to="/#">Job Portal</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div className={styles.mobileOverlay} onClick={closeMobileMenu} />

            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                <Link to="/#about" onClick={closeMobileMenu}>About Us</Link>
                <Link to="/#services" onClick={closeMobileMenu}>Services</Link>
                <Link to="/#partners" onClick={closeMobileMenu}>Partners</Link>
                <Link to="/#testimonials" onClick={closeMobileMenu}>Testimonials</Link>
                <Link to="/#contact" onClick={closeMobileMenu}>Contact</Link>
              </nav>

              {/* Bigger buttons on mobile */}
              <div className={styles.mobileActions}>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/#" onClick={closeMobileMenu}>LMS</Link>
                </Button>

                <Button size="lg" asChild>
                  <Link to="/#" onClick={closeMobileMenu}>Job Portal</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
