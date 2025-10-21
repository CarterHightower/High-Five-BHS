import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Initialize Firebase (you'll need to replace with your config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TEACHER_NAMES = [
  "Alejandro Garcia",
  "Rayvon Watson",
  "John Lee",
  "Angela Smith",
  "William Veenstra",
  "Kevin Quigley",
  "Jacob Montelongo",
  "Brandy Kethley",
  "Martin Skoda",
  "Gerald Staffel",
  "Cynthia Eppes",
  "Nancy Argueta",
  "Ariel Austin",
  "Sonana Baig",
  "Jennifer Baker",
  "Brett Barrett",
  "Cameron Bell",
  "Stacy Blum",
  "Lindsay Bolinger",
  "Kaitlyn Bourgeois",
  "Robyn Brackney Banditrat",
  "Angela Bradley",
  "Kourtney Peterson",
  "Seth Metusalem",
  "Laura Braun",
  "James Brown",
  "Makayla Brown",
  "Robert Bugg",
  "Delana Carter",
  "Brittany Cossey",
  "Kylee Darwin",
  "Leanna Davis",
  "Robert Dedear",
  "Lama Devries",
  "Katelyn Dillon",
  "Katherine Espinoza",
  "Christopher Fiorini",
  "Zachary Flynn",
  "Seth Freeman",
  "Yi French",
  "Mario Jaret Gant",
  "Nicole Gentry",
  "Chad Getschmann",
  "Whitney Goff",
  "Shandi Gomez",
  "Leonas Grumulaitis",
  "Juan Guevara",
  "Shawna Guidry",
  "Philip Guthrie",
  "Xochitl Haney",
  "Angela Hawkins",
  "Kelli Hawkins",
  "Jamie Henke",
  "Jose Hensdill",
  "Aaron Hinkley",
  "Teri Hudson",
  "Kristen Hughes",
  "Robert Jackson",
  "Kencovia Jean-Baptiste",
  "Corinne Jones",
  "Lauren Jozwiak",
  "Austin Kemp",
  "Tom Kennedy",
  "Jake Kirby",
  "Jennifer Kimrey",
  "Cassidy Kline",
  "Cindy Klyng",
  "Johnathan Kooiker",
  "Amy Lai",
  "Kimberely Lancaster",
  "Paula Landry",
  "Tiffani Larose",
  "David Laughlin",
  "Courtney Lavender",
  "Bailey Lawler",
  "Duan Le",
  "Brett Ledkins",
  "Luis Lopez",
  "Sydney Lovett",
  "Mary Lyons",
  "Lonnie Madison",
  "Kristin Madrid",
  "Brenton Marquart",
  "Elzabeth Martin",
  "Rianna Mccolloch",
  "Misty Miller",
  "Isaac Millstein",
  "Joel Moeller",
  "Laura Morris",
  "Thomas Mosley",
  "Jennifer Munro",
  "Devin Murphy",
  "Colin Myers",
  "Andy Nguyen",
  "Ibeth Nixon",
  "Colleen Noble",
  "Lagina Nosavanh",
  "Paul Orlando",
  "Laura Pham",
  "Jacob Pillitere",
  "Mark Plant",
  "Amanada Postrigan",
  "Lindsey Lee",
  "Caroline O'Brian",
  "Ashley White",
  "William Powers",
  "Kevin Poynter",
  "Sally Provenzano",
  "Jesus Puente",
  "Kellie Putnam",
  "Hayden Reed",
  "Margaret Russell",
  "Nella Sakic",
  "Kevin Satterfield",
  "Alana Serice",
  "William Sexton",
  "Lisa Siems",
  "Alex Sikkema",
  "Katherine Simmag",
  "Dillon Simpson",
  "Justin Smith",
  "Gordon Solis",
  "Lloyd Spotted Wolf",
  "Stacy Stracener",
  "Donica Subieta",
  "Vahan Surabian",
  "Maria Talaga",
  "Deborah Turner",
  "Prescellia Valenzuela",
  "William Veenstra",
  "Thomas Veenstra",
  "Kevin Waters",
  "Cathlene Webb",
  "Candi Weige",
  "Pebblin Williams",
  "Martha Wohlgemuth",
  "Katherine Wojciechowski",
  "Kimberly Zabadal",
  "Jennifer Zell",
];

async function migrateTeachers() {
  console.log('Starting teacher migration...');
  
  for (const teacherName of TEACHER_NAMES) {
    try {
      // Generate email from name
      const parts = teacherName.toLowerCase().split(" ").filter(Boolean);
      const email = parts.length >= 2 
        ? `${parts[0]}.${parts[1]}@cfisd.net`
        : `${parts[0] || "teacher"}@school.edu`;

      // Create slug for URL
      const slug = teacherName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      const teacherData = {
        name: teacherName,
        email: email,
        slug: slug,
        averageRating: 0,
        totalReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, 'teachers'), teacherData);
      console.log(`Added teacher: ${teacherName}`);
    } catch (error) {
      console.error(`Error adding teacher ${teacherName}:`, error);
    }
  }
  
  console.log('Teacher migration completed!');
}

// Run the migration
migrateTeachers().catch(console.error);
