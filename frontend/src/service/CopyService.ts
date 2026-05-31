import type { Copy } from "../types/Copy";

export const getCopiesByOffice = async (officeId:number):Promise<Copy[]> =>{
    const response = await fetch(`/server/api/copy/copiesByOffice/${officeId}`);

    if(!response.ok){
        throw new Error('Unable to get copies: ' + response.status);
    }

    const data:Copy[] = await response.json();
    return data;
}
export const createCopy = async (copy:Copy) =>{
    const response = await fetch("/server/api/copy/createCopy",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(copy)
    });

    if(!response.ok){
        throw new Error('Unable to create copy:' + response.status);
    }
}