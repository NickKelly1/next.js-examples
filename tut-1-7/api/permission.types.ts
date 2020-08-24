import { NextApiRequest, NextApiResponse } from "next";
import { DateString } from "./common.type";

export interface PermissionDto {
  id: number;
  name: string;
  description: null | string;
  created_at: DateString;
  created_by_id: number;
  updated_at: DateString;
  updated_by_id: number;
}

export interface RoleApiResource {
  data: PermissionDto
}

export interface RoleApiCollectionResponse {
  nodes: RoleApiResource[]
}
