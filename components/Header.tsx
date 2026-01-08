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
          <Link to="/#programs" className={styles.navLink}>
            Programs
          </Link>
          <Link to="/#solutions" className={styles.navLink}>
            Solutions
          </Link>
          <Link to="/#partners" className={styles.navLink}>
            Partners
          </Link>
          <Link to="/#about" className={styles.navLink}>
            About
          </Link>
          <Link to="/careers" className={styles.navLink}>
            Careers
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/#contact">Contact Us</Link>
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
                <Link to="/#programs" onClick={closeMobileMenu}>Programs</Link>
                <Link to="/#solutions" onClick={closeMobileMenu}>Solutions</Link>
                <Link to="/#partners" onClick={closeMobileMenu}>Partners</Link>
                <Link to="/#about" onClick={closeMobileMenu}>About</Link>
                <Link to="/careers" onClick={closeMobileMenu}>Careers</Link>
              </nav>

              <div className={styles.mobileActions}>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/#contact" onClick={closeMobileMenu}>Contact Us</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
