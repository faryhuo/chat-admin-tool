// counter.ts
import { useModel } from '@umijs/max';
import { useState } from 'react';
export interface IToken {
  key: string;
  channel: string;
  name: string;
  token: string;
  enable: boolean;
  expireDate: Date;
}

export default () => {
  const [data, setData] = useState([]);
  const { tokenUrl } = useModel('apiSetting');
  const fetchToken = () => {
    return fetch(tokenUrl + '/')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGPTTokens = () => {
    const tokens = data.find((item) => item.channel === 'gpt');
    if (tokens && tokens.models) {
      let i = 0;
      const data = tokens.models.map((item) => {
        item.channel = 'GPT';
        item.key = '' + i++;
        return item;
      });
      console.log(data);
      return data;
    } else {
      return [];
    }
  };
  return { fetchToken, data, getGPTTokens };
};
