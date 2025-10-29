import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PhoneFieldProps {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export const PhoneField = ({ value, required, onChange }: PhoneFieldProps) => (
  <div>
    <Label>
      Phone Number
      {required && <span className="text-red-500 ml-1 font-medium">*</span>}
    </Label>
    <div className="flex items-center">
      <span className="px-3 py-2 border border-r-0 rounded-l-md bg-gray-50">
        +62
      </span>
      <Input
        type="tel"
        placeholder="812XXXXXXX"
        className="rounded-l-none"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);
