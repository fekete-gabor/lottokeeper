import { useState, useEffect } from "react";
import { AllTickets } from "./index";
import { getUniqueLength, filterUniqueValues } from "../utils/getUniqueValues";
import { useMainContext } from "../context/main_context";

export const PlayerWinningTickets = ({ playerHistory }) => {
  const { allTimeWinnings, updateSummary } = useMainContext();

  const [activeBtn, setActiveBtn] = useState("all");
  const [uniqueNumbers] = useState(
    getUniqueLength(playerHistory, "winCounter")
  );
  const [filteredArray, setFilteredArray] = useState(
    filterUniqueValues(playerHistory, "winCounter")
  );

  const changeBtn = (e) => {
    const value = e.currentTarget.dataset.value;

    if (value === "all") {
      setActiveBtn(value);
      setFilteredArray(playerHistory);
      return;
    }

    const newFilteredArray = playerHistory.filter(
      (ticket) => ticket.winCounter.length === parseInt(value)
    );

    setFilteredArray(newFilteredArray);
    setActiveBtn(value);
  };

  useEffect(() => {
    updateSummary(playerHistory);
  }, []);

  if (uniqueNumbers && uniqueNumbers.length === 0) {
    return (
      <div className="mt-12">
        <h2>A nyerő szelvényeket a sorsolás után tekintheti meg</h2>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center w-fit my-2 mx-auto">
        <div className="w-fit mx-auto flex flex-col justify-center">
          <div className="flex justify-center items-center gap-2 p-2">
            <h2>Az ön számai</h2>
            <div className="w-[25px] h-[10px] bg-red-400 rounded-md"></div>
          </div>

          <div className="flex justify-center items-center gap-2 p-2">
            <h2>nyerő számok</h2>
            <div className="w-[25px] h-[10px] bg-green-400 rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 p-2">
        <h2>eddigi összes nyeremény: {allTimeWinnings.playerAllTime} Akcse</h2>
      </div>

      <div className="flex justify-center items-center gap-4 p-2 m-2">
        <div
          className={`${
            activeBtn === "all" && "bg-blue-400 text-white"
          } capitalize p-2 duration-300 ease-in-out rounded-md cursor-pointer text-lg`}
          data-value="all"
          onClick={(e) => changeBtn(e)}
        >
          <button>Összes</button>
        </div>

        {uniqueNumbers &&
          uniqueNumbers.map((number, i) => {
            return (
              number > 1 && (
                <div
                  className={`${
                    activeBtn === number.toString() && "bg-blue-400 text-white"
                  } capitalize p-2 duration-300 ease-in-out rounded-md cursor-pointer text-lg`}
                  key={i}
                  data-value={number}
                  onClick={(e) => changeBtn(e)}
                >
                  <button>{number} találatos</button>
                </div>
              )
            );
          })}
      </div>

      <div className="player-history-grid w-screen gap-y-4">
        <AllTickets array={filteredArray} />
      </div>
    </>
  );
};
