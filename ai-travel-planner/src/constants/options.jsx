import {
  faUser,
  faUsers,
  faChild,
  faDollarSign,
  faBalanceScale,
  faGem,
  faPeopleGroup,
  fa2,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: faUser, // Reference to the icon
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in exploration",
    icon: faUserGroup, // Reference to the icon
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: faUsers, // Reference to the icon
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Group",
    desc: "Group of adventurous",
    icon: faPeopleGroup, // Reference to the icon
    people: "More than 5 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: faDollarSign, // Reference to the icon
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep costs on the average side",
    icon: faBalanceScale, // Reference to the icon
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about the cost",
    icon: faGem, // Reference to the icon
  },
];

export const AI_PROMPT =
  "Generate travel plan for {destination}, for {noOfDays} days for {traveller} with a {budget} budget. Give me a hotel options list with for each day with Hotel Name, Hotel Address, Price for each night, Hotel image URL, geo coordinates, rating, description and suggest itinery with place name, place details, place image URL, GEO coordinates, ticket pricing, rating,time travel each of the location for {noOfDays} with each day plan with best time to visit in JSON format";
