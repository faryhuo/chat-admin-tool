import { useState } from 'react';
import apiSetting from '../services/APISetting';
export interface IFeedback {
  id: number;
  type: string;
  ip?: string;
  contactInfo?: string;
  description?: string;
  userId?: string;
  country?: string;
}
export default () => {
  const [data, setData] = useState([]);

  const fetchFeedbackList = () => {
    return fetch(apiSetting.feedbackList)
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return { fetchFeedbackList, data };
};
