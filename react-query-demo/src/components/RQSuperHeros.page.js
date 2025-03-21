import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components/RQSuperHeros.page.js
export default function RQSuperHeroesPage() {

  // It takes two arguments.. one is key and other which return a promise...
  // {isLoading, data} =>React Query ka response object
  //useQuery is a ReactHook..., and key 'super-heroes is a cache..
  const {isLoading, data, isError, error, isFetching, refetch} = 
  useQuery({
    queryKey: ['super-heroes'], // Key array format me hamesha rakhni hai
    queryFn: () => axios.get('http://localhost:4000/superheroes'),
    enabled: false,
    // cacheTime: 5000,  // 5 sec tak data memory me rahega
    // staleTime: 30000, // 3 sec tak data fresh maana jayega
    // refetchOnMount: true, // Mount hone par API call nahi hogi, lkin aghr cache sy daata delete hoga fer tu hogi e..
    // refetchOnWindowFocus: 'always', // Refetch hoga, API dubara call karega (chahe cache valid ho ya nahi).
    // refetchInterval: 5000, // Har 5 second baad API call hogi
    // refetchIntervalInBackground: true,  // API ko refetch karwata hai, chahe tum window focus karo ya nahi!
  });  

  // console.log(data); // API ka pura response console me dikhega

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

  if(isLoading || isFetching){
    return <h2>Loading...</h2>
  }

  // console.log({isLoading, isFetching});


  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {/* UseQuery on click... */}
      <button onClick={refetch}>Refetch Buuton</button>
      {/* data?.data likhne ki zaroorat is liye hai kyunki axios.get() ka response ek object hota hai. */}
      {data?.data.map((hero)=>{
        return <div key={hero.id}>{hero.name}</div>
      })}
    </>
  )     
}
  