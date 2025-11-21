
import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../UserContext';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null)
  const {user, logout} = useUser()


  const toggleOpen = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };

  }, []);
   const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
   };

  return (
    <div className='relative  '>
      <div className=' flex flex-row items-center gap-3'>

        {user ? ( 
          <div
            onClick={() => handleNavigate("/account")}
            className="hidden md:block text-sm font-semibold py-2 px-4 rounded-full bg-gold text-charcoal cursor-pointer hover:opacity-90 transition"
          >
              {user.name}
         </div> 

        ): (
          <div className='hidden md:block text:sm font-semibold py-3 px-4 rounded-full bg-gold'>
             <FaUser className='w-5 h-5 text-black' />
           </div>
      
        )}

        <div
          onClick={toggleOpen}
          className='p-4 md:py-3 md:px-4 border-gold rounded-full flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu className='w-5 h-5' />
        </div>
      </div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[16vw] bg-charcoal text-beige overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
           {user ? (
              <>
                <MenuItem onClick={() => handleNavigate("/account")}label="My Account"/>
                <MenuItem
                  onClick= { async () => { 
                    logout(); 
                    setIsOpen(false)
                    navigate("/"); 
                }}  
                label="Logout"/>  
              </>
            ) : (

            <>
              <MenuItem onClick={() => handleNavigate("/login")} label='Login' />
              <MenuItem onClick={() =>handleNavigate ("/register")} label='Sign up' />
            </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
