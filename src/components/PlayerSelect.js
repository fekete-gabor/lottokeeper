import { useState } from "react";
import { CustomInput } from "./CustomInput";
import playerBG from "../assets/player.svg";
import operatorBG from "../assets/operator.svg";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../context/main_context";

export const PlayerSelect = () => {
  const { player, selectPlayer } = useMainContext();
  const navigate = useNavigate();

  const [active, setActive] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.value;

    selectPlayer({ ...player, playerName: name });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const playerType = e.currentTarget.dataset.value;
    console.log(playerType);
    if (playerType === "player") {
      const payload = {
        ...player,
        active: playerType,
        playerCredit: "10000",
        operatorCredit: "0",
      };
      selectPlayer(payload);
      return navigate("/");
    }

    if (playerType === "operator") {
      const payload = {
        ...player,
        active: playerType,
        playerCredit: "10000",
        operatorCredit: "0",
      };
      selectPlayer(payload);
      return navigate("/");
    }
  };

  return (
    <section className="min-h-screen">
      <div className="h-screen flex flex-col md:flex-row justify-center lg:gap-12 items-center">
        <div
          className="h-full bg-red-500 w-full lg:h-[500px] lg:max-w-[500px] lg:shadow-sm lg:shadow-blue-500/40 lg:rounded-full overflow-hidden flex justify-center items-center text-center ease-in-out duration-300 lg:hover:shadow-blue-800/60 lg:hover:shadow-xl lg:hover:-translate-y-2 border-solid border-4 border-black lg:border-0 relative select-none cursor-pointer"
          data-value="player"
          onClick={() => setActive("player")}
        >
          <img
            src={playerBG}
            alt="player"
            className="w-full h-full object-cover object-center absolute"
          />

          <div className="w-full z-10 p-4 relative">
            <div className="bg-slate-800 w-full h-full absolute top-0 left-0 opacity-25 z-[-1]"></div>
            {active === "player" ? (
              <form onSubmit={onSubmit}>
                <CustomInput
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Kérem válasszon felhasználó nevet"
                  handleChange={handleChange}
                  className="p-2 text-2xl rounded-md w-full required text-center"
                />
                <button
                  className="text-xl bg-green-100 rounded-md p-2 mt-4 ease-in-out duration-300 hover:bg-green-400 hover:text-white capitalize"
                  data-value="player"
                  onClick={(e) => onSubmit(e)}
                >
                  mentés
                </button>
              </form>
            ) : (
              <h1 className="text-[4rem]">Játékos</h1>
            )}
          </div>
        </div>
        <div
          className="h-full w-full lg:h-[500px] lg:max-w-[500px] lg:shadow-sm lg:shadow-blue-500/40 lg:rounded-full overflow-hidden flex justify-center items-center text-center ease-in-out duration-300 lg:hover:shadow-orange-800/60 lg:hover:shadow-xl bg-slate-300 lg:hover:-translate-y-2 border-solid border-4 border-black lg:border-0 relative select-none cursor-pointer"
          data-value="operator"
          onClick={() => setActive("operator")}
        >
          <img
            src={operatorBG}
            alt="operator"
            className="w-full h-full object-cover object-center absolute"
          />

          <div className="w-full z-10 p-4 relative">
            <div className="bg-slate-800 w-full h-full absolute top-0 left-0 opacity-25"></div>
            <h1 className="text-[4rem]">Üzemeltető</h1>
          </div>
        </div>
      </div>
    </section>
  );
};
