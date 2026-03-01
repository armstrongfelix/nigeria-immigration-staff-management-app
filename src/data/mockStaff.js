// Mock staff data for the Nigeria Immigration Service
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const ranks = [
  "Comptroller General",
  "Deputy Comptroller General",
  "Assistant Comptroller General",
  "Comptroller of Immigration",
  "Deputy Comptroller of Immigration",
  "Assistant Comptroller of Immigration",
  "Chief Superintendent of Immigration",
  "Superintendent of Immigration",
  "Deputy Superintendent of Immigration",
  "Assistant Superintendent of Immigration I",
  "Assistant Superintendent of Immigration II",
  "Inspector of Immigration",
  "Assistant Inspector of Immigration",
  "Immigration Assistant I",
  "Immigration Assistant II",
  "Immigration Assistant III",
];

const statuses = ["Active", "On Leave", "Retired Soon"];

const firstNames = [
  "Abubakar",
  "Chioma",
  "Oluwaseun",
  "Fatima",
  "Emeka",
  "Ngozi",
  "Ibrahim",
  "Aisha",
  "Obinna",
  "Folake",
  "Musa",
  "Yetunde",
  "Chukwuma",
  "Halima",
  "Adewale",
  "Blessing",
  "Usman",
  "Grace",
  "Oluwatobi",
  "Amina",
  "Tunde",
  "Chidinma",
  "Aliyu",
  "Funke",
];

const lastNames = [
  "Okonkwo",
  "Abdullahi",
  "Adeyemi",
  "Mohammed",
  "Eze",
  "Balogun",
  "Abubakar",
  "Okafor",
  "Yusuf",
  "Adebayo",
  "Nwosu",
  "Garba",
  "Olumide",
  "Suleiman",
  "Nnamdi",
  "Bakare",
  "Okoro",
  "Danjuma",
  "Adekunle",
  "Mbachu",
  "Hassan",
  "Ogundipe",
  "Ikenna",
  "Lawal",
];

const trainingCourses = [
  "Basic Immigration Training",
  "Border Control Operations",
  "Document Verification & Fraud Detection",
  "Counter-Terrorism Awareness",
  "Passport Issuance Procedures",
  "Visa Processing & Regulations",
  "Human Trafficking Detection",
  "Digital Immigration Systems",
  "Leadership & Management",
  "First Aid & Emergency Response",
  "Firearms Handling & Safety",
  "International Immigration Law",
  "Public Relations & Communication",
  "Cybersecurity Fundamentals",
];

function generateStaffData() {
  const staff = [];

  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const hireYear = 1990 + Math.floor(Math.random() * 33);
    const yearsInService = 2026 - hireYear;
    const statusIndex = yearsInService >= 30 ? 2 : Math.random() > 0.85 ? 1 : 0;
    const rankIndex = Math.min(
      ranks.length - 1,
      Math.max(0, ranks.length - 1 - Math.floor(yearsInService / 2.2)),
    );

    const numTrainings = 2 + Math.floor(Math.random() * 5);
    const shuffled = [...trainingCourses].sort(() => 0.5 - Math.random());
    const training = shuffled.slice(0, numTrainings).map((course) => ({
      course,
      year: hireYear + Math.floor(Math.random() * yearsInService) || hireYear,
      status: Math.random() > 0.1 ? "Completed" : "In Progress",
    }));

    staff.push({
      id: i,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      rank: ranks[rankIndex],
      stateCommand:
        nigerianStates[Math.floor(Math.random() * nigerianStates.length)],
      yearsInService,
      status: statuses[statusIndex],
      dateOfBirth: `${1960 + Math.floor(Math.random() * 25)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, "0")}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, "0")}`,
      dateOfEnlistment: `${hireYear}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, "0")}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, "0")}`,
      serviceNumber: `NIS/${String(hireYear).slice(2)}/${String(i).padStart(4, "0")}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@nis.gov.ng`,
      phone: `+234 ${800 + Math.floor(Math.random() * 100)} ${String(Math.floor(Math.random() * 10000000)).padStart(7, "0")}`,
      gender: Math.random() > 0.4 ? "Male" : "Female",
      training,
    });
  }

  return staff;
}

export const mockStaff = generateStaffData();

export const nigerianStatesList = nigerianStates;
export const ranksList = ranks;
