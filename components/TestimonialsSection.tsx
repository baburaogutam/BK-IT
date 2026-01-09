import React from "react";
import styles from "./TestimonialsSection.module.css";
import { Avatar, AvatarFallback } from "./Avatar";

const testimonials = [
  {
    id: 1,
    name: "Praneeth",
    role: "Software Engineer",
    company: "Google",
    type: "student",
    content:
      "BKIT Solutions transformed my career trajectory. Their structured training and placement support helped me confidently land my first role.",
  },
  {
    id: 2,
    name: "Dr Yaswanth",
    role: "Dean – CDC",
    company: "Vemu Engineering College",
    type: "college",
    content:
      "BKIT Solutions has significantly improved our students’ industry readiness with measurable placement success.",
  },
  {
    id: 3,
    name: "Tanushree D",
    role: "Senior Manager – HR",
    company: "PRM360",
    type: "corporate",
    content:
      "Well-structured and impactful corporate training programs that delivered real productivity gains.",
  },
  {
    id: 4,
    name: "Nikhil Sapa",
    role: "Full Stack Developer",
    company: "Value Momentum",
    type: "student",
    content:
      "The real-world projects and interview preparation gave me confidence and clarity during placements.",
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Dean of Engineering",
    company: "RGM College",
    type: "college",
    content:
      "Industry connect programs and hackathons created genuine exposure and opportunities for students.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "HCL Technologies",
    type: "corporate",
    content:
      "A reliable long-term partner balancing theory with strong practical application.",
  },
];

const getTypeLabel = (type: string) => {
  if (type === "student") return "Student Success";
  if (type === "college") return "Academic Partner";
  return "Corporate Partner";
};

export const TestimonialsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Trusted by Students, Colleges & Corporates</h2>
          <p>
            Honest experiences from learners, institutions, and industry partners
            who achieved measurable outcomes with BKIT Solutions.
          </p>
        </header>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.card}>
              <span className={`${styles.tag} ${styles[t.type]}`}>
                {getTypeLabel(t.type)}
              </span>

              <p className={styles.content}>"{t.content}"</p>

              <div className={styles.footer}>
                <Avatar>
                  <AvatarFallback>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4>{t.name}</h4>
                  <p>
                    {t.role} · <span>{t.company}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
