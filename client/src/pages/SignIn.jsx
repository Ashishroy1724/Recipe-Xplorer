import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSucces, signInFailure } from '../redux/user/userSlice';
import OAUTH from '../components/OAUTH';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const{loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
    // eslint-disable-next-line no-unused-vars
    const res = await fetch('/api/auth/signin', 
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
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSucces(data));
    navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
    
  };
   
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAUTH/>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-600 hover:underline'>Sign-up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
