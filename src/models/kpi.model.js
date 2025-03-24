import axiosInstance from "../lib/axiosInstance";

const KpiModel=class {

    constructor(){
        this.baseUrl="/dashboard";
    }

    async dashboardKpi(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}/kpi?${new URLSearchParams(query)}`)).data;
    }
}

export default new KpiModel();