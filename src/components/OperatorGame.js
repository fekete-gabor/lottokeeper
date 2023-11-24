import { useState, useEffect } from "react";
import { AllTickets } from "./index";
import { CustomInput } from "./CustomInput";
import { generateTicket } from "../utils/generateTicket";
import { useMainContext } from "../context/main_context";

export const OperatorGame = ({ filteredNumbers }) => {
  const {
    filterNumbers,
    ticketNumbers,
    checkWinningTickets,
    calculateWinningAmount,
    submitOperatorTestNumbers,
    submitWinningNumbers,
    playerHistory,
    operatorHistory,
    winningNumbers,
    getPlayerMoney,
    getOperatorMoney,
    resetTest,
    updateSummary,
  } = useMainContext();

  const [gameStatus, setGameStatus] = useState("inProgress");
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const changeNumberOfTickets = (e) => {
    const value = e.currentTarget.value;

    setNumberOfTickets(value);
  };

  const submitTestTickets = () => {
    const { randomNumbersArray, newArray } = generateTicket(
      numberOfTickets,
      filteredNumbers
    );

    filterNumbers(newArray);
    submitOperatorTestNumbers(randomNumbersArray);
    setGameStatus("paused");
  };

  const onSubmit = async () => {
    const { randomNumbersArray } = generateTicket(1, ticketNumbers);

    await submitWinningNumbers(randomNumbersArray);
    await checkWinningTickets(playerHistory);
    await calculateWinningAmount(playerHistory, "player");
    await getPlayerMoney();
  };

  const reset = () => {
    resetTest();

    setGameStatus("inProgress");
  };

  useEffect(() => {
    checkWinningTickets(operatorHistory);
    calculateWinningAmount(operatorHistory, "operator");
    updateSummary([...playerHistory, ...operatorHistory]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorHistory, winningNumbers]);

  useEffect(() => {
    getOperatorMoney();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winningNumbers]);

  return (
    <>
      <div className="grid gap-4">
        <div className="flex justify-center gap-4 w-full">
          <CustomInput
            type="number"
            name="numberOfTickets"
            id="numberOfTickets"
            value={numberOfTickets}
            placeholder="1"
            handleChange={changeNumberOfTickets}
            className="p-2 text-xl rounded-md"
          />
          {gameStatus === "paused" ? (
            <button
              className="text-lg capitalize cursor-pointer"
              onClick={() => reset()}
            >
              reset
            </button>
          ) : (
            <button
              className="text-lg capitalize cursor-pointer"
              onClick={() => submitTestTickets()}
            >
              szelvény beküldése
            </button>
          )}
          <button
            className="capitalize text-lg bg-emerald-100 p-2 rounded-md ease-in-out duration-300 hover:bg-emerald-300 hover:text-white cursor-pointer"
            onClick={() => onSubmit()}
          >
            sorsolás indítása
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 p-2 text-center">
          <h1>nyerő számok</h1>
          <div className="flex gap-4">
            {winningNumbers.length > 0 &&
              winningNumbers.map((item) => {
                return (
                  <h1 key={item} className="text-green-600 font-bold text-2xl">
                    {item}
                  </h1>
                );
              })}
          </div>
          <h1>Összes szám</h1>
          <div className="flex flex-wrap justify-center gap-4 max-w-[70vw]">
            {filteredNumbers.map((number) => {
              return <h1 key={number}>{number}</h1>;
            })}
          </div>
        </div>

        <div className="flex flex-wrap overflow-hidden gap-4 justify-center items-center">
          <AllTickets array={operatorHistory} />
        </div>
      </div>
    </>
  );
};
