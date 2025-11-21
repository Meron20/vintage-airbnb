import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";

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
  price: number | null;
 
};


type Booking = {
  _id: string;
  checkIn: string;
  checkOut: string;
  name: string;
  phone: string;
  price: number;
  numberOfGuests: number;
  place: Place | null;
}


const BookingsPage = () => {
   const [bookings,setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    axios.get('/bookings')
      .then((response) => {
        setBookings(response.data)
      });

  }, []);

  if(bookings.length === 0) {
    return(
      <div>
        <AccountNav/>
        <p className="text-center text-gold mt-8">No bookings yet.</p>
      </div>
    )
  }
  return (
    <div>
      <AccountNav/>
      <div className="mt-6 space-y-6"> 
       {bookings.map((booking) => {
          const nights = booking.checkIn && booking.checkOut
            ? differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))
            : 0;

          return (
        

          <Link 
             key={booking._id}
             to={`/account/bookings/${booking._id}`} 
             className="flex gap-4 bg-charcoal rounded-2xl overflow-hidden mt-8  text-bodyText opacity-70"
             >
        {booking.place ? (

          <>
            <div className="w-48">
              <PlaceImg place={booking.place}/>
            </div>

            <div className="py-4">
               <h2 className="text-xl mb-4">{booking.place.title}</h2>

               <div className="mt-2 flex gap-2">
                
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                   </svg>
                   {new Date(booking.checkIn).toLocaleDateString()}


                   {" "} →{" "}
                 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  {new Date(booking.checkOut).toLocaleDateString()}

               </div>
               <div className="mt-2 text-xl">
                   {nights} nights | Total price: ${booking.price}
               </div>
            </div>
          </>
        ):(
          <div className='p-4 text-gold'>
            Place deleted or not available
          </div>
          )}
          </Link>
          );
        })}
      </div>
    </div>
  )
}

export default BookingsPage