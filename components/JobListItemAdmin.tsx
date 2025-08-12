import React from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Spinner } from "./Spinner";
import { Edit, Trash2 } from "lucide-react";
import type { Selectable } from "kysely";
import type { Jobs } from "../helpers/schema";
import styles from "./JobListItemAdmin.module.css";
import { format } from 'date-fns';

interface JobListItemAdminProps {
  job: Selectable<Jobs>;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  className?: string;
}

export const JobListItemAdmin: React.FC<JobListItemAdminProps> = ({ job, onEdit, onDelete, isDeleting, className }) => {
  return (
    <div className={`${styles.item} ${className || ''}`}>
      <div className={styles.info}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{job.title}</span>
          <Badge variant={job.isActive ? "success" : "outline"}>
            {job.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className={styles.meta}>
          {job.company} &middot; {job.location} &middot; Posted on {job.createdAt ? format(new Date(job.createdAt), 'MMM d, yyyy') : 'Unknown'}
        </p>
      </div>
      <div className={styles.actions}>
        <Button variant="ghost" size="icon" onClick={onEdit} aria-label="Edit job">
          <Edit size={16} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} disabled={isDeleting} aria-label="Delete job">
          {isDeleting ? <Spinner size="sm" /> : <Trash2 size={16} className={styles.deleteIcon} />}
        </Button>
      </div>
    </div>
  );
};