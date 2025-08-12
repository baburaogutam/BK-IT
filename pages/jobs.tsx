import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useGetJobs } from "../helpers/useJobsQueries";
import { JobCard } from "../components/JobCard";
import { Skeleton } from "../components/Skeleton";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AlertTriangle, Search } from "lucide-react";
import styles from "./jobs.module.css";
import { useDebounce } from "../helpers/useDebounce";

const JOBS_PER_PAGE = 9;

const JobsPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filters = useMemo(() => ({
    page,
    limit: JOBS_PER_PAGE,
    search: debouncedSearchTerm,
  }), [page, debouncedSearchTerm]);

  const { data, isFetching, error } = useGetJobs(filters);

  const totalPages = data ? Math.ceil(data.totalCount / JOBS_PER_PAGE) : 0;

  const renderSkeletons = () => (
    Array.from({ length: JOBS_PER_PAGE }).map((_, index) => (
      <div key={index} className={styles.skeletonCard}>
        <div className={styles.skeletonHeader}>
          <Skeleton style={{ height: '1.5rem', width: '70%' }} />
          <Skeleton style={{ height: '1rem', width: '30%' }} />
        </div>
        <div className={styles.skeletonBadges}>
          <Skeleton style={{ height: '1.5rem', width: '80px', borderRadius: '9999px' }} />
          <Skeleton style={{ height: '1.5rem', width: '100px', borderRadius: '9999px' }} />
        </div>
        <Skeleton style={{ height: '1rem', width: '90%' }} />
        <Skeleton style={{ height: '1rem', width: '80%' }} />
        <div className={styles.skeletonFooter}>
          <Skeleton style={{ height: '2.5rem', width: '120px' }} />
        </div>
      </div>
    ))
  );

  return (
    <>
      <Helmet>
        <title>Careers | BKIT Solutions</title>
        <meta name="description" content="Explore job opportunities at BKIT Solutions and our partner companies. Find your next career in IT." />
      </Helmet>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Find Your Next Opportunity</h1>
          <p className={styles.subtitle}>
            Browse our open positions and find a role that’s a perfect fit for you.
          </p>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <Input
              type="search"
              placeholder="Search by title, company, or keyword..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <main className={styles.mainContent}>
          {error && (
            <div className={styles.errorState}>
              <AlertTriangle size={48} className={styles.errorIcon} />
              <h2>Could Not Load Jobs</h2>
              <p>{error.message}</p>
            </div>
          )}

          <div className={styles.jobGrid}>
            {isFetching ? renderSkeletons() : (
              data?.jobs.map(job => <JobCard key={job.id} job={job} />)
            )}
          </div>

          {!isFetching && data?.jobs.length === 0 && (
            <div className={styles.emptyState}>
              <h2>No Matching Jobs Found</h2>
              <p>Try adjusting your search term. New opportunities are posted regularly!</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                variant="outline"
              >
                Previous
              </Button>
              <span className={styles.pageInfo}>
                Page {page} of {totalPages}
              </span>
              <Button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || isFetching}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default JobsPage;