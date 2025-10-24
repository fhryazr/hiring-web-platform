import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type ToggleValue = "mandatory" | "optional" | "off";

interface ProfileInformationToggleProps {
  value: ToggleValue;
  onChange: (value: ToggleValue) => void;
}

const ProfileInformationToggle = ({
  value,
  onChange,
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
        className="data-[state=on]:bg-transparent data-[state=on]:text-yellow-500">
        Mandatory
      </ToggleGroupItem>
      <ToggleGroupItem
        value="optional"
        aria-label="Optional"
        className="data-[state=on]:bg-transparent data-[state=on]:text-blue-500">
        Optional
      </ToggleGroupItem>
      <ToggleGroupItem
        value="off"
        aria-label="Off"
        className="data-[state=on]:bg-transparent data-[state=on]:text-gray-400">
        Off
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ProfileInformationToggle;
