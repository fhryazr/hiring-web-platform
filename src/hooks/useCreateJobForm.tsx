import { useState } from "react";
import type { Job } from "@/types/jobTypes";
import { useJobStore } from "@/store/jobStore";

type FieldToggle = "mandatory" | "optional" | "off";

const defaultProfileFields: Record<string, FieldToggle> = {
  full_name: "mandatory",
  photo_profile: "mandatory",
  gender: "mandatory",
  domicile: "optional",
  email: "mandatory",
  phone_number: "mandatory",
  linkedin_link: "mandatory",
  date_of_birth: "optional",
};

export const useCreateJobForm = () => {
  const { createJob } = useJobStore();

  const [jobName, setJobName] = useState("");
  const [minSalary, setMinSalary] = useState<number | null>(null);
  const [maxSalary, setMaxSalary] = useState<number | null>(null);
  const [numberCandidates, setNumberCandidates] = useState<number | null>(null);

  const [profileFields, setProfileFields] =
    useState<Record<string, FieldToggle>>(defaultProfileFields);

  const setProfileField = (key: string, value: FieldToggle) => {
    setProfileFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!jobName) return;

    const newJob: Job = {
      id: `job_${Date.now()}`,
      slug: jobName.toLowerCase().replace(/\s+/g, "-"),
      title: jobName,
      status: "active",
      number_candidates: numberCandidates || 0,
      salary_range: {
        min: minSalary || 0,
        max: maxSalary || 0,
        currency: "IDR",
        display_text: `Rp${(minSalary || 0).toLocaleString()} - Rp${(
          maxSalary || 0
        ).toLocaleString()}`,
      },
      application_form: {
        sections: [
          {
            title: "Minimum Profile Information Required",
            fields: Object.entries(profileFields).map(([key, toggle]) => ({
              key,
              validation: {
                required: toggle === "mandatory",
              },
            })),
          },
        ],
      },
      list_card: {
        badge: "Active",
        started_on_text: "started today",
        cta: "Manage Job",
      },
    };

    createJob(newJob);

    console.log(newJob);

    // Reset form
    setJobName("");
    setMinSalary(null);
    setMaxSalary(null);
    setNumberCandidates(0);
    setProfileFields(defaultProfileFields);
  };

  return {
    jobName,
    setJobName,
    minSalary,
    setMinSalary,
    maxSalary,
    setMaxSalary,
    profileFields,
    setProfileField,
    numberCandidates,
    setNumberCandidates,
    handleSubmit,
  };
};
