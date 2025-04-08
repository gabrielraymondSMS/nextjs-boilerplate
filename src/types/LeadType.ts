import { User } from "./ColumnType";

export type LeadsType = {
  id?: number;
  user_id: number | string;
  user?: User;
  lead_type: string;
  company_name: string;
  company_number: string;
  company_size: number;
  company_sector: string;
  annual_gas_consumption: string;
  annual_electricity_consumtion: string;
  green_energy: string;
  underway_energy_renovation: string;
  ready_for_subsidy: string;
  budget: string;
  electro_gas_intensive: string;
  regional_aid_eligibility: string;
  has_energy_tax_exemption: string;
  status?: boolean;
  createdDate: string;
};

export type LeadFormValues = {
  id?: number;
  user_id: number;
  lead_type: string;
  company_name: string;
  company_number: string;
  company_size:  number;
  company_sector: string;
  annual_gas_consumption: string;
  annual_electricity_consumtion: string;
  green_energy: string;
  underway_energy_renovation: string;
  ready_for_subsidy: string;
  budget: string;
  electro_gas_intensive: string;
  regional_aid_eligibility: string;
  has_energy_tax_exemption: string;
  status?: boolean;
};
