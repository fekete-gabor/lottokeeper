import { useState } from "react";
import { LotteryTicket, PlayerHistory, CustomInput } from "./index";
import { useMainContext } from "../context/main_context";

export const PlayerView = () => {
  const { viewMode, player, selectPlayer } = useMainContext();
  const { active, playerName } = player;

  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.value;

    setName(name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length !== 0) selectPlayer({ ...player, playerName: name });
  };

  if (active === "player" && playerName?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="w-full md:w-1/2 m-2 p-2 flex flex-col items-center gap-4 text-center"
        >
          <CustomInput
            type="text"
            name="name"
            id="name"
            placeholder="Kérem válasszon felhasználó nevet"
            handleChange={handleChange}
            className="p-2 text-2xl rounded-md w-full"
          />
          <button
            className="text-xl bg-green-100 rounded-md p-2 ease-in-out duration-300 hover:bg-green-400 hover:text-white capitalize"
            onClick={(e) => onSubmit(e)}
          >
            mentés
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {viewMode.player === "game" ? (
        <div className="-translate-y-[5rem] w-full h-screen flex justify-center items-center">
          <LotteryTicket />
        </div>
      ) : (
        <div className="player-history-grid">
          <PlayerHistory />
        </div>
      )}
    </div>
  );
};
