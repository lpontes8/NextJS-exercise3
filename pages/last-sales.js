import {useEffect, useState} from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
    const[sales,setSales] = useState(props.sales);
    
    const fetcher = (url) => fetch(url).then((r) => r.json());

    const { data, error } = useSWR(
  
      "url_aqui",
  
      fetcher
  
    );
   

    useEffect(() => {
        if(data){
            const transformedSales = [];

            for(const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                });
            }

            setSales(transformedSales);
        }
    }, [data]);

    if(error) {
        return(
            <p>Failed to load.</p>
        );
    }

    if(!data && !sales){
        return(
            <p>Loading...</p>
        );
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    const response = await fetch('url_aqui');

    const data = await response.json();

    const transformedSales = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return {props: {sales: transformedSales}};
}

export default LastSalesPage;