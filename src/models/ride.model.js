import axiosInstance from "../lib/axiosInstance";

const RideModel = class {
    constructor() {
        this.baseUrl = "/ride";
    }

    async rideList(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`)).data;
    }

}

export default new RideModel();