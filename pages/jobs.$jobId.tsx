import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetJobById } from "../helpers/useJobsQueries";
import { Skeleton } from "../components/Skeleton";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { AlertTriangle, ArrowLeft, Briefcase, MapPin, DollarSign, ExternalLink, Mail, Clock } from "lucide-react";
import styles from "./jobs.$jobId.module.css";
import { formatDistanceToNow } from 'date-fns';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const jobIdNumber = Number(jobId);

  const { data, isFetching, error } = useGetJobById(jobIdNumber, {
    enabled: !isNaN(jobIdNumber) && jobIdNumber > 0,
  });

  if (isNaN(jobIdNumber) || jobIdNumber <= 0) {
    return (
      <div className={styles.errorState}>
        <AlertTriangle size={48} className={styles.errorIcon} />
        <h2>Invalid Job ID</h2>
        <p>The job ID provided is not valid.</p>
        <Button asChild variant="outline">
          <Link to="/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Skeleton style={{ height: '2.5rem', width: '60%', marginBottom: 'var(--spacing-4)' }} />
          <Skeleton style={{ height: '1.5rem', width: '40%' }} />
        </div>
        <div className={styles.badgeContainer}>
          <Skeleton style={{ height: '1.75rem', width: '100px', borderRadius: '9999px' }} />
          <Skeleton style={{ height: '1.75rem', width: '120px', borderRadius: '9999px' }} />
          <Skeleton style={{ height: '1.75rem', width: '150px', borderRadius: '9999px' }} />
        </div>
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <Skeleton style={{ height: '1.5rem', width: '200px', marginBottom: 'var(--spacing-4)' }} />
            <Skeleton style={{ height: '1rem', width: '100%' }} />
            <Skeleton style={{ height: '1rem', width: '95%' }} />
            <Skeleton style={{ height: '1rem', width: '98%' }} />
            <Skeleton style={{ height: '1rem', width: '90%' }} />
            <Skeleton style={{ height: '1.5rem', width: '200px', marginTop: 'var(--spacing-8)', marginBottom: 'var(--spacing-4)' }} />
            <Skeleton style={{ height: '1rem', width: '100%' }} />
            <Skeleton style={{ height: '1rem', width: '95%' }} />
          </div>
          <div className={styles.sidebar}>
            <Skeleton style={{ height: '3rem', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <AlertTriangle size={48} className={styles.errorIcon} />
        <h2>Could Not Load Job Details</h2>
        <p>{error.message}</p>
        <Button asChild variant="outline">
          <Link to="/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.errorState}>
        <AlertTriangle size={48} className={styles.errorIcon} />
        <h2>Job Not Found</h2>
        <p>The job you are looking for does not exist or is no longer available.</p>
        <Button asChild variant="outline">
          <Link to="/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  const { job } = data;

  return (
    <>
      <Helmet>
        <title>{job.title} at {job.company} | BKIT Solutions</title>
        <meta name="description" content={job.description.substring(0, 160)} />
      </Helmet>
      <div className={styles.page}>
        <Link to="/jobs" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to all jobs
        </Link>
        <header className={styles.header}>
          <h1 className={styles.title}>{job.title}</h1>
          <p className={styles.company}>at {job.company}</p>
        </header>
        <div className={styles.badgeContainer}>
          <Badge><Briefcase size={14} /> {job.jobType}</Badge>
          <Badge variant="secondary"><MapPin size={14} /> {job.location}</Badge>
          <Badge variant="success"><DollarSign size={14} /> {job.experienceLevel}</Badge>
          {job.salaryRange && <Badge variant="warning">{job.salaryRange}</Badge>}
        </div>

        <div className={styles.contentGrid}>
          <main className={styles.mainContent}>
            <section>
              <h2 className={styles.sectionTitle}>Job Description</h2>
              <p className={styles.sectionText}>{job.description}</p>
            </section>
            <section>
              <h2 className={styles.sectionTitle}>Requirements</h2>
              <p className={styles.sectionText}>{job.requirements}</p>
            </section>
            {job.benefits && (
              <section>
                <h2 className={styles.sectionTitle}>Benefits</h2>
                <p className={styles.sectionText}>{job.benefits}</p>
              </section>
            )}
          </main>
          <aside className={styles.sidebar}>
            <div className={styles.applyCard}>
              <h3 className={styles.applyTitle}>Apply for this role</h3>
              {job.applicationUrl ? (
                <Button asChild size="lg" className={styles.applyButton}>
                  <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now <ExternalLink size={18} />
                  </a>
                </Button>
              ) : (
                <p className={styles.noApplyUrl}>Application instructions will be provided upon contact.</p>
              )}
              {job.contactEmail && (
                <Button asChild variant="outline" className={styles.contactButton}>
                  <a href={`mailto:${job.contactEmail}`}>
                    <Mail size={16} /> Contact Recruiter
                  </a>
                </Button>
              )}
              <div className={styles.postedDate}>
                <Clock size={14} />
                                Posted {job.createdAt ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }) : 'Unknown'}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;