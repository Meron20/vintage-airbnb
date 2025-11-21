import { useLocation } from "react-router-dom"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import type { HandleSearchType } from "../../Layout"

type NavbarProps = {
  handleSearch?: HandleSearchType | null;
}

const Navbar = ({ handleSearch }: NavbarProps) => {
  function onSearch(place: string, from: string, to: string, guests: string) {
    handleSearch?.(place, from, to, guests);
  }
  return (
    <div className="fixed w-full z-50 text-beige shadow-md">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            
            {onSearch && (
              <div className="flex-1 flex justify-center">
                <Search  handleSearch={ onSearch} />
              </div>
            )}

            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
