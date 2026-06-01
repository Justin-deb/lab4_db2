import type { Rental } from "../types/Rental";

export const getRentalById = async (id:string):Promise<Rental> =>{
    const response = await fetch(`/server/api/rental/${id}`);

    if(!response.ok){
        throw new Error('Unable to get rental: ' + response.status);
    }

    const data:Rental = await response.json();
    return data;
}

export const getActiveRentals = async (id:string):Promise<Rental[]> =>{
    const response = await fetch(`/server/api/rental/activeRentals/${id}`);

    if(!response.ok){
        throw new Error('Unable to get rentals: ' + response.status);
    }

    const data:Rental[] = await response.json();
    return data;
}

export const getRentHistory = async (id:string):Promise<Rental[]> =>{
    const response = await fetch(`/server/api/rental/rentHistory/${id}`);

    if(!response.ok){
        throw new Error('Unable to get rentals: ' + response.status);
    }

    const data:Rental[] = await response.json();
    return data;
}

export const rentVideogame = async (rental:Rental) =>{
    const response = await fetch("/server/api/rental/rent",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(rental)
    });

    if(!response.ok){
        throw new Error('Unable to create rental:' + response.status);
    }
}


export const returnGame = async (id:string,details:string) =>{
    const response = await fetch(`/server/api/rental/return/${id}?details=${details}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'}
    });

    if(!response.ok){
        throw new Error('Unable to return game:' + response.status);
    }
}