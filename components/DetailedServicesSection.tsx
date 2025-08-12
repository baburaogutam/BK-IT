import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import styles from "./DetailedServicesSection.module.css";

const detailedServices = [
  {
    value: "item-1",
    trigger: "Campus Recruitment Preparation",
    content:
      "We meticulously prepare students for campus recruitment drives, focusing on aptitude, technical skills, and interview techniques to maximize their success rate with top companies.",
  },
  {
    value: "item-2",
    trigger: "Employee Skills Training",
    content:
      "Our corporate training programs are designed to upskill and reskill employees, enhancing productivity and adapting your workforce to the latest technological advancements.",
  },
  {
    value: "item-3",
    trigger: "Custom College/Corporate Training",
    content:
      "We offer bespoke training modules tailored to the specific needs of your institution or company, ensuring relevant and impactful learning experiences.",
  },
  {
    value: "item-4",
    trigger: "Job Placement for Graduates",
    content:
      "Our dedicated placement cell works tirelessly to find and secure job opportunities for fresh graduates, connecting them with our extensive network of hiring partners.",
  },
  {
    value: "item-5",
    trigger: "Industry Connections & Hackathons",
    content:
      "We bridge the gap between academia and the corporate world by organizing campus events, hackathons with leading companies, and exclusive meetings between HR managers and colleges.",
  },
  {
    value: "item-6",
    trigger: "Custom Software & Web Development",
    content:
      "Our IT solutions wing specializes in creating custom software and responsive websites that are scalable, secure, and tailored to your business objectives.",
  },
  {
    value: "item-7",
    trigger: "Digital Marketing & Mobile Apps",
    content:
      "We help businesses grow their online presence through strategic digital advertising and develop high-performance mobile applications for both Android and iOS platforms.",
  },
];

export const DetailedServicesSection = () => {
  return (
    <section id="details" className={styles.detailsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What We Offer</h2>
          <p className={styles.subtitle}>
            A closer look at how we empower our partners and students.
          </p>
        </div>
        <Accordion.Root
          className={styles.accordionRoot}
          type="single"
          defaultValue="item-1"
          collapsible
        >
          {detailedServices.map((service) => (
            <Accordion.Item
              key={service.value}
              className={styles.accordionItem}
              value={service.value}
            >
              <Accordion.Header className={styles.accordionHeader}>
                <Accordion.Trigger className={styles.accordionTrigger}>
                  {service.trigger}
                  <ChevronDown
                    className={styles.accordionChevron}
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.accordionContent}>
                <div className={styles.accordionContentText}>
                  {service.content}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};