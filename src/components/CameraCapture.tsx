/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/hands";

interface CameraCaptureProps {
  onClose: () => void;
  onPoseChange: (poseIndex: number) => void;
  onCapture: (image: string) => void;
}

export function CameraCapture({
  // onClose,
  onPoseChange,
  onCapture,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [detector, setDetector] =
    useState<handPoseDetection.HandDetector | null>(null);
  const [status, setStatus] = useState("Initializing camera...");
  const [currentPose, setCurrentPose] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturing, setCapturing] = useState(false);

  // === UTIL FUNCTIONS ===
  function distance(a: any, b: any) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  function isFingerOpen(landmarks: any[], tipIndex: number, pipIndex: number) {
    return landmarks[tipIndex].y < landmarks[pipIndex].y;
  }

  function isThumbOpen(
    landmarks: any[],
    handedness: "Left" | "Right"
  ): boolean {
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const palmFacingCamera = thumbIP.z < 0;

    if (palmFacingCamera) {
      if (handedness === "Right") return thumbTip.x <= thumbIP.x;
      return thumbTip.x >= thumbIP.x; // untuk Left
    } else {
      if (handedness === "Right") return thumbTip.x >= thumbIP.x;
      return thumbTip.x <= thumbIP.x; // untuk Left
    }
  }

  const detectPose = useCallback(
    (landmarks: any[], handedness: "Left" | "Right"): string | null => {
      const fingers = {
        thumb: isThumbOpen(landmarks, handedness),
        index: isFingerOpen(landmarks, 8, 6),
        middle: isFingerOpen(landmarks, 12, 10),
        ring: isFingerOpen(landmarks, 16, 14),
        pinky: isFingerOpen(landmarks, 20, 18),
      };

      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];
      const thumbIndexDist = distance(thumbTip, indexTip);
      if (thumbIndexDist < 0.065) return null; // ignore 🫰 pose

      const openCount = Object.values(fingers).filter(Boolean).length;

      console.log(openCount);

      switch (true) {
        case openCount === 1 && fingers.index:
          return "1";
        case openCount === 2 && fingers.index && fingers.middle:
          return "2";
        case openCount === 3 && fingers.index && fingers.middle && fingers.ring:
          return "3";
        default:
          return null;
      }
    },
    []
  );

  // === CAMERA & MODEL INIT ===
  useEffect(() => {
    let localStream: MediaStream | null = null;
    let isMounted = true;

    const init = async () => {
      try {
        setStatus("Requesting camera permission...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (!isMounted) return;
        localStream = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        setStatus("Loading model...");
        const model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig: handPoseDetection.MediaPipeHandsMediaPipeModelConfig =
          {
            runtime: "mediapipe" as const,
            modelType: "full",
            maxHands: 1,
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
          };

        const det = await handPoseDetection.createDetector(
          model,
          detectorConfig
        );
        if (!isMounted) return;
        setDetector(det);
        setStatus("Model ready — show your hand!");
      } catch (err) {
        console.error("Camera init failed:", err);
        setStatus("Failed to access camera.");
      }
    };

    init();

    return () => {
      isMounted = false;
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Flip horizontal (mirror)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // Draw video
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }

        const url = URL.createObjectURL(blob); // lebih pendek dari base64
        onCapture(url);
      },
      "image/jpeg",
      0.7
    );

    setCurrentPose(0);
  }, [onCapture]);

  // === COUNTDOWN LOGIC ===
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      capturePhoto();
      setCountdown(null);
      setCapturing(false);
      return;
    }
    const timer = setTimeout(
      () => setCountdown((c) => (c ? c - 1 : null)),
      1000
    );
    return () => clearTimeout(timer);
  }, [countdown, capturePhoto]);

  // === DETECTION LOOP ===
  useEffect(() => {
    if (!detector || !videoRef.current || !canvasRef.current) return;
    let animationFrame: number;
    const ctx = canvasRef.current.getContext("2d");

    const detect = async () => {
      if (!ctx || !videoRef.current) return;
      canvasRef.current!.width = videoRef.current.videoWidth;
      canvasRef.current!.height = videoRef.current.videoHeight;

      const hands = await detector.estimateHands(videoRef.current, {
        flipHorizontal: true,
      });

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      if (hands.length > 0) {
        const { keypoints, keypoints3D, handedness } = hands[0];
        const landmarks = keypoints3D || keypoints;
        const pose = detectPose(landmarks, handedness);

        // === ✅ DRAW BOUNDING BOX + LABEL ===
        const xs = keypoints.map((pt) => pt.x);
        const ys = keypoints.map((pt) => pt.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const width = maxX - minX;
        const height = maxY - minY;

        // Kotak hijau di sekitar tangan
        ctx.beginPath();
        ctx.strokeStyle = pose ? "#43936c" : "#bc1121";
        ctx.lineWidth = 2;
        ctx.strokeRect(minX - 15, minY - 35, width + 35, height + 85);
        ctx.closePath();

        // === Label Pose ===
        const label = pose ? `Pose ${pose}` : "Undetected";
        ctx.font = "16px Nunito Sans ";
        const textWidth = ctx.measureText(label).width;
        const labelPaddingX = 10;

        // Kotak latar belakang teks
        ctx.fillStyle = pose ? "#43936c" : "#bc1121";
        ctx.fillRect(minX - 10, minY - 40, textWidth + labelPaddingX * 2, 30);

        // Teks label
        ctx.fillStyle = "white";
        ctx.fillText(label, minX - 10 + labelPaddingX, minY - 20);

        // === YOUR EXISTING DETECTION LOGIC ===
        if (pose && !capturing) {
          const poseNum = parseInt(pose);
          if (poseNum === currentPose + 1) {
            setCurrentPose(poseNum);
            onPoseChange(poseNum);
            setStatus(`✅ Pose ${poseNum} detected`);
            if (poseNum === 3) {
              setCapturing(true);
              setCountdown(3);
            }
          }
        }
      }

      animationFrame = requestAnimationFrame(detect);
    };

    detect();
    return () => cancelAnimationFrame(animationFrame);
  }, [detector, detectPose, currentPose, capturing, onPoseChange]);

  // === UI ===
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-6xl font-bold">
            {countdown}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">{status}</p>
      </div>
    </div>
  );
}
