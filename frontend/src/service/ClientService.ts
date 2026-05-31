import type { Client } from "../types/Client";

export const getClientById = async (id: string): Promise<Client> => {
  const response = await fetch(`/server/api/client/${id}`);

  if (!response.ok) {
    throw new Error("Unable to get client: " + response.status);
  }

  const data: Client = await response.json();
  return data;
};

export const getAllClients = async (): Promise<Client[]> => {
  const response = await fetch("/server/api/client/allClients");

  if (!response.ok) {
    throw new Error("Unable to get clients: " + response.status);
  }

  const data: Client[] = await response.json();
  return data;
};

export const createClient = async (client: Client) => {
  const response = await fetch("/server/api/client/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Unable to create client:" + response.statusText);
  }
};
