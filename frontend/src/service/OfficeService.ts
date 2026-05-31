import type { Office } from "../types/Office";

export const getAllOffices = async ():Promise<Office[]> =>{
    const response = await fetch("/server/api/office/allOffices");

    if(!response.ok){
        throw new Error('Unable to get offices: ' + response.status);
    }

    const data:Office[] = await response.json();
    return data;
}
export const createOffice = async (office:Office) =>{
    const response = await fetch("/server/api/office/createOffice",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(office)
    });

    if(!response.ok){
        throw new Error('Unable to create office:' + response.status);
    }
}