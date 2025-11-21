import { Link } from "react-router-dom"


const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex felx-col justify-center items-center bg-charcoal text-beige px-4">
        <div className="bg-charcoal/40 p-10 rounded-2xl shadow-xl max-w-lg text-center border border-gold/20">
          <div className="mb-6 flex justify-center ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20 text-gold"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
            <h1 className="font-heading text-4xl font-bold text-gold mb-4">
               Thank you for booking!
            </h1>
            <p className="opacity-80 mb-8 text-lg">
                Your booking request has been received.  
                We will send you a confirmation shortly.
            </p>
            <Link
               to="/account/bookings"
               className="bg-gold text-charcoal font-semibold py-3 w-full block rounded-xl shadow-md hover:bg-gold/90"
             >
                View booking detail
            </Link>

       
            <Link
               to="/"
               className="mt-4 border border-beige font-semibold py-3 w-full block rounded-xl shadow-md text-gold  opacity-80 hover:opacity-100"
            >
                Back to Homepage
            </Link>

        </div>
    </div>
  )
}

export default ThankYouPage