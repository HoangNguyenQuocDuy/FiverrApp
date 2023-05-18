import { useState, createContext, Children } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [openGallery, setOpenGallery] = useState(false);
  const [itemsGallery, setItemsGallery] = useState([]);

  return (
    <AppContext.Provider
      value={{ openGallery, setOpenGallery, itemsGallery, setItemsGallery }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
