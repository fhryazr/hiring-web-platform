import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextAreaWithLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const TextAreaWithLabel = ({
  id,
  label,
  required,
  error,
  className,
  ...props
}: TextAreaWithLabelProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>
        <span
          className={cn(
            required && "after:content-['*'] after:text-danger-main"
          )}>
          {label}
        </span>
      </FieldLabel>

      <Textarea
        id={id}
        className={cn("resize-none", className)}
        aria-invalid={!!error}
        {...props}
      />

      {error && <p className="text-danger-main text-sm mt-1">{error}</p>}
    </Field>
  );
};
