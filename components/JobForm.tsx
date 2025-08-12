import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./Form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { Spinner } from "./Spinner";
import { Checkbox } from "./Checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { schema as createJobSchema } from "../endpoints/jobs_POST.schema";
import type { Selectable } from "kysely";
import type { Jobs } from "../helpers/postgresqlDatabaseSchema";
import type { JobType, ExperienceLevel } from "../helpers/postgresqlDatabaseSchema";
import styles from "./JobForm.module.css";

type CreateJobInput = z.infer<typeof createJobSchema>;

interface JobFormProps {
  mode: "create" | "edit";
  job?: Selectable<Jobs>;
  onSubmit: (data: CreateJobInput) => void;
  onSuccess: () => void;
  isSubmitting: boolean;
}

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "entry", label: "Entry-level" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

export const JobForm: React.FC<JobFormProps> = ({ mode, job, onSubmit, onSuccess, isSubmitting }) => {
  const form = useForm({
    schema: createJobSchema,
    defaultValues:
      mode === "edit" && job
        ? {
            title: job.title,
            company: job.company,
            location: job.location,
            jobType: job.jobType,
            experienceLevel: job.experienceLevel,
            salaryRange: job.salaryRange ?? "",
            description: job.description,
            requirements: job.requirements,
            benefits: job.benefits ?? "",
            applicationUrl: job.applicationUrl ?? "",
            contactEmail: job.contactEmail ?? "",
            isActive: job.isActive ?? true,
          }
        : {
            title: "",
            company: "",
            location: "",
            jobType: JOB_TYPES[0].value,
            experienceLevel: EXPERIENCE_LEVELS[0].value,
            salaryRange: "",
            description: "",
            requirements: "",
            benefits: "",
            applicationUrl: "",
            contactEmail: "",
            isActive: true,
          },
  });

  const handleSubmit = (data: CreateJobInput) => {
    onSubmit(data);
    // onSuccess is called from the parent component after mutation succeeds
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.form}>
        <div className={styles.grid}>
          <FormItem name="title" className={styles.span2}>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Software Engineer" value={form.values.title} onChange={e => form.setValues(p => ({...p, title: e.target.value}))} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="company">
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input placeholder="e.g. BKIT Solutions" value={form.values.company} onChange={e => form.setValues(p => ({...p, company: e.target.value}))} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="location">
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Hyderabad, India" value={form.values.location} onChange={e => form.setValues(p => ({...p, location: e.target.value}))} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="jobType">
            <FormLabel>Job Type</FormLabel>
            <Select onValueChange={value => form.setValues(p => ({...p, jobType: value as JobType}))} defaultValue={form.values.jobType}>
              <FormControl>
                <SelectTrigger><SelectValue /></SelectTrigger>
              </FormControl>
              <SelectContent>
                {JOB_TYPES.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>

          <FormItem name="experienceLevel">
            <FormLabel>Experience Level</FormLabel>
            <Select onValueChange={value => form.setValues(p => ({...p, experienceLevel: value as ExperienceLevel}))} defaultValue={form.values.experienceLevel}>
              <FormControl>
                <SelectTrigger><SelectValue /></SelectTrigger>
              </FormControl>
              <SelectContent>
                {EXPERIENCE_LEVELS.map(level => <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>

          <FormItem name="salaryRange" className={styles.span2}>
            <FormLabel>Salary Range (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g. ₹8,00,000 - ₹12,00,000 LPA" value={form.values.salaryRange || ''} onChange={e => form.setValues(p => ({...p, salaryRange: e.target.value}))} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="description" className={styles.span2}>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe the role and responsibilities..." value={form.values.description} onChange={e => form.setValues(p => ({...p, description: e.target.value}))} rows={5} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="requirements" className={styles.span2}>
            <FormLabel>Requirements</FormLabel>
            <FormControl>
              <Textarea placeholder="List the required skills and qualifications..." value={form.values.requirements} onChange={e => form.setValues(p => ({...p, requirements: e.target.value}))} rows={5} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="benefits" className={styles.span2}>
            <FormLabel>Benefits (Optional)</FormLabel>
            <FormControl>
              <Textarea placeholder="List any benefits, e.g., health insurance, remote work..." value={form.values.benefits || ''} onChange={e => form.setValues(p => ({...p, benefits: e.target.value}))} rows={3} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="applicationUrl" className={styles.span2}>
            <FormLabel>Application URL (Optional)</FormLabel>
            <FormControl>
              <Input type="url" placeholder="https://example.com/apply" value={form.values.applicationUrl || ''} onChange={e => form.setValues(p => ({...p, applicationUrl: e.target.value}))} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="contactEmail" className={styles.span2}>
            <FormLabel>Contact Email (Optional)</FormLabel>
            <FormControl>
              <Input type="email" placeholder="recruiter@example.com" value={form.values.contactEmail || ''} onChange={e => form.setValues(p => ({...p, contactEmail: e.target.value}))} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="isActive" className={styles.span2}>
            <div className={styles.checkboxContainer}>
              <FormControl>
                <Checkbox id="isActive" checked={form.values.isActive} onChange={e => form.setValues(p => ({...p, isActive: e.target.checked}))} />
              </FormControl>
              <FormLabel htmlFor="isActive" className={styles.checkboxLabel}>
                Job is active
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        </div>

        <div className={styles.footer}>
          <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? (
              <>
                <Spinner size="sm" />
                {mode === 'create' ? 'Creating...' : 'Saving...'}
              </>
            ) : (
              mode === 'create' ? 'Create Job' : 'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};