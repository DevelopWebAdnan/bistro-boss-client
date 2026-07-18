import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: AdminPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // The query will not execute until the userId exists
        enabled: !loading,
        // if(loading) {
        //     enabled: false
        // }
        queryFn: async () => {
                console.log('checking or verifying is admin', user);
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, AdminPending];
};

export default useAdmin;