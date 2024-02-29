import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Table } from 'antd';
import React, { useEffect } from 'react';

const Feedback: React.FC = () => {

  const { data, fetchFeedbackList } = useModel('feedback');

  useEffect(() => {
    fetchFeedbackList();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Contact Info',
      dataIndex: 'contactInfo',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },{
      title: 'Ip Address',
      dataIndex: 'ip',
    },{
      title: 'User Id',
      dataIndex: 'userId',
    }
  ];


  return (
    <PageContainer>
      <div className="feedback-page" >
      <div className="feedback-list">
          <Card>
            <Table columns={columns} dataSource={data} bordered></Table>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Feedback;
