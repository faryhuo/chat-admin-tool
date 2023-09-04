import { Form, Input, Select } from 'antd';
import React from 'react';

const TokenDetails: React.FC = () => {

  const channelOptions=[{
    label:"GPT",
    value:"gpt"
  }]

  return (
     <div>
      <Form layout="horizontal">
        <Form.Item label="Channel" name="channel">
          <Select options={channelOptions}  ></Select>
        </Form.Item>
        <Form.Item label="Token" name="token">
          <Input.TextArea autoSize={{minRows:3}}></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <Select options={channelOptions}  ></Select>
        </Form.Item>
      </Form>
     </div>
  );
};

export default TokenDetails;
