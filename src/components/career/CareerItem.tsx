import { useJobStore } from "@/store/jobStore";
import type { Job } from "@/types/jobTypes";
import { MapPin, Wallet } from "lucide-react";

interface CareerItemProps {
  job: Job;
  isSelected: boolean;
  location?: string;
}

export const CareerItem = ({
  job,
  isSelected = false,
  location = "Jakarta Selatan",
}: CareerItemProps) => {
  const { id, title, salary_range } = job;
  const { setSelectedJob } = useJobStore();

  return (
    <div
      onClick={() => setSelectedJob(id)}
      className={`flex flex-col w-full max-w-sm rounded-xl p-4 hover:bg-primary-surface hover:border-primary-main shadow-sm cursor-pointer border transition-all duration-200
        ${isSelected ? "bg-primary-surface border-primary-main" : ""}
        border`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src="/Logo.png"
          alt="rakamin-logo"
          className="w-12 h-12 rounded-md border border-neutral-200 bg-white"
        />
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">Rakamin</p>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-dashed border-neutral-200 my-3" />

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
        <MapPin size={16} />
        <span>{location}</span>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-2 text-gray-700 text-sm">
        <Wallet size={16} />
        <span>{salary_range.display_text}</span>
      </div>
    </div>
  );
};
