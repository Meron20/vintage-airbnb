 import {useContext} from 'react';
 import { UserContext } from './UserContext';
import { Link, Navigate, useLocation } from 'react-router-dom';


const AccountPage = () => {
  const {ready,user} = useContext(UserContext);
  const location = useLocation()
  const subpage = location.pathname.split('/')?.[2] || 'profile';

  if(!ready){
    return <div className="text-center text-beige mt-10">Loading...</div>
  }

  if(ready && !user){
    return <Navigate to={'/login'}/>
  }
  const linkClasses = (type: string) =>
    `text-sm md:text-base font-medium py-2 px-4 rounded-full transition-colors duration-300 ${
      subpage === type
        ? 'bg-gold text-charcoal'
        : 'text-beige hover:text-gold'
    }`;

  return (
    <div className="min-h-screen bg-pageBg text-bodyText pt-24" >
      <nav  
          className="
          flex justify-center items-center gap-8 
          bg-charcoal text-beige border-b border-gold 
          shadow-md py-4 px-6 rounded-lg w-fit mx-auto
        ">
        <Link
         to='/account/bookings'
         className={linkClasses('bookings')}
         >
          My Bookings
        </Link>
        <Link 
           to='/account/places'
            className={linkClasses('places')}
           >
           My Places
          </Link>
          <Link
            to="/account/profile"
             className={linkClasses('places')}
        >
           My Profile
        </Link>
      </nav>
      <div className="mt-10 text-center">
        {subpage === 'profile' && (
          <>
            <h1 className="text-3xl font-heading text-gold">Welcome back, {user?.name}</h1>
            <p className="mt-2 text-beige opacity-80">Manage your bookings, places, and profile here.</p>
          </>
        )}

         {subpage === 'bookings' && (
          <div>
             <h2 className="text-2xl font-heading text-gold mb-4"> My Bookings</h2>
             <p className="mt-2 text-beige opacity-80">Coming soon — your upcoming trips will appear here!</p>
          </div>
        )}
        {subpage === 'places' && (
          <div>
             <h2 className="text-2xl font-heading text-gold mb-4">My Places</h2>
              <p className="text-beige opacity-80">
               Here you’ll be able to manage your listed properties.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountPage