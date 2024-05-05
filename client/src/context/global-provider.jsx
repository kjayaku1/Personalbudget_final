import { createContext, useReducer } from "react";
import { reducer, initialState } from './reducer';

export const GlobalContext = createContext();

const GlobalProvider = ({ children, ...other }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch, ...other };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
export default GlobalProvider;