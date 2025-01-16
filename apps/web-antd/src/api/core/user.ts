import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

export interface UserAPIBundle {
  keysecret: string;
}

export interface UserKeyResult {
  keysecret: string;
  code: number;
  message: string;
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

export async function getUserAPIKey() {
  return requestClient.get<UserAPIBundle>('/user/key');
}

export async function saveUserKey(data: UserAPIBundle) {
  return requestClient.post<UserKeyResult>('/user/key', data);
}
