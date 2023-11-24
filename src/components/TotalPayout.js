export const TotalPayout = ({ array }) => {
  return (
    <div className="flex flex-col gap-2">
      {array.length > 0 ? (
        array.map((ticket) => {
          const { number, counter, totalPayout } = ticket;
          return (
            <div key={number} className=" flex gap-2">
              <h2>
                {counter} db {number} találatos,
              </h2>
              <h2>Összesen: {totalPayout} Akcse</h2>
            </div>
          );
        })
      ) : (
        <h2>0 Akcse</h2>
      )}
    </div>
  );
};
