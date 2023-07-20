import { createContext, useReducer, useContext } from "react";
import { tagReducer } from "../reducer/tagReducer";

const TagContext = createContext(null);

const TagProvider = ({ children }) => {
  const [tagState, tagDispatch] = useReducer(tagReducer, {
    tags: [
      "work",
      "home",
    ],
  });

  return (
    <TagContext.Provider value={{ tagState, tagDispatch }}>
      {children}
    </TagContext.Provider>
  );
};

const useTag = () => useContext(TagContext);

export { TagProvider, useTag };
