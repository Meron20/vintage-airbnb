import { Link} from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Place = {
    _id: string;
    owner: string;
    title: string;
    address: string;
    addedPhotos: string[];
    description: string;
    perks: string[];
    checkIn: number | null;
    checkOut: number | null;
    maxGuests: number | null;
    price?: number | null;
};

function PlacesPage () {
    const [places, setPlaces] = useState<Place[]>([])
    
    useEffect(() => {
      axios.get('/user-places').then(({data}) => {
        setPlaces(data)
      })
    },[]);

  return (
    <div>
        <AccountNav/> 
        
        <div className='text-center'>
            <h2 className="text-2xl font-heading text-gold mb-2">My Places</h2>
             <div className="text-beige opacity-70 mb-6">
                (Your saved places will appear here)
              </div>

            <Link 
              to={'/account/places/new'} 
              className=' inline-flex gap-1 bg-gold  text-charcoal mb-2 p-2'
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

             Add new place
            </Link>
            
        </div>
        <div className='mt-4 mb-4'>
            {places.length > 0 && places.map(place => (
                <Link to={`/account/places/${place._id}`} className='flex cursor-pointer flex-col md:flex-row gap-4 bg-charcoal p-4 rounded-lg mb-6'>
                    <div className=' w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gold grow shrink-0'>
                        {place.addedPhotos.length > 0  && (
                            <img 
                              src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`}   
                              alt=''
                              className="w-full h-full object-cover"
                            />
                        )}

                    </div>
                    <div className='grow'>
                        <h2 className='text-beige text-lg font-semibold wrap-break-word'> {place.title}</h2>
                        <p className='text-sm mt-2 text-bodyText opacity-70 wrap-break-word'>{place.description}</p>
                    </div>
                </Link>
            )) }
        </div>
     </div>
  )
}

export default PlacesPage