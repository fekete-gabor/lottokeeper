export const SummaryTemplate = ({ id, activeBtn, title, component }) => {
  return (
    <div
      className={
        activeBtn === id || activeBtn === "all"
          ? "flex flex-col items-center gap-4"
          : "hidden"
      }
      id={id}
    >
      <h1>{title}</h1>
      {component}
    </div>
  );
};
