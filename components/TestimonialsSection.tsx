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
      "BKIT played a huge role in shaping my early career. The training was practical, focused, and gave me the confidence to crack my first role.",
  },
  {
    id: 2,
    name: "Dr Yaswanth",
    role: "Dean – CDC",
    company: "Vemu Engineering College",
    type: "college",
    content:
      "Our students became noticeably more industry-ready. The programs delivered consistent outcomes and real placement improvements.",
  },
  {
    id: 3,
    name: "Tanushree D",
    role: "Senior Manager – HR",
    company: "PRM360",
    type: "corporate",
    content:
      "The training was structured, relevant, and easy to apply. We saw clear improvements in confidence and on-the-job performance.",
  },
  {
    id: 4,
    name: "Nikhil Sapa",
    role: "Full Stack Developer",
    company: "Value Momentum",
    type: "student",
    content:
      "The hands-on projects and interview prep changed how I approached placements. I felt prepared and confident walking into interviews.",
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Dean of Engineering",
    company: "RGM College",
    type: "college",
    content:
      "Industry connects and hackathons gave our students real exposure. The impact was visible in their skills and mindset.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "HCL Technologies",
    type: "corporate",
    content:
      "BKIT strikes the right balance between fundamentals and real-world application. A dependable long-term training partner.",
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
            Honest feedback from learners, institutions, and industry partners
            who experienced real outcomes with BKIT Solutions.
          </p>
        </header>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.card}>
              {/* Name Block */}
              <div className={styles.nameBlock}>
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

              {/* Badge */}
              <span className={`${styles.tag} ${styles[t.type]}`}>
                {getTypeLabel(t.type)}
              </span>

              {/* Review */}
              <p className={styles.content}>
                “{t.content}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
