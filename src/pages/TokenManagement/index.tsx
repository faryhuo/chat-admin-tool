import TokenDetails from '@/components/TokenDetails';
import { IToken } from '@/models/token';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, message, Modal, Popconfirm, Radio, Space, Table, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './index.css';
import ButtonGroup from 'antd/es/button/button-group';

const TokenManagement: React.FC = () => {
  const [key, setKey] = useState('gpt');
  const {
    fetchToken,
    tokens,
    testToken,
    refresh,
    updateStatus,
    deleteToken,
    setTokens,
    triggerToken,
    updateToken,
    updateEnable,
  } = useModel('token');
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiType, setApiType] = useState("ACCESS-TOKEN");

  const getTokens = () => {
    return tokens.filter((token) => (token.channel === key && token.type===apiType));
  };

  const test = (id) => {
    testToken(id)
      .then((response) => {
        if (response.data) {
          updateStatus(true, id);
          messageApi.success('Test Success');
        } else {
          updateStatus(false, id);
          messageApi.error('Test fail');
        }
      })
      .catch(() => {
        updateStatus(false, id);
        messageApi.error('Test fail');
      });
  };

  const testAll = () => {
    getTokens().forEach((token) => {
      const id = token.id;
      testToken(id)
        .then((response) => {
          if (response.data) {
            updateStatus(true, id);
          } else {
            updateStatus(false, id);
          }
          messageApi.success('Test success');
        })
        .catch(() => {
          updateStatus(false, id);
          messageApi.error('Test fail');
        });
    });
  };

  const testAllEnable = () => {
    getTokens().forEach((token) => {
      if(!token.enable){
        return;
      }
      const id = token.id;
      testToken(id)
        .then((response) => {
          if (response.data) {
            updateStatus(true, id);
          } else {
            updateStatus(false, id);
          }
          messageApi.success('Test success');
        })
        .catch(() => {
          updateStatus(false, id);
          messageApi.error('Test fail');
        });
    });
  };

  
  const testAllDisabled = () => {
    getTokens().forEach((token) => {
      if(token.enable){
        return;
      }
      const id = token.id;
      testToken(id)
        .then((response) => {
          if (response.data) {
            updateStatus(true, id);
          } else {
            updateStatus(false, id);
          }
          messageApi.success('Test success');
        })
        .catch(() => {
          updateStatus(false, id);
          messageApi.error('Test fail');
        });
    });
  };

  const triggerEnable = (id: number, enable: boolean) => {
    triggerToken(id, enable)
      .then((response) => {
        if (response.data) {
          updateEnable(!enable, id);
          messageApi.success('Enable success');
        } else {
          messageApi.error('Encounter error');
        }
      })
      .catch(() => {
        updateStatus(false, id);
        messageApi.error('Encounter error');
      });
  };

  const deleteFun = (id: number) => {
    deleteToken(id).then((data) => {
      if (data.data) {
        const index = tokens.findIndex((token) => token.id === id);
        if (index >= 0) {
          tokens.splice(index, 1);
          setTokens(tokens);
          refresh();
        }
      }
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [tokenDetail,setTokenDetail] = useState<any>(null);

  const addToken=()=>{
    setTokenDetail(null);
    showModal();
  }

  const editToken=(id:number)=>{
    fetch('https://gateway.fary.chat/chat-service/token/'+id,{
      headers:{
        token:localStorage["admin-user-token"]
      }
    })
    setTokenDetail(null);
    showModal();
  }

  const columns = [
    // {
    //   title: 'Channel',
    //   dataIndex: 'channel',
    // },
    {
      title: 'Model Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    // },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a?.username.localeCompare(b?.username)
    },
    {
      title: 'Password',
      dataIndex: 'password',
    },
    {
      title: 'Token',
      dataIndex: 'token',
    },
    {
      title: 'Expired Date',
      dataIndex: 'expireDate',
      sorter: (a, b) =>a.expireDate?a?.expireDate.localeCompare(b?.expireDate):1,
      editable: true,
      inputType: 'date',
      render: (_: any, record: IToken) => {
        return (
          <div>
            {record.expireDate ? dayjs(record.expireDate).format('YYYY-MM-DD') : 'Not Expired'}
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status  - b.status,
      render: (_: any, record: IToken) => {
        if (record.status) {
          return <Tag color="success">Success</Tag>;
        } else if (record.status === false) {
          return <Tag color="error">Fail</Tag>;
        } else {
          return <Tag>none</Tag>;
        }
      },
    },
    {
      title: 'Enable',
      dataIndex: 'enable',
      sorter: (a, b) => a.enable  - b.enable,
      render: (_: any, record: IToken) => {
        if (record.enable) {
          return <Tag color="success">Enable</Tag>;
        } else {
          return <Tag color="error">Disabled</Tag>;
        }
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: IToken) => {
        return (
          <span>
            <Button
              key={1}
              type="primary"
              className="action-btn"
              onClick={() => {
                test(record.id);
              }}
            >
              Test
            </Button>

            {record.type === 'ACCESS-TOKEN' && record.name==='gpt-3.5-turbo' &&(
              <Popconfirm
                key={5}
                title="update token"
                description="Are you sure to update this token?"
                onConfirm={() => updateToken(record.id).then(refresh)}
                okText="Yes"
                cancelText="No"
              >
                <Button className="action-btn">Update</Button>
              </Popconfirm>
            )}
            <Button key={6} className="action-btn" onClick={()=>editToken(record.id)}>Edit</Button>
            <Button
              key={2}
              className="action-btn"
              onClick={() => triggerEnable(record.id, record.enable)}
            >
              {record.enable ? 'Disabled' : 'Enable'}
            </Button>
            <Popconfirm
              key={3}
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => deleteFun(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button key={4} danger className="action-btn">
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];


  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <PageContainer>
      <div className="token-management-page">
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card>
            <Modal title="Add Token" open={isModalOpen} onCancel={handleCancel} footer={false}>
              <TokenDetails initialValues={tokenDetail} handleCancel={handleCancel}></TokenDetails>
            </Modal>
            <div className="action-buttons">
              <Button type="primary" className="action-btn" onClick={addToken}>
                Add Token
              </Button>
              <Button type="primary" className="action-btn" onClick={refresh}>
                Refresh
              </Button>
              <Button type="primary" className="action-btn" onClick={() => testAll()}>
                Test All
              </Button>
              <Button type="primary" className="action-btn" onClick={() => testAllEnable()}>
                Test All Enable
              </Button>
              <Button type="primary" className="action-btn" onClick={() => testAllDisabled()}>
                Test All Disabled
              </Button>
            </div>
          </Card>

          <Card>
            <Tabs
              onChange={(e) => setKey(e)}
              items={[
                {
                  key: 'gpt',
                  label: 'GPT',
                },
                {
                  key: 'other',
                  label: 'other',
                },
              ]}
            ></Tabs>
            <div className="token-list">
              <div className="api-key-type-group">
                <ButtonGroup>
                  <Radio onClick={()=>setApiType("ACCESS-TOKEN")} value="ACCESS-TOKEN" checked={apiType==="ACCESS-TOKEN"}>Access Token</Radio>
                  <Radio onClick={()=>setApiType("API-KEY")} value="API-KEY" checked={apiType==="API-KEY"}>API Key</Radio>
                </ButtonGroup>
              </div>
              <div className="api-key-list">
                <Table columns={columns} dataSource={getTokens()} bordered></Table>
              </div>
            </div>
          </Card>
        </Space>
        {contextHolder}
      </div>
    </PageContainer>
  );
};

export default TokenManagement;
