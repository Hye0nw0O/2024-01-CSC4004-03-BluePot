import { API } from "../../utils";

// 좋아요 한 영화관
export const getCinemas = async () => {
    const response = await API.get(`/api/cinemas`);
    return response.data;
};

// 좋아요 한 게시물
export const getLikedPosts = async () => {
    const response = await API.get(`/api/communities`);
    return response.data;
};