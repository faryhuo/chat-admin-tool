// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getGPT4Usage GET /zhishu/usage/gpt-4 */
export async function getGPT4UsageUsingGET(options?: { [key: string]: any }) {
  return request<API.JsonResponseZhiShiYunApiInfo_>('/zhishu/usage/gpt-4', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getImageRelaxUsage GET /zhishu/usage/image/relax */
export async function getImageRelaxUsageUsingGET(options?: { [key: string]: any }) {
  return request<API.JsonResponseZhiShiYunApiInfo_>('/zhishu/usage/image/relax', {
    method: 'GET',
    ...(options || {}),
  });
}
