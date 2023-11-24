import { PlayerView, OperatorView } from "./index";
import { useMainContext } from "../context/main_context";

export const Dashboard = () => {
  const { player } = useMainContext();
  const { active } = player;

  return <div>{active === "player" ? <PlayerView /> : <OperatorView />}</div>;
};
