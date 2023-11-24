import { FaArrowLeft, FaArrowRight } from "../utils/icons";
import { PlayerBtns, OperatorBtns } from "./index";
import { useMainContext } from "../context/main_context";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, player, selectPlayer } =
    useMainContext();
  const { active, playerName, playerCredit, operatorCredit } = player;

  const changePlayer = (e) => {
    const playerType = e.target.dataset.value;

    selectPlayer({ ...player, active: playerType });
  };

  return (
    <aside
      className={`${
        !isSidebarOpen ? "translate-x-3/4 h-fit opacity-75" : "-translate-x-0 "
      } min-w-[250px] w-fit duration-200 bg-white custom-border rounded-md fixed top-1/2 -translate-y-[10rem] right-0 z-10`}
    >
      <div
        className="w-fit p-2 flex justify-end cursor-pointer"
        onClick={() => toggleSidebar()}
      >
        {isSidebarOpen ? <FaArrowRight className="mb-2" /> : <FaArrowLeft />}
      </div>

      <div
        className={`${
          !isSidebarOpen ? "hidden opacity-0" : "block opacity-100"
        } duration-200`}
      >
        <div className="flex gap-4 border-b-solid border-b-2 border-b-slate-500 mb-2 pb-2 cursor-pointer">
          <div
            className={
              active === "player"
                ? "rounded-md text-xl bg-blue-300 p-2 text-white"
                : "text-xl p-2"
            }
          >
            <h2 data-value="player" onClick={(e) => changePlayer(e)}>
              {playerName || "Játékos"}
            </h2>
          </div>

          <div
            className={
              active === "operator"
                ? "rounded-md text-xl bg-blue-300 p-2 text-white"
                : "text-xl p-2"
            }
          >
            <h2 data-value="operator" onClick={(e) => changePlayer(e)}>
              Üzemeltető
            </h2>
          </div>
        </div>

        <div className="">
          {active === "player" ? (
            <PlayerBtns playerCredit={playerCredit} />
          ) : (
            <OperatorBtns operatorCredit={operatorCredit} />
          )}
        </div>
      </div>
    </aside>
  );
};
