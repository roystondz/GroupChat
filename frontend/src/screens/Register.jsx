import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axiosInstance from '../config/axios';

const Register = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    function submitHandler(e){
        e.preventDefault();
        axiosInstance.post('/users/register',{
            email,password
        }).then((res)=>{
            console.log(res.data);
            navigate('/');
            
        }).catch((err)=>{
            console.log(err.response.data);
        })
    }
    

  return (
    <div className="bg-gray-900 text-gray-200 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full mt-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p></div>
      </div>
    </div>
  )
}

export default Register