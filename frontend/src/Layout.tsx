import { useState } from "react"
import Navbar from "./components/navbar/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer";

export type HandleSearchType = (place: string, from: string, to: string, guests: string) => void;

const Layout = () => {
  const [handleSearch, setHandleSearch] = useState<HandleSearchType | null>(null)

  return (
    <div className="min-h-screen bg-pageBg text-bodyText font-body py-4 px-8">
      <Navbar handleSearch={handleSearch} />
       <main className="pt-24 px-6">
        <Outlet context={{ setHandleSearch }} />
      </main>
      <Footer />

    </div>
  )
}

export default Layout
