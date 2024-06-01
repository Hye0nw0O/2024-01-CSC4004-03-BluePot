import { API } from "../utils";

export const getCommunityCommon = async () => {
    try {
        const response = await API.get('/api/communities/common');
        console.log("success!", response.data);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("API error: ", error);
        throw error;
    }
};