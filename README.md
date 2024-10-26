
# AI Trip Planner

**AI Trip Planner** is a Vue.js-based web application that provides personalized travel planning through AI-generated itineraries, hotel recommendations, and destination insights.

## Features

- **AI-Generated Trip Itineraries:** Customizable itineraries based on user preferences, including destination, budget, and number of travelers.
- **Hotel Recommendations:** AI-generated hotel options with ratings, prices, and other details.
- **Google Maps Integration:** Links to locations on Google Maps for easy navigation.
- **Firebase Integration:** Uses Firebase Firestore for storing trip details, with trip retrieval based on user ID.
- **Google OAuth2 Authentication:** Secure user authentication through Google.
- **Photo and Detail Retrieval:** Integrates with Google Places API to fetch images and details for destinations.

## Project Structure

- **Main Components:**
  - `CreateTrip`: Collects user preferences (destination, budget, travelers) and initiates trip generation via AI.
  - `InformationSection`, `HotelOptions`, `PlacesToVisit`: Display sections for destination details, hotels, and itineraries.
  - `UserTripCardItems`: Shows trip summaries for user-saved trips.
  - `HotelCardItem` and `PlaceCardItem`: Visual components for displaying hotels and locations.

- **Backend Integration:**
  - `firebaseConfig`: Firebase configuration for Firestore database setup.
  - `GlobalAPI`: Manages requests to the Google Places API for photos and place details.
  - `AIModel`: Configuration for Google’s Gemini AI to generate itineraries.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-trip-planner.git
   cd ai-trip-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - In the project root, create a `.env` file with the following variables:
     ```bash
     VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
     VITE_API_KEY=your_firebase_api_key
     VITE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_PROJECT_ID=your_firebase_project_id
     VITE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_APP_ID=your_firebase_app_id
     VITE_GOOGLE_PLACE_API_KEY=your_google_place_api_key
     VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_ai_api_key
     ```

4. **Run the app:**
   ```bash
   npm run dev
   ```

## Usage

1. **Create a Trip:** Go to `/create-trip` to input preferences for a new trip.
2. **View a Trip:** Access saved trips at `/view-trip/{tripID}`, replacing `{tripID}` with the desired trip’s ID.
3. **View All Trips:** Go to `/my-trips` for a list of all trips saved under the user’s account.

## Dependencies

- **Vue.js**
- **Firebase**
- **React Router**
- **Google OAuth2**
- **Google Places API**
- **Swiper** (for hotel recommendation carousel)
- **Google Gemini AI** for AI-powered itinerary and hotel recommendations.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.

## Author

Created by Lakshitha Vimuth - AI Trip Planner with Gemini.
