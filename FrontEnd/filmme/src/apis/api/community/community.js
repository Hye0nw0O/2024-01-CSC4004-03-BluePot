import { API } from "../../utils";

// 댓글 데이터 불러오기
export const getComments = async (postId) => {
    try {
        const response = await API.get(`/api/communities/posts/${postId}/comments`);
        console.log("Fetched comments: ", response.data); // 로그 추가
        return response.data;
    } catch (error) {
        console.error("Error fetching comments: ", error);
        throw error;
    }
};

// 댓글 추가하기
export const addComment = async (postId, text) => {
    const response = await API.post(`/api/communities/posts/${postId}/comments`, { content: text });
    return response.data;
};

// 댓글 삭제하기
export const deleteComment = async (postId, commentId) => {
    await axios.delete(`/api/communities/posts/${postId}/comments/${commentId}`);
};

// 게시물 추가하기
export const createPost = async (data) => {
    const response = await API.post('/api/communities/posts', data);
    return response.data;
};

// 영화관 목록 가져오기
export const getCinemas = async () => {
    const response = await API.get('/api/cinemas/');
    return response.data;
};