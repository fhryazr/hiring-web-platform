import { jobsData } from "@/lib/mockData";
import type { Job } from "@/types/jobTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface JobState {
  jobs: Job[];
  selectedJob: string;
  setSelectedJob: (id: string) => void;
  createJob: (job: Job) => void;
  getJobById: (id: string) => Job | undefined;
}

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      jobs: jobsData.data,

      createJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),

      getJobById: (id) => get().jobs.find((job) => job.id === id),
      selectedJob: jobsData.data[0].id,
      setSelectedJob: (id) => set({ selectedJob: id })
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )

);
