import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';

import { db } from '../service/firebaseConfig'; // Import your Firebase configuration
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {
  const [userTrips, setUserTrips] = useState([]); // State to store user trips
  const navigate = useNavigate();

  const GetUsertrips = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }
    setUserTrips([]); // Reset user trips state
    const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    const userTrips = [];
    querySnapshot.forEach((doc) => {
      userTrips.push({ id: doc.id, ...doc.data() }); // Collect trip data
    });
    setUserTrips(userTrips); // Update state with trips
  }, [navigate]);

  useEffect(() => {
    GetUsertrips();
  }, [GetUsertrips]);
  console.log("VITE_GOOGLE_AUTH_CLIENT_ID", import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID);

  return (
    <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
        {userTrips.map((trip) => (
          
            <UserTripCardItem  key={trip} trip={trip} /> 
            
          
        ))}
      </div>
    </div>
  );
}

export default MyTrip;