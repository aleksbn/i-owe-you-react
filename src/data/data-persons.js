import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/personImages/`;

/**
 * Generates a random phone number with the prefix +3876.
 *
 * @return {string} The randomly generated phone number.
 */
const generateRandomPhoneNumber = () => {
  const prefix = "+3876";
  const randomDigits = Math.floor(1000000 + Math.random() * 9000000)
    .toString()
    .substring(0, 7);
  return prefix + randomDigits;
};

/**
 * Generates a random last name from a predefined list of last names.
 *
 * @return {string} A randomly selected last name.
 */
const generateRandomLastName = () => {
  const lastNames = [
    "Petrović",
    "Ilić",
    "Marković",
    "Jovanović",
    "Nikolić",
    "Đorđević",
    "Stojanović",
    "Pavlović",
    "Stanković",
    "Janković",
    "Tomović",
    "Kostić",
    "Popović",
    "Ristić",
    "Simić",
    "Stojković",
    "Nedeljković",
    "Milić",
    "Ivanović",
    "Lukić",
    "Milosavljević",
    "Nikolić",
    "Knežević",
    "Krstić",
    "Jović",
    "Stevanović",
    "Đukić",
    "Radosavljević",
    "Mitić",
    "Rakić",
    "Marjanović",
    "Todorović",
    "Stefanović",
    "Branković",
    "Milošević",
    "Vasić",
    "Vuković",
    "Veselinović",
    "Lazarević",
    "Milošević",
    "Stojiljković",
    "Aleksić",
    "Mladenović",
    "Pavlović",
    "Maksimović",
    "Grujić",
    "Vukadinović",
    "Dragić",
    "Vidaković",
    "Simić",
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

/**
 * Generates a random nickname from a predefined list of nicknames.
 *
 * @return {string} The randomly selected nickname.
 */
const generateRandomNickname = () => {
  const nicknames = [
    "Fuzzy one",
    "Cool cat",
    "Mystery person",
    "The Joker",
    "Rainbow seeker",
    "Dreamer",
    "The Wanderer",
    "Sunshine",
    "Moonlight",
    "Star gazer",
    "Whisper",
    "Firefly",
    "Shadow",
    "Echo",
    "Raven",
    "Phoenix",
    "Sparrow",
    "Spirit",
    "Tiger",
    "Lion",
    "Sapphire",
    "Emerald",
    "Ruby",
    "Diamond",
    "Amber",
    "Topaz",
    "Opal",
    "Pearl",
    "Jade",
    "Crystal",
    "Maverick",
    "Legend",
    "Hero",
    "Champion",
    "Warrior",
    "Titan",
    "Gladiator",
    "Conqueror",
    "Crusader",
    "Viking",
    "Enigma",
    "Sphinx",
    "Oracle",
    "Magician",
    "Wizard",
    "Sorcerer",
    "Ninja",
    "Samurai",
    "Assassin",
    "Phantom",
  ];
  return nicknames[Math.floor(Math.random() * nicknames.length)];
};

/**
 * Generates an array of random persons, both female and male, with first name, last name, nickname, phone number, and image.
 *
 * @return {Array} The array of randomly generated persons.
 */
const generateRandomPersons = () => {
  const femaleSerbianNames = [
    "Jovana",
    "Ana",
    "Milica",
    "Marija",
    "Ivana",
    "Katarina",
    "Sofija",
    "Nina",
    "Teodora",
    "Maja",
    "Elena",
    "Andjela",
    "Stefana",
    "Aleksandra",
    "Sanja",
    "Dunja",
    "Tijana",
    "Bojana",
    "Jelena",
    "Dijana",
  ];
  const maleSerbianNames = [
    "Marko",
    "Nikola",
    "Stefan",
    "Vladimir",
    "Filip",
    "Ivan",
    "Aleksandar",
    "Dusan",
    "Luka",
    "Milan",
    "Nemanja",
    "Djordje",
    "Vuk",
    "Petar",
    "Jovan",
    "Darko",
    "Nikola",
    "Mirko",
    "Srdjan",
    "Mihajlo",
  ];

  const persons = [];

  // Generating female persons
  for (let i = 0; i < 20; i++) {
    const person = {
      firstName: femaleSerbianNames[i],
      lastName: generateRandomLastName(),
      nickname: generateRandomNickname(),
      phoneNumber: generateRandomPhoneNumber(),
      image: `${imageUrl}${i + 1 < 10 ? "0" : ""}${i + 1}.jpg`,
    };
    persons.push(person);
  }

  // Generating male persons
  for (let i = 0; i < 20; i++) {
    const person = {
      firstName: maleSerbianNames[i],
      lastName: generateRandomLastName(),
      nickname: generateRandomNickname(),
      phoneNumber: generateRandomPhoneNumber(),
      image: `${imageUrl}${i + 21}.jpg`,
    };
    persons.push(person);
  }

  return persons;
};

export default generateRandomPersons;
