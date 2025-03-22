// Parallel Queries...

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchfriends = () => {
    return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {

    useQuery({
        queryKey: ['super-heros'],
        queryFn: fetchSuperHeros
    })

    useQuery({
        queryKey: ['friends'],
        queryFn: fetchfriends
    })

    return(
        <div>ParallelQueriesPage </div>
    )
}