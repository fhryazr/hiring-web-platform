import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { JobTypes } from "@/types/jobTypes";

interface SelectWithLabelProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: JobTypes) => void;
  options: { label: string; value: JobTypes }[];
  className?: string;
}

export const SelectWithLabel = ({
  id,
  label,
  required,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  className,
}: SelectWithLabelProps) => {
  return (
    <Field className={cn(className)}>
      <FieldLabel htmlFor={id}>
        <span>
          {label}
          {required && (
            <span className="after:content-['*'] after:ml-1 after:text-danger-main" />
          )}
        </span>
      </FieldLabel>

      <Select defaultValue="" value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};
