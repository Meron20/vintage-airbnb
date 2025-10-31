import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

interface User {
    name?: string;
    email?: string;
    _id?: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    ready: boolean;
    logout: () => void;
  }
  
  
 export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    ready: false,
    logout: () => {}
  });


export const UserContextProvider: React.FC<{children: React.ReactNode}> = ({ children, }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready,setReady]= useState(false)

  const logout = async() => {
    await axios.post('/logout')
    setUser(null);
   
  };
  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => setUser(data))
      .catch((err) => console.error("Error fetching profile:", err))
      .finally(() => setReady(true)); 
  }, []);
  
 return (
    <UserContext.Provider value={{ user, setUser, ready, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
  };
  

