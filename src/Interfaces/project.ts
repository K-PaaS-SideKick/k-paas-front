export interface JoinRequest {
    pid: number;
    uid: string;
};

export interface StatusResponse {
    uid: string;
    active: boolean;
};

export interface JoinResponse {
    pid: number;
    uid: string;
};