import { useState } from "react";
import type { CandidateAttribute } from "@/types/candidateTypes";
import { v4 as uuidv4 } from "uuid";
import { useJobWithCandidateStore } from "@/store/jobWithCandidateStore";
import { showCustomToast } from "@/components/CustomToast";

export interface FormData {
  photo_profile?: string;
  full_name?: string;
  date_of_birth?: Date;
  gender?: "female" | "male";
  domicile?: string;
  phone_number?: string;
  email?: string;
  linkedin_link?: string;
}

export function useApplyForm(jobId: string | undefined) {
  const [formData, setFormData] = useState<FormData>({});
  const addCandidateToJob = useJobWithCandidateStore(
    (state) => state.addCandidateToJob
  );

  const FIELD_ORDER = [
    "photo_profile",
    "full_name",
    "date_of_birth",
    "gender",
    "domicile",
    "phone_number",
    "email",
    "linkedin_link",
  ];

  const handleChange = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!jobId) return;

    const attributes: CandidateAttribute[] = FIELD_ORDER.map((key, index) => {
      const typedKey = key as keyof FormData; // aman akses FormData
      const value = formData[typedKey];

      return {
        key,
        label: key
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
        value: value !== undefined ? String(value) : "",
        order: index,
      };
    });

    const newCandidate = {
      id: uuidv4(),
      submitted_at: new Date().toISOString(),
      attributes,
    };

    addCandidateToJob(jobId, newCandidate);
    setFormData({});
    showCustomToast({
      message: "You have successfully aplied!",
      type: "success",
    });
  };

  return { formData, handleChange, handleSubmit, setFormData, FIELD_ORDER };
}
