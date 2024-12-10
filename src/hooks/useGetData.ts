"use client"

import { useEffect, useState } from "react";



const useGetData = (): any => {
    const [dataArr, setDataArr] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await fetch(`https://${process.env.NEXT_PUBLIC_PROXY_IP}/api/items/`);
                const data = await response.json();

                setDataArr(data);
            } catch (error) {
                console.log('Error!!!!!')
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return dataArr ? dataArr : '404';
};

export default useGetData;