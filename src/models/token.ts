import { useModel } from '@umijs/max';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
export interface IToken {
  id: number;
  name: string;
  channel: string;
  token: string;
  type: string;
  username: string;
  password: string;
  enable: boolean;
  expireDate: Date;
  status: boolean;
}

export default () => {
  const [data, setData] = useState([]);
  const [tokens, setTokens] = useState([]);

  const { tokenUrl } = useModel('apiSetting');
  const fetchToken = () => {
    return fetch(tokenUrl + '/')
      .then((rep) => rep.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData.data);
        let tokens = [];
        responseData.data.forEach((item) => {
          const models: IToken[] = item.models;
          models.forEach((model) => {
            model.channel = item.channel;
          });
          tokens = tokens.concat(item.models);
        });
        setTokens(tokens);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateStatus = useCallback(
    (status: boolean, tokenId: number) => {
      console.log(tokenId);
      console.log(status);
      const newTokens = tokens.map((token) => {
        if (token.id === tokenId) {
          token.status = status;
        }
        return token;
      });
      setTokens(newTokens.concat([]));
    },
    [tokens],
  );

  const updateEnable = useCallback(
    (enable: boolean, tokenId: number) => {
      const newTokens = tokens.map((token) => {
        if (token.id === tokenId) {
          token.enable = enable;
        }
        return token;
      });
      setTokens(newTokens.concat([]));
    },
    [tokens],
  );

  const testToken = (tokenId: number) => {
    return fetch(tokenUrl + '/test/' + tokenId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    });
  };

  const triggerToken = (tokenId: number, enable: boolean) => {
    return fetch(tokenUrl + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enable: !enable,
        id: tokenId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    });
  };

  const updateToken = (tokenId: number) => {
    return fetch(tokenUrl + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: tokenId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    });
  };

  const deleteToken = (tokenId: number) => {
    return fetch(tokenUrl + '/' + tokenId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    });
  };

  const getAccessToken = (username: string, pwd: string) => {
    return fetch('https://gateway.fary.chat:8112/api_123_chat/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: pwd,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  };

  const addToken = (token: IToken) => {
    return fetch(tokenUrl + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: token.channel,
        expireDate: token.expireDate ? dayjs(token.expireDate).format('YYYY-MM-DD') : null,
        model: token.name,
        token: token.token,
        username: token.username,
        password: token.password,
        type: token.type,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  };

  const refresh = () => {
    return fetch(tokenUrl + '/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return fetchToken();
    });
  };

  return {
    fetchToken,
    data,
    tokens,
    testToken,
    updateStatus,
    deleteToken,
    setTokens,
    updateToken,
    triggerToken,
    updateEnable,
    refresh,
    getAccessToken,
    addToken,
  };
};
