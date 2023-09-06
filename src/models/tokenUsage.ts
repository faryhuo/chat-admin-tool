import { useState } from 'react';
import apiSetting from '../services/APISetting';
export interface ITokenUsage {
  userName: string;
  modelName: string;
  inputTokenUsage: number;
  outputTokenUsage: number;
  inputTokenFree: number;
  outputTokenFree: number;
  date: number;
}

export default () => {
  const [data, setData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [dayData, setDayData] = useState([]);

  const fetchAllTeknUsage = () => {
    return fetch(apiSetting.userAdminUrl + '/token/usage')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchYearTeknUsage = () => {
    return fetch(apiSetting.userAdminUrl + '/token/usage/1')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setYearData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchDayTeknUsage = () => {
    return fetch(apiSetting.userAdminUrl + '/token/usage/3')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setDayData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchMonthTeknUsage = () => {
    return fetch(apiSetting.userAdminUrl + '/token/usage/2')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setMonthData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getDataBykey = (key: string) => {
    if (key === 'all') {
      return data;
    } else if (key === 'year') {
      return yearData;
    } else if (key === 'month') {
      return monthData;
    } else if (key === 'day') {
      return dayData;
    }
  };

  return {
    fetchAllTeknUsage,
    fetchYearTeknUsage,
    fetchDayTeknUsage,
    fetchMonthTeknUsage,
    getDataBykey,
  };
};
