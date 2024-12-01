"use client"
import { useEffect } from "react";

interface IData {
    date: string,
    time: string
}

const useCreateItem = (data: IData) => {


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await fetch(`https://${process.env.NEXT_PUBLIC_PROXY_IP}/api/item/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: data.date,
                        time: data.time
                    }),
                });

            } catch (error) {
                console.log('Error!!!!!')
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [data.date, data.time]);

    return
};

export default useCreateItem;