import { playerBtns } from "../utils/userBtns";
import { useMainContext } from "../context/main_context";

export const PlayerBtns = ({ playerCredit }) => {
  const { viewMode, changeViewMode } = useMainContext();

  const handleChange = (e) => {
    e.preventDefault();

    const value = e.currentTarget.dataset.value;

    changeViewMode({ ...viewMode, player: value });
  };

  return (
    <div className="flex flex-col gap-6">
      <div data-value="balance" onClick={(e) => handleChange(e)}>
        <h2>egyenleg: {playerCredit} akcse</h2>
      </div>
      {playerBtns.map((btn) => {
        const { id, value, text } = btn;

        return (
          <div
            key={id}
            className={
              viewMode.player === value
                ? "w-fit rounded-md text-xl bg-blue-300 p-2 text-white cursor-pointer"
                : "cursor-pointer"
            }
            data-value={value}
            onClick={(e) => handleChange(e)}
          >
            <h2 className="">{text}</h2>
          </div>
        );
      })}
    </div>
  );
};
