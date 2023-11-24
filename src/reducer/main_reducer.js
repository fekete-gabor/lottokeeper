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

const main_reducer = (state, action) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, isSidebarOpen: !state.isSidebarOpen };
  }

  if (action.type === CREATE_PLAYER) {
    localStorage.setItem("player", JSON.stringify(action.payload));

    return { ...state, player: action.payload };
  }

  if (action.type === SUBMIT_PLAYER_NUMBERS) {
    const temp = {
      ...state.player,
      playerCredit: parseInt(state.player.playerCredit) - 500,
    };

    localStorage.setItem("player", JSON.stringify(temp));

    const ticket = {
      id: state.playerHistory.length,
      numbers: action.payload,
      winCounter: [],
      payment: "",
      owner: state.player.playerName,
    };

    return {
      ...state,
      player: temp,
      playerHistory: [...state.playerHistory, ticket],
    };
  }

  if (action.type === SUBMIT_TEST_NUMBERS) {
    const temp = {
      ...state.player,
      operatorCredit:
        parseInt(state.player.operatorCredit) + action.payload.length * 500,
    };

    localStorage.setItem("player", JSON.stringify(temp));

    const tickets = action.payload.map((ticket, i) => {
      const obj = {
        id: i,
        numbers: ticket,
        winCounter: [],
        payment: "",
        owner: "teszt játék",
      };
      return obj;
    });

    return {
      ...state,
      player: temp,
      operatorHistory: [...state.operatorHistory, ...tickets],
    };
  }

  if (action.type === RESET_TEST) {
    return { ...state, filteredNumbers: state.ticketNumbers };
  }

  if (action.type === CHANGE_VIEW_MODE) {
    return { ...state, viewMode: action.payload };
  }

  if (action.type === CHECK_WINNING_TICKETS) {
    let tempArray = action.payload;

    const compareArrays = (array) => {
      array.winCounter = [];
      array.payment = "unavailable";

      array.numbers.forEach((candidateNumber) => {
        if (state.winningNumbers.includes(candidateNumber)) {
          array.payment = "available";
          array.winCounter.push(candidateNumber);
        }
      });
    };

    tempArray.forEach((ticket) => {
      if (ticket.payment === "unavailable" && ticket.winCounter.length >= 2) {
        return;
      }
      compareArrays(ticket);
    });

    return { ...state };
  }

  if (action.type === CALCULATE_WINNING_AMOUNT) {
    const { candidateArray, user } = action.payload;
    const tempArray = candidateArray;

    const calculatePay = tempArray.reduce((acc, current) => {
      let minPrice = 500;

      if (current.payment === "available" && current.winCounter.length >= 2) {
        return (acc += minPrice * current.winCounter.length);
      }
      return acc;
    }, 0);

    let newArray;

    if (user === "player") {
      newArray = {
        ...state.currentWinningAmount,
        playerCurrent: calculatePay,
      };
    } else {
      newArray = {
        ...state.currentWinningAmount,
        operatorCurrent: calculatePay,
      };
    }

    return { ...state, currentWinningAmount: newArray };
  }

  if (action.type === GET_PLAYER_MONEY) {
    const playerStats = {
      ...state.player,
      playerCredit:
        parseInt(state.player.playerCredit) +
        state.currentWinningAmount.playerCurrent,
    };

    localStorage.setItem("player", JSON.stringify(playerStats));

    const checkPayoutStatus = state.playerHistory.map((ticket) => {
      if (ticket.winCounter.length >= 2) {
        return (ticket = { ...ticket, payment: "unavailable" });
      }
      return ticket;
    });

    const amount =
      state.allTimeWinnings.playerAllTime +
      state.currentWinningAmount.playerCurrent;

    return {
      ...state,
      player: playerStats,
      playerHistory: checkPayoutStatus,
      currentWinningAmount: { ...state.currentWinningAmount, playerCurrent: 0 },
      allTimeWinnings: { ...state.allTimeWinnings, playerAllTime: amount },
    };
  }

  if (action.type === GET_OPERATOR_MONEY) {
    const playerStats = {
      ...state.player,
      operatorCredit:
        parseInt(state.player.operatorCredit) +
        state.currentWinningAmount.operatorCurrent,
    };

    localStorage.setItem("player", JSON.stringify(playerStats));

    const checkPayoutStatus = state.operatorHistory.map((ticket) => {
      if (ticket.winCounter.length >= 2) {
        return (ticket = { ...ticket, payment: "unavailable" });
      }
      return ticket;
    });

    const amount =
      state.allTimeWinnings.operatorAllTime +
      state.currentWinningAmount.operatorCurrent;

    return {
      ...state,
      player: playerStats,
      operatorHistory: checkPayoutStatus,
      currentWinningAmount: {
        ...state.currentWinningAmount,
        operatorCurrent: 0,
      },
      allTimeWinnings: { ...state.allTimeWinnings, operatorAllTime: amount },
    };
  }

  if (action.type === SET_NUMBERS_ARRAY) {
    return { ...state, filteredNumbers: action.payload };
  }

  if (action.type === SUBMIT_WINNING_NUMBERS) {
    return { ...state, winningNumbers: action.payload };
  }

  if (action.type === SUBSTRACT_OPERATOR_MONEY) {
    if (state.currentWinningAmount.playerCurrent === 0) return;

    let operatorCredit =
      state.player.operatorCredit - state.currentWinningAmount.playerCurrent;

    const playerStats = { ...state.player, operatorCredit };

    localStorage.setItem("player", JSON.stringify(playerStats));

    return { ...state, player: { ...state.player, operatorCredit } };
  }

  if (action.type === UPDATE_SUMMARY) {
    const mergedArray = action.payload;
    let winCount = mergedArray.map((item) => item.winCounter.length);

    const countWins = (array, number) => {
      let minPrice = 500 * number;

      const find = array[1].find((item) => item.number === number);

      if (find) {
        find.counter++;
        find.totalPayout = find.payoutPerTicket * find.counter;
        return;
      }

      array[1].push({
        counter: 1,
        number,
        payoutPerTicket: minPrice,
        totalPayout: minPrice,
      });
    };

    const summary = winCount.reduce(
      (acc, current) => {
        if (current < 2) {
          acc[0]++;
        } else {
          countWins(acc, current);
        }

        return acc;
      },
      [[0], []]
    );

    const losses = summary[0];
    const wins = summary[1];

    let totalIncome = wins.reduce((acc, current) => {
      acc += current.totalPayout;
      return acc;
    }, 0);

    const newArray = {
      wins,
      losses,
      numberOfTickets: mergedArray.length,
      operatorIncomePerTicket: state.operatorHistory.length * 500,
      totalIncome,
    };

    return { ...state, summary: newArray };
  }

  if (action.type === RESET_STATE) {
    const initialState = {
      player: { ...state.player },
      isSidebarOpen: true,
      ticketNumbers: action.payload,
      filteredNumbers: action.payload,
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

    return { ...initialState };
  }

  if (action.type === RESET_APP) {
    const initialState = {
      player: {
        active: "",
        playerName: "",
        playerCredit: "",
        operatorCredit: "",
      },
      isSidebarOpen: true,
      ticketNumbers: action.payload,
      filteredNumbers: action.payload,
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

    localStorage.clear();

    return { ...initialState };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default main_reducer;
