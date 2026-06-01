import type { Category } from "../types/Category"

export const getCategories = async ():Promise<Category[]> =>{
    const response = await fetch("/server/api/category/allCategories");

    if(!response.ok){
        throw new Error('Unable to get categories: ' + response.status);
    }

    const data:Category[] = await response.json();
    return data;
}
export const createCategory = async (category:Category) =>{
    const response = await fetch("/server/api/category/createCategory",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(category)
    });

    if(!response.ok){
        throw new Error('Unable to create category:' + response.status);
    }
}