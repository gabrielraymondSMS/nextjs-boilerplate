import { LeadsType, LeadFormValues } from "@/types/LeadType";
import { sonergyApiClient } from "../client";

export const fetchLeadList = async (params: any) => {
  const response = await sonergyApiClient.get("/leads/full", {
    params: params,
  });
  return response?.data?.data;
};

export const createLead = async (body: LeadFormValues) => {
  const response = await sonergyApiClient.post("/leads", body);
  return response.data;
};

export const updateLead = async ({
  id,
  body,
}: {
  id: string | number;
  body: LeadsType;
}) => {
  const response = await sonergyApiClient.put(`/leads/${id}`, body);
  return response.data;
};

export const deleteLead = async ({id}: {id: number | string}) => {
  const response = await sonergyApiClient.delete(`/leads/${id}`);
  return response.data;
}