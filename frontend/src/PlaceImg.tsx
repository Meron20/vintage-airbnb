
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


type PlaceImgProps = {
    place: Place;
    index?: number;
    className?: string;
  };

function PlaceImg({place, index=0, className = 'object-cover'}: PlaceImgProps) {
    if(!place.addedPhotos.length) {
        return null;
    }
  
  return (
    <div>
        
        <img 
           src={`http://localhost:4000/uploads/${place.addedPhotos[index]}`}   
           alt={place.title}
           className={className}
         />
            
    </div>
  )
}

export default PlaceImg