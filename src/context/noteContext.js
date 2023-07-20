import { createContext, useReducer, useContext } from "react";
import { noteReducer } from "../reducer/noteReducer";

const NoteContext = createContext(null);

const NoteProvider = ({ children }) => {
  const [noteState, noteDispatch] = useReducer(noteReducer, {
    notes: [],
  });

  return (
    <NoteContext.Provider value={{ noteState, noteDispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => useContext(NoteContext);
export { NoteProvider, useNote };
