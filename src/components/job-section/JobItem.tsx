import { Button } from "@/components/ui/button";
import type { Job } from "@/types/jobTypes";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const { title, salary_range, list_card } = job;

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center w-full shadow-sm">
      {/* Bagian kiri: Badge + Title + Salary */}
      <div className="flex flex-col gap-1">
        {/* Badge */}
        <div className="space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded ${
              list_card.badge.toLowerCase() === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}>
            {list_card.badge}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded bg-neutral-20 border border-neutral-90`}>
            {list_card.started_on_text}
          </span>
        </div>

        {/* Job Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Salary Range */}
        <p className="text-sm text-gray-600">
          {salary_range
            ? `${salary_range.display_text}`
            : "Salary not specified"}
        </p>
      </div>

      {/* Bagian kanan: CTA Button */}
      <div>
        <Button className="py-1.5 px-4 text-l-bold" variant="secondary">
          {list_card.cta}
        </Button>
      </div>
    </div>
  );
};

export default JobItem;
