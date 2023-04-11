import { useState, createContext, Children } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [openGallery, setOpenGallery] = useState(false);
  const [itemsGallery, setItemsGallery] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    id: 1,
    userName: "Damn",
    isSeller: false,
  })

  return (
    <AppContext.Provider
      value={{ openGallery, setOpenGallery, itemsGallery, setItemsGallery, currentUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
