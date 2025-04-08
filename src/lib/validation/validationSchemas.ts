import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is required"),
  phone: yup.string().nullable().notRequired(),
});

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: yup.boolean().required("lol"),
});

export const forgetPasswordSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const updateUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().when("$password", {
    is: (password: string | undefined) => !!password,
    then: (schema) => schema.min(8, "Password must be at least 8 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  confirmPassword: yup.string().when("password", {
    is: (password: string) => !!password,
    then: (schema) =>
      schema
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired(),
  }),
  role: yup.string().notRequired().nullable(),
  phone: yup.string().nullable().notRequired(),
});

export const leadSchema = yup.object().shape({
  user_id: yup
    .number()
    .typeError("User ID must be a number") // Pastikan error muncul jika bukan angka
    .positive("User ID must be positive")
    .integer("User ID must be an integer")
    .required("User is required"),

  lead_type: yup.string().required("Lead type is required"),
  company_name: yup.string().required("Company name is required"),
  company_number: yup.string().required("Company number is required"),
  company_size: yup.number().required("Company size is required"),
  company_sector: yup.string().required("Company sector is required"),
  annual_gas_consumption: yup
    .string()
    .required("Annual gas consumption is required"),
  annual_electricity_consumtion: yup
    .string()
    .required("Annual electricity consumption is required"),
  green_energy: yup.string().required("Green energy is required"),
  underway_energy_renovation: yup
    .string()
    .required("Underway energy renovation is required"),
  ready_for_subsidy: yup.string().required("Ready for subsidy is required"),
  budget: yup.string().required("Budget is required"),
  electro_gas_intensive: yup
    .string()
    .required("Electro gas intensive is required"),
  regional_aid_eligibility: yup
    .string()
    .required("Regional aid eligibility is required"),
  has_energy_tax_exemption: yup
    .string()
    .required("Energy tax exemption status is required"),

  // status: yup.boolean().nullable(), // Bisa null atau undefined
});
