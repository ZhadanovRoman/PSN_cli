"use client"

const itemReserv = async (id: string, clientName: string ) => {
    try {
        const response: any = await fetch("http://localhost:5000/item/create", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                clientName: clientName
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update data with id ${id}: ${response.statusText}`);
        }
      
        console.log('Update successful: RESERVED');
      
    } catch (error) {
        console.error('Error reserv data:', error);
        throw error;
    }
};

export default itemReserv;