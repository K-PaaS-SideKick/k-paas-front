import axios, { AxiosResponse } from "axios";
import {
  JoinResponse,
  StatusResponse,
  SearchResponse,
  NewProjectResponse,
  MainPageResponse,
  SelectedPageResponse,
} from "../Interfaces/project";

// Axios 프로젝트 인스턴스 -> 재윤이는 url 뒤에 있는 /project 바꿔서 해야해
const api = axios.create({
  baseURL:
    "http://api-gateway:8000/project",
  headers: {
    "Content-Type": "application/json",
  },
});

// 프로젝트 참가 신청 api
export const joinProject = async (
  pid: number,
  uid: string
): Promise<JoinResponse[]> => {
  try {
    const response: AxiosResponse<JoinResponse[]> = await api.post(
      `/${pid}/join`,
      { uid }
    );
    return response.data;
  } catch (error) {
    console.error("Error joining project:", error);
    throw error;
  }
};

// 프로젝트 참가 요청 보기 api
export const statusProject = async (
  pid: number,
  uid: string
): Promise<StatusResponse[]> => {
  try {
    const response: AxiosResponse<StatusResponse[]> = await api.get(
      `/${pid}/join`,
      {
        params: { uid },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting project status:", error);
    throw error;
  }
};

// 프로젝트 참가 승인 api
export const acceptProject = async (
  pid: number,
  requesterId: string,
  ownerId: string
): Promise<JoinResponse> => {
  try {
    const response: AxiosResponse<JoinResponse> = await api.post(
      `/${pid}/join/${requesterId}`,
      null,
      {
        params: { owner_id: ownerId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting project:", error);
    throw error;
  }
};

// 프로젝트 참가 거절 api
export const denyJoinRequest = async (
  pid: number,
  requesterId: string,
  ownerId: string
): Promise<void> => {
  try {
    await api.delete(`/${pid}/join/${requesterId}`, {
      params: { owner_id: ownerId },
    });
    console.log("Join request successfully denied.");
  } catch (error) {
    console.error("Error denying join request:", error);
    throw error;
  }
};

// 프로젝트 검색 api
export const searchProjects = async (
  titleQuery: string,
  pageable: { page: number; size: number; sort: string[] }
): Promise<SearchResponse> => {
  try {
    const response: AxiosResponse<SearchResponse> = await api.post(
      "/search",
      null,
      {
        params: {
          titleQuery,
          pageable,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
    throw error;
  }
};

// 새 프로젝트 작성 api
export const createNewProject = async (
  projectDTO: object,
  images: File[]
): Promise<NewProjectResponse> => {
  try {
    const formData = new FormData();
    formData.append("projectDTO", JSON.stringify(projectDTO));
    images.forEach((image, index) => {
      formData.append("images", image);
    });

    const response: AxiosResponse<NewProjectResponse> = await api.post(
      "/new",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating new project:", error);
    throw error;
  }
};

// 메인 페이지 호출
export const getMainPageProjects = async (pageable: {
  page: number;
  size: number;
  sort: string;
}): Promise<MainPageResponse> => {
  try {
    const response: AxiosResponse<MainPageResponse> = await api.get("/", {
      params: {
        page: pageable.page,
        size: pageable.size,
        sort: pageable.sort,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting main page projects:", error);
    throw error;
  }
};

// 메인 페이지에서 삭제 호출 (자기가 작성한 프로젝트만 삭제 가능하게)
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await api.delete("/", {
      params: { id },
    });
    console.log("Project successfully deleted.");
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// 메인 페이지에서 수정 호출 api (자지가 작성한 프로젝트만 수정 가능하게)
export const updateProject = async (projectData: {
  pid: number;
  uid: string;
  title: string;
  content: string;
  status: string;
  repo_link: string;
  category: number[];
  current_members: number;
  max_members: number;
  images: string[];
}): Promise<NewProjectResponse> => {
  try {
    const response: AxiosResponse<NewProjectResponse> = await api.patch(
      "/",
      projectData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// 프로젝트 상세 보기
export const getProjectsDetail = async (
  pid: number
): Promise<SelectedPageResponse> => {
  try {
    const response: AxiosResponse<SelectedPageResponse> = await api.get(
      `/${pid}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting main page projects:", error);
    throw error;
  }
};
