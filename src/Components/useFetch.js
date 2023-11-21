import { useState, useEffect } from "react";

export default function useFetch(url) {

    console.log("시작부분" + url);
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(url)
        .then((res) => {
            console.log('백엔드에서 데이터 가져오기 성공')
            return res.json()
        })
        .then((data) => {
            console.log('결과값을 응답하기 위해서 변수 수정')
            setData(data)
        });
    }, [url]);

    console.log('결과값을  응답함 그 값은 아래를 보세요.' )
    console.log(data )

    return data;

}