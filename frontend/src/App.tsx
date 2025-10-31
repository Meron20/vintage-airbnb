import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from "axios";
import AccountPage from "./AccountPage";

axios.defaults.baseURL = 'http://127.0.0.1:4000/';
axios.defaults.withCredentials = true;


function App() {
 
  return (
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element = {<IndexPage/>}/>
            <Route path="/login" element={<LoginPage/> }/>
            <Route path="/register" element={<RegisterPage/> }/>
            <Route path="/account" element={<AccountPage/>}/>
            <Route path="/account/bookings" element={<AccountPage/>}/>
            <Route path="/account/places" element={<AccountPage/>}/>

          </Route>
        </Routes>
      
  );
}

export default App;