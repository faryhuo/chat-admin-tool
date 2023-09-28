declare namespace API {
  type AppSetting = {
    description?: string;
    id?: number;
    settingCategory?: string;
    settingKey?: string;
    settingType?: string;
    settingValue?: string;
  };

  type CategoryUpdateRequest = {
    category?: string;
    configs?: Record<string, any>;
  };

  type Error = {
    errorCode?: number;
    message?: string;
  };

  type getSettingByCategoryUsingGETParams = {
    /** category */
    category: string;
  };

  type getSettingByKeyUsingGETParams = {
    /** key */
    key: string;
  };

  type JsonResponseAppSetting_ = {
    data?: AppSetting;
    errors?: Error;
    statusCode?: number;
    success?: boolean;
  };

  type JsonResponseBoolean_ = {
    data?: boolean;
    errors?: Error;
    statusCode?: number;
    success?: boolean;
  };

  type JsonResponseListAppSetting_ = {
    data?: AppSetting[];
    errors?: Error;
    statusCode?: number;
    success?: boolean;
  };

  type JsonResponseZhiShiYunApiInfo_ = {
    data?: ZhiShiYunApiInfo;
    errors?: Error;
    statusCode?: number;
    success?: boolean;
  };

  type updateSettingByKeyUsingPUTParams = {
    /** key */
    key: string;
    /** value */
    value: string;
  };

  type ZhiShiYunApiInfo = {
    remainingAmount?: number;
    type?: string;
    usedAmount?: number;
  };
}
