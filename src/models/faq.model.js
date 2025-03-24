import axiosInstance from "../lib/axiosInstance";

const Faqmodel = class {
  constructor() {
    this.baseUrl = "/faq"
  }

  async list(query = []) {
    return (await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`)).data;
  }

  async create(data = []) {
    return await axiosInstance.post(this.baseUrl, data);
  }
  async delete(id) {
    return await axiosInstance.delete(`${this.baseUrl}/${id}`);
  }

}

export default new Faqmodel();