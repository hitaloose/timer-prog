import { FormEvent, useState } from "react";
import { useTimerStore } from "../../stores/timer";
import { ITimer } from "../../types/timer";
import { useNavigate } from "react-router";
import { PAGES } from "../../constants/pages";

export const Home = () => {
  const { timers, addTime, removeTimer } = useTimerStore();
  const navigate = useNavigate();

  const [newTimer, setNewTimer] = useState<Partial<ITimer>>({
    time: undefined,
    description: undefined,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!newTimer.time) {
      alert("Tempo não preenchido");
      return;
    }

    if (!newTimer.description) {
      alert("Descrição não preenchida");
      return;
    }

    addTime(newTimer as ITimer);
    setNewTimer({
      time: undefined,
      description: undefined,
    });
  };

  const handleStartClick = () => {
    if (!timers.length) {
      alert("Nenhuma sessão de timer criada");
      return;
    }

    navigate(PAGES.TIMER.PATH);
  };

  return (
    <div className="h-screen w-screen p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border p-1 rounded">
          <h1>Novo timer</h1>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              className="border rounded p-1"
              type="number"
              placeholder="Digite o tempo da sessão em minutos"
              value={newTimer.time}
              onChange={(event) =>
                setNewTimer((prev) => ({ ...prev, time: +event.target.value }))
              }
            />
            <input
              className="border rounded p-1"
              type="text"
              placeholder="Digite o texto"
              value={newTimer.description}
              onChange={(event) =>
                setNewTimer((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
            <button className="border rounded p-2 bg-gray-300" type="submit">
              Incluir
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2 border p-1 rounded">
          <h1>Timers</h1>

          <ul className="flex flex-col gap-2">
            {timers.map((timer, index) => (
              <li
                key={index}
                className="flex justify-between items-center gap-4 border rounded p-1"
              >
                <div>{timer.time}m</div>
                <div>{timer.description}</div>
                <button
                  className="border rounded p-1 bg-gray-300"
                  onClick={() => removeTimer(index)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border p-1 rounded">
          <button
            className="border rounded p-2 bg-gray-300"
            onClick={handleStartClick}
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};
