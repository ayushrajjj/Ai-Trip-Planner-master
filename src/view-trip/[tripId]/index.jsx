import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../service/firebaseConfig";
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function ViewTrip() {
    const { tripId } = useParams(); 
    const [trip, setTrip] = useState(null); // State to hold trip data
    const [loading, setLoading] = useState(false); // State to track loading status

    useEffect(() => {
        if (tripId) {
            GetTripData(); // Fetch trip data when tripId is available
        }
    }, [tripId]); 

    /**
     * Fetch trip data from Firestore
     */
    const GetTripData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const docRef = doc(db, "AITrips", tripId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setTrip(docSnap.data()); // Set trip data to state
                toast.success("Trip data fetched successfully!");
            } else {
                console.log("No such document!");
                toast.error("No trip found!");
            }
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast.error("Error fetching trip data.");
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    return (
        <div className='   p-10 m:px-20 lg:px-44 xl:px-56'>
            {loading ? (
                <div className="text-center text-lg font-bold">Loading trip data...</div>
            ) : (
                <>
                    {/* Information section */}
                    <InfoSection trip={trip} />
                    {/* Recommended hotels */}
                    <Hotels trip={trip} />
                    {/* Daily plan */}
                    <PlacesToVisit trip={trip} />
                    {/* Footer */}
                    <Footer trip={trip} />
                </>
            )}
        </div>
    );
}

export default ViewTrip;