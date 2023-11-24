import { useMainContext } from "../context/main_context";

export const LotteryNumbers = ({
  numbersArray,
  winningNumbers,
  handleChange,
}) => {
  const { player: user, viewMode, ticketNumbers } = useMainContext();
  const { active } = user;
  const { player, operator } = viewMode;

  return (
    <div className="ticket w-fit border-solid border-2 border-slate-400 rounded-md text-center">
      {ticketNumbers.map((number) => {
        return (
          <h2
            className={`
            ${numbersArray.includes(number) && "active"}
            ${
              winningNumbers &&
              winningNumbers.includes(number) &&
              winningNumbers.length > 1 &&
              "bg-emerald-100 "
            }
            ${
              (active === "player" && player === "game") ||
              (active === "operator" && operator === "game")
                ? "cursor-pointer"
                : "cursor-default"
            }
             border-solid border-b-[1px] border-r-[1px] border-slate-200 p-4 `}
            key={number}
            data-value={number}
            onClick={handleChange && handleChange}
          >
            {number}
          </h2>
        );
      })}
    </div>
  );
};
