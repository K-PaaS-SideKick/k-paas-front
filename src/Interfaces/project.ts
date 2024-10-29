export interface StatusResponse {
    uid: string;
    active: boolean;
};

export interface JoinResponse {
    pid: number;
    uid: string;
};

export interface SearchResponse {
    totalPages: number;
    totalElements: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
    };
    first: boolean;
    last: boolean;
    pageable: {
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        offset: number;
        unpaged: boolean;
    };
    size: number;
    content: NewProjectResponse[];
    number: number;
    numberOfElements: number;
    empty: boolean;
};

export interface NewProjectResponse {
    pid: number;
    uid: string;
    title: string;
    date: string;
    content: string;
    repo_link: string;
    upvotes: number;
    comments: number;
    views: number;
    scraps: number;
    status: string;
    max_members: number;
    current_members: number;
};

export interface MainPageResponse {
    totalPages: number;
    totalElements: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    first: boolean;
    last: boolean;
    pageable: {
      sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
      };
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      offset: number;
      unpaged: boolean;
    };
    size: number;
    content: NewProjectResponse[];
    number: number;
    numberOfElements: number;
    empty: boolean;
  }