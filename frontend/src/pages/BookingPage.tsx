import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays } from "date-fns";

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
  place: Place;
};

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  async function sendBookingRequest() {
    navigate("/thank-you");

    // try {
    //     await axios.post("/confirm-booking", { bookingId: id });
    //     navigate("/thank-you");
    // } catch (error) {
    //     console.error(error);
    // }
}

  useEffect(() => {
    if (!id) return;

    axios.get(`/bookings`).then((res) => {
      const found = res.data.find((b: Booking) => b._id === id);
      setBooking(found);
    });
  }, [id]);

  if (!booking) {
    return <div className="text-center text-gold mt-8">Loading booking...</div>;
  }
   const nights = differenceInCalendarDays(
    new Date(booking.checkOut),
    new Date(booking.checkIn)
  );




  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 text-bodyText">
      <h1 className="text-4xl font-bold text-gold">Booking Request</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <div className="bg-charcoal p-6 rounded-2xl shadow-xl text-beige space-y-6">

          <h2 className="text-2xl font-semibold">Choose when to pay</h2>

       
          <div className="flex items-center justify-between bg-charcoal/40 p-3 rounded-xl">
            <div>
              <p className="text-lg font-semibold">Pay today</p>
              <p className="text-sm opacity-80">Pay the full amount now</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gold">${booking.price}</span>
              <div className="w-5 h-5 border-2 border-gold rounded-full"></div>
            </div>
          </div>

      
          <div className="flex items-center justify-between bg-charcoal/40 p-3 rounded-xl">
            <div>
              <p className="text-lg font-semibold">Pay within 30 days</p>
              <p className="text-sm opacity-80">No interest, no fees</p>
            </div>
            <div className="w-5 h-5 border-2 border-gold rounded-full"></div>
          </div>

  
          <div className="bg-charcoal/50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Payment method</p>
                <p className="text-sm opacity-70">Debit card</p>
              </div>
              <button className="text-gold font-semibold underline">
                Change
              </button>
            </div>
          </div>
        </div>

        <div className="bg-charcoal p-6 rounded-2xl shadow-xl text-beige">
       
          <div className="rounded-xl overflow-hidden mb-4">
            <PlaceImg place={booking.place} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your booking</h2>

   
          <p className="text-xl font-semibold">{booking.place.title}</p>
          <p className="mt-1 opacity-70">{booking.numberOfGuests} guests</p>

  
          <div className="mt-4 flex items-center gap-2">
            <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
            <span className="text-gold">→</span>
            <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
          </div>

          <p className="mt-2 opacity-80">
            {nights} nights × ${booking.place.price} ={" "}
            <span className="text-gold font-semibold">${booking.price}</span>
          </p>


          <div className="mt-6 flex justify-between text-xl font-bold">
            <p>Total</p>
            <p className="text-gold">${booking.price}</p>
          </div>

          <button onClick= {sendBookingRequest} className="w-full mt-6 bg-gold text-charcoal py-3 rounded-xl font-semibold">
            Send booking request
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
