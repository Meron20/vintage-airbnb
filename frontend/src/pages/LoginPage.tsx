import axios from "axios";
import {  useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import {  useUser } from "../UserContext";



const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setUser } = useUser();
    const navigate = useNavigate();

   

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try{
            const {data} = await axios.post("http://localhost:4000/login", {email, password}, { withCredentials: true })
            setUser(data);
            alert('Login successful')
            navigate('/account')

        }catch(error) {
            alert('Login failed');
            console.error(error)
        };
      }
     
     

  return (
    <div className="min-h-screen flex items-center justify-center pt-32]">
        <div className="bg-charcoal p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-3xl items-start text-gold mb-6">Login</h2>
          <p className=" text-gray-300 pb-2">Welcome back! Please login to continue.</p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
               type='email'
               placeholder="Email"
               value={email}
               onChange={e => setEmail(e.target.value) }
               className="p-3 rounded-md bg-beige text-charcoal focus:outline-none"
            />
            <input
                type="password"
                placeholder="Password"
                value= {password}
                onChange={e => setPassword(e.target.value)}
                className="p-3 rounded-md bg-beige text-charcoal focus:outline-none"
             />
             <button 
               type='submit'
               className="bg-gold text-charcoal py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                 Login  
             </button>
             <div className="text-center py-2 text-gray-300">
                Don't have an account yet? <Link className="underline text-beige" to={'/register'}>Register now</Link>
              </div>
               
          </form>
    </div>
 </div>
  )
}

export default LoginPage