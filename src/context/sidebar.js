import { createContext } from "react";
import { useContext, useState } from "react";

const SidbarContext = createContext(null);

const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  return (
    <SidbarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidbarContext.Provider>
  );
};

const useSidebar = () => useContext(SidbarContext);

export { SidebarProvider, useSidebar };
