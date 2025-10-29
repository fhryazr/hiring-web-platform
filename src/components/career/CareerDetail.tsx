import { useJobStore } from "@/store/jobStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";

interface CareerDetailProps {
  id: string;
}

const CareerDetail = ({ id }: CareerDetailProps) => {
  const { getJobById } = useJobStore();
  const jobData = getJobById(id);
  const navigate = useNavigate();

  if (!jobData) {
    return (
      <div className="flex-1 border p-6 rounded-lg text-center text-muted-foreground">
        Job not found.
      </div>
    );
  }

  return (
    <div className="flex-1 col-span-3 border rounded-xl p-6 shadow-sm bg-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <img
            src="/Logo.png"
            alt="rakamin-logo"
            className="w-12 h-12 rounded-md border border-neutral-200 bg-white"
          />
          <div className="space-y-2">
            <Badge className="bg-success-main rounded-md px-2 py-1 text-xs font-bold text-white capitalize">
              {jobData.job_type}
            </Badge>

            <p className="text-xl font-bold">{jobData.title}</p>
            <p className="text-m-regular text-gray-500">Rakamin</p>
          </div>
        </div>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-semibold"
          onClick={() => navigate(`/career/apply/${jobData.id}`)}>
          Apply
        </Button>
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-3 text-gray-700 leading-relaxed">
        <h3 className="font-semibold text-base">Description</h3>
        {Array.isArray(jobData.job_description) ? (
          <ul className="list-disc pl-6 space-y-2">
            {jobData.job_description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        ) : (
          <p>{jobData.job_description}</p>
        )}
      </div>
    </div>
  );
};

export default CareerDetail;
