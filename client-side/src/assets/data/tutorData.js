// import img01 from "../images/tutors-img/male1.jpg";
// import img02 from "../images/tutors-img/girl1.jpg";
// import img03 from "../images/tutors-img/male2.jpg";
// import img04 from "../images/tutors-img/girl2.jpg";
// import img05 from "../images/tutors-img/male3.jpg";
// import img06 from "../images/tutors-img/girl2.jpg";
// import img07 from "../images/tutors-img/male4.jpg";
// import img08 from "../images/tutors-img/male2.jpg";
// import img09 from "../images/tutors-img/male1.jpg";
// import img10 from "../images/tutors-img/girl1.jpg";

// const tutorData = [
//     {
//       name: "John Smith",
//       age: 35,
//       location: "New York City",
//       yearsOfExperience: 10,
//       imageUrl: img05,
//       rating: 112,
//       availableDays: ["Monday", "Wednesday", "Friday"],
//       languages: ["English", "Spanish"],
//       certifications: ["CDL", "Defensive Driving"],
//       bio: "I've been teaching driving for 10 years and have a passion for helping new drivers become safe and confident on the road. I'm fluent in English and Spanish and have certifications in CDL and Defensive Driving.",
//       gender: "Male",
//       contact: {
//         email: "johnsmith@example.com",
//         phone: "555-555-5555",
//         website: "www.johnsmithdrivingschool.com"
//       }
//     }
//   ]
//     {
//       name: "Sarah Lee",
//       age: 28,
//       location: "Los Angeles",
//       yearsOfExperience: 5,
//       imageUrl: img04,
//       rating: 100,
//       availableDays: ["Tuesday", "Thursday", "Saturday"],
//       languages: ["English", "Korean"],
//       certifications: ["CDL"],
//       bio: "I'm a patient and experienced driving instructor with a focus on safety. I'm fluent in English and Korean and have a CDL certification. Let's work together to help you become a confident and safe driver!",
//       gender: "Female",
//       contact: {
//         email: "sarahlee@example.com",
//         phone: "555-555-5555",
//         website: "www.sarahleedrivingschool.com"
//       }
//     },
//     {
//         name: "James Johnson",
//         age: 42,
//         location: "Chicago",
//         yearsOfExperience: 15,
//         imageUrl: img02,
//         rating: 98,
//         availableDays: ["Monday", "Wednesday", "Friday"],
//         languages: ["English", "Spanish"],
//         certifications: ["CDL", "Defensive Driving", "First Aid"],
//         bio: "I've been teaching driving for 15 years and take a personalized approach to each student's needs. I'm fluent in English and Spanish and have certifications in CDL, Defensive Driving, and First Aid.",
//         gender: "Male",
//         contact: {
//           email: "jamesjohnson@example.com",
//           phone: "555-555-5555",
//           website: "www.jamesjohnsondrivingschool.com"
//         }
//       },
//       {
//         name: "Emily Chen",
//         age: 32,
//         location: "San Francisco",
//         yearsOfExperience: 8,
//         imageUrl: img03,
//         rating: 85,
//         availableDays: ["Tuesday", "Thursday", "Saturday"],
//         languages: ["English", "Mandarin"],
//         certifications: ["Defensive Driving"],
//         bio: "I'm a patient and experienced driving instructor with a focus on safety. I'm fluent in English and Mandarin and have a certification in Defensive Driving. I'm here to help you become a confident and safe driver!",
//         gender: "Female",
//         contact: {
//           email: "emilychen@example.com",
//           phone: "555-555-5555",
//           website: "www.emilychendrivingschool.com"
//         }
//       },
//       {
//         name: "David Nguyen",
//         age: 40,
//         location: "Houston",
//         yearsOfExperience: 12,
//         imageUrl: img05,
//         rating: 115,
//         availableDays: ["Monday", "Wednesday", "Friday", "Sunday"],
//         languages: ["English", "Vietnamese"],
//         certifications: ["CDL"],
//         bio: "I'm an experienced driving instructor with a passion for teaching safe driving habits. I'm fluent in English and Vietnamese and have a CDL certification. Let's work together to help you become a confident and safe driver!",
//         gender: "Male",
//         contact: {
//           email: "davidnguyen@example.com",
//           phone: "555-555-5555",
//           website: "www.davidnguyendrivingschool.com"
//         }
//       },
//       {
//         name: "Maria Rodriguez",
//         age: 37,
//         location: "Miami",
//         yearsOfExperience: 6,
//         imageUrl: img06,
//         rating: 112,
//         availableDays: ["Tuesday", "Wednesday", "Thursday"],
//         languages: ["English", "Spanish"],
//         certifications: ["Defensive Driving"],
//         bio: "I'm a friendly and patient driving instructor with a focus on safety. I'm fluent in English and Spanish and have a certification in Defensive Driving. Let's work together to help you become a confident and safe driver!",
//         gender: "Female",
//         contact: {
//           email: "mariarodriguez@example.com",
//           phone: "555-555-5555",
//           website: "www.mariarodriguezdrivingschool.com"
//         }
//       },
//       {
//         name: "Michael Davis",
//         age: 45,
//         location: "Seattle",
//         yearsOfExperience: 20,
//         imageUrl: img07,
//         rating: 112,
//         availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
//         languages: ["English"],
//         certifications: ["CDL", "Defensive Driving"],
//         bio: "I'm a highly experienced driving instructor with a focus on safety and efficiency. I have a CDL and Defensive Driving certification, and I'm here to help you become a confident and safe driver!",
//         gender: "Male",
//         contact: {
//           email: "michaeldavis@example.com",
//           phone: "555-555-5555",
//           website: "www.michaeldavisdrivingschool.com"
//         }
//       },
//       {
//         name: "Kim Nguyen",
//         age: 30,
//         location: "Dallas",
//         yearsOfExperience: 4,
//         imageUrl: img08,
//         rating: 112,
//         availableDays: ["Tuesday", "Thursday", "Saturday"],
//         languages: ["English", "Vietnamese"],
//         certifications: ["Defensive Driving"],
//         bio: "I'm a friendly and patient driving instructor with a focus on safety. I'm fluent in English and Vietnamese and have a certification in Defensive Driving. Let's work together to help you become a confident and safe driver!",
//         gender: "Male",
//         contact: {
//           email: "kimnguyen@example.com",
//           phone: "555-555-5555",
//           website: "www.kimnguyendrivingschool.com"
//         }
//       },
//       {
//         name: "Robert Lee",
//         age: 50,
//         location: "Atlanta",
//         yearsOfExperience: 18,
//         imageUrl: img09,
//         rating: 112,
//         availableDays: ["Monday", "Wednesday", "Friday", "Sunday"],
//         languages: ["English", "Korean"],
//         certifications: ["CDL", "Defensive Driving"],
//         bio: "I'm an experienced driving instructor with a passion for helping new drivers become safe and confident on the road. I'm fluent in English and Korean and have certifications in CDL and Defensive Driving.",
//         gender: "Male",
//         contact: {
//           email: "robertlee@example.com",
//           phone: "555-555-5555",
//           website: "www.robertleedrivingschool.com"
//         }
//       },
//       {
//         name: "Jennifer Kim",
//         age: 35,
//         location: "Washington DC",
//         yearsOfExperience: 7,
//         imageUrl: img10,
//         rating: 112,
//         availableDays: ["Tuesday", "Thursday", "Saturday"],
//         languages: ["English", "Korean"],
//         certifications: ["Defensive Driving"],
//         bio: "I'm a patient and experienced driving instructor with a focus on safety. I'm fluent in English and Korean and have a certification in Defensive Driving. Let's work together to help you become a confident and safe driver!",
//         gender: "Female",
//         contact: {
//           email: "jenniferkim@example.com",
//           phone: "555-555-5555",
//           website: "www.jenniferkimdrivingschool.com"
//         }
//       }
// ]

export default tutorData