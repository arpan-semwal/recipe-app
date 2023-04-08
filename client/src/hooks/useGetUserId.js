//return user id 
//created so that we can sue userID whenever we require


export const useGetUserId = () => {
    return window.localStorage.getItem("userID");
}