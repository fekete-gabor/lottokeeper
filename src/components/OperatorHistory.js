import { useState } from "react";
import { LotteryNumbers } from "./LotteryNumbers";

export const OperatorHistory = ({ playerHistory, operatorHistory }) => {
  const [allTickets] = useState([...playerHistory, ...operatorHistory]);

  if (allTickets.length === 0) {
    return (
      <div>
        <h2>még nincsenek beküldött szelvények</h2>
      </div>
    );
  }

  return (
    <div className="player-history-grid w-screen gap-y-4">
      {allTickets &&
        allTickets.map((ticket, i) => {
          return (
            <div className="" key={i}>
              <div className="my-2 flex justify-between">
                <h2>{`${i + 1} / ${allTickets.length}`}</h2>

                {ticket.payment === "available" &&
                  ticket.winCounter.length > 1 && (
                    <h2 className="text-green-500">
                      {`+${ticket.winCounter.length * 500} Acse`}
                    </h2>
                  )}

                <h2>{ticket.owner}</h2>
              </div>
              <LotteryNumbers
                numbersArray={ticket.numbers}
                winningNumbers={ticket.winCounter}
              />
            </div>
          );
        })}
    </div>
  );
};
