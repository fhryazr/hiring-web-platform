import type { Candidate } from "./candidateTypes";

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  display_text: string;
}

export interface Field {
  key: string;
  validation: { required: boolean };
}

export interface Section {
  title: string;
  fields: Field[];
}

export interface ApplicationForm {
  sections: Section[];
}

export interface ListCard {
  badge: string;
  started_on_text: string;
  cta: "Manage Job" | "Apply Job";
}

export type JobTypes = "full-time" | "contract" | "part-time" | "internship" | 'freelance'

export interface Job {
  id: string;
  slug: string;
  title: string;
  job_type: JobTypes;
  job_description: string;
  status: string;
  number_candidates: number;
  salary_range: SalaryRange;
  application_form: ApplicationForm;
  list_card: ListCard;
}

export interface JobWithCandidates {
  id: string;
  candidates: Candidate[];
}

