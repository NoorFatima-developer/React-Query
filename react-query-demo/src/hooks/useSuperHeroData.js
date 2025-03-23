import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// heros ki list m sy single hero ka data cache kea hoa h iss file mai aleda sy..
const fetchSuperHero = (heroId) => {
  console.log("Hero ID being fetched:", heroId);
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// can also do..
// const fetchSuperHero = ({queryKey}) => {
//     const heroId = queryKey[1]   //yahan pr hum heroId leri hain ...
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

export const useSuperHeroData = (heroId) => {
  // Initial query data:
  // using useQueryClient:-->ye cached sy superheros mai sy single hero ka data leny klye use kea hai......
  // ku k automatically wo sary heros ko ikathy cache m rkh rha hai or aghr m osmai sy single ko kehti o tu osko lgta wo available e ni hai
  // or wo cache sy find ni krta single ko..
  // superheros sary heros ki list ko ikathy cache m store kr rha hai or aghr mjy single hero chahye ut osklye wo dubara api call kryga
  // instead of k wo cache m sy hi data dy ku k wo superheros ko aleda smj rha h islye meny superheros mai sy single hero id ko b cache m save krdea hao ta k next time wo single hero ko jb dubara find kry tu cache mai pra o..
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['super-hero', heroId],  //  Must be an array
    queryFn: () => fetchSuperHero(heroId),  //Hero ID queryKey me store ho rahi hai.ReactQuery querykey array ko queryfunc k andr props m bejta hai
    // phr mjy nichy heroId pass krny ki need ni prygi ku k..heroId actually osko params sy mil e ri hai so need 
    // queryFn: fetchSuperHero,  // Yahan sirf function ka naam diya, alag se heroId pass nahi ki
      initialData: () => {
        const cachedheros = queryClient.getQueryData('super-heroes');
        if((cachedheros)) {
          const hero = cachedheros.find((hero)=> hero.id === parseInt(heroId));
          return hero ? {data: hero} : undefined;
        }

        return undefined;
      }
  });

};


// queryKey[0] === 'super-hero' → General identifier hai (constant).
// queryKey[1] === heroId → Specific hero ID jo hum pass kar rahe hain.  
// jesy data obj k andr data array ...
// or dataobject parent hai [0]
// or osk andr data [1] hai...
