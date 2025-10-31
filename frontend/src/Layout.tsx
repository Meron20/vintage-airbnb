import Navbar from "./components/navbar/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen bg-pageBg text-bodyText font-body">
        <Navbar/>
        <main className="pt-24 px-6">
           <Outlet />
        </main>

    </div>
  )
}

export default Layout