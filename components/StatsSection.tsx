import React, { useEffect, useRef, useState } from "react";
import styles from "./StatsSection.module.css";
import { Users, Building, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "Students Trained" },
  { icon: Building, value: 500, suffix: "+", label: "Corporate Clients" },
  { icon: Award, value: 95, suffix: "%", label: "Placement Success" },
  { icon: TrendingUp, value: 200, suffix: "+", label: "College Partners" },
];

const Counter = ({ end, suffix, isVisible }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(end / 60));

    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setCount(current);
    }, duration / 60);

    return () => clearInterval(interval);
  }, [end, isVisible]);

  return (
    <span className={styles.value}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref}  id="about" className={styles.statsSection}>
      {/* =========================
         Top Context
      ========================= */}
      <div className={styles.statsIntro}>
        <h2 className={styles.statsTitle}>
          Proven Impact. Measurable Outcomes.
        </h2>
        <p className={styles.statsSubtitle}>
          BKIT Solutions has been empowering students, institutions, and
          organizations through outcome-driven training, strong industry
          partnerships, and placement-focused programs.
        </p>
      </div>

      {/* =========================
         Stats Band (UNCHANGED)
      ========================= */}
      <div className={styles.statsBand}>
        <div className={styles.container}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={styles.statItem}>
                <Icon className={styles.icon} />
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  isVisible={visible}
                />
                <span className={styles.label}>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================
         Bottom Context
      ========================= */}
      <div className={styles.statsOutro}>
        <p>
          These numbers reflect our long-term commitment to building
          industry-ready talent, fostering academic collaborations, and
          delivering real-world impact at scale.
        </p>
      </div>
    </section>
  );
};
