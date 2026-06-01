import type { Office } from "../types/Office";

export const getAllOffices = async (): Promise<Office[]> => {
    try {
        const response = await fetch('/server/api/office/allOffices');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error('Error al obtener sucursales:', err);
        return [];
    }
};

export const createOffice = async (office: Office): Promise<Office> => {
    try {
        const response = await fetch('/server/api/office/createOffice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(office),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error: ${response.status}`);
        }

        // Intentar parsear JSON, si no hay cuerpo válido, retornar el office original
        try {
            const data = await response.json();
            return data;
        } catch (jsonError) {
            console.warn('No JSON response, pero la sucursal se creó:', jsonError);
            // Si la respuesta fue exitosa pero no tiene JSON válido, asumir éxito
            return office;
        }
    } catch (err) {
        console.error('Error creating office:', err);
        throw err;
    }
};