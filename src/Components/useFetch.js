import { useState, useEffect } from "react";

export default function useFetch(url) {

    console.log(url);
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setData(data)
        });
    }, [url]);

    return data;

}