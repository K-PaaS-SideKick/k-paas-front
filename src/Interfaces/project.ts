export interface JoinRequest {
    pid: number;
    uid: string;
};

export interface JoinResponse {
    uid: string;
    active: boolean;
};