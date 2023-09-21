import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Table } from 'antd';
import React, { useEffect } from 'react';
import './index.css';

const UserManagement: React.FC = () => {
  const { data, fetchUserList } = useModel('user');

  useEffect(() => {
    fetchUserList();
  }, []);

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'userId',
    },
    {
      title: 'User name',
      dataIndex: 'name',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
    }   
  ];

  return (
    <PageContainer>
      <div className="user-management-page">
        <div className="user-list">
          <Card>
            <Table columns={columns} dataSource={data} bordered></Table>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserManagement;
