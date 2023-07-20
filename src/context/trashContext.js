import { createContext, useReducer, useContext } from "react";
import { trashReducer } from "../reducer/trashReducer";

const TrashContext = createContext(null);

const TrashProvider = ({ children }) => {
  const [trashNoteState, trashNoteDispatch] = useReducer(trashReducer, {
    trash: [],
  });

  return (
    <TrashContext.Provider value={{ trashNoteState, trashNoteDispatch }}>
      {children}
    </TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);
export { TrashProvider, useTrash };
