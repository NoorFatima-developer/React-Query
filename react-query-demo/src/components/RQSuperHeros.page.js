import { Link } from "react-router-dom";
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { useState } from "react";

export default function RQSuperHeroesPage() {

  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  // success and error callbacks...
  const  onSuccess =  (data) => {
    console.log('Perform side effect after fetching data...', data);
  };
  const  onError =  (error) => {
    console.log('Perform side effect after fetching data...', error.message);
  };

  const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesData(onSuccess, onError)
  
  const {mutate:addHero} = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    console.log({name, alterEgo});
    const hero = {name, alterEgo} 
    addHero(hero);
  }

  // console.log({
  //   isLoading,
  //   isFetching,
  // });

  if(isLoading || isFetching){
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e)=>setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      {/* UseQuery on click... */}
      {/* for the action i used refetch.. */}
      <button onClick={()=>{
        console.log("Refetch button clicked..");
        refetch()}}>Refetch Buton</button>
      {/* data?.data likhne ki zaroorat is liye hai kyunki axios.get() ka response ek object hota hai jisk andr data 1 array hai... */}
      {data?.data.map((hero)=>{
        return <div key={hero.id}>
          <Link to={`/rq-super-heros/${hero.id}`}>{hero.name} {hero.alterEgo}</Link>
          </div>
      })}


      {/* mai data oper receieve krleti o ta k yahan return na krna pry.. */}
      {/* ab name agye hain or wo string hain so just hero krogi .name ki need ni khudi data ajyega... */}
      {/* mau use Query m select sy data get krlea hai object ka.. ab osmai sy data chye jo k array hai */}
      {/* {data?.map((hero, index)=>{
        return <div key={index}>{hero}</div>
      })} */}
    </>
  )     
}
  