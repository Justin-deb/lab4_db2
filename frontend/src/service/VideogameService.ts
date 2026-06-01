import type { Videogame } from "../types/Videogame";

export const getAllVideogames = async ():Promise<Videogame[]> =>{
    const response = await fetch("/server/api/videogames/allVideogames");

    if(!response.ok){
        throw new Error('Unable to get videogames: ' + response.status);
    }

    const data:Videogame[] = await response.json();
    return data;
}

export const getVideogamesByOffice = async (officeId:string):Promise<Videogame[]> =>{
    const response = await fetch(`/server/api/videogames/videogamesOffice/${officeId}`);

    if(!response.ok){
        throw new Error('Unable to get videogames: ' + response.status);
    }

    const data:Videogame[] = await response.json();
    return data;
}

export const createVideogame = async (videogame:Videogame) =>{
    const response = await fetch("/server/api/videogames/create",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(videogame)
    });

    if(!response.ok){
        throw new Error('Unable to create videogame:' + response.status);
    }
}