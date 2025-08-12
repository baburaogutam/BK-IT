import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className={`${styles.layout} ${className || ""}`}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};