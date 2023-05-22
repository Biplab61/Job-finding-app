import { useState, useEffect } from 'react';
import axios from 'axios';


const useFetch = (endPoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const api_key = [
        'dbda7d73e9msh8c66079edbbceabp1fcdd7jsn5a7998c2b334',   // droploot8
        'f5e1d7dc03msh49bc8d1a14cd9f1p121e07jsn4897fe398d6c',   // biplabpati54
        '66a7cba6eemsh86658509998909bp1fc8f6jsna4bc60515ca2',   // biplabpati.gopi
        '0ef2e5d623msh13c2553766e1f88p117f31jsnc854f565c300',    // rohanpc
    ]

    const [apiKey, setApiKey] = useState(api_key[1]);
    // const [count, setCount] = useState(3);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endPoint}`,
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };

    const handleIncrement = () => {
        
      };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        }
        catch(error) {
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    const refetch =()=>{
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;