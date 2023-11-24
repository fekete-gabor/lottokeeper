import { useState, useEffect } from "react";
import { LotteryNumbers } from "./index";
import { useMainContext } from "../context/main_context";

export const LotteryTicket = () => {
  const { submitPlayerNumbers, player } = useMainContext();
  const { playerCredit } = player;

  const [numbersArray, setNumbersArray] = useState([]);
  const [error, setError] = useState();

  const addNumber = (e) => {
    const number = e.target.dataset.value;

    const findNumber = numbersArray.find(
      (existingNumbers) => existingNumbers === parseInt(number)
    )
      ? true
      : false;

    if (findNumber) {
      const newArray = numbersArray.filter(
        (existingNumbers) => existingNumbers !== parseInt(number)
      );

      return setNumbersArray(newArray);
    }

    if (numbersArray.length === 5) return;

    setNumbersArray([...numbersArray, parseInt(number)]);
  };

  const submitTicket = () => {
    if (parseInt(playerCredit) - 500 < 0) {
      return setError("Nincs elég fedezet a szelvény beküldéséhez!");
    }

    submitPlayerNumbers(numbersArray);

    setNumbersArray([]);
  };

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError();
      }, 5000);
  }, [error]);

  return (
    <div className="w-fit flex flex-col items-end gap-4 p-4">
      <div className="w-full flex justify-between">
        <div className="">
          <h2 className={numbersArray.length === 5 ? "text-green-600" : ""}>{`${
            numbersArray.length || 0
          } / 5`}</h2>
        </div>

        {error && (
          <div className="">
            <h2 className="text-red-400">{error}</h2>
          </div>
        )}
      </div>

      <LotteryNumbers numbersArray={numbersArray} handleChange={addNumber} />

      <button
        className={
          numbersArray.length !== 5
            ? "opacity-25 cursor-not-allowed p-2 capitalize text-xl"
            : "capitalize bg-green-100 rounded-md p-2 ease-in-out duration-300 hover:bg-green-400 hover:text-white cursor-pointer text-xl"
        }
        disabled={numbersArray.length !== 5}
        onClick={() => submitTicket()}
      >
        szelvény beküldése
      </button>
    </div>
  );
};
