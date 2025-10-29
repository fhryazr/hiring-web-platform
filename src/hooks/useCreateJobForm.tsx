import { useState } from "react";
import type { Job, JobTypes } from "@/types/jobTypes";
import { useJobStore } from "@/store/jobStore";
import { showCustomToast } from "@/components/CustomToast";

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
  const [openingDate, setOpeningDate] = useState<Date | null>(null);
  const [closingDate, setClosingDate] = useState<Date | null>(null);
  const [numberCandidates, setNumberCandidates] = useState<number | null>(null);
  const [jobType, setJobType] = useState<JobTypes | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  const [profileFields, setProfileFields] =
    useState<Record<string, FieldToggle>>(defaultProfileFields);

  const setProfileField = (key: string, value: FieldToggle) => {
    setProfileFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatus = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = openingDate?.setHours(0, 0, 0, 0);
    const endDate = closingDate?.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) return "Draft";

    const isActive = today <= endDate;

    return isActive ? "Active" : "Inactive";
  };

  const resetForm = () => {
    // Reset form
    setJobName("");
    setJobType(null);
    setJobDescription("");
    setOpeningDate(null);
    setClosingDate(null);
    setMinSalary(null);
    setMaxSalary(null);
    setNumberCandidates(0);
    setProfileFields(defaultProfileFields);
  };

  const handleSubmit = () => {
    if (!jobName) return;

    const newJob: Job = {
      id: `job_${Date.now()}`,
      slug: jobName.toLowerCase().replace(/\s+/g, "-"),
      title: jobName,
      status: handleStatus().toLowerCase(),
      number_candidates: numberCandidates || 0,
      job_type: jobType || "full-time",
      job_description: jobDescription || "",
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
            fields: Object.entries(profileFields)
              .filter(([, toggle]) => toggle != "off")
              .map(([key, toggle]) => ({
                key,
                validation: {
                  required: toggle === "mandatory",
                },
              })),
          },
        ],
      },
      list_card: {
        badge: handleStatus(),
        started_on_text: openingDate?.toDateString() ?? "",
        cta: "Manage Job",
      },
    };

    createJob(newJob);
    console.log(newJob);

    resetForm();

    showCustomToast({
      message: "Job Vacancy sucessfully created",
      type: "success",
    });
  };

  return {
    jobName,
    jobType,
    jobDescription,
    minSalary,
    maxSalary,
    profileFields,
    numberCandidates,
    openingDate,
    closingDate,
    setJobName,
    setJobType,
    setJobDescription,
    setMinSalary,
    setMaxSalary,
    setProfileField,
    setNumberCandidates,
    setOpeningDate,
    setClosingDate,
    handleSubmit,
  };
};
