import type { useCreateJobForm } from "@/hooks/useCreateJobForm";
import { DatePicker } from "../DatePicker";
import { InputWithLabel } from "../InputWithLabel";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import ProfileInformationToggle from "./ProfileInformationToggle";
import { TextAreaWithLabel } from "../TextAreaWithLabel";
import { SelectWithLabel } from "../SelectWithLabel";
import { SalaryInput } from "../SalaryInput";

type CreateJobFormProps = ReturnType<typeof useCreateJobForm>;

const CreateJobForm = ({
  jobName,
  jobDescription,
  jobType,
  minSalary,
  maxSalary,
  profileFields,
  numberCandidates,
  openingDate,
  closingDate,
  setJobName,
  setMinSalary,
  setMaxSalary,
  setProfileField,
  setNumberCandidates,
  setOpeningDate,
  setClosingDate,
  setJobDescription,
  setJobType,
  handleSubmit,
}: CreateJobFormProps) => {
  const mandatoryField = ["full_name", "email", "photo_profile"];

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      {/* Job Info */}
      <FieldGroup className="gap-4">
        <InputWithLabel
          id="jobName"
          label="Job Name"
          placeholder="Ex. Front End Engineer"
          type="text"
          value={jobName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setJobName(e.target.value)
          }
          required
        />

        <SelectWithLabel
          id="job-type"
          label="Job Type"
          required
          placeholder="Select Job Type"
          options={[
            { value: "full-time", label: "Full-time" },
            { value: "contract", label: "Contract" },
            { value: "part-time", label: "Part-time" },
            { value: "internship", label: "Internship" },
            { value: "freelance", label: "Freelance" },
          ]}
          value={jobType ?? ""}
          onChange={setJobType}
        />

        <TextAreaWithLabel
          id="job-description"
          label="Job Description"
          placeholder="Ex. "
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <Field className="flex-row">
          <DatePicker
            label="Opening Date"
            value={openingDate}
            onChange={setOpeningDate}
            required
          />
          <DatePicker
            label="Closing Date"
            value={closingDate}
            onChange={setClosingDate}
            required
          />
        </Field>

        <InputWithLabel
          id="numberCandidates"
          label="Number of Candidates Needed"
          placeholder="Ex. 2"
          value={numberCandidates || ""}
          type="number"
          onChange={(e) => setNumberCandidates(parseInt(e.target.value))}
          required
        />
      </FieldGroup>

      <Separator className="border-t bg-neutral-10 text-neutral-30 border-dashed-custom mt-2" />

      {/* Salary Section */}
      <Label>Job Salary</Label>

      <FieldGroup className="flex-row gap-4">
        <SalaryInput
          label="Minimum Estimated Salary"
          placeholder="7.000.000"
          value={minSalary ?? 0}
          onChange={setMinSalary}
        />

        <div className="w-[5%] relative">
          <Separator className="absolute bottom-4" orientation="horizontal" />
        </div>

        <SalaryInput
          label="Maximum Estimated Salary"
          placeholder="8.000.000"
          value={maxSalary ?? 0}
          onChange={setMaxSalary}
        />
      </FieldGroup>

      {/* Profile Info Section */}
      <div className="space-y-4 rounded-xl border p-4">
        <Label className="mb-8">Minimum Profile Information Required</Label>
        <FieldGroup className="gap-4 px-4 py-5">
          {Object.entries(profileFields).map(([key, value]) => (
            <div key={key}>
              <Field className="flex-row justify-between items-center mb-2">
                <Label>
                  {key
                    .split("_")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </Label>
                <ProfileInformationToggle
                  value={value}
                  onChange={(val) => setProfileField(key, val)}
                  disabledValues={
                    mandatoryField.includes(key) ? ["optional", "off"] : []
                  }
                />
              </Field>
              <Separator />
            </div>
          ))}
        </FieldGroup>
      </div>
    </form>
  );
};

export default CreateJobForm;
