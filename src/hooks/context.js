import { createContext, useReducer } from "react";
import reducer, { initialState } from "../Store/Reducer";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default AppContext;
