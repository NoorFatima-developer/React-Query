import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

const addSuperHero = (hero) => {
  // return Axios.post('http://localhost:4000/superheroes', hero)  //ye hero k andr as an obj data ara hai jb btn pr click kr rye hain or whi data yahan lek hum backned ko bejry hain or phr get kr ry h...
  return request({ url: '/superheroes', method: 'post', data: hero });
}

export const  useSuperHeroesData = (onSuccess, onError) => {
   return useQuery({
    queryKey: ['super-heroes'], // Key array format me hamesha rakhni hai
    // queryFn: () => axios.get('http://localhost:4000/superheroes'),
    queryFn: () => {return request({url: '/superheroes'})},
    // enable islye false kea hai ta k jb hum btn pr click kry tb e show o otherwise disabled e rhy...
    onSuccess,
    onError,
    enabled: false,
    // data transformation..
    // select: (data) => {
    //   const superheronames = data.data.map((hero)=> hero.name);
    //   return superheronames;
    // }
  });  
}


export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero, 
          // invalidateQueries & setQueryData..
          // onSuccess: () => {
          // Invalidate the 'super-heroes' query to refetch the data
          // queryClient.invalidateQueries(['super-heroes']);    // Purana Cache Delete, API Se Fresh Data Fetch-->nuksan-->1 new api call, effect perforamce..
          // queryClient.setQueryData(['super-heroes'], (oldData) => {  //Only update local cache..nuksan-->Agar backend me aur bhi naye heroes add ho chuke hain, wo UI me nahi aayenge..bs jo add kr ry hain whi ya locally bakei backned sy ni ayegy aghr update hoey hoey tu..
          //   return {
          //     ...oldData,
          //     data: [...oldData.data, newHero.data], //onsuccess k andr newHero pass krogi jis mai wo sucess data lek store kryga..
          // });
          // },

          // Here use Optimistic Updates:
          onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroesData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData(['super-heroes'], (oldData) => {  
            return {
              ...oldData,
              data: [...oldData.data, 
                {id: oldData?.data?.length + 1, ...newHero},
              ], 
            }
          })
          return {
            previousHeroesData,
          }
      },
          onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heros', context.previousHeroesData)
          },
          onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
          }
  });
}

// Spread operator (...) ka kaam sirf objects ya arrays ka copy banana hota hai, bina original data ko modify kiye.

// How useQuery works...

// useQuery mai chezain kesy work krti hain:
// Exmpalnation:
// const {isLoading, data, isError, error, isFetching, refetch} = useQuery({key, callback return promise})
   // It takes two arguments.. one is key and other which return a promise...
   // {isLoading, data and so on...} =>React Query ka response object
   //useQuery is a ReactHook..., and key 'super-heroes is a cache which stores data...
   // jo axios sy data ayega osko m iss data k andr save krk as a response return krogi jisko m select m lek use kea h nichy..

// aghr m inmaisy kuch use krna chahti o tu m useQuery m add krksti o..
  // defalut stale time is 0...
  // default cache time is 5minutes..
 // using devtools..
    // cacheTime: 5000,  // 5 sec tak data memory me rahega
    // staleTime: 30000, // 3 sec tak data fresh maana jayega
    // refetchOnMount: true, // Mount hone par API call nahi hogi, lkin aghr cache sy daata delete hoga fer tu hogi e..
    // refetchOnWindowFocus: 'always', // Refetch hoga, API dubara call karega (chahe cache valid ho ya nahi).
    // polling.....
    // refetchInterval: 5000, // Har 5 second baad API call hogi
    // refetchIntervalInBackground: true,  // API ko refetch karwata hai, chahe tum window focus karo ya nahi!


// another way to use useQuery with map..
  // aghr mai map mai data.map likhna chahti o tu data me yehi manually return b krwa skti o
  // const { isLoading, data } = useQuery({
  //   queryKey: ['super-heroes'],
  //   queryFn: async () => {  // function ko async banaya
  //     const res = await axios.get('http://localhost:4000/superheroes'); //  API response ka wait kiya
  //     return res.data; //  Sirf resolved data return ho raha hai
  //   }
  // });



