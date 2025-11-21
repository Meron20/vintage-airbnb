import axios from "axios";
import {  useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom";


type OutletContext = {
  setHandleSearch: (fn: Function) => void;
};

 
type Place = {
  _id: string;
  title: string;
  address: string;
  addedPhotos: string[];
  price?: number | null;
  era?: string;
  maxGuests?: number;
  checkIn?: string;
  checkOut?: string;
}

function IndexPage () {
 

  const [places, setPlaces] = useState<Place[]>([])
  const [filteredPlaces, setFilteredPlaces] =  useState<Place[]>([])
  const { setHandleSearch } = useOutletContext<OutletContext>();

 


  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
      setFilteredPlaces(response.data)
      console.log('Loaded places:', response.data)
    })

  },[]);

 

 async function handleSearch(place: string,  guests: string) {
  
    try {
      const response = await axios.get('/places/search', {
        params: { place, guests }

      })
      setFilteredPlaces(response.data)
      
    } catch (error) {
      console.error('Search failed', error)
      
    }
   
  }

  useEffect(() => {
    setHandleSearch(() => handleSearch);
  }, []);



  return (

  <div className=" mt-4">
    <h1 className="text-6xl font-bold text-center font-heading text-gold m-10 mb-14">
        Stay in the era you love
    </h1>
    
{/* <div className="flex gap-4 mb-4">
  <button
    onClick={() => setFilteredPlaces(places)} 
    className="bg-gold px-4 py-2 rounded-full text-charcoal"
  >
    Show all places
  </button>
</div> */}



    <div className=" mt-8 gap-x-6 grid gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {filteredPlaces.length > 0 && filteredPlaces.map(place => (
         <Link to={'/place/'+ place._id} >
            <div className="rounded-2xl bg-charcoal flex mb-2">
               {place.addedPhotos?.[0] && (
                  <img className='rounded-2xl object-cover w-200' src={'http://localhost:4000/uploads/' + place.addedPhotos?.[0]} alt={place.title} />
               )}
             </div>
             <h2 className="text-sm truncate"> {place.title}</h2>
             <h3 className="text-bodyText opacity-50">{place.address}</h3>
             <div className="opacity-50 mt-2">
               <span className="">${place.price}</span>  per night
             </div>

          
         </Link>

      ))}
    </div>
  </div>
  )
}

export default IndexPage