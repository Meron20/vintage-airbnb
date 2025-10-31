import axios from "axios";
import {useState, type FormEvent } from "react"
import { Link } from "react-router-dom"


const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
       
        try{
             await axios.post("/register", {name, email, password})
           
            alert('Registration successful')
           

        }catch(error) {
            alert('Registration failed');
            console.error(error)
        };
      }
     
     
  return (
    <div className="min-h-screen flex items-center justify-center pt-32]">
        <div className="bg-charcoal p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-3xl items-start text-gold mb-6">Register</h2>
          <p className=" text-gray-300 pb-2">Create your account.</p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
               type='text'
               placeholder="Your name"
               value={name}
               onChange={e => setName(e.target.value)}
               className="p-3 rounded-md bg-beige text-charcoal focus:outline-none"
             />
            <input
               type='email'
               placeholder="Email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               className="p-3 rounded-md bg-beige text-charcoal focus:outline-none"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="p-3 rounded-md bg-beige text-charcoal focus:outline-none"
             />
             <button 
               type='submit'
               className="bg-gold text-charcoal py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                 Register
             </button>
             <div className="text-center py-2 text-gray-300">
                Already have an account? <Link className="underline text-beige" to={'/login'}>Login now</Link>
              </div>
               
          </form>
    </div>
 </div>
  )
}

export default RegisterPage