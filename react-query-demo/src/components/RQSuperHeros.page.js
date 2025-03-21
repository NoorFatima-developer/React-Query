import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components/RQSuperHeros.page.js
export default function RQSuperHeroesPage() {

  // It takes two arguments.. one is key and other which return a promise...
  // {isLoading, data} =>React Query ka response object
  //useQuery is a ReactHook..., and key 'super-heroes is a cache..
  const {isLoading, data, isError, error, isFetching} = 
  useQuery({
    queryKey: ['super-heroes'], // Key array format me hamesha rakhni hai
    queryFn: () => axios.get('http://localhost:4000/superheroes'),
    cacheTime: 5000,  // 5 sec tak data memory me rahega
    staleTime: 30000, // 3 sec tak data fresh maana jayega
  });  

  // defalut stale time is 0...
  // default cache time is 5minutes..

  // aghr mai map mai data.map likhna chahti o tu data me yehi manually return b krwa skti o
  // const { isLoading, data } = useQuery({
  //   queryKey: ['super-heroes'],
  //   queryFn: async () => {  // function ko async banaya
  //     const res = await axios.get('http://localhost:4000/superheroes'); //  API response ka wait kiya
  //     return res.data; //  Sirf resolved data return ho raha hai
  //   }
  // });
  

  // console.log(data); // API ka pura response console me dikhega
  console.log({isLoading, isFetching});

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
  