import { useReducer, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import Header from "./components/header/Header";
import MealSummary from "./components/meal-summary/MealSummary";
import Meals from "./components/meals/Meals";
import Modal from "./components/modal/Modal";
const stateReducer = (state, action) => {
  if (action.type === "OPEN_CLOSE") {
    return {
      ...state,
      openModalState: !state.openModalState
    }
  }
}
function App() {
  const [state, dispatchState] = useReducer(stateReducer, { openModalState: false })
  function toggleModalHandler() {
    dispatchState({ type: "OPEN_CLOSE" })
  }

  return (
    <div className="App">
      <Header onClick={toggleModalHandler} />
      <MealSummary></MealSummary>
      <Meals></Meals>
      {state.openModalState && createPortal(
        <Modal onClick={toggleModalHandler} />,
        document.getElementById('modal')
      )}
    </div>
  );
}

export default App;