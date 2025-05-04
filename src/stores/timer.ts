import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ITimer } from "../types/timer";

export type TimeStoreState = {
  timers: ITimer[];
};

export type TimeStoreActions = {
  addTime(timer: ITimer): void;
  removeTimer(index: number): void;
};

export const useTimerStore = create<TimeStoreState & TimeStoreActions>()(
  persist(
    (set) => ({
      timers: [
        {
          time: 5,
          description:
            "Pedalada leve com resistência baixa (50-60 RPM), foco em mobilidade e respiração.",
        },
        {
          time: 5,
          description:
            "Aumenta gradualmente a resistência até sentir um leve esforço. Fica sentado.",
        },
        {
          time: 3,
          description:
            "Aumenta bastante a resistência, fica de pé como se estivesse subindo uma ladeira (60–70 RPM).",
        },
        {
          time: 2,
          description: "Senta, mantém a resistência, foco na força.",
        },
        {
          time: 3,
          description:
            "Fica de pé de novo, aumenta a cadência um pouco (70–75 RPM).",
        },
        {
          time: 2,
          description:
            "Senta, reduz levemente a resistência e mantém um ritmo moderado.",
        },
        {
          time: 15,
          description: "30 segundos sprint / 30 segundos recuperação leve",
        },
        {
          time: 10,
          description:
            "Resistência moderada/alta, cadência constante (70–80 RPM). Senta e foca em manter o ritmo sem parar. Respiração controlada, foco mental.",
        },
        {
          time: 5,
          description: "40s sprint forte / 20s recuperação leve",
        },
        {
          time: 5,
          description: "Pedalada leve, reduzindo a resistência aos poucos",
        },
        {
          time: 5,
          description:
            "Desce da bike e faz alongamentos: quadríceps, posterior de coxa, panturrilha, lombar.",
        },
      ],
      addTime: (timer) => set((prev) => ({ timers: [...prev.timers, timer] })),
      removeTimer: (index) =>
        set((prev) => {
          const shadowTimers = prev.timers;

          shadowTimers.splice(index, 1);

          return { timers: shadowTimers };
        }),
    }),
    { name: "TIMER_PROG" }
  )
);
