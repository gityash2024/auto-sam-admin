import axiosInstance from "../lib/axiosInstance";

const CMSmodel = class {
    constructor() {
        this.baseUrlAddsAndBanners = "/adsBanner"
    }
    
    async listAddsAndBanners(query = []) {
        return (await axiosInstance.get(`${this.baseUrlAddsAndBanners}?${new URLSearchParams(query)}`)).data;
    }

    async create(data = []) {
        return await axiosInstance.post(this.baseUrlAddsAndBanners, data);
    }

    async detail(id) {
        return (await axiosInstance.get(`${this.baseUrlAddsAndBanners}/${id}`)).data;
    }

    async update(id, data = []) {
        return await axiosInstance.put(`${this.baseUrlAddsAndBanners}/${id}`, data);
    }

    async delete(id) {
        return await axiosInstance.delete(`${this.baseUrlAddsAndBanners}/${id}`);
    }
}

export default new CMSmodel();