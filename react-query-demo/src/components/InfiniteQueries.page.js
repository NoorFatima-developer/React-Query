import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// fetchColors:=>function
const fetchColors = () => {
  return axios.get("http://localhost:4000/colors")
};

export const InfiniteQueriesPage = () => {

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["colors"],
    queryFn: () => fetchColors
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
      {data?.data.length > 0 ? (
          data?.data.map((color) => (
            <div key={color.id}>
              <h2>{color.id}: {color.label}</h2>
            </div>
          ))
        ) : (
          <h3>No Colors Found</h3>
        )}
      </div>

    </>
  );
};

