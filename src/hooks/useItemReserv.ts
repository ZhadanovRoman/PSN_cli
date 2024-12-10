"use client"

const itemReserv = async (id: string, clientName: string, clientId: string ) => {
    try {
        const response: any = await fetch(`https://${process.env.NEXT_PUBLIC_PROXY_IP}/api/item/create`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                clientName: clientName,
                clientId: clientId
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