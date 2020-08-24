import { DateString } from "./common.type";

export interface UserDto {
  id: number;
  name: string;
  email: null | string;
  verified: boolean;
  can_log_in: boolean;
  created_at: DateString;
  created_by_id: number;
  updated_at: DateString;
  updated_by_id: number;
  deleted_at: null | DateString;
  deleted_by_id: null | number;
}

export interface UserApiResource {
  data: UserDto
}

export interface UserApiCollectionResponse {
  nodes: UserApiResource[]
}
