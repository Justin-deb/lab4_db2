import type { Copy } from "../types/Copy";

export const getCopiesByOffice = async (officeId: number): Promise<Copy[]> => {
    try {
        const response = await fetch(`/server/api/copy/copiesByOffice/${officeId}`);

        if (!response.ok) {
            throw new Error('Error al obtener copias: ' + response.status);
        }

        const data: Copy[] = await response.json();
        return data;
    } catch (err) {
        console.error('Error al obtener copias:', err);
        return [];
    }
}

export const createCopy = async (copy: Copy) => {
    try {
        const response = await fetch("/server/api/copy/createCopy", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copy)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error: ${response.status}`);
        }

        // // Intentar parsear JSON
        // try {
        //     const data = await response.json();
        //     return data;
        // } catch (jsonError) {
        //     console.warn('No JSON response pero copia se creó:', jsonError);
        //     return copy;
        // }
    } catch (err) {
        console.error('Error al crear copia:', err);
        throw err;
    }
}