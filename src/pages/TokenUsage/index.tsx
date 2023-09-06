import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Table, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ITokenUsage } from '../../models/tokenUsage';
import './index.css';

const TokenManagement: React.FC = () => {
  const {
    getDataBykey,
    fetchAllTeknUsage,
    fetchDayTeknUsage,
    fetchMonthTeknUsage,
    fetchYearTeknUsage,
  } = useModel('tokenUsage');
  const { Text } = Typography;

  useEffect(() => {
    fetchAllTeknUsage();
  }, []);

  const [key, setKey] = useState('all');

  const changeKey = (key: string) => {
    if (key === 'day') {
      fetchDayTeknUsage();
    } else if (key === 'month') {
      fetchMonthTeknUsage();
    } else if (key === 'year') {
      fetchYearTeknUsage();
    } else if (key === 'all') {
      fetchAllTeknUsage();
    }
    setKey(key);
  };

  const getFilterObjs = (field: keyof ITokenUsage) => {
    const list: any = [];
    const map = {};
    getDataBykey(key).forEach((item) => {
      const val = item[field] as string;
      if (!map[val]) {
        list.push({
          text: val,
          value: val,
        });
      }
      map[item[field]] = true;
    });
    return list;
  };

  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName - b.userName,
      filters: getFilterObjs('userName'),
      onFilter: (value: string, record) => record.userName.indexOf(value) === 0,
    },
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      filters: getFilterObjs('modelName'),
      onFilter: (value: string, record) => record.modelName.indexOf(value) === 0,
      sorter: (a, b) => a.modelName - b.modelName,
    },
    {
      title: 'Input Token Usage',
      dataIndex: 'inputTokenUsage',
      sorter: (a, b) => a.inputTokenUsage - b.inputTokenUsage,
      render: (_: any, record: ITokenUsage) => {
        return <div>{(record.inputTokenUsage / 1024).toFixed(2) + ' K'}</div>;
      },
    },
    {
      title: 'Output Token Usage',
      dataIndex: 'outputTokenUsage',
      sorter: (a, b) => a.outputTokenUsage - b.outputTokenUsage,
      render: (_: any, record: ITokenUsage) => {
        return <div>{(record.outputTokenUsage / 1024).toFixed(2) + ' K'}</div>;
      },
    },
    {
      title: 'Input Token Free',
      dataIndex: 'inputTokenFree',
      sorter: (a, b) => a.inputTokenFree - b.inputTokenFree,
      render: (_: any, record: ITokenUsage) => {
        return <div>{record.inputTokenFree.toFixed(2)}</div>;
      },
    },
    {
      title: 'Output Token Free',
      dataIndex: 'outputTokenFree',
      sorter: (a, b) => a.outputTokenFree - b.outputTokenFree,
      render: (_: any, record: ITokenUsage) => {
        return <div>{record.outputTokenFree.toFixed(2)}</div>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      sorter: (a, b) =>
        a.inputTokenFree + a.outputTokenFree - (b.inputTokenFree + b.outputTokenFree),
      render: (_: any, record: ITokenUsage) => {
        return <div>{(record.inputTokenFree + record.outputTokenFree).toFixed(2)}</div>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date - b.date,
    },
  ];

  return (
    <PageContainer>
      <div className="token-usage-page">
        <Tabs
          onChange={(e) => changeKey(e)}
          items={[
            {
              key: 'all',
              label: 'All',
            },
            {
              key: 'year',
              label: 'Year',
            },
            {
              key: 'month',
              label: 'Month',
            },
            {
              key: 'day',
              label: 'Day',
            },
          ]}
        ></Tabs>

        <div className="data-list">
          <Table
            columns={columns as any}
            dataSource={getDataBykey(key)}
            bordered
            summary={(pageData) => {
              let total = 0;

              pageData.forEach(({ inputTokenFree, outputTokenFree }) => {
                total += inputTokenFree + outputTokenFree;
              });

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text type="danger">{total.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          ></Table>
        </div>
      </div>
    </PageContainer>
  );
};

export default TokenManagement;
