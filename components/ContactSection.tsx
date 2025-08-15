import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./Form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { useContactMutation } from "../helpers/useContactMutation";
import { schema as contactSchema } from "../endpoints/contact_POST.schema";
import styles from "./ContactSection.module.css";
import { Mail, Phone, Globe, Send, Linkedin, Instagram } from "lucide-react";

const services = [
  "College & Corporate Trainings",
  "Placement Support",
  "Hire From BKIT",
  "Industry Connects",
  "IT Solutions",
  "Other",
];

export const ContactSection = () => {
  const form = useForm({
    schema: contactSchema,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "",
      message: "",
    },
  });

  const contactMutation = useContactMutation();

    const onSubmit = (values: z.infer<typeof contactSchema>) => {
    contactMutation.mutate(values, {
      onSuccess: () => {
        form.setValues({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceInterest: "",
          message: "",
        });
      },
    });
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.infoPanel}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Have a question or a project in mind? We'd love to hear from you.
            Fill out the form or use our contact details below.
          </p>
          <div className={styles.contactDetails}>
            <a
              href="mailto:bkitsolutions1000cr@gmail.com"
              className={styles.contactItem}
            >
              <Mail size={20} />
              <span>bkitsolutions1000cr@gmail.com</span>
            </a>
            <a href="tel:+918121034516" className={styles.contactItem}>
              <Phone size={20} />
              <span>+91 8121034516</span>
            </a>
            <a
              href="https://bkitsolutions.in"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <Globe size={20} />
              <span>bkitsolutions.in</span>
            </a>
            <a 
            href="https://www.linkedin.com/company/bk-itsolutions/"
            target="_blank"
            className={styles.contactItem}
            >
            <Linkedin size={20}/>
            <span>BK-IT Solutions</span>

            </a>
            <a 
            href=""
            target="_blank"
            className={styles.contactItem}
            >
            <Instagram size={20}/>
            <span>BKIT Solutions</span>

            </a>
          </div>
        </div>
        <div className={styles.formPanel}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={styles.form}
            >
              <div className={styles.formGrid}>
                <FormItem name="name">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Priya Sharma"
                      value={form.values.name}
                      onChange={(e) =>
                        form.setValues((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem name="email">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. priya.sharma@example.com"
                      value={form.values.email}
                      onChange={(e) =>
                        form.setValues((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className={styles.formGrid}>
                <FormItem name="phone">
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={form.values.phone}
                      onChange={(e) =>
                        form.setValues((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem name="company">
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Tech Solutions Pvt. Ltd."
                      value={form.values.company}
                      onChange={(e) =>
                        form.setValues((p) => ({
                          ...p,
                          company: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <FormItem name="serviceInterest">
                <FormLabel>Service of Interest (Optional)</FormLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValues((p) => ({ ...p, serviceInterest: value }))
                  }
                  value={form.values.serviceInterest}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              <FormItem name="message">
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your needs..."
                    rows={5}
                    value={form.values.message}
                    onChange={(e) =>
                      form.setValues((p) => ({
                        ...p,
                        message: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                type="submit"
                size="lg"
                className={styles.submitButton}
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};