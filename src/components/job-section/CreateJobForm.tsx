import type { useCreateJobForm } from "@/hooks/useCreateJobForm";
import { DatePicker } from "../DatePicker";
import { InputWithLabel } from "../InputWithLabel";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import ProfileInformationToggle from "./ProfileInformationToggle";

type CreateJobFormProps = ReturnType<typeof useCreateJobForm>;

const CreateJobForm = ({
  jobName,
  setJobName,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  profileFields,
  numberCandidates,
  setNumberCandidates,
  setProfileField,
  handleSubmit,
}: CreateJobFormProps) => {
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
        />

        <Field>
          <FieldLabel htmlFor="job-type">
            <span className="after:content-['*'] after:text-danger-main">
              Job Type
            </span>
          </FieldLabel>
          <Select defaultValue="">
            <SelectTrigger id="job-type">
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fulltime">Full-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="parttime">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="job-description">
            <span className="after:content-['*'] after:text-danger-main">
              Job Description
            </span>
          </FieldLabel>
          <Textarea
            id="job-description"
            placeholder="Write a short description about the job..."
            className="resize-none"
          />
        </Field>

        <Field className="flex-row">
          <DatePicker label="Opening Date" />
          <DatePicker label="Closing Date" />
        </Field>

        <InputWithLabel
          id="numberCandidates"
          label="Number of Candidates Needed"
          placeholder="Ex. 2"
          value={numberCandidates || ""}
          type="number"
          onChange={(e) => setNumberCandidates(parseInt(e.target.value))}
        />
      </FieldGroup>

      {/* Salary Section */}
      <Separator className="border-t bg-neutral-10 text-neutral-30 border-dashed-custom mt-2" />
      <Label>Job Salary</Label>

      <FieldGroup className="flex-row gap-4">
        <Field>
          <Label>Minimum Estimated Salary</Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>Rp.</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="7.000.000"
              type="number"
              value={minSalary ?? ""}
              onChange={(e) => setMinSalary(Number(e.target.value))}
            />
          </InputGroup>
        </Field>

        <div className="w-[5%] relative">
          <Separator className="absolute bottom-4" orientation="horizontal" />
        </div>

        <Field>
          <Label>Maximum Estimated Salary</Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>Rp.</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="8.000.000"
              type="number"
              value={maxSalary ?? ""}
              onChange={(e) => setMaxSalary(Number(e.target.value))}
            />
          </InputGroup>
        </Field>
      </FieldGroup>

      {/* Profile Info Section */}
      <div className="space-y-4 rounded-xl border p-4">
        <Label className="mb-8">Minimum Profile Information Required</Label>
        <FieldGroup className="gap-4 px-4 py-5">
          {Object.entries(profileFields).map(([key, value]) => (
            <div key={key}>
              <Field className="flex-row justify-between items-center">
                <Label>{key.replace(/_/g, " ")}</Label>
                <ProfileInformationToggle
                  value={value}
                  onChange={(val) => setProfileField(key, val)}
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
