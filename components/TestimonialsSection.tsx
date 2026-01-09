import React from "react";
import styles from "./TestimonialsSection.module.css";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "./Avatar";
import { Badge } from "./Badge";

const testimonials = [
  {
    id: 1,
    name: "Praneeth",
    role: "Software Engineer",
    company: "Google",
    type: "student",
    content:
      "BKIT Solutions transformed my career trajectory. Their structured training and placement support helped me confidently land my first role. The mentorship and guidance were exceptional.",
  },
  {
    id: 2,
    name: "Dr Yaswanth",
    role: "Dean – CDC",
    company: "Vemu Engineering College",
    type: "college",
    content:
      "BKIT Solutions has significantly improved our students’ industry readiness. Their outcome-driven programs consistently deliver measurable placement success.",
  },
  {
    id: 3,
    name: "Tanushree D",
    role: "Senior Manager – HR",
    company: "PRM360",
    type: "corporate",
    content:
      "Their corporate training programs are well-structured, relevant, and impactful. We’ve seen measurable improvements in team productivity and technical confidence.",
  },
  {
    id: 4,
    name: "Nikhil Sapa",
    role: "Full Stack Developer",
    company: "Value Momentum",
    type: "student",
    content:
      "The real-world projects and interview preparation at BKIT gave me confidence and clarity. I could clearly see the difference in how I approached interviews.",
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Dean of Engineering",
    company: "RGM College",
    type: "college",
    content:
      "BKIT Solutions has redefined how we prepare students for industry. Their industry connect programs and hackathons created genuine exposure and opportunity.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "HCL Technologies",
    type: "corporate",
    content:
      "Their trainers strike the perfect balance between theory and practical application. A reliable partner for long-term skill development.",
  },
];

const getBadge = (type: string) => {
  if (type === "student") return "Student Success";
  if (type === "college") return "Academic Partner";
  return "Corporate Partner";
};

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Trusted by Students, Colleges & Corporates</h2>
          <p className={styles.subtitle}>
            Real experiences from those who have partnered with BKIT Solutions
            to achieve measurable outcomes.
          </p>
        </header>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <Avatar>
                  <AvatarFallback>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className={styles.author}>
                  <h4>{t.name}</h4>
                  <p className={styles.role}>{t.role}</p>
                  <p className={styles.company}>{t.company}</p>
                </div>

                <Badge variant="outline">{getBadge(t.type)}</Badge>
              </div>

              <div className={styles.quote}>
                <Quote size={18} />
                <p>{t.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
