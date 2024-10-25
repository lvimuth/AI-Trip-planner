// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate travel plan for location: Las Vegas, for 3 days for a couple with a cheap budget. Give me a hotel options list with Hotel Name, Hotel Address, PRice, Hotel image URL, geo coordinates, rating, description and suggesr itinery with place name, place details, place image URL, GEO coordinates, ticket pricing, rating,time travel each oof the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotel_options": [\n    {\n      "name": "The D Las Vegas",\n      "address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$$",\n      "image_url": "https://www.the-d.com/sites/default/files/styles/hero_image/public/2023-08/The-D-Las-Vegas-Hero-Image.jpg?itok=8N1q7c30",\n      "geo_coordinates": "36.1696,-115.1429",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel located in the heart of downtown Las Vegas, offering a vibrant atmosphere and a range of amenities."\n    },\n    {\n      "name": "Circus Circus Hotel & Casino",\n      "address": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$$",\n      "image_url": "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/b7/79.jpg",\n      "geo_coordinates": "36.1122,-115.1720",\n      "rating": 3.5,\n      "description": "A classic Las Vegas hotel known for its affordable rates, circus-themed entertainment, and family-friendly atmosphere."\n    },\n    {\n      "name": "Golden Nugget Las Vegas",\n      "address": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$$$",\n      "image_url": "https://www.goldennugget.com/images/header-image/golden-nugget-las-vegas-header.jpg",\n      "geo_coordinates": "36.1697,-115.1402",\n      "rating": 4.5,\n      "description": "A historic and luxurious hotel in downtown Las Vegas, featuring a world-class casino, restaurants, and the famous shark tank."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "place": "Fremont Street Experience",\n        "details": "Explore the lively pedestrian mall with its iconic canopy, street performers, and free concerts.",\n        "image_url": "https://www.visitlasvegas.com/media/1411/fremont-street-experience-las-vegas.jpg",\n        "geo_coordinates": "36.1697,-115.1402",\n        "ticket_pricing": "Free",\n        "rating": 4.5,\n        "time": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "place": "Las Vegas Strip",\n        "details": "Stroll down the iconic Strip, admire the extravagant hotels, and catch a glimpse of the Bellagio Fountains.",\n        "image_url": "https://www.visitlasvegas.com/media/1741/las-vegas-strip-night.jpg",\n        "geo_coordinates": "36.1146,-115.1729",\n        "ticket_pricing": "Free",\n        "rating": 5.0,\n        "time": "1:00 PM - 5:00 PM"\n      },\n      "evening": {\n        "place": "The LINQ Promenade",\n        "details": "Enjoy dinner at a casual restaurant, take a ride on the High Roller observation wheel, and experience the lively atmosphere.",\n        "image_url": "https://www.caesars.com/content/dam/caesars/linq/linq-promenade/linq-promenade-hero-image.jpg",\n        "geo_coordinates": "36.1106,-115.1729",\n        "ticket_pricing": "Varies",\n        "rating": 4.0,\n        "time": "6:00 PM - 9:00 PM"\n      }\n    },\n    "day2": {\n      "morning": {\n        "place": "Red Rock Canyon National Conservation Area",\n        "details": "Hike amidst stunning red rock formations, enjoy scenic views, and explore the natural beauty of the desert.",\n        "image_url": "https://www.nps.gov/redr/planyourvisit/images/redrock_canyon_1920x1080.jpg",\n        "geo_coordinates": "36.1566,-115.2915",\n        "ticket_pricing": "$15 per vehicle",\n        "rating": 4.8,\n        "time": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "place": "Neon Museum",\n        "details": "Discover the history of Las Vegas through a collection of vintage neon signs, and learn about the city\'s iconic past.",\n        "image_url": "https://www.neonmuseum.org/media/661/neon-museum-night-tour-las-vegas-02.jpg",\n        "geo_coordinates": "36.1716,-115.1375",\n        "ticket_pricing": "$25",\n        "rating": 4.5,\n        "time": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "place": "The Strip",\n        "details": "Enjoy a free show at the Bellagio Fountains, wander through the Venetian canals, and soak in the vibrant atmosphere.",\n        "image_url": "https://www.visitlasvegas.com/media/1741/las-vegas-strip-night.jpg",\n        "geo_coordinates": "36.1146,-115.1729",\n        "ticket_pricing": "Free",\n        "rating": 5.0,\n        "time": "7:00 PM - 10:00 PM"\n      }\n    },\n    "day3": {\n      "morning": {\n        "place": "Hoover Dam",\n        "details": "Take a day trip to the iconic Hoover Dam, marvel at its engineering marvel, and enjoy panoramic views of the Colorado River.",\n        "image_url": "https://www.nps.gov/hdam/planyourvisit/images/hoover-dam.jpg",\n        "geo_coordinates": "36.0005,-114.9919",\n        "ticket_pricing": "Free",\n        "rating": 4.7,\n        "time": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "place": "Downtown Container Park",\n        "details": "Explore a unique shopping and entertainment complex made of repurposed shipping containers, enjoy live music, and grab a bite to eat.",\n        "image_url": "https://www.visitlasvegas.com/media/1319/downtown-container-park-las-vegas.jpg",\n        "geo_coordinates": "36.1696,-115.1426",\n        "ticket_pricing": "Free",\n        "rating": 4.0,\n        "time": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "place": "The Strip",\n        "details": "Enjoy dinner at a buffet, catch a free show on the Strip, and soak in the last night of Las Vegas magic.",\n        "image_url": "https://www.visitlasvegas.com/media/1741/las-vegas-strip-night.jpg",\n        "geo_coordinates": "36.1146,-115.1729",\n        "ticket_pricing": "Varies",\n        "rating": 5.0,\n        "time": "7:00 PM - 10:00 PM"\n      }\n    }\n  }\n}\n```\n\n**Note:** This is a sample itinerary, and you can customize it based on your interests and preferences. You can add or remove activities, adjust the time spent at each location, and explore other affordable options in Las Vegas. \n\nHere are some additional tips for planning a cheap trip to Las Vegas:\n\n* **Travel during the off-season:**  Avoid peak travel times like holidays and weekends to get better hotel and flight deals.\n* **Book in advance:**  Secure your hotel and flight reservations ahead of time to snag the best prices.\n* **Use public transportation:**  The Las Vegas Monorail and public buses are affordable and convenient ways to get around.\n* **Take advantage of free activities:**  Las Vegas offers plenty of free attractions, such as the Bellagio Fountains, the Fremont Street Experience, and the Mirage Volcano.\n* **Eat at affordable restaurants:**  There are many affordable dining options in Las Vegas, including buffets, food courts, and casual restaurants.\n* **Shop for deals:**  Check out outlet malls and discount stores for souvenirs and other items.\n* **Consider a hotel with free amenities:**  Many hotels offer free amenities like swimming pools, fitness centers, and wi-fi.\n* **Drink water:**  Stay hydrated by drinking plenty of water, especially in the desert heat.\n* **Bring your own snacks:**  Packing your own snacks can save you money on food costs.\n* **Tip generously:**  Tipping is customary in Las Vegas, so be sure to tip your servers, bartenders, and bellhops. \n',
        },
      ],
    },
  ],
});
