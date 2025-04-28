import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { auth } from '../../service/firebaseConfig'; // Import the firebaseConfig
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"; 
const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage on page load
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user from localStorage if available
    }
  }, []);

  // Simulating Firebase Google Sign-In
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in user:', user); // Debugging: Log user object
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
      setUser(user); // Set the user state
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
 //navigage to the home page after sign in
 
  // Handle sign out
  const signOutUser = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Clear user state
    signOut(auth); // Firebase sign out
  };

  // Debugging: log the user state
  useEffect(() => {
    console.log('Current user:', user); // Log user state to check for picture URL
  }, [user]);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center">
      <img src="/logo.svg" alt="Logo" className="h-10" />
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/my-trips">
            <Button variant="outline" className="text-white rounded-full">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <h2 className="text-sm text-white">{user?.name}</h2>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <img
                    src={user?.picture || '/default-profile.jpeg'}
                    className="h-10 w-10 rounded-full"
                    alt="user profile"
                  />
                  <h2 className="text-sm text-gray-500">{user?.name}</h2>
                </div>
                <Button variant="outline" className="text-white cursor-pointer" onClick={()=>{
                  signOutUser(); // Call signOutUser function on button click
                  localStorage.clear(); // Clear localStorage
                  window.location.href = '/'; // Redirect to home page
                }}>
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
            </div>
        ) : (
          // Sign In Button when the user is not logged in
          <Button onClick={signIn}>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export { Header };
