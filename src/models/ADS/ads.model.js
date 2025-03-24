import axiosInstance from "../../lib/axiosInstance";


const Adsmodel = class {

  constructor(){
    
    this.baseUrl="/faq"
  }

  async getallads(query=[])
  {
    return await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`).data;
  
  }
  
  async createads(data=[])
  {
      return await axiosInstance.post(this.baseUrl,data);
  }

}

export default new Adsmodel();