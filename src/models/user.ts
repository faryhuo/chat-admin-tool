import { useState } from 'react';
import apiSetting from '../services/APISetting';
export interface IUser {
  id: number;
  userId: string;
  name: string;
  avatar?: string;
  sign?: string;
  gender?: string;
  birth?: string;
  createDate?: Date;
  updateDate?: Date;
}
export default () => {
  const [data, setData] = useState([]);

  const fetchUserList = () => {
    return fetch(apiSetting.userAdminUrl + '/user')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return { fetchUserList, data };
};
