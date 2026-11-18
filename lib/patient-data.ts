export type PatientStatus = "Active" | "Needs follow-up" | "Inactive"

export type PatientVisit = {
  date: string
  type: string
  clinician: string
  summary: string
}

export type Patient = {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  pronouns: string
  phone: string
  email: string
  address: string
  status: PatientStatus
  primaryCareProvider: string
  careTeam: string[]
  lastVisit: string
  nextAppointment: string | null
  conditions: string[]
  allergies: string[]
  medications: { name: string; dosage: string; instructions: string }[]
  visits: PatientVisit[]
  vitals: {
    bloodPressure: string
    heartRate: string
    temperature: string
    weight: string
    recordedAt: string
  }
  insurance: { provider: string; plan: string; memberId: string }
  careNote: string
}

// Every entry below is fictional sample data for the Colver prototype.
export const patients: Patient[] = [
  {
    id: "CV-20481",
    firstName: "Maya",
    lastName: "Chen",
    dateOfBirth: "1988-04-12",
    pronouns: "she/her",
    phone: "(555) 010-2841",
    email: "maya.chen@example.test",
    address: "184 Willow Lane, Portland, OR 97205",
    status: "Active",
    primaryCareProvider: "Dr. Elena Morris",
    careTeam: ["Dr. Elena Morris", "Nurse Alex Rivera"],
    lastVisit: "2026-11-12",
    nextAppointment: "2026-12-03",
    conditions: ["Migraine", "Seasonal allergies"],
    allergies: ["Penicillin"],
    medications: [
      { name: "Sumatriptan", dosage: "50 mg", instructions: "As needed for migraine" },
      { name: "Cetirizine", dosage: "10 mg", instructions: "Once daily during allergy season" },
    ],
    visits: [
      { date: "2026-11-12", type: "Primary care", clinician: "Dr. Elena Morris", summary: "Routine follow-up; symptoms stable." },
      { date: "2026-08-19", type: "Telehealth", clinician: "Nurse Alex Rivera", summary: "Medication review and care-plan check-in." },
    ],
    vitals: { bloodPressure: "118/76 mmHg", heartRate: "72 bpm", temperature: "36.8 °C", weight: "64.2 kg", recordedAt: "2026-11-12" },
    insurance: { provider: "Evergreen Health", plan: "Choice Plus", memberId: "SAMPLE-884120" },
    careNote: "Patient reports fewer migraines since tracking sleep and hydration. Continue current plan and review at next visit.",
  },
  {
    id: "CV-20506",
    firstName: "Jordan",
    lastName: "Patel",
    dateOfBirth: "1976-09-03",
    pronouns: "they/them",
    phone: "(555) 010-3952",
    email: "jordan.patel@example.test",
    address: "42 Cedar Street, Portland, OR 97209",
    status: "Needs follow-up",
    primaryCareProvider: "Dr. Daniel Brooks",
    careTeam: ["Dr. Daniel Brooks", "Nurse Sam Kim"],
    lastVisit: "2026-10-28",
    nextAppointment: "2026-11-20",
    conditions: ["Hypertension", "Prediabetes"],
    allergies: ["Latex"],
    medications: [
      { name: "Lisinopril", dosage: "10 mg", instructions: "Once daily" },
      { name: "Metformin", dosage: "500 mg", instructions: "Once daily with evening meal" },
    ],
    visits: [
      { date: "2026-10-28", type: "Primary care", clinician: "Dr. Daniel Brooks", summary: "Blood pressure elevated; follow-up requested." },
      { date: "2026-07-14", type: "Lab review", clinician: "Nurse Sam Kim", summary: "Reviewed routine screening results." },
    ],
    vitals: { bloodPressure: "142/88 mmHg", heartRate: "80 bpm", temperature: "36.7 °C", weight: "82.5 kg", recordedAt: "2026-10-28" },
    insurance: { provider: "Northstar Care", plan: "Community Select", memberId: "SAMPLE-297514" },
    careNote: "Follow-up appointment requested to review home blood pressure readings and reinforce the current wellness plan.",
  },
  {
    id: "CV-20533",
    firstName: "Avery",
    lastName: "Williams",
    dateOfBirth: "1994-01-26",
    pronouns: "she/her",
    phone: "(555) 010-7614",
    email: "avery.williams@example.test",
    address: "905 Juniper Avenue, Beaverton, OR 97005",
    status: "Active",
    primaryCareProvider: "Dr. Elena Morris",
    careTeam: ["Dr. Elena Morris", "Nurse Alex Rivera"],
    lastVisit: "2026-11-05",
    nextAppointment: "2027-02-05",
    conditions: ["Asthma", "Eczema"],
    allergies: ["Dust mites", "Tree nuts"],
    medications: [
      { name: "Albuterol inhaler", dosage: "90 mcg", instructions: "As needed for wheezing" },
      { name: "Hydrocortisone cream", dosage: "1%", instructions: "Apply as directed" },
    ],
    visits: [
      { date: "2026-11-05", type: "Annual wellness", clinician: "Dr. Elena Morris", summary: "Wellness visit completed; asthma controlled." },
      { date: "2026-05-22", type: "Primary care", clinician: "Dr. Elena Morris", summary: "Discussed seasonal symptom management." },
    ],
    vitals: { bloodPressure: "116/72 mmHg", heartRate: "68 bpm", temperature: "36.6 °C", weight: "59.8 kg", recordedAt: "2026-11-05" },
    insurance: { provider: "Evergreen Health", plan: "Standard HMO", memberId: "SAMPLE-194638" },
    careNote: "Asthma symptoms are well controlled. Patient has an updated action plan and understands when to contact the care team.",
  },
  {
    id: "CV-20559",
    firstName: "Noah",
    lastName: "Kim",
    dateOfBirth: "1967-06-18",
    pronouns: "he/him",
    phone: "(555) 010-4430",
    email: "noah.kim@example.test",
    address: "77 Alder Court, Portland, OR 97214",
    status: "Needs follow-up",
    primaryCareProvider: "Dr. Daniel Brooks",
    careTeam: ["Dr. Daniel Brooks", "Nurse Sam Kim"],
    lastVisit: "2026-09-30",
    nextAppointment: "2026-11-19",
    conditions: ["Type 2 diabetes", "High cholesterol"],
    allergies: ["No known allergies"],
    medications: [
      { name: "Atorvastatin", dosage: "20 mg", instructions: "Once daily in the evening" },
      { name: "Metformin", dosage: "500 mg", instructions: "Twice daily with meals" },
    ],
    visits: [
      { date: "2026-09-30", type: "Diabetes follow-up", clinician: "Dr. Daniel Brooks", summary: "Reviewed monitoring routine and follow-up plan." },
      { date: "2026-06-16", type: "Lab review", clinician: "Nurse Sam Kim", summary: "Discussed routine lab results and next steps." },
    ],
    vitals: { bloodPressure: "128/82 mmHg", heartRate: "74 bpm", temperature: "36.9 °C", weight: "88.1 kg", recordedAt: "2026-09-30" },
    insurance: { provider: "Pine Health Alliance", plan: "Everyday Care", memberId: "SAMPLE-681093" },
    careNote: "A routine check-in is due. Please review medication adherence and the patient's home monitoring questions.",
  },
  {
    id: "CV-20582",
    firstName: "Sofia",
    lastName: "Martinez",
    dateOfBirth: "2001-11-09",
    pronouns: "she/her",
    phone: "(555) 010-8720",
    email: "sofia.martinez@example.test",
    address: "2300 Maple Way, Hillsboro, OR 97123",
    status: "Active",
    primaryCareProvider: "Dr. Priya Shah",
    careTeam: ["Dr. Priya Shah", "Nurse Taylor Reed"],
    lastVisit: "2026-10-16",
    nextAppointment: "2027-01-16",
    conditions: ["Iron deficiency"],
    allergies: ["No known allergies"],
    medications: [{ name: "Ferrous sulfate", dosage: "325 mg", instructions: "Once daily with food" }],
    visits: [
      { date: "2026-10-16", type: "Primary care", clinician: "Dr. Priya Shah", summary: "Reviewed energy levels and ongoing care plan." },
      { date: "2026-07-08", type: "Lab review", clinician: "Dr. Priya Shah", summary: "Discussed follow-up testing schedule." },
    ],
    vitals: { bloodPressure: "110/70 mmHg", heartRate: "76 bpm", temperature: "36.5 °C", weight: "56.4 kg", recordedAt: "2026-10-16" },
    insurance: { provider: "Northstar Care", plan: "Community Select", memberId: "SAMPLE-408226" },
    careNote: "Patient is following the agreed nutrition and supplement plan. Recheck symptoms and testing at the next visit.",
  },
  {
    id: "CV-20614",
    firstName: "Elliot",
    lastName: "Turner",
    dateOfBirth: "1981-03-30",
    pronouns: "he/him",
    phone: "(555) 010-1297",
    email: "elliot.turner@example.test",
    address: "18 Fern Place, Portland, OR 97211",
    status: "Inactive",
    primaryCareProvider: "Dr. Priya Shah",
    careTeam: ["Dr. Priya Shah"],
    lastVisit: "2026-04-11",
    nextAppointment: null,
    conditions: ["Lower back pain"],
    allergies: ["Ibuprofen"],
    medications: [],
    visits: [
      { date: "2026-04-11", type: "Primary care", clinician: "Dr. Priya Shah", summary: "Reviewed home care and return precautions." },
      { date: "2026-03-28", type: "Urgent visit", clinician: "Dr. Priya Shah", summary: "Initial assessment and care plan." },
    ],
    vitals: { bloodPressure: "122/78 mmHg", heartRate: "70 bpm", temperature: "36.7 °C", weight: "76.3 kg", recordedAt: "2026-04-11" },
    insurance: { provider: "Evergreen Health", plan: "Choice Plus", memberId: "SAMPLE-730951" },
    careNote: "No upcoming visit is scheduled. Contact details and coverage shown are synthetic prototype values.",
  },
  {
    id: "CV-20648",
    firstName: "Leila",
    lastName: "Okafor",
    dateOfBirth: "1990-07-21",
    pronouns: "she/her",
    phone: "(555) 010-6544",
    email: "leila.okafor@example.test",
    address: "611 Brookside Road, Tigard, OR 97223",
    status: "Active",
    primaryCareProvider: "Dr. Elena Morris",
    careTeam: ["Dr. Elena Morris", "Nurse Alex Rivera"],
    lastVisit: "2026-11-14",
    nextAppointment: "2026-12-14",
    conditions: ["Hypothyroidism"],
    allergies: ["Sulfa medications"],
    medications: [{ name: "Levothyroxine", dosage: "75 mcg", instructions: "Once daily before breakfast" }],
    visits: [
      { date: "2026-11-14", type: "Primary care", clinician: "Dr. Elena Morris", summary: "Reviewed routine follow-up and medication schedule." },
      { date: "2026-08-12", type: "Lab review", clinician: "Nurse Alex Rivera", summary: "Discussed monitoring plan and next appointment." },
    ],
    vitals: { bloodPressure: "114/74 mmHg", heartRate: "71 bpm", temperature: "36.6 °C", weight: "67.1 kg", recordedAt: "2026-11-14" },
    insurance: { provider: "Pine Health Alliance", plan: "Everyday Care", memberId: "SAMPLE-552740" },
    careNote: "Patient is comfortable with the current routine. Continue periodic monitoring and review any new symptoms.",
  },
  {
    id: "CV-20677",
    firstName: "Theo",
    lastName: "Bennett",
    dateOfBirth: "1958-12-02",
    pronouns: "he/him",
    phone: "(555) 010-3076",
    email: "theo.bennett@example.test",
    address: "309 Spruce Terrace, Lake Oswego, OR 97034",
    status: "Needs follow-up",
    primaryCareProvider: "Dr. Daniel Brooks",
    careTeam: ["Dr. Daniel Brooks", "Nurse Sam Kim"],
    lastVisit: "2026-10-02",
    nextAppointment: "2026-11-24",
    conditions: ["Osteoarthritis", "Hypertension"],
    allergies: ["No known allergies"],
    medications: [{ name: "Amlodipine", dosage: "5 mg", instructions: "Once daily" }],
    visits: [
      { date: "2026-10-02", type: "Primary care", clinician: "Dr. Daniel Brooks", summary: "Discussed mobility goals and blood pressure monitoring." },
      { date: "2026-07-02", type: "Wellness visit", clinician: "Dr. Daniel Brooks", summary: "Completed routine wellness review." },
    ],
    vitals: { bloodPressure: "136/84 mmHg", heartRate: "78 bpm", temperature: "36.8 °C", weight: "79.4 kg", recordedAt: "2026-10-02" },
    insurance: { provider: "Northstar Care", plan: "Senior Access", memberId: "SAMPLE-319485" },
    careNote: "Upcoming visit is scheduled. Review mobility goals and home readings during the next check-in.",
  },
]

export function getPatientById(patientId: string) {
  return patients.find((patient) => patient.id === patientId)
}

export function getPatientName(patient: Pick<Patient, "firstName" | "lastName">) {
  return `${patient.firstName} ${patient.lastName}`
}

export function getPatientInitials(patient: Pick<Patient, "firstName" | "lastName">) {
  return `${patient.firstName[0]}${patient.lastName[0]}`
}

export function getPatientAge(dateOfBirth: string, today = new Date()) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1
  }

  return age
}

export function formatPatientDate(value: string | null) {
  if (!value) return "Not scheduled"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`))
}