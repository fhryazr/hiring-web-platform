import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface TakePhotoFieldProps {
  value: string | null;
  required?: boolean;
  onChange: (value: string) => void;
}

export const TakePhotoField = ({
  value,
  onChange,
}: TakePhotoFieldProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 border-b pb-4">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <Camera size={24} />
          </div>
        )}
      </div>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          capture="user"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleUpload}
        />
        <Button variant="outline" type="button">
          <Camera className="w-4 h-4 mr-2" />
          Take a Picture
        </Button>
      </div>
    </div>
  );
};
