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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored user from localStorage:', storedUser); // Debugging: Log the retrieved user data
    if (storedUser) {
      setUser(storedUser); // Set the user state if data exists
    }
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in user:', user); // Debugging: Log the full user object

      const userData = {
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      };

      console.log('User data to store:', userData); // Debugging: Log the extracted user data
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
      setUser(userData); // Set the user state
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const signOutUser = () => {
    console.log('Signing out user...'); // Debugging: Log the sign-out action
    localStorage.removeItem('user'); // Remove only the user data
    setUser(null); // Clear the user state
    signOut(auth); // Firebase sign out
    window.location.href = '/'; // Redirect to the home page
  };
  const onLogoClick= () => {
    window.location.href = '/'; // Redirect to the home page
  }

  return (
    <div className="p-3 shadow-sm flex justify-between items-center">
      <img src="/logo.svg" alt="Logo" className="h-10 cursor-pointer" 
      onClick={onLogoClick}
      />
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
                <h2 className="text-sm text-white">{user?.name || "Guest"}</h2>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <img
                    src={user?.picture || '/default-profile.jpeg'}
                    className="h-10 w-10 rounded-full"
                    alt="user profile"
                  />
                  <div>
                    <h2 className="text-sm text-gray-500">{user?.name || "Guest"}</h2>
                    <h2 className="text-xs text-gray-400">{user?.email || "No email available"}</h2>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-white cursor-pointer"
                  onClick={signOutUser}
                >
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={signIn}>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export { Header };
