import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type ToggleValue = "mandatory" | "optional" | "off";

interface ProfileInformationToggleProps {
  value: ToggleValue;
  onChange: (value: ToggleValue) => void;
  disabledValues?: ToggleValue[]; // nilai yang ingin dinonaktifkan
}

const ProfileInformationToggle = ({
  value,
  onChange,
  disabledValues = [],
}: ProfileInformationToggleProps) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(val) => onChange(val as ToggleValue)}
      variant="outline"
      spacing={2}
      size="sm"
      className="justify-end">
      <ToggleGroupItem
        value="mandatory"
        aria-label="Mandatory"
        disabled={disabledValues.includes("mandatory")}
        className="data-[state=on]:bg-transparent data-[state=on]:text-primary-main">
        Mandatory
      </ToggleGroupItem>
      <ToggleGroupItem
        value="optional"
        aria-label="Optional"
        disabled={disabledValues.includes("optional")}
        className="data-[state=on]:bg-transparent data-[state=on]:text-primary-main">
        Optional
      </ToggleGroupItem>
      <ToggleGroupItem
        value="off"
        aria-label="Off"
        disabled={disabledValues.includes("off")}
        className="data-[state=on]:bg-transparent data-[state=on]:text-primary-main">
        Off
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ProfileInformationToggle;
