import { useState } from "react";
import { WinningNumbers, PayoutPerTicket, TotalPayout } from "./index";
import { SummaryTemplate } from "./index";
import { summaryBtns } from "../utils/userBtns";
import { useMainContext } from "../context/main_context";

export const Summary = () => {
  const { summary, allTimeWinnings } = useMainContext();
  const { wins, losses, numberOfTickets, operatorIncomePerTicket } = summary;

  const [activeBtn, setActiveBtn] = useState("all");

  const handleChange = (e) => {
    const value = e.currentTarget.dataset.value;
    setActiveBtn(value);
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap justify-center gap-4 lg:gap-8 m-2 p-2 lg:max-w-[50vw] custom-border rounded-md">
        <div
          className={`${
            activeBtn === "all" && "bg-blue-400 text-white"
          } capitalize p-2 duration-300 ease-in-out rounded-md cursor-pointer text-lg`}
          data-value="all"
          onClick={(e) => handleChange(e)}
        >
          <button className="text-xl">Összes</button>
        </div>

        {summaryBtns.map((btn) => {
          return (
            <div
              key={btn.id}
              className={`${
                activeBtn === btn.value && "bg-blue-400 text-white"
              } capitalize p-2 duration-300 ease-in-out rounded-md cursor-pointer text-lg`}
              data-value={btn.value}
              onClick={(e) => handleChange(e)}
            >
              <button className="text-xl">{btn.text}</button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center text-center p-2 mt-12 gap-12">
        <SummaryTemplate
          id="wins"
          activeBtn={activeBtn}
          title="Nyerő szelvények"
          component={<WinningNumbers array={wins} />}
        />
        <SummaryTemplate
          id="losses"
          activeBtn={activeBtn}
          title="Nyeretlen szelvények száma"
          component={<h2>{losses || 0}</h2>}
        />
        <SummaryTemplate
          id="payoutPerTicket"
          activeBtn={activeBtn}
          title="Egyes találatokra szelvényenként kifizetendő nyeremény"
          component={<PayoutPerTicket array={wins} />}
        />
        <SummaryTemplate
          id="totalPayoutPerWinCount"
          activeBtn={activeBtn}
          title="Egyes találatokra összesen kifizetendő nyeremény"
          component={<TotalPayout array={wins} />}
        />
        <SummaryTemplate
          id="numberOfTickets"
          activeBtn={activeBtn}
          title="Összes szelvény száma"
          component={<h2>{numberOfTickets}</h2>}
        />
        <SummaryTemplate
          id="operatorIncomePerTicket"
          activeBtn={activeBtn}
          title="Összes szelvény után járó bevétel"
          component={<h2>{operatorIncomePerTicket} Akcse</h2>}
        />
        <SummaryTemplate
          id="totalPayout"
          activeBtn={activeBtn}
          title="Összes találatra összesen kifizetendő összeg"
          component={
            <h2>
              {allTimeWinnings.playerAllTime + allTimeWinnings.operatorAllTime}{" "}
              Akcse
            </h2>
          }
        />
        <SummaryTemplate
          id="operatorAllTimeIncome"
          activeBtn={activeBtn}
          title="Üzemeltető nyeresége"
          component={
            <h2>
              {operatorIncomePerTicket + allTimeWinnings.operatorAllTime} Akcse
            </h2>
          }
        />
      </div>
    </div>
  );
};
