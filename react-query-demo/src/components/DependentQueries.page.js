import axios from "axios"
import { useQuery } from "@tanstack/react-query";

// Dependent query ka kam
// isme pehle ek query execute hoti hai aur uske result ko use kar ke dusri query execute hoti hai.

const fetchUserByEmail = (email) => {
    return axios(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios(`http://localhost:4000/users/${channelId}`)
}

// destructure email from component props... 
export const DependentQueriesPage = ({email}) => {
// and within the component call useQuery...
const { data: user} = useQuery({
    queryKey: ["user", email], 
    queryFn: () => fetchUserByEmail(email),
});

const channelId = user?.data.channelId;
    useQuery({
    queryKey: ["courses", channelId], 
    queryFn: () => fetchCoursesByChannelId(channelId),
    // jbtk osko chaneelId ni milti tb wo null krdyga jesy e milygi phr res m wo dedyga..
    enabled: !!channelId, //converts the value to boolean and Prevents running query if email is undefined/null
});

return <div>DependentQueries</div>

}