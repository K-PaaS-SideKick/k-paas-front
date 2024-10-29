import axios, { AxiosResponse } from "axios";
import { JoinRequest, JoinResponse } from "../Interfaces/project";

const apiClient = axios.create({
    baseURL: 'http://dev-api-gateway-0c70e-100185383-20cb16fabe53.kr.lb.naverncp.com:8000/project',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const joinProject = async (pid: number, uid: string): Promise<JoinResponse[]> => {
    try {
      const response = await apiClient.post<JoinResponse[]>(`/${pid}/join`, { pid, uid });
      return response.data;
    } catch (error) {
      console.error('Error joining project:', error);
      throw error;
    }
  };