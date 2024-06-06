import { API } from "../../utils";

// 댓글 데이터 불러오기
export const getComments = async (postId) => {
    const response = await API.get(`/api/communities/posts/${postId}/comments`);
    return response.data;
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