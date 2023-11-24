import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducer/main_reducer";
import {
  TOGGLE_SIDEBAR,
  CREATE_PLAYER,
  SUBMIT_PLAYER_NUMBERS,
  SUBMIT_TEST_NUMBERS,
  RESET_TEST,
  CHANGE_VIEW_MODE,
  CHECK_WINNING_TICKETS,
  CALCULATE_WINNING_AMOUNT,
  GET_PLAYER_MONEY,
  GET_OPERATOR_MONEY,
  SET_NUMBERS_ARRAY,
  SUBMIT_WINNING_NUMBERS,
  SUBSTRACT_OPERATOR_MONEY,
  UPDATE_SUMMARY,
  RESET_STATE,
  RESET_APP,
} from "../actions/actions";

const checkLocalStorage = () => {
  const player = localStorage.getItem("player");

  if (player) return JSON.parse(localStorage.getItem("player"));
  return {
    active: "",
    playerName: "",
    playerCredit: "",
    operatorCredit: "",
  };
};

const allNumbers = Array.from({ length: 39 }, (_, index) => index + 1);

const initialState = {
  isSidebarOpen: true,
  player: checkLocalStorage(),
  ticketNumbers: allNumbers,
  filteredNumbers: allNumbers,
  playerHistory: [],
  operatorHistory: [],
  winningNumbers: [],
  currentWinningAmount: {
    playerCurrent: 0,
    operatorCurrent: 0,
  },
  allTimeWinnings: {
    playerAllTime: 0,
    operatorAllTime: 0,
  },
  summary: {
    wins: "",
    losses: "",
    numberOfTickets: "",
    operatorIncomePerTicket: "",
    totalIncome: "",
  },
  viewMode: {
    player: "game",
    operator: "game",
  },
};

const MainContext = React.createContext();

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

  const selectPlayer = (player) => {
    dispatch({ type: CREATE_PLAYER, payload: player });
  };

  const submitPlayerNumbers = (numbers) => {
    dispatch({ type: SUBMIT_PLAYER_NUMBERS, payload: numbers });
  };

  const submitOperatorTestNumbers = (numbers) => {
    dispatch({ type: SUBMIT_TEST_NUMBERS, payload: numbers });
  };

  const resetTest = () => {
    dispatch({ type: RESET_TEST });
  };

  const changeViewMode = (viewMode) => {
    dispatch({ type: CHANGE_VIEW_MODE, payload: viewMode });
  };

  const checkWinningTickets = (candidateArray) => {
    dispatch({ type: CHECK_WINNING_TICKETS, payload: candidateArray });
  };

  const calculateWinningAmount = (candidateArray, user) => {
    const payload = { candidateArray, user };
    dispatch({ type: CALCULATE_WINNING_AMOUNT, payload });
  };

  const getPlayerMoney = () => {
    dispatch({ type: GET_PLAYER_MONEY });
  };

  const getOperatorMoney = () => {
    dispatch({ type: GET_OPERATOR_MONEY });
  };

  const filterNumbers = (array) => {
    dispatch({ type: SET_NUMBERS_ARRAY, payload: array });
  };

  const submitWinningNumbers = (array) => {
    const payload = array[0];
    dispatch({ type: SUBMIT_WINNING_NUMBERS, payload });
  };

  const substractOperatorMoney = () => {
    dispatch({ type: SUBSTRACT_OPERATOR_MONEY });
  };

  const updateSummary = (array) => {
    dispatch({ type: UPDATE_SUMMARY, payload: array });
  };

  const resetState = () => {
    dispatch({ type: RESET_STATE, payload: allNumbers });
  };

  const resetApp = () => {
    dispatch({ type: RESET_APP, payload: allNumbers });
  };

  useEffect(() => {
    checkLocalStorage();
  }, [state.player, state.playerHistory, state.playerWinningAmount]);

  return (
    <MainContext.Provider
      value={{
        ...state,
        toggleSidebar,
        selectPlayer,
        submitPlayerNumbers,
        submitOperatorTestNumbers,
        resetTest,
        changeViewMode,
        checkWinningTickets,
        calculateWinningAmount,
        getPlayerMoney,
        getOperatorMoney,
        filterNumbers,
        submitWinningNumbers,
        substractOperatorMoney,
        updateSummary,
        resetState,
        resetApp,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return useContext(MainContext);
};
