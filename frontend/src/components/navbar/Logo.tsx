
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    
    <div className='flex items-center justify-center w-14 h-14 rounded-full bg-gold'
      onClick={() => navigate('/')}
    >
        <img
          src="/logo.png"
          alt="Vintage Resort Logo"
          width={40}
          height={40}
          className='rounded-full'
        />
    </div>
  )
}

export default Logo