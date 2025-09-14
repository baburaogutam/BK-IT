import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { Badge } from "./Badge";
import styles from "./TestimonialsSection.module.css";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Praneeth",
    role: "Software Engineer",
    company: "Google",
    type: "student",
    image: "",
    content: "BKIT Solutions transformed my career trajectory. Their comprehensive training program and placement support helped me land my dream job at TCS. The mentors were incredibly supportive throughout the journey.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr Yaswanth",
    role: "Dean-CDC",
    company: "Vemu Engineering College",
    type: "college",
    image: "",
    content: "Our partnership with BKIT Solutions has significantly improved our students' industry readiness. Their training modules are perfectly aligned with current market demands, resulting in 95% placement success.",
    rating: 4.2
  },
  {
    id: 3,
    name: "D Tanushree",
    role: "Sr Manager HR",
    company: "PRM360",
    type: "corporate",
    image: "",
    content: "BKIT Solutions has been our go-to partner for upskilling our development teams. Their corporate training programs are tailored, effective, and have measurably improved our team's productivity.",
    rating: 5
  },
  {
    id: 4,
    name: "Nikhil Sapa",
    role: "Full Stack Developer",
    company: "Value Momentum",
    type: "student",
    image: "",
    content: "The hands-on approach and real-world projects at BKIT Solutions gave me the confidence to excel in my interviews. I'm now working as a Full Stack Developer at Wipro, thanks to their excellent guidance.",
    rating: 5
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Dean of Engineering",
    company: "RGM College",
    type: "college",
    image: "",
    content: "BKIT Solutions has revolutionized how we prepare our students for the industry. Their industry connect programs and hackathons have created amazing opportunities for our students.",
    rating: 5
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "HCL Technologies",
    type: "corporate",
    image: "",
    content: "Working with BKIT Solutions for our team's skill enhancement has been exceptional. Their trainers understand both technical depth and practical application perfectly.",
    rating: 5
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'student': return 'success';
    case 'corporate': return 'default';
    case 'college': return 'secondary';
    default: return 'outline';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'student': return 'Student Success';
    case 'corporate': return 'Corporate Partner';
    case 'college': return 'Academic Partner';
    default: return type;
  }
};

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => (
  <div 
    className={styles.testimonialCard}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className={styles.quoteIcon}>
      <Quote size={24} />
    </div>
    <div className={styles.cardHeader}>
      <Avatar>
        <AvatarImage src={testimonial.image} alt={testimonial.name} />
        <AvatarFallback>
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className={styles.authorInfo}>
        <h4 className={styles.authorName}>{testimonial.name}</h4>
        <p className={styles.authorRole}>{testimonial.role}</p>
        <p className={styles.authorCompany}>{testimonial.company}</p>
      </div>
      <Badge variant={getTypeColor(testimonial.type) as any}>
        {getTypeLabel(testimonial.type)}
      </Badge>
    </div>
    <blockquote className={styles.testimonialContent}>
      "{testimonial.content}"
    </blockquote>
    <div className={styles.rating}>
      {Array.from({ length: testimonial.rating }, (_, i) => (
        <span key={i} className={styles.star}>★</span>
      ))}
    </div>
  </div>
);

export const TestimonialsSection = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Partners Say</h2>
          <p className={styles.subtitle}>
            Hear from students, colleges, and corporate partners who have experienced 
            the BKIT Solutions difference firsthand.
          </p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};