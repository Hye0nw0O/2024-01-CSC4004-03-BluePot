import { API } from "../../utils";

export const getDetail = async (category, id) => {
    try {
        const response = await API.get(`/api/communities/${category}/${id}`);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API error: ", error);
        throw error;
    }
};