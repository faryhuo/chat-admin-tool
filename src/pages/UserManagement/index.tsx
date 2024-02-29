import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Table } from 'antd';
import React, { useEffect } from 'react';
import './index.css';

function isChinesePhoneNumber(phoneNumber) {
  // 中国手机号码的正则表达式
  let regex = /^1[3456789]\d{9}$/;
  return regex.test(phoneNumber);
}

function isEmail(email) {
  // 电子邮件地址的正则表达式
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const UserManagement: React.FC = () => {
  const { data, fetchUserList } = useModel('user');

  useEffect(() => {
    fetchUserList();
  }, []);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render:(text: string) => text?<img src={text} alt="avatar" style={{width: '50px', height: '50px'}}></img>:"None"
    },
    {
      title:'Type',
      dataIndex: 'userId',
      render:(userId:string)=>{
        if(userId.startsWith('o-')){
          return 'WeChat'
        }else if(isChinesePhoneNumber(userId)){
          return 'Phone'
        }else if(isEmail(userId)){
          return 'Email'
        }else{
          return 'Custom User'
        }
      },
      filters: [
        {
          text: 'WeChat',
          value: 'WeChat',
        },
        {
          text: 'Phone',
          value: 'Phone',
        },
        {
          text: 'Email',
          value: 'Email',
        },
        {
          text: 'Custom User',
          value: 'Custom User',
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string, record) => {
        let userId=record.userId;
        if(userId.startsWith('o-')){
          return 'WeChat'===value;
        }else if(isChinesePhoneNumber(userId)){
          return 'Phone'===value;
        }else if(isEmail(userId)){
          return 'Email'===value;
        }else{
          return 'Custom User'===value;
        }
      },
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
    },
    {
      title: 'User name',
      dataIndex: 'name',
    },
    {
      title:"Sign Up Time",
      dataIndex:"createDate",
      sorter: (a, b) =>a?.createDate-b?.createDate,
      render: (createDate: number)=> new Date(createDate).toDateString()
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
