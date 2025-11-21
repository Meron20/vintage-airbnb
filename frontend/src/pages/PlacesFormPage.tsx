import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
    const {id } = useParams();

    const [title, setTitle] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [perks, setPerks] = useState<string[]>([]);
    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [checkIn,setCheckIn] = useState<string>('');
    const [checkOut,setCheckOut] = useState<string>('');
    const [maxGuests,setMaxGuests] = useState<number | ''>('');
    const [price, setPrice] =useState<number | ''>('');
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/places/' + id).then((response) => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address)
            setAddedPhotos(data.addedPhotos)
            setDescription(data.description)
            setPerks(data.perks)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests);
            setPrice(data.price)

    });
 
    }, [id]);

    function preInput(header: string, description: string) {
        return (
          <>
            <h2 className="text-xl text-left text-gold mt-1">{header}</h2>
            <p  className="text-beige opacity-60 text-left text-sm mb-2">{description}</p>
          </>
        );
      }
   async  function savePlace(ev: React.FormEvent<HTMLFormElement>){
       ev. preventDefault()

       const placeData = {
                title, 
                address, 
                addedPhotos,
                description,  
                perks, 
                checkIn, 
                checkOut,
                maxGuests, 
                price
       }

         
        try{
            if(id) {
                // Update place 
                await axios.put(`/places/${id}`, placeData)

            } else {

                //CREATE
               
                await axios.post('/places', placeData);
            }
                
            setRedirect(true)
            
         } catch(error) {
           console.error('No places found', error)

         }

       } 
         if(redirect) {
           return <Navigate to='/account/places'/>
        } 
    

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-charcoal p-8 rounded-2xl shadow-lg"> 
        <AccountNav/>
        <h1 className="text-3xl font-semibold text-gold mb-6 text-center"> Add a New Place </h1> 

         <form className='flex flex-col space-y-6' onSubmit={savePlace}>
            <div>       
                {preInput('Title', 'A catchy title for your place.')}
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title - My lovely apartment'
                        className="w-full p-3 rounded-lg bg-beige text-charcoal focus:outline-none"
                    />
                </div>
                <div>
                    {preInput('Address', 'Adress to this place')}
                        <input
                            type="text"  
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='address'
                            className="w-full p-3 rounded-lg bg-beige text-charcoal focus:outline-none"
                        />
                        </div>
                        <div>
                            {preInput('Photos ', 'More = better')}
                            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                            
                        </div>

                        <div>
                            {preInput('Description', 'Description of the place')}
                            <textarea 
                              value={description} 
                              onChange={(e) => setDescription(e.target.value)}
                              className='bg-beige text-charcoal'/>
                        </div>

                        <div className='-mt-2'>
                            {preInput('Perks', 'Select all the perks of your place')}
                        </div>
                            
                            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 text-gold">
                              <Perks selected={perks} onChange={setPerks}/>
                            </div>
                        
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                            <div>
                                {preInput('Check In', 'Check in time')}
                                
                                <input 
                                    type="text"
                                    className="bg-beige p-1 rounded-lg text-charcoal"
                                    value={checkIn}
                                    onChange={(ev) => setCheckIn(ev.target.value)}
                                    placeholder="14"/>
                            </div>
                            <div>
                                {preInput('Check out', 'Check out time')}
                                <input 
                                    type="text" 
                                    className="bg-beige p-1 rounded-lg text-charcoal"
                                    value={checkOut}
                                    onChange={(ev) => setCheckOut(ev.target.value)}
                                    placeholder="11" />
                            </div>
                            <div>
                            {preInput('Guests', 'Max number of guests')}
                                <input 
                                    type="number" 
                                    className="bg-beige p-1 rounded-lg text-charcoal"
                                    value={maxGuests}
                                    onChange={(ev) => setMaxGuests(ev.target.value ? Number(ev.target.value) : "")
                                    }

                                    placeholder=''
                                />   
                            </div>
                            <div>
                                {preInput('Price', 'Price per night')}
                                <input 
                                    className="bg-beige p-1 rounded-lg text-charcoal"
                                    type="number" 
                                    value={price}
                                    onChange={ev => setPrice(ev.target.value === '' ? '' : Number(ev.target.value))}
                                />
                             </div>
                            </div>
                        
                            <button 
                                type='submit'           
                                className='bg-gold w-full  p-2 rounded-2xl text-charcoal  my-4'
                                >
                                    
                                    Save
                            </button>
         </form>
    </div>
  )
}

export default PlacesFormPage;