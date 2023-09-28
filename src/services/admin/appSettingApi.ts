// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const hostName = 'https://fary.chat:8555/chat-admin-service';

/** getSettingByCategory GET /app/setting */
export async function getSettingByCategoryUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSettingByCategoryUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.JsonResponseListAppSetting_>(hostName + '/app/setting', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateSettingByCategory PUT /app/setting */
export async function updateSettingByCategoryUsingPUT(
  body: API.CategoryUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.JsonResponseBoolean_>(hostName + '/app/setting', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getSettingByKey GET /app/setting/${param0} */
export async function getSettingByKeyUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSettingByKeyUsingGETParams,
  options?: { [key: string]: any },
) {
  const { key: param0, ...queryParams } = params;
  return request<API.JsonResponseAppSetting_>(hostName + `/app/setting/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateSettingByKey PUT /app/setting/${param0} */
export async function updateSettingByKeyUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateSettingByKeyUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { key: param0, ...queryParams } = params;
  return request<API.JsonResponseBoolean_>(hostName + `/app/setting/${param0}`, {
    method: 'PUT',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
