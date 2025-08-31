import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../helpers/useAuth";
import styles from "./Header.module.css";
import { CodeXml, User, LogOut, Menu, X } from "lucide-react";

export const Header = () => {
  const { authState, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
         {/* <img
            src="pages/bkitLogo.png"
            alt="BKIT Solutions Logo"
            className={styles.logoIcon}
          /> */}
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>BKIT Solutions</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link to="/#team" className={styles.navLink}>
            Our Team
          </Link>
          <Link to="/#services" className={styles.navLink}>
            Services
          </Link>
          <Link to="/#details" className={styles.navLink}>
            Offerings
          </Link>
          <Link to="/#contact" className={styles.navLink}>
            Contact
          </Link>
          <Link to="/jobs" className={styles.navLink}>
            Jobs
          </Link>
          {authState.type === "authenticated" && authState.user.role === "admin" && (
            <Link to="/admin-dashboard" className={styles.navLink}>
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        {/* <div className={styles.actions}>
          {authState.type === "loading" && (
            <div className={styles.loadingPlaceholder}></div>
          )}
          {authState.type === "unauthenticated" && (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              {/* <Button size="sm">Sign Up</Button> */}
            {/* </> */}
          
          {/* {authState.type === "authenticated" && (
            <div className={styles.userActions}>
              <span className={styles.userName}>
                <User size={16} />
                {authState.user.displayName}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          )} */}
        {/* </div> */} 

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div 
              className={styles.mobileOverlay} 
              onClick={closeMobileMenu}
            />
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                <Link to="/#team"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                >
                Our Team
                </Link>
                <Link 
                  to="/#services" 
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
                <Link 
                  to="/#details" 
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  Offerings
                </Link>
                <Link 
                  to="/#contact" 
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
                <Link 
                  to="/jobs" 
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  Jobs
                </Link>
                {authState.type === "authenticated" && authState.user.role === "admin" && (
                  <Link 
                    to="/admin-dashboard" 
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                  >
                    Admin
                  </Link>
                )}
              </nav>

              {/* Mobile Actions */}
              {/* <div className={styles.mobileActions}>
                {authState.type === "loading" && (
                  <div className={styles.loadingPlaceholder}></div>
                )}
                {authState.type === "unauthenticated" && (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                    </Button>
                    {/* <Button size="sm" onClick={closeMobileMenu}>Sign Up</Button> */}
                  {/* </> */}
                {/* )} */}
                {/* {authState.type === "authenticated" && (
                  <div className={styles.mobileUserActions}>
                    <span className={styles.userName}>
                      <User size={16} />
                      {authState.user.displayName}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div> */}
                {/* )} */}
              {/* </div> */}
            </div>
          </>
        )}
      </div>
    </header>
  );
};