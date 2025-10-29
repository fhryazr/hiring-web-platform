import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  required?: boolean;
  onChange: (value: string) => void;
}

export const SelectField = ({
  label,
  value,
  options,
  required,
  onChange,
}: SelectFieldProps) => (
  <div>
    <Label>
      {label}
      {required && <span className="text-red-500 ml-1 font-medium">*</span>}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Choose ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
