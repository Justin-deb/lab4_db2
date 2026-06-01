import type { Transfer } from "../types/Transfer";

export const transferGame = async (transfer:Transfer) =>{
    const response = await fetch("/server/api/transfer/transferGame",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(transfer)
    });

    if(!response.ok){
        throw new Error('Unable to transfer game:' + response.status);
    }
}