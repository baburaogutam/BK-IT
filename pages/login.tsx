import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PasswordLoginForm } from "../components/PasswordLoginForm";
import styles from "./login.module.css";
import { CodeXml } from "lucide-react";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Login | BKIT Solutions</title>
        <meta name="description" content="Admin login page for BKIT Solutions." />
      </Helmet>
      <div className={styles.page}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <Link to="/" className={styles.logo}>
              <CodeXml size={32} className={styles.logoIcon} />
            </Link>
            <h1 className={styles.title}>Admin Login</h1>
            <p className={styles.subtitle}>
              Access the BKIT Solutions dashboard.
            </p>
          </div>
          <PasswordLoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;