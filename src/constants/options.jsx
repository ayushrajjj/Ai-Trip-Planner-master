export const SelectTravelesList = [ 
    {
        id:1,
        title: "Solo",
        desc: "Traveling alone is a unique experience that allows you to explore the world on your own terms.",
        icon: "🧍",
        people: '1',    
    },
    {
        id:2,
        title: "Couple",
        desc: "Traveling as a couple is a great way to strengthen your bond and create lasting memories together.",        
        icon: "👫",
        people: '2 people',
    },
    
    {
        id:3,
        title: "Family",
        desc: "Traveling with your family is a great way to spend quality time together and create lasting memories.",
        icon: "👨‍👩‍👧‍👦",
        people: '3 to 5 people',
    },
    {
        id:4,
        title: "Friends",
        desc: "Traveling with a group of friends is a fun way to explore new places and create unforgettable memories.",
        icon: "👨‍👩‍👧‍👦",
        people: '6+ people',
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'cheap',
        desc:'stay conscious of your budget and save money on your trip.',
        icon: '💰',
    },
    {
        id:2,
        title:'moderate',
        desc:'enjoy a comfortable trip without breaking the bank.',
        icon: '💸',
    },
    {
        id:3,
        title:'luxury',
        desc:'indulge in luxury and enjoy a lavish travel experience.',
        icon: '💎',
    }

]

export const AI_PROMPT= 'Generate Travel plan for Location:{location} ,for {totalDays} Days for {traveler} with a {budget} budget,give me Hotels options list  With HotelName,Hotel address, Price,hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName,place Details, place Image Url ,Geo Coordinates,ticket pricing Time travel each of the location for{totalDays} days with each day plan with best time to visit in JSON format';
