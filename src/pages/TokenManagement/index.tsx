import TokenDetails from '@/components/TokenDetails';
import { IToken } from '@/models/token';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, message, Modal, Popconfirm, Space, Table, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './index.css';

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
    updateToken,
    updateEnable,
  } = useModel('token');
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTokens = () => {
    return tokens.filter((token) => token.channel === key);
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
          messageApi.error('Test success');
        })
        .catch(() => {
          updateStatus(false, id);
          messageApi.error('Test fail');
        });
    });
  };

  const triggerEnable = (id: number, enable: boolean) => {
    updateToken(id, enable)
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

  const columns = [
    // {
    //   title: 'Channel',
    //   dataIndex: 'channel',
    // },
    {
      title: 'Model Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Username',
      dataIndex: 'username',
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <PageContainer>
      <div className="token-management-page">
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card>
            <Modal title="Add Token" open={isModalOpen} onCancel={handleCancel} footer={false}>
              <TokenDetails handleCancel={handleCancel}></TokenDetails>
            </Modal>
            <div className="action-buttons">
              <Button type="primary" className="action-btn" onClick={showModal}>
                Add Token
              </Button>
              <Button type="primary" className="action-btn" onClick={refresh}>
                Refresh
              </Button>
              <Button type="primary" className="action-btn" onClick={() => testAll()}>
                Test All
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
              <Table columns={columns} dataSource={getTokens()} bordered></Table>
            </div>
          </Card>
        </Space>
        {contextHolder}
      </div>
    </PageContainer>
  );
};

export default TokenManagement;
