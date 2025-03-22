import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// can also do..
// const fetchSuperHero = ({queryKey}) => {
//     const heroId = queryKey[1]   //yahan pr hum heroId leri hain ...
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ['super-hero', heroId],  //  Must be an array
    queryFn: () => fetchSuperHero(heroId),  //Hero ID queryKey me store ho rahi hai.ReactQuery querykey array ko queryfunc k andr props m bejta hai
    // phr mjy nichy heroId pass krny ki need ni prygi ku k..heroId actually osko params sy mil e ri hai so need 
    // queryFn: fetchSuperHero,  // Yahan sirf function ka naam diya, alag se heroId pass nahi ki
  });
};


// queryKey[0] === 'super-hero' → General identifier hai (constant).
// queryKey[1] === heroId → Specific hero ID jo hum pass kar rahe hain.  
// jesy data obj k andr data array ...
// or dataobject parent hai [0]
// or osk andr data [1] hai...
