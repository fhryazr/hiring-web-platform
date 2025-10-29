import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, UploadIcon } from "lucide-react";
import { InputWithLabel } from "../InputWithLabel";
import { DatePicker } from "../DatePicker";
import { useNavigate, useParams } from "react-router";
import { useJobStore } from "@/store/jobStore";
import type { Section, Field } from "@/types/jobTypes";
import { useApplyForm } from "@/hooks/useApplyJobForm";
import { CameraModal } from "../CameraModal";
import { InputGroup } from "../ui/input-group";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";
import DomicileSelect from "../DomicileSelect";

export default function ApplyForm() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState<Section[]>();
  const { jobId } = useParams<{ jobId: string }>();
  const { getJobById } = useJobStore();
  const { formData, handleChange, handleSubmit, FIELD_ORDER } =
    useApplyForm(jobId);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobId) {
      const jobApplicationData = getJobById(jobId);
      setApplicationForm(jobApplicationData?.application_form?.sections);
    }
  }, [jobId, getJobById]);

  const getAllFields = (): Field[] => {
    if (!applicationForm) return [];
    return applicationForm.flatMap((section) =>
      section.fields.filter(
        (field) => field.key && FIELD_ORDER.includes(field.key)
      )
    );
  };

  const getSortedFields = (): Field[] => {
    const fields = getAllFields();
    return fields.sort(
      (a, b) => FIELD_ORDER.indexOf(a.key!) - FIELD_ORDER.indexOf(b.key!)
    );
  };

  const renderField = (field: Field) => {
    if (!field.key) return null;
    const { key, validation } = field;
    const required = validation?.required ?? false;

    switch (key) {
      case "photo_profile":
        return (
          <div key={key} className="flex flex-col gap-3">
            <p className="text-xs font-bold">Photo profile</p>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border">
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No Photo
                </div>
              )}
            </div>

            <div>
              <Button
                className="text-sm font-bold"
                type="button"
                variant="outline"
                onClick={() => setOpenModal(true)}>
                <UploadIcon />
                Take a Picture
              </Button>
            </div>

            <CameraModal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onCapture={(data) => {
                setPhoto(data);
                handleChange("photo_profile", data);
              }}
            />
          </div>
        );

      case "full_name":
        return (
          <InputWithLabel
            key={key}
            id={key}
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            value={formData.full_name || ""}
            onChange={(e) => handleChange("full_name", e.target.value)}
            required={required}
          />
        );

      case "date_of_birth":
        return (
          <DatePicker
            key={key}
            label="Date of Birth"
            placeholder="Select date of birth"
            value={formData.date_of_birth ?? null}
            onChange={(date) =>
              handleChange("date_of_birth", date ?? undefined)
            }
            required={required}
          />
        );

      case "gender":
        return (
          <div key={key} className="space-y-1">
            <Label htmlFor={"gender"}>
              <span
                className={
                  required
                    ? "after:content-['*'] after:text-red-500 mb-2"
                    : "mb-2"
                }>
                Pronoun (Gender)
              </span>
            </Label>
            <RadioGroup
              value={formData.gender || ""}
              onValueChange={(val) =>
                handleChange("gender", val as "female" | "male")
              }
              className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="text-sm">
                  She/her (Female)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="text-sm">
                  He/him (Male)
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case "domicile":
        return (
          <div key={key}>
            <DomicileSelect
              formData={formData}
              handleChange={(val) => handleChange("domicile", val)}
              required={required}
            />
          </div>
        );

      case "phone_number":
        return (
          <div key={key}>
            <Label htmlFor={"phone_number"}>
              <span
                className={
                  required
                    ? "after:content-['*'] after:text-red-500 mb-2"
                    : "mb-2"
                }>
                Phone Number
              </span>
            </Label>
            <ButtonGroup className="w-full text-sm">
              <ButtonGroupText asChild>
                <Label htmlFor="phone_number">+62</Label>
              </ButtonGroupText>
              <InputGroup>
                <Input
                  id="phone_number"
                  type="tel"
                  placeholder="81239086"
                  className="rounded-l-none"
                  value={formData.phone_number || ""}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  required={required}
                />
              </InputGroup>
            </ButtonGroup>
          </div>
        );

      case "email":
        return (
          <InputWithLabel
            key={key}
            id={key}
            label="Email"
            placeholder="Enter your email address"
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            required={required}
          />
        );

      case "linkedin_link":
        return (
          <InputWithLabel
            key={key}
            id={key}
            label="LinkedIn Link"
            placeholder="https://linkedin.com/in/username"
            type="url"
            value={formData.linkedin_link || ""}
            onChange={(e) => handleChange("linkedin_link", e.target.value)}
            required={required}
          />
        );

      default:
        return null;
    }
  };

  const sortedFields = getSortedFields();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        navigate(`/career/apply/${jobId}/success`);
      }}
      className="max-w-176 mx-auto rounded-xl border p-10  shadow-sm space-y-5 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ArrowLeft
            onClick={() => navigate("/career")}
            className="cursor-pointer"
          />
          <h2 className="text-lg font-semibold">Apply Front End at Rakamin</h2>
        </div>
        <p className="text-sm text-gray-500">This field required to fill</p>
      </div>

      <div className="px-4 space-y-3">
        <p className="text-sm text-red-500 font-medium">* Required</p>
        {sortedFields.map((field) => renderField(field))}
      </div>

      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
        Submit
      </Button>
    </form>
  );
}
