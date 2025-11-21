import axios from "axios"
import { differenceInCalendarDays } from "date-fns"
import { useState } from "react"
import { Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/datepicker.css";


type BookingWidgetProps = {
    _id: string;
    price: number | null;
};
   

const BookingWidget = ({_id, price}: BookingWidgetProps) => {

    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const[redirect,setRedirect] = useState('')


    let numberOfNights = 0;
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace()  {

     try{
        if(numberOfNights <= 0) {
            alert('Please pick valid check in check-out dates')
            return;
        }
        if (typeof price !== 'number') {
            alert ('Price not available for this place.');
            return;
        }

        const data = {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            place: _id,
            price: numberOfNights * price,
        }
     const response =  await axios.post('/bookings', data )
         alert ('Booking successful')

         const bookingId = response.data._id;
         setRedirect(`/account/bookings/${bookingId}`);

    }catch(error) {
        console.error(error)
        alert('Failed to book');

     }  
    }
     if(redirect){
        return <Navigate to={redirect}/>
     }

  return (
    <div >
    <div className="bg-gold rounded-xl p-4 mb-6">
        <h2 className="text-charcoal font-bold text-2xl font-body mb-4">Book Your Stay</h2>

        {price && (
            <div className="text-charcoal text-center text-xl">
            Price: $ {price} / per night
         </div>

        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  sm:gap-4 lg:gap-0 mt-4">
            <div className="text-gold border bg-beige  p-4 rounded-lg flex flex-col ">
                <label className="mb-1">CHECK IN:</label>

                <DatePicker
                  selected={checkIn}
                  onChange={(date: Date | null) => setCheckIn(date)}
                  placeholderText="Select date"
                  className="bg-beige text-charcoal p-2 border border-gold rounded-l w-full"

          />

            </div>
            <div className="text-gold border bg-beige p-3 rounded-lg flex flex-col " >
                <label className="mb-1">CHECK OUT:</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  placeholderText="Select date"
                  className="bg-beige text-charcoal p-2 border border-gold rounded-l w-full"
                  calendarClassName="bg-charcoal text-beige rounded-lg border border-transparent" 
      />
            
            </div>
        </div>
        <div className="text-gold flex flex-col border bg-beige p-4 sm:mt-4 lg:mt-0 rounded-lg " >
            <label className="mb-1">Number of guests:</label>
            <input 
              className='rounded-2xl p-1 text-charcoal border border-gold' 
              type="number" 
              placeholder="1 guest "
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(Number(ev.target.value))}
            />
        </div>
         {numberOfNights > 0 && (
           <div className="text-gold flex flex-col border bg-beige p-4 overflow-hidden rounded-lg " >
                <label>Your full name:</label>
                <input 
                    className='rounded-2xl py-2 px-3 text-charcoal border border-gold' 
                    type="text" 
                    value={name}
                    placeholder="Name:"
                    onChange={(ev) => setName(ev.target.value)}
                />
                <label>Phone number:</label>
                <input 
                    className='rounded-2xl py-2 px-3 text-charcoal border border-gold' 
                    type="tel" 
                    value={phone}
                    placeholder="Tel:"
                    onChange={(ev) => setPhone(ev.target.value)}
                />
           </div>
         )}
        
      
        <button  
           onClick={bookThisPlace} 
           disabled={numberOfNights <= 0|| typeof price !== 'number'}
           className="bg-stone-800 w-full text-sm text-bodyText p-4  mt-4 rounded-lg"
           >
            Start reservation

            {numberOfNights > 0 && price && (
                <>
                   <span className="ml-2">Total: ${numberOfNights * price}</span>
                </>
            )}
            
        </button>
    </div>
</div>
  )
}

export default BookingWidget