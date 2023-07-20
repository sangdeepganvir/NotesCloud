import { createContext, useReducer, useContext } from "react";
import { archiveNoteReducer } from "../reducer/archiveReducer";

const ArchiveContext = createContext(null);

const ArchiveProvider = ({ children }) => {
  const [archiveNoteState, archiveNoteDispatch] = useReducer(archiveNoteReducer, {
    archive: [],
  });

  return (
    <ArchiveContext.Provider value={{ archiveNoteState, archiveNoteDispatch }}>
      {children}
    </ArchiveContext.Provider>
  );
};

const useArchive = () => useContext(ArchiveContext);
export { ArchiveProvider, useArchive };
