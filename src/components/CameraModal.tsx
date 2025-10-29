import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CameraCapture } from "./CameraCapture";
import { useState } from "react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (image: string) => void;
}

export function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const [currentPose, setCurrentPose] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const poses = ["/pose-1.svg", "/pose-2.svg", "/pose-3.svg"];

  // Reset state setiap kali modal ditutup
  const handleClose = () => {
    const videoEl = document.querySelector("video");
    if (videoEl && videoEl.srcObject) {
      const stream = videoEl.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoEl.srcObject = null;
    }

    setCurrentPose(0);
    setPhoto(null);
    onClose(); // baru tutup modal
  };

  // Saat user selesai capture dari CameraCapture
  const handleCapture = (image: string) => {
    setPhoto(image); // simpan hasil foto
  };

  // Saat user klik save (kirim ke parent)
  const handleSave = () => {
    if (photo) {
      onCapture(photo);
      handleClose();
    }
  };

  // Saat user klik retake
  const handleRetake = () => {
    setPhoto(null);
    setCurrentPose(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl min-h-176">
        <DialogHeader
          title="Raise Your Hand to Capture"
          description="We'll take the photo once your hand pose is detected"
        />
        {/* Jika belum ada hasil foto, tampilkan kamera */}
        {!photo ? (
          <div className="p-4">
            {isOpen && (
              <CameraCapture
                onClose={onClose}
                onPoseChange={setCurrentPose}
                onCapture={handleCapture}
              />
            )}

            {/* pose progress */}
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2 text-left">
                To take a picture, follow the hand poses in the order shown
                below. The system will automatically capture the image once the
                final pose is detected.
              </p>

              <div className="flex items-center space-x-4">
                {poses.map((pose, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div
                      className={`rounded-lg border-2 transition-all ${
                        i + 1 <= currentPose
                          ? "bg-primary-surface border-primary-main"
                          : "bg-gray-100 border-gray-200"
                      }`}>
                      <img
                        src={pose}
                        alt={`Pose ${i + 1}`}
                        className={`w-14 h-14 object-cover rounded-lg ${
                          i + 1 <= currentPose ? "" : "opacity-30"
                        }`}
                      />
                    </div>
                    {i < poses.length - 1 && (
                      <span className="text-gray-400">➜</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Jika sudah ada hasil foto → tampilkan preview
          <div className="flex flex-col p-4 items-center justify-center space-y-4">
            <img
              src={photo}
              alt="Captured"
              className="h-100 w-full object-cover object-center rounded-lg border"
            />
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleRetake}>
                Retake
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
