import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Table } from 'antd';
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
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Signature',
      dataIndex: 'sign',
    },
    {
      title: 'Birth',
      dataIndex: 'birth',
    },
  ];

  return (
    <PageContainer>
      <div className="user-management-page">
        <div className="user-list">
          <Table columns={columns} dataSource={data} bordered></Table>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserManagement;
