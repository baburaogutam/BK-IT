import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import type { Selectable } from "kysely";
import type { Jobs } from "../helpers/schema";
import styles from "./JobCard.module.css";

interface JobCardProps {
  job: Selectable<Jobs>;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ job, className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Link to={`/jobs/${job.id}`} className={styles.titleLink}>
            {job.title}
          </Link>
        </h3>
        <p className={styles.company}>{job.company}</p>
      </div>
      <div className={styles.details}>
        <Badge variant="outline"><Briefcase size={14} /> {job.jobType}</Badge>
        <Badge variant="outline"><MapPin size={14} /> {job.location}</Badge>
      </div>
      <p className={styles.description}>
        {job.description.substring(0, 100)}{job.description.length > 100 ? '...' : ''}
      </p>
      <div className={styles.footer}>
        <Button asChild variant="secondary" size="sm">
          <Link to={`/jobs/${job.id}`}>
            View Details <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};