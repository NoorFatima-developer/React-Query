// Dynamic Parallel Queries..
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = (heroId) => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchfriends = () => {
    return axios.get('http://localhost:4000/friends')
}

export const DynamicParallelPage = ({heroIds}) => {
    // Using `useQueries` for multiple superheroes
    const queryResults = useQueries({
        queries: heroIds.map((id) => {
            return {
                queryKey: ['super-heros', id],
                queryfn: () => fetchSuperHeros(id),
            }
        })
    }
)

    console.log({queryResults});
    return(
        <div>ParallelQueriesPage </div>
    )
}