const LANDING_PAGE = "/";
const LOGIN = "/login";
const REGISTER = "/register";
const FORGOTPASSWORD = "/forgot-password";

// Private Routes
const DASHBOARD = "/dashboard";

const RESETPASSWORD = "/reset-password";
// Users
const USERS_MANAGEMENT = "/users";
const DETAIL_USER_PATTERN = "/users/:userId"; // Store as a string
const DETAIL_USER = (id: string = ":userId") => `/users/${id}`; // Function for dynamic use

// Leads
const LEADS = "/leads";
const CREATE_LEADS = "/leads/create";
const DETAIL_LEADS = "/leads/detail";

const PUBLIC = "/public";

const PRIVATE_ROUTES = [
  DASHBOARD,
  USERS_MANAGEMENT,
  LEADS,
  CREATE_LEADS,
  DETAIL_LEADS,
  DETAIL_USER_PATTERN, // Use pattern string instead of function
];

const AUTH_ROUTES = [LOGIN, REGISTER, FORGOTPASSWORD, RESETPASSWORD];
const PUBLIC_ROUTES = [LANDING_PAGE, PUBLIC];

export {
  PRIVATE_ROUTES,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  LANDING_PAGE,
  LOGIN,
  USERS_MANAGEMENT,
  DASHBOARD,
  RESETPASSWORD,
  FORGOTPASSWORD,
  DETAIL_USER, // Export function separately for dynamic route generation
};
