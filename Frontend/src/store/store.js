import { createContext, useContext } from "react";
import { useReducer } from "react";

export const userContext = createContext()


function userData(){


  const [user , dispatch] = useReducer()

  return(
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  )
}

export default userData