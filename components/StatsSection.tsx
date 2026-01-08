import React, { useEffect, useRef, useState } from "react";
import styles from "./StatsSection.module.css";
import { Users, Building, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "Students Trained" },
  { icon: Building, value: 500, suffix: "+", label: "Corporate Clients" },
  { icon: Award, value: 95, suffix: "%", label: "Placement Success" },
  { icon: TrendingUp, value: 200, suffix: "+", label: "College Partners" }
];

const Counter = ({ end, suffix, isVisible }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(end / 60));

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
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
    <section ref={ref} className={styles.statsBand}>
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
    </section>
  );
};
