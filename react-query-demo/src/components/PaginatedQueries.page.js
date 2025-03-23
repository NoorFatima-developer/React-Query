  import { useQuery } from "@tanstack/react-query";
  import axios from "axios";
  import { useState } from "react";

  // fetchColors:=>function
  const fetchColors = async(pageNumber) => {
    const response = await axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
    return response.data;
  };

  export const PaginatedQueriesPage = () => {
    // For pagination , I will use useState...
    const [pageNumber, setPageNumber] = useState(1); //by-default page number is 1..

    const { isLoading, isFetching, data, isError, error } = useQuery({
      queryKey: ["colors", pageNumber],
      queryFn: () => fetchColors(pageNumber), // Pass page number inside function
      keepPreviousData: true,         // For smooth transition between pages
      staleTime: 0, // Forces refetch on page change
      refetchOnWindowFocus: false, // Prevents automatic refetching
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
        {data?.length > 0 ? (
            data.map((color) => (
              <div key={color.id}>
                <h2>{color.id}: {color.label}</h2>
              </div>
            ))
          ) : (
            <h3>No Colors Found</h3>
          )}
        </div>

        <div>
        <button
            onClick={() => setPageNumber((prev) => (prev - 1))}
            disabled={pageNumber === 1}
          >
            Prev Page
          </button>
          <button
            onClick={() => setPageNumber((prev) => (prev + 1))}
            disabled={pageNumber === 8}
          >
            Next Page
          </button>
        </div>
        {isFetching && 'Loading'}
      </>
    );
  };

// Why use , when and how?

// 🟢 Jab ek specific page pe jana ho (like page 1, 2, 3, etc.), toh paginated query use hoti hai.
// 🟢 "Next Page" aur "Previous Page" ka concept hota hai.
// 🟢 Sirf ek page ka data memory me hota hai, pichla page cache se delete ho sakta hai.