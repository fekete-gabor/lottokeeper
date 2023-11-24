import { LotteryNumbers } from "./LotteryNumbers";

export const AllTickets = ({ array, compareArray }) => {
  if (array.length === 0) {
    return (
      <div className="mt-12">
        <h2>még nincsenek beküldött szelvények</h2>
      </div>
    );
  }

  return (
    <div className="my-12 player-history-grid w-screen gap-y-4">
      {array.map((tickets, i) => {
        return (
          <div key={i}>
            <div className="my-2 flex justify-between">
              <h2>{`${i + 1} / ${array.length}`}</h2>

              {tickets.winCounter.length > 1 && (
                <h2 className="text-green-500">
                  {`+${tickets.winCounter.length * 500} Akcse`}
                </h2>
              )}

              <h2>{tickets.owner}</h2>
            </div>
            <LotteryNumbers
              numbersArray={tickets.numbers}
              winningNumbers={tickets.winCounter}
            />
          </div>
        );
      })}
    </div>
  );
};
