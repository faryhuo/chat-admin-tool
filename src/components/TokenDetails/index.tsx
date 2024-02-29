import { useModel } from '@umijs/max';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
type Props = {
  handleCancel: () => void;
  initialValues?: any;
};
const TokenDetails: React.FC<Props> = ({ handleCancel,initialValues }) => {
  const { addToken, getAccessToken } = useModel('token');

  const channelOptions = [
    {
      label: 'GPT',
      value: 'gpt',
    },
  ];

  const modelOptions = [
    {
      label: 'gpt-3.5-turbo',
      value: 'gpt-3.5-turbo',
      channel: 'gpt',
    },
    {
      label: 'gpt-4',
      value: 'gpt-4',
      channel: 'gpt',
    },
    {
      label: 'gpt-3.5-ft',
      value: 'gpt-3.5-ft',
      channel: 'gpt',
    },
  ];

  const typeOptions = [
    { label: 'Access Token', value: 'ACCESS-TOKEN' },
    { label: 'API key', value: 'API-KEY' },
  ];

  const [type, setType] = useState('token');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');

  const [form] = Form.useForm();

  const setKeyByUsername = () => {
    getAccessToken(username, pwd).then((responseData) => {
      console.log(responseData);
      form.setFieldValue('token', responseData.accessToken);
      form.setFieldValue(
        'expireDate',
        dayjs().add(responseData.expires_in / 60 / 60 / 24 - 1, 'D'),
      );
    });
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    addToken(values).then((response) => {
      if (response.data) {
        alert('success');
        handleCancel();
      } else {
        alert('fail');
      }
    });
  };
  return (
    <div>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        form={form}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues?initialValues:{ channel: 'gpt', type: 'token', name: 'gpt-3.5-turbo' }}
        onFinish={onFinish}
      >
        <Form.Item label="Channel" name="channel" rules={[{ required: true }]}>
          <Select options={channelOptions}></Select>
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Radio.Group
            options={typeOptions}
            optionType="button"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
        </Form.Item>
        {type === 'ACCESS-TOKEN' && (
          <>
            <Form.Item label="User name" name="username" key={1}>
              <Input value={username} onChange={(e) => setUsername(e.target.value)}></Input>
            </Form.Item>
            <Form.Item label="Password" name="password" key={2}>
              <Input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }} key={3}>
              <Button onClick={setKeyByUsername}>Get Access Token</Button>
            </Form.Item>
          </>
        )}
        <Form.Item label="Model" name="name" rules={[{ required: true }]}>
          <Select options={modelOptions}></Select>
        </Form.Item>
        <Form.Item label="Token" name="token" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 3 }}></Input.TextArea>
        </Form.Item>
        <Form.Item label="Expire Date" name="expireDate">
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TokenDetails;
