import  { useEffect, useState } from 'react';
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
    const [trip,setTrip]=useState(null); // State to hold trip data
    
    useEffect(() => {
       tripId && GetTripData(); // Fetch trip data when tripId is available
    }, [tripId]); 

    /**
     * Fetch trip data from Firestore
     */
    const GetTripData = async () => {
        try {
            const docRef = doc(db, "AITrips", tripId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setTrip(docSnap.data()); // Set trip data to state
                toast("Trip data fetched successfully!");
            } else {
                console.log("No such document!");
                toast("No trip found!");
            }
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast("Error fetching trip data.");
        }
    };

    return (
        <div
        className='p-10 m:px-20 lg:px-44 xl:px-56' >
            {/* Information section */}
            <InfoSection trip={trip} />
            {/* Recomended hotels */}
            <Hotels  trip={trip}/>
            {/* Daily plan */}
            <PlacesToVisit trip={trip} />
            {/* Footer */}
            <Footer trip={trip} />
        </div>
    );
}

export default ViewTrip;
