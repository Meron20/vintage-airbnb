import {  useState } from 'react';

type Props = {
  handleSearch: (place: string, from: string, to: string, guests: string, ) => void;
}

const Search = ({ handleSearch}: Props) => {
  
  const [place, setPlace] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState("")



  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    handleSearch(place, from, to, guests);
  }

 
  return (
        <form
          onSubmit={ onSubmit}
          className='flex gap-4 bg-charcoal p-4 rounded-full text-bodyText px-4'
        >
          <input 
             type="text" 
             placeholder='Where'
             value={place}
             onChange={(ev) => setPlace(ev.target.value)}
             className='bg-beige p-2 rounded-full text-charcoal'
            />

          <input
              type="date"
              value={from}
              onChange={(ev) => setFrom(ev.target.value)}
              className="bg-beige p-2 rounded-full text-charcoal"
            />
          <input
              type="date"
              value={from}
              onChange={(ev) => setTo(ev.target.value)}
              className="bg-beige p-2 rounded-full text-charcoal"
            />
          <input
              type="number"
              min='1'
              placeholder='Guests'
              value={guests}
              onChange={(ev) => setGuests(ev.target.value)}
              className="bg-beige p-2 rounded-full text-charcoal"
            />
            <button className='bg-gold text-charcoal px-4 rounded-full font-semibold'>
              Search
            </button>
        </form>
 )

}

export default Search