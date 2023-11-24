export const WinningNumbers = ({ array }) => {
  return (
    <div className="flex flex-col gap-2">
      {array.length > 0 ? (
        array.map((ticket) => {
          const { number, counter } = ticket;
          return (
            <div key={number} className=" flex gap-2">
              <h2>{`${counter} db ${number} találatos`}</h2>
            </div>
          );
        })
      ) : (
        <h2>0</h2>
      )}
    </div>
  );
};
