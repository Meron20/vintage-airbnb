import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import { perkIcons } from "../components/perksIcons";


type Place = {
    _id: string;
    title: string;
    address: string;
    addedPhotos: string[];
    description: string;
    perks: string[];
    checkIn: number | null;
    checkOut: number | null;
    maxGuests: number | null;
    price?: number; 
  
  }

const PlaceDetailPage = () => {
    const {id} = useParams();
    const [place, setPlace] = useState<Place | null>(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if(!id) return;

        const getPlace = async () => {   
         try{

             const response = await axios.get(`/places/${id}`);
                setPlace(response.data)

         } catch(error){
            console.error('The place is not found:', error);
         }

      }
       getPlace()

    }, [id]);

    if (!place) 
        return <div className="mt-20 text-center text-gold">Loading...</div>;

    if(showAllPhotos) {
        return (
            <div className="fixed inset-0 bg-pageBg overflow-y-auto"> 
               <div className="max-w-6xl mx-auto mb-10">

                <div className="flex justify-between items-center mb-6 p-10">
                    <h2 className="text-3xl  font-heading ">Photos of {place.title}</h2>
                    <button onClick={()=> setShowAllPhotos(false)} className=" fixed right-12 top-30 text:sm flex gap-1 py-1 px-1 rounded-2xl bg-gold text-charcoal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                         </svg>

                        Close photos
                    </button>
                </div>
                <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                   {place?.addedPhotos?.length > 0 && place.addedPhotos.map(addedPhoto => (
                     <div key={addedPhoto}>
                        <img 
                          src={"http://localhost:4000/uploads/" + addedPhoto} 
                          alt=""
                          className="w-full h-auto rounded-lg object-cover"

                        />
                    </div>
                ))}
              </div>
            </div>
        )
    }


  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0">
         <div className="flex justify-between mt-8">
            <div className="mb-6">
              <Link 
                to ={'/'}
                className=" border-2 border-beige flex items-center gap-3 p-3 rounded-lg text-gold hover:bg-beige/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                 Back to search
            
              </Link>
            </div>
             <div className="flex  gap-3">
                <div>
                    < Link 
                        to ={'/'}
                        className=" border-2 border-beige flex items-center gap-3 p-3 rounded-lg text-gold hover:bg-beige/20 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                        </svg>

                    Share
                    
                    </Link>
                </div>
                <div>

                    <Link 
                        to ={'/'}
                        className=" border-2 border-beige flex items-center gap-3 p-3 rounded-lg text-gold hover:bg-beige/20 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                    save
                    
                    </Link>
                 </div>
             </div>
         </div>

            <div className="mt-8">
              <h1 className="text-5xl font-heading">{place.title}</h1>
            </div>

           <div className="relative">
             <div className="grid gap-4 grid-cols-[2fr_1fr] mt-8 rounded-lg overflow-hidden ">
                 <div className="col-span-1">
                    {place.addedPhotos?.[0] && (
                        <div>
                          <img onClick={() => setShowAllPhotos(true)} className ='aspect-square w-full h-full object-cover rounded-lg' src={'http://localhost:4000/uploads/'+ place.addedPhotos[0]} alt=''/>
                        </div>
                    )}
                </div>

                <div className="grid grid-rows-2 gap-4">
                    {place.addedPhotos?.[1] && (
                       <img onClick={() => setShowAllPhotos(true)} className ='aspect-square w-full object-cover cusror-pointer rounded-lg' src={'http://localhost:4000/uploads/'+ place.addedPhotos[1]} alt=''/>
                    )}
                     

                    <div className="overflow-hidden">
                      {place.addedPhotos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className ='aspect-square w-full object-cover  cusror-pointer rounded-lg relative top-2' src={'http://localhost:4000/uploads/'+ place.addedPhotos[2]} alt=''/>
                       )}
                    </div>
                </div>
            </div>
             <button 
                onClick={() => setShowAllPhotos(true)}
               className="absolute m-1 bottom-0 bg-gold  text-charcoal font-semibold right-0 py-2 px-2  cusror-pointer rounded-2xl shadow-md">
                 
                 Show more photos

            </button>
        </div>

        <div className="mt-4">
           <a className='my-2 gap-1 flex font-semibold underline' target='_blank' href={'https://maps.google.com/?q' + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                {place.address}
            </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-12 mt-12">
            
              <div className="lg:col-span-2 pr-6">
                 <h2 className="text-3xl mb-4 font-bold text-gold">About this place</h2>
                     {place.description}
                   <button className="py-2 px-4 mt-6 flex rounded-xl bg-gold text-charcoal">Show more</button>
                </div>
                {/* Check-in: {place.checkIn} <br />
                Check-out: {place.checkOut} <br />
                Max number of guests: {place.maxGuests} */}
           
           <div className="lg:col-span-1 ">
             <BookingWidget price={place.price ?? null} _id={place._id} />
           </div>
         </div>
           <div className="mt-8">
             <div className="col-span-2 md:col-span-1">
               <h2 className='text-3xl mb-4 font-bold text-gold'>What this place offers</h2>
        
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-3 text-beige text-xl">
                    {place.perks?.map((perk) => (
                        <div 
                            key={perk} 
                            className="flex items-center gap-2 p-2 rounded-xl "
                         >
                            <span className="text-gold text-sm">{perkIcons[perk]}</span>
                            <span>{perk}</span>
                        </div>
                     ))}
                    </div>
                </div>
           </div>
        
      </div>
  )
}

export default PlaceDetailPage