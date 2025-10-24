import type { Job } from "@/types/jobTypes"

export const jobsData: { data: Job[] } = {
  "data": [
    {
      "id": "job_20251001_0001",
      "slug": "frontend-developer",
      "title": "Frontend Developer",
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
    }
  ]
}