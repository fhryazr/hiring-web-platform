import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  type: string;
  id: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithLabel({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <Label htmlFor={type}>
        <span className="after:content-['*'] after:text-red-500">{label}</span>
      </Label>
      <Input
        value={value}
        type={type}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
