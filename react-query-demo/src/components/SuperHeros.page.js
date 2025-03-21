import { useEffect, useState } from "react";
import axios from 'axios';

// components/SuperHeros.page.js
export default function SuperHerosPage() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        axios.get("http://localhost:4000/superheroes").then((res)=> {
            setData(res.data);
            setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return <h2>Loading...</h2>;
    }

    return(
        <>
            <h2>Super Heros Page</h2>
            {data.map((hero)=>{
                return <div key={hero.id}>
                    {hero.name}
                </div>
            })}
        </>
    )

  }

// Fetch || axios => which one is better to use...
// UseEfeect k andr hum log axios or fetch dono sy data fetch krskty hain lkin better way h axios ku k axios
// easy hai or ismai error handling ni krni prti jb k fetch mai krnai prti hai..


//  Why use useQuery if we have an option to use useEffect...
//  UseEffect sy jb b data fetch krty hain tu wo hr dfa new data fetch krta hai cache m store ni krta
//  or aghr backned ya api m kuch change ata hai tu automatically front end pr show ni hota osko refresh krna prta hai
//  or ismai hum res.data manually set kr rya hain using useState..
// islye we use useQuery