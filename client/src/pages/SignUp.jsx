import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAUTH from '../components/OAUTH';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const res = await fetch('/api/auth/signup', 
    {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
    );
    const data = await res.json();
    console.log(data);
    if(data.success === false){
      setLoading(false);
      setError(data.message);
      
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
    
  };
   
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-green-600 p-3 rounded-lg text-white uppercase hover:bg-green-700 disabled:bg-green-400">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAUTH/>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-600 hover:underline'>Sign-in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}