import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button,DatePicker,Form,Input,Table, Tag } from 'antd';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import './TokenManagement.css'
interface Item {
    key: string;
    channel: string;
    model: string;
    token: string;
    enable:boolean;
    expireDate: Date;
  }


  
const TokenManagement: React.FC = () => {
  const intl = useIntl();
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [data, setData] = useState([{
    key:"1",
    channel:"GPT",
    model:"GPT-4",
    token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhZHA0YS5heGlzb2Z0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWhsQkJ1MWVEbVh6VWFKdGtRQ0VvaXNMViJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjQ4OTY2ZTEwMGJlZmFmZmQ4MTk3ZDQxIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MzU1MzE0MiwiZXhwIjoxNjk0NzYyNzQyLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.jCV1B0--1mY5LYKx9WS5OYmNCHR5I8yL-Go7qS0sPJ4FhkkiN04vXwQkXKCEX7Sus-xy2tVBxqYpOYn7zvrF98zNRgOYLJzsVYidOQDMmGdGnnXOo5wvuYrVHmzXgKE8iK1frIgXvIpiWf7XmO_eCGcib10JjXOtLHKc3L2t_Tc3OEmWt3FofkNBCcBfODUCm3uq9Ab7J8MyWz3YYEfeh7uUVhPmdYMjSnveNFpt_2knlaVsRDsoVJFAEP9VYnkCdiTEt5bLc_ujmHmHqAojk3xfg01aCqoTyVuW0eR7tj-rnJ8MQQxLZN4oZAbB4pfzS6T4_aRJ4HVKBi3bWOvnaw",
    expireDate:new Date()
  }]);
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
    {
      title: 'Channel',
      dataIndex: 'channel',
    },
    {
        title: 'Model Name',
        dataIndex: 'model',
      },
    {
      title: 'Token',
      dataIndex: 'token',
      editable: true,
      inputType:"text",
      render: (_: any, record: Item) => {
        if(isEditing(record)){
            return <Input.TextArea autoSize style={{"width": 600}} value={record.token}></Input.TextArea>
        }else{
            return <div style={{"maxWidth": 600}}>{record.token}</div>
        }
      }
    },
    {
      title: 'Expired Date',
      dataIndex: 'expireDate',
      editable: true,
      inputType:"date",
      render: (_: any, record: Item) => {
        if(isEditing(record)){
            return <DatePicker value={dayjs(record.expireDate)}/>
        }else{
            return <div>{dayjs(record.expireDate).format("YYYY-MM-DD")}</div>
        }
      }
    },
    {
        title: 'Enable',
        dataIndex: 'enable',
        render: (_: any, record: Item) => {
            if(record.enable){
                return   <Tag color="success">Enable</Tag>
            }else{
                return   <Tag color="error">Disabled</Tag>
            }
          }
    }, {
        title: 'operation',
        dataIndex: 'operation',
        render: (_: any, record: Item) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Button type='primary' className='action-btn'>
                Save
              </Button>
              <Button onClick={cancel} className='action-btn'>
                <a>Cancel</a>
              </Button>
            </span>
          ) : (
            <span>
                <Button className='action-btn'>
                Test
                </Button>
                <Button onClick={() => edit(record)}  className='action-btn'>
                Edit
                </Button>
                <Button  className='action-btn'>
                    Disabled
                </Button>
            </span>
          );
        }
    }
  ];


  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.token.management.title',
        defaultMessage: 'Token Management',
      })}
    >
       <div className='token-management-page'>
        <div className="action-buttons">
            <Button type='primary'>Add Token</Button>
        </div>
        <div className="token-list">
            <Table columns={columns} dataSource={data} 
          rowClassName="editable-row"
          bordered>
            </Table>
        </div>
       </div>
    </PageContainer>
  );
};

export default TokenManagement;
