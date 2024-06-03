import { API } from "../../utils";

export const getCommunitySuggestion = async () => {
    try {
        const response = await API.get('/api/communities/suggestions');
        console.log("API Response:", response.data);
        return Array.isArray(response.data.results) ? response.data.results : [];
    } catch (error) {
        console.error("API error: ", error);
        throw error;
    }
};
