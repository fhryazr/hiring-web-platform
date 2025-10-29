import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GenderFieldProps {
  id: string;
  value: "female" | "male" | "";
  required?: boolean;
  onChange: (value: "female" | "male") => void;
}

export const GenderField = ({
  value,
  required,
  onChange,
}: GenderFieldProps) => (
  <div className="space-y-1">
    <Label>
      Pronoun (Gender)
      {required && <span className="text-red-500 ml-1 font-medium">*</span>}
    </Label>
    <RadioGroup
      value={value || "female"}
      onValueChange={(val) => onChange(val as "female" | "male")}
      className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="female" id="female" />
        <Label htmlFor="female">She/her (Female)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="male" id="male" />
        <Label htmlFor="male">He/him (Male)</Label>
      </div>
    </RadioGroup>
  </div>
);
