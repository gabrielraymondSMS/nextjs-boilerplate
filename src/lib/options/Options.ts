export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "editor", label: "Editor" },
];

export const userDummyOptions = [
  {
    id: 1,
    name: "Michael Tan",
    email: "michael.tan@example.com",
    role: "Administrator",
    phone: "+65 9123 4567",
    address: "123 Orchard Road, Singapore",
    isActive: true,
    joinedDate: "2022-05-10",
  },
  {
    id: 2,
    name: "Sophia Lim",
    email: "sophia.lim@example.com",
    role: "Editor",
    phone: "+65 9345 6789",
    address: "45 Bukit Timah Road, Singapore",
    isActive: true,
    joinedDate: "2023-02-15",
  },
  {
    id: 3,
    name: "Daniel Wong",
    email: "daniel.wong@example.com",
    role: "Viewer",
    phone: "+65 8765 4321",
    address: "678 Bedok North Avenue, Singapore",
    isActive: false,
    joinedDate: "2021-08-20",
  },
  {
    id: 4,
    name: "Emily Chua",
    email: "emily.chua@example.com",
    role: "Moderator",
    phone: "+65 9234 5678",
    address: "890 Tanjong Pagar Road, Singapore",
    isActive: true,
    joinedDate: "2024-01-05",
  },
  {
    id: 5,
    name: "Jonathan Lee",
    email: "jonathan.lee@example.com",
    role: "Guest",
    phone: "+65 9012 3456",
    address: "56 Marina Bay Sands, Singapore",
    isActive: false,
    joinedDate: "2023-07-30",
  },
];

export const leadTypeOptions = [
  { id: "lead", name: "Lead" },
  { id: "prelead", name: "Pre-lead" },
];

export const companySizeOptions = [
  // { id: "0-10", name: "1-10 employees" },
  // { id: "10-49", name: "10-49 employees" },
  // { id: "50-249", name: "50-249 employees" },
  // { id: "250+", name: "250+ employees" },
  { id: 10, name: "1-10 employees" },
  { id: 49, name: "10-49 employees" },
  { id: 249, name: "50-249 employees" },
  { id: 250, name: "250+ employees" },
];

export const companySectorOptions = [
  { id: "commerce", name: "Commerce" },
  { id: "industry", name: "Industry" },
  { id: "service", name: "Service" },
  { id: "construction", name: "Construction" },
  { id: "other", name: "Other" },
  // { id: "tech", name: "Technology" },
  // { id: "finance", name: "Finance" },
  // { id: "healthcare", name: "Healthcare" },
  // { id: "education", name: "Education" },
  // { id: "manufacturing", name: "Manufacturing" },
  // { id: "real-estate", name: "Real Estate" },
  // { id: "transportation", name: "Transportation" },
  // { id: "hospitality", name: "Hospitality & Tourism" },
  // { id: "energy", name: "Energy & Utilities" },
];

export const annualGasConsumptionOptions = [
  { id: "0-100", name: "<100 Mwh" },
  { id: "100-500", name: "100-500 Mwh" },
  { id: "500-1000", name: "500-1000 Mwh" },
  { id: "above 1000", name: ">1000 Mwh" },
];

export const annualElectricityConsumptionOptions = [
  { id: "0-100", name: "<100 Mwh" },
  { id: "100-500", name: "100-500 Mwh" },
  { id: "500-1000", name: "500-1000 Mwh" },
  { id: "above 1000", name: ">1000 Mwh" },
];

export const energyRenovationProjectsOptions = [
  { id: "none", name: "No projects planned" },
  { id: "lighting", name: "Lighting upgrade" },
  { id: "insulation", name: "Building insulation" },
  { id: "solar", name: "Solar panel installation" },
  { id: "hvac", name: "HVAC system upgrade" },
];

export const greenEnergyUsageOptions = [
  { id: "yes", name: "Yes", value: true },
  {
    id: "no but we planned to do it in the next 12 month",
    name: "No but we planned to do it in the next 12 month",
    value: true,
  },
  { id: "no", name: "No", value: false },
];

export const underwayEnergyRenovationOptions = [
  { id: "building insulation", name: "Building insulation", value: true },
  {
    id: "replacement of heating or air conditioning systems",
    name: "Replacement of heating or air conditioning systems",
    value: true,
  },
  {
    id: "installation of solar panels or other renewable energy sources",
    name: "Installation of solar panels or other renewable energy sources",
    value: true,
  },
  {
    id: "modernization of production equipment",
    name: "Modernization of production equipment",
    value: true,
  },
  {
    id: "implementation of energy management systems",
    name: "Implementation of energy management systems",
    value: true,
  },
  {
    id: "no project at the moment",
    name: "No project at the moment",
    value: true,
  },
];

export const budgetOptions = [
  { id: "0-20k", name: "<20K€" },
  { id: "20k-50k", name: "20K€-50K€" },
  { id: "50k-100k", name: "50K€-100K€" },
  { id: "100k+", name: ">100K€" },
];

export const readyForSubsidyOptions = [
  { id: "yes", name: "Yes", value: true },
  { id: "no", name: "No", value: false },
];

export const electroGasIntensiveOptions = [
  { id: "yes", name: "Yes", value: true },
  { id: "no", name: "No", value: false },
];

export const regionalAidEligibilityOptions = [
  { id: "eligible", name: "Eligible", value: true },
  { id: "ineligible", name: "Ineligible", value: false },
];

export const energyTaxExemptionOptions = [
  { id: "yes", name: "Yes", value: true },
  { id: "no", name: "No", value: false },
];

export const administrativeDelegationOptions = [
  { id: "yes", name: "Yes", value: true },
  { id: "no", name: "No", value: false },
];
