// src/store/useJobWithCandidateStore.ts
import { mockJobWithCandidatesData } from "@/lib/mockData";
import type { Candidate } from "@/types/candidateTypes";
import type { JobWithCandidates } from "@/types/jobTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JobWithCandidateStore {
  jobs: JobWithCandidates[];
  selectedJobId: string | null;
  getJobCandidateById: (id: string) => JobWithCandidates | undefined;
  setSelectedJob: (jobId: string) => void;
  addCandidateToJob: (jobId: string, candidate: Candidate) => void;
  removeCandidateFromJob: (jobId: string, candidateId: string) => void;
  updateCandidateInJob: (
    jobId: string,
    candidateId: string,
    updates: Partial<Candidate>
  ) => void;
}

export const useJobWithCandidateStore = create<JobWithCandidateStore>()(
  persist(
    (set, get) => ({
      jobs: mockJobWithCandidatesData,
      selectedJobId: null,

      getJobCandidateById: (id) => get().jobs.find((job) => job.id === id),

      setSelectedJob: (jobId) => set({ selectedJobId: jobId }),

      addCandidateToJob: (jobId, candidate) =>
        set((state) => {
          const jobExists = state.jobs.some((job) => job.id === jobId);
          if (jobExists) {
            return {
              jobs: state.jobs.map((job) =>
                job.id === jobId
                  ? { ...job, candidates: [...job.candidates, candidate] }
                  : job
              ),
            };
          } else {
            const newJob = {
              id: jobId,
              candidates: [candidate],
            };
            return {
              jobs: [...state.jobs, newJob],
            };
          }
        }),

      removeCandidateFromJob: (jobId, candidateId) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId
              ? {
                ...job,
                candidates: job.candidates.filter(
                  (cand) => cand.id !== candidateId
                ),
              }
              : job
          ),
        })),

      updateCandidateInJob: (jobId, candidateId, updates) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId
              ? {
                ...job,
                candidates: job.candidates.map((cand) =>
                  cand.id === candidateId ? { ...cand, ...updates } : cand
                ),
              }
              : job
          ),
        })),
    }),
    {
      name: "job-with-candidate-store",
      partialize: (state) => ({
        jobs: state.jobs,
        selectedJobId: state.selectedJobId,
      }),
    }
  )
);
