const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchPlaceImage(placeName) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return null;
  }
}
