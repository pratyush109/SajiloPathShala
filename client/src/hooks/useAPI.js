import { useState } from "react";
import { apiRequest } from "../Utils/api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
 
  const callApi = async (method, endpoint, data = null) => {
    console.log(data);

    setLoading(true);
    
    try {
      const res = await apiRequest(method, endpoint, data);
    return res;
    
    } catch (err) {
   
      throw err;
    } finally{
      setLoading(false);
    }
  };

  return { loading, callApi };
};