type RoleAttr = {
  id: string;
  name: string;
  createdDate: Date;
};

type AuthAttr = {
  userId: string;
  userName: string;
  email: string;
  token: string;
  expireDate: Date;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refresh_token: string;
  role: RoleAttr;
};

type AuthResponseAttr = {
  requestData: {
    email: string;
    password: string;
  };
  responseData: AuthAttr;
  status: number;
  message: string;
};

type ErrorResponse = {
  Message: string;
  Status: number;
};

type PageAttr<TData> = {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: 0;
  nextPage: string;
  previousPage: string;
  data: Array<TData>;
};

export type { AuthAttr, AuthResponseAttr, ErrorResponse, PageAttr, RoleAttr };
