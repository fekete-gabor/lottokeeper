import { OperatorGame, OperatorHistory, Summary } from "./index";
import { useMainContext } from "../context/main_context";

export const OperatorView = () => {
  const { viewMode, filteredNumbers, playerHistory, operatorHistory } =
    useMainContext();

  const content = () => {
    if (viewMode.operator === "game") {
      return <OperatorGame filteredNumbers={filteredNumbers} />;
    } else if (viewMode.operator === "history") {
      return (
        <OperatorHistory
          playerHistory={playerHistory}
          operatorHistory={operatorHistory}
        />
      );
    } else {
      return <Summary />;
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {content()}
    </div>
  );
};
