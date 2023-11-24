import { useState, useEffect } from "react";
import { AllTickets, PlayerWinningTickets } from "./index";
import { useMainContext } from "../context/main_context";

export const PlayerHistory = () => {
  const { playerHistory, checkWinningTickets, calculateWinningAmount } =
    useMainContext();

  const [selectTickets, setSelectTickets] = useState("all");

  const showTickets = (e) => {
    const value = e.target.dataset.value;

    setSelectTickets(value);
  };

  useEffect(() => {
    checkWinningTickets(playerHistory);
    calculateWinningAmount(playerHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center mt-12">
      <div className="w-fit mx-auto flex justify-center gap-4">
        <div className="">
          <button
            className={`${
              selectTickets === "all" && "bg-blue-400 text-white"
            } p-2 rounded-md cursor-pointer capitalize text-lg duration-300 ease-in-out`}
            data-value="all"
            onClick={(e) => showTickets(e)}
          >
            összes szelvény
          </button>
        </div>

        <div className="">
          <button
            className={`${
              selectTickets === "winners" && "bg-blue-400 text-white"
            } p-2 rounded-md cursor-pointer capitalize text-lg duration-300 ease-in-out`}
            data-value="winners"
            onClick={(e) => showTickets(e)}
          >
            nyerő szelvények
          </button>
        </div>
      </div>

      {selectTickets === "all" ? (
        <AllTickets array={playerHistory} />
      ) : (
        <PlayerWinningTickets playerHistory={playerHistory} />
      )}
    </div>
  );
};
