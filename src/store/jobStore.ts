import { jobsData } from '@/lib/mockData';
import type { Job } from '@/types/jobTypes'
import { create } from 'zustand'

interface JobState {
  jobs: Job[],
  createJob: (job: Job) => void
}

export const useJobStore = create<JobState>((set) => ({
  jobs: jobsData.data,
  createJob: (job) => set((state) => ({ jobs: [...state.jobs, job] }))
}));