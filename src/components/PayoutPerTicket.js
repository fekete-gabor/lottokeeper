export const PayoutPerTicket = ({ array }) => {
  return (
    <div className="flex flex-col gap-2">
      {array.length > 0 ? (
        array.map((ticket) => {
          const { number, payoutPerTicket } = ticket;
          return (
            <div key={number} className=" flex gap-2">
              <h2>{number} találat</h2> = <h2>{payoutPerTicket} Akcse / db</h2>
            </div>
          );
        })
      ) : (
        <h2>0 Akcse</h2>
      )}
    </div>
  );
};
