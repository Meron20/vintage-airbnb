
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'


const Navbar = () => {
  
  return (
    <div className="fixed w-full  z-50 text-beige shadow-md">
        <div className='py-4 '>
           <Container>
             <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                <Logo />
                <Search/>
                <UserMenu/>
             </div>
           </Container>
        </div>
        
    </div>
  )
}

export default Navbar