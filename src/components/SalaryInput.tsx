import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

interface SalaryInputProps {
  label: string;
  placeholder?: string;
  value?: number | string;
  onChange?: (value: number) => void;
  currencySymbol?: string; // default: Rp.
  required?: boolean;
}

export const SalaryInput = ({
  label,
  placeholder,
  value,
  onChange,
  currencySymbol = "Rp.",
  required = false,
}: SalaryInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value);
    if (onChange) onChange(numericValue);
  };

  return (
    <Field>
      <Label>
        {label}
        {required && <span className="text-danger-main ml-1">*</span>}
      </Label>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>{currencySymbol}</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder}
          type="number"
          value={value ?? ""}
          onChange={handleChange}
        />
      </InputGroup>
    </Field>
  );
};
