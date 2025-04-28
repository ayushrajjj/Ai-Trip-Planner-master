function UserTripCardItem(trip) { // Destructure the trip prop
  return (
    <div>
      <div>
        <img src="/airplane.jpeg" className="object-cover rounded-xl gap-5" alt="Trip" />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.label || "No label available"}</h2>
          <p className="text-gray-500">{trip?.location || "Location not available"}</p> {/* Add location rendering */}
        </div>
      </div>
    </div>
  );
}

export default UserTripCardItem;