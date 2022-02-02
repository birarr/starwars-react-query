import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async (key, page) => {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    return response.json()
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, status } = useQuery(['planets', page], ({ queryKey }) => fetchPlanets(queryKey, page))

    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{status}</p> */}
            {status === 'loading' && (
                <div>Loading data...</div>
            )}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
             {status === 'success' && (
                 <>
                 <button onClick={() => setPage(prevState => Math.max(prevState -1, 1))} disabled={page === 1}>Previous Page</button>
                 <span>{ page }</span>
                 <button onClick={() => setPage(prevState => !data || !data.next ? prevState : prevState + 1)} disabled={!data || !data.next}>Next Page</button>
                <div>{data?.results?.map(planet => <Planet key={planet.name} planet={planet} />)}</div>
                </>
            )}
        </div>
    );
}
 
export default Planets;