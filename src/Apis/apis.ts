import axios, { AxiosResponse } from 'axios';
import { JoinRequest, JoinResponse, StatusResponse } from '../Interfaces/project';

// Axios 프로젝트 인스턴스 -> 재윤이는 url 뒤에 있는 /project 바꿔서 해야해
const api = axios.create({
  baseURL: 'http://dev-api-gateway-0c70e-100185383-20cb16fabe53.kr.lb.naverncp.com:8000/project',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 프로젝트 참가 요청 api
export const joinProject = async (pid: number, uid: string): Promise<JoinResponse[]> => {
  try {
    const response: AxiosResponse<JoinResponse[]> = await api.post(`/${pid}/join`, { uid });
    return response.data;
  } catch (error) {
    console.error('Error joining project:', error);
    throw error;
  }
};

// 프로젝트 참가 인원 상태 api
export const statusProject = async (pid: number, uid: string): Promise<StatusResponse[]> => {
  try {
    const response: AxiosResponse<StatusResponse[]> = await api.get(`/${pid}/join`, {
      params: { uid },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting project status:', error);
    throw error;
  }
};

// 프로젝트 참가 승인 api
export const acceptProject = async (pid: number, requesterId: string, ownerId: string): Promise<JoinResponse> => {
  try {
    const response: AxiosResponse<JoinResponse> = await api.post(`/${pid}/join/${requesterId}`, null, {
      params: { owner_id: ownerId },
    });
    return response.data;
  } catch (error) {
    console.error('Error accepting project:', error);
    throw error;
  }
};

// 프로젝트 참가 거절 api
export const denyJoinRequest = async (pid: number, requesterId: string, ownerId: string): Promise<void> => {
  try {
    await api.delete(`/${pid}/join/${requesterId}`, {
      params: { owner_id: ownerId },
    });
    console.log('Join request successfully denied.');
  } catch (error) {
    console.error('Error denying join request:', error);
    throw error;
  }
};