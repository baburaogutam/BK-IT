import React, { useState, useEffect, useRef } from "react";
import styles from "./StatsSection.module.css";
import { TrendingUp, Users, Award, Building } from "lucide-react";

const stats = [
  { id: 1, icon: Users, value: 15000, suffix: "+", label: "Students Trained", description: "Across various programs and courses" },
  { id: 2, icon: Building, value: 500, suffix: "+", label: "Corporate Clients", description: "Leading companies trust our training" },
  { id: 3, icon: Award, value: 95, suffix: "%", label: "Placement Success", description: "Students placed in top companies" },
  { id: 4, icon: TrendingUp, value: 200, suffix: "+", label: "College Partners", description: "Academic institutions we collaborate with" }
];

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  isVisible: boolean;
}

const Counter = ({ end, duration = 2000, suffix = "", isVisible }: CounterProps) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;

      const progress = Math.min((time - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [end, duration, isVisible]);

  return (
    <span className={styles.counterValue}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

interface StatCardProps {
  stat: typeof stats[0];
  index: number;
  isVisible: boolean;
}

const StatCard = ({ stat, index, isVisible }: StatCardProps) => {
  const Icon = stat.icon;
  return (
    <div className={styles.statCard} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={styles.iconContainer}>
        <Icon size={32} className={styles.statIcon} />
      </div>
      <div className={styles.statContent}>
        <div className={styles.statValue}>
          <Counter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
        </div>
        <h3 className={styles.statLabel}>{stat.label}</h3>
        <p className={styles.statDescription}>{stat.description}</p>
      </div>
    </div>
  );
};

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after first trigger
        }
      },
      { threshold: 0 } // Trigger as soon as it enters viewport
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Impact in Numbers</h2>
          <p className={styles.subtitle}>
            Measurable results that demonstrate our commitment to excellence 
            in IT training and placement services.
          </p>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};
