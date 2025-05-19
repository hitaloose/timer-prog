import { useEffect, useMemo, useRef, useState } from "react";
import { useTimerStore } from "../../stores/timer";

function formatToMinutesSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");

  return `${paddedMins}:${paddedSecs}`;
}

export const Timer = () => {
  const { timers } = useTimerStore();

  const [preTimerFinished, setPreTimerFinished] = useState(false);

  const [currentTimerIndex, setCurrentTimerIndex] = useState(-1);
  const [currentTimer, setCurrentTimer] = useState(5);

  const [finished, setFinished] = useState(false);

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const totalTimerIndex = useMemo(() => timers.length - 1, [timers.length]);

  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
        wakeLockRef.current.addEventListener("release", () => {
          console.log("Wake Lock liberado");
        });
        console.log("Wake Lock ativado");
      }
    } catch (e) {
      console.error("Erro ao ativar Wake Lock:", e);
    }
  }

  async function releaseWakeLock() {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch (e) {
      console.error("Erro ao liberar Wake Lock:", e);
    }
  }

  useEffect(() => {
    requestWakeLock();

    const intervalId = setInterval(() => {
      setCurrentTimer((prev) => {
        if (prev <= 0) {
          setPreTimerFinished(true);
          setCurrentTimerIndex((prev) => {
            const newIndex = prev + 1;

            if (newIndex > totalTimerIndex) {
              clearInterval(intervalId);
              setFinished(true);
              releaseWakeLock();
              return 0;
            }

            return newIndex;
          });
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      releaseWakeLock();
    };
  }, [totalTimerIndex]);

  useEffect(() => {
    if (!preTimerFinished) {
      return;
    }

    setCurrentTimer(timers[currentTimerIndex]?.time * 60);
  }, [currentTimerIndex, preTimerFinished, timers]);

  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="h-full flex justify-center items-center">
        {!finished ? (
          <div className="flex flex-col justify-center items-center gap-4 p-1">
            <h1 className="text-3xl text-gray-50">
              {currentTimerIndex + 1}/{totalTimerIndex + 1}
            </h1>
            <h1 className="text-5xl text-gray-50">
              {formatToMinutesSeconds(currentTimer)}
            </h1>
            {preTimerFinished && (
              <h1 className="text-4xl text-gray-50 text-center">
                {timers[currentTimerIndex]?.description}
              </h1>
            )}
          </div>
        ) : (
          <h1 className="text-5xl text-gray-50 text-center">Finalizado</h1>
        )}
      </div>
    </div>
  );
};
