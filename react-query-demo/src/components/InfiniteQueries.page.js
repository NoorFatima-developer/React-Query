import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

// fetchColors:=>function
const fetchColors = (pageParam = 1) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  // inifnitequery provide hasNextPage and fetchNextPage functions, isFetching and isFetchingNextPage...
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: ({ pageParam = 1}) => fetchColors(pageParam),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else return undefined;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group?.data.map((color)=>(
                <h2 key={color.id}>
                {color.id}: {color.label}
              </h2>
              ))}
            </Fragment>
          ))
}
      </div>

      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

// Why use, when and how?
// 🟠 Jab ek list scroll ya "Load More" button se continuously badhti ho, toh infinite query use hoti hai.
// 🟠 Pehle se load hua data remove nahi hota, har page ke records stack hote jate hain.
// 🟠 Agar tum kisi purane page pe wapas nahi jana chahti, toh ye best hai.
