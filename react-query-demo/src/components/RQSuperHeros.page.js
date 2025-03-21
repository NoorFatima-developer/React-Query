import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components/RQSuperHeros.page.js
export default function RQSuperHeroesPage() {

  // It takes two arguments.. one is key and other which return a promise...
  // {isLoading, data} =>React Query ka response object
  //useQuery is a ReactHook..., and key 'super-heroes is a cache..
  const {isLoading, data, isError, error} = 
  useQuery({
    queryKey: ['super-heroes'], // Key array format me hamesha rakhni hai
    queryFn: () => axios.get('http://localhost:4000/superheroes')
  });


  // aghr mai map mai data.map likhna chahti o tu data me yehi manually return b krwa skti o
  // const { isLoading, data } = useQuery({
  //   queryKey: ['super-heroes'],
  //   queryFn: async () => {  // function ko async banaya
  //     const res = await axios.get('http://localhost:4000/superheroes'); //  API response ka wait kiya
  //     return res.data; //  Sirf resolved data return ho raha hai
  //   }
  // });
  

  console.log(data); // API ka pura response console me dikhega

  if(isLoading){
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {/* data?.data likhne ki zaroorat is liye hai kyunki axios.get() ka response ek object hota hai. */}
      {data?.data.map((hero)=>{
        return <div key={hero.id}>{hero.name}</div>
      })}
    </>
  )     
}
  