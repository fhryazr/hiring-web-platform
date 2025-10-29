import type { Job } from "@/types/jobTypes"
import type { JobWithCandidates } from "@/types/jobTypes";

export const jobsData: { data: Job[] } = {
  "data": [
    {
      "id": "job_20251001_0001",
      "slug": "frontend-developer",
      "title": "Frontend Developer",
      "job_type": "full-time",
      "job_description": "make front-end web",
      "status": "active",
      "number_candidates": 2,
      "salary_range": {
        "min": 7000000,
        "max": 8000000,
        "currency": "IDR",
        "display_text": "Rp7.000.000 - Rp8.000.000"
      },
      "application_form": {
        "sections": [
          {
            "title": "Minimum Profile Information Required",
            "fields": [
              { "key": "full_name", "validation": { "required": true } },
              { "key": "photo_profile", "validation": { "required": true } },
              { "key": "gender", "validation": { "required": true } },
              { "key": "domicile", "validation": { "required": false } },
              { "key": "email", "validation": { "required": true } },
              { "key": "phone_number", "validation": { "required": true } },
              { "key": "linkedin_link", "validation": { "required": true } },
              { "key": "date_of_birth", "validation": { "required": false } }
            ]
          }
        ]
      },
      "list_card": {
        "badge": "Active",
        "started_on_text": "started on 1 Oct 2025",
        "cta": "Manage Job"
      }
    },
  ]
}

export const mockJobWithCandidatesData: JobWithCandidates[] = [
  {
    id: "job_20251001_0001",
    candidates: [
      {
        id: "cand_20251001_001",
        attributes: [
          { key: "full_name", label: "Nama Lengkap", value: "Rizky Ananda", order: 1 },
          { key: "email", label: "Email", value: "rizky@mail.com", order: 2 },
          { key: "phone_number", label: "Phone", value: "08123456789", order: 3 },
          { key: "date_of_birth", label: "Date of Birth", value: "1999-06-14", order: 4 },
          { key: "domicile", label: "Domicile", value: "Jakarta", order: 5 },
          { key: "gender", label: "Gender", value: "Male", order: 6 },
          { key: "linkedin_link", label: "LinkedIn", value: "linkedin.com/in/rizky", order: 7 },
        ],
        submitted_at: ""
      },
      {
        id: "cand_20251001_002",
        attributes: [
          { key: "full_name", label: "Nama Lengkap", value: "Dewi Lestari", order: 1 },
          { key: "email", label: "Email", value: "dewi@mail.com", order: 2 },
          { key: "phone_number", label: "Phone", value: "08987654321", order: 3 },
          { key: "date_of_birth", label: "Date of Birth", value: "1997-12-20", order: 4 },
          { key: "domicile", label: "Domicile", value: "Bandung", order: 5 },
          { key: "gender", label: "Gender", value: "Female", order: 6 },
          { key: "linkedin_link", label: "LinkedIn", value: "linkedin.com/in/dewi", order: 7 },
        ],
        submitted_at: ""
      },
    ],
  },
];
