import {useContext} from 'react';
import { UserContext } from './UserContext';
import { Navigate, useParams } from 'react-router-dom';
import PlacesPage from './pages/PlacesPage';
import AccountNav from './AccountNav';


const ProfilePage = () => {
  const {ready,user} = useContext(UserContext);
  const { subpage = "profile" } = useParams();
  if(!ready){
    return <div className="text-center text-beige mt-10">Loading...</div>
  }

  if(ready && !user){
    return <Navigate to={'/login'}/>
  }
 
  return (
   
      <div className="min-h-screen bg-pageBg text-bodyText pt-24">
        <AccountNav/>

        <div className='max-w-4xl mx-auto mt-10 text-center'>
          {subpage === 'profile' && (
            <>
              <h1 className="text-3xl font-heading text-gold">Welcome back, {user?.name}</h1>
              <p className="mt-2 text-beige opacity-80">Manage your bookings, places, and profile here.</p>
            </>
          )}

          {subpage === 'bookings' && (
            <div>
              <h2 className="text-2xl font-heading text-gold mb-4"> My Bookings</h2>
              <p className=" text-beige opacity-80">Coming soon — your upcoming trips will appear here!</p>
            </div>
          )}
          {subpage === 'places' && (
            <PlacesPage/>
          )}
      </div>
    </div>

  )
}

export default ProfilePage