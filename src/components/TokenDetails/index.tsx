import { useModel } from '@umijs/max';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import React, { useState } from 'react';
type Props = {
  handleCancel: () => void;
};
const TokenDetails: React.FC<Props> = ({ handleCancel }) => {
  const { addToken } = useModel('token');

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
    { label: 'Access Token', value: 'token' },
    { label: 'API key', value: 'key' },
  ];

  const [type, setType] = useState('token');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');

  const [form] = Form.useForm();

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
        initialValues={{ channel: 'gpt', type: 'token', name: 'gpt-3.5-turbo' }}
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
        {type === 'token' && (
          <>
            <Form.Item label="User name" name="username">
              <Input value={username} onChange={(e) => setUsername(e.target.value)}></Input>
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Button onClick={() => {}}>Get Access Token</Button>
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
