import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Card, Form, InputNumber, message, Spin, Switch } from 'antd';
import React, { useEffect } from 'react';
import './index.css';
import {
  getSettingByCategoryUsingGET,
  updateSettingByCategoryUsingPUT,
} from '../../../services/admin/appSettingApi';

import { useState } from 'react';
const Signup: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const category = 'marketing.signup';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettingByCategoryUsingGET({ category: category }).then((responseData) => {
      const data = responseData.data;
      console.log(data);
      if (data && data.length) {
        setLoading(false);
        data.forEach((item) => {
          if (item.settingKey === 'marketing.signup.status') {
            form.setFieldValue('status', item.settingValue === '1');
          } else if (item.settingKey === 'marketing.signup.gpt4_amount') {
            form.setFieldValue('gpt4_amount', parseInt(item.settingValue));
          } else if (item.settingKey === 'marketing.signup.mj_amount') {
            form.setFieldValue('mj_amount', parseInt(item.settingValue));
          }
        });
      }
    });
  }, []);

  const ObjecttoString = (val: any) => {
    return Number(val) + '';
  };
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', Object.keys(values));
    const configs = {};
    Object.keys(values).forEach((item) => {
      const value = ObjecttoString(values[item]);
      configs[category + '.' + item] = value;
    });
    setLoading(true);
    updateSettingByCategoryUsingPUT({
      category: category,
      configs: configs,
    }).then(() => {
      setLoading(false);
      messageApi.open({
        type: 'success',
        content: 'Updated successlly',
      });
    });
  };
  return (
    <PageContainer>
      <Spin spinning={loading} tip="Loading..." size="large">
        <div className="marketing-signup-page">
          <Card>
            <Form
              form={form}
              onFinish={onFinish}
              layout="horizontal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label={intl.formatMessage({
                  id: 'pages.marketing.signup.status',
                })}
                name="status"
                valuePropName="checked"
                rules={[{ required: true }]}
              >
                <Switch></Switch>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: 'pages.marketing.signup.gpt4_amount',
                })}
                name="gpt4_amount"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: 'pages.marketing.signup.mj_amount',
                })}
                name="mj_amount"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  {intl.formatMessage({
                    id: 'pages.marketing.signup.save',
                  })}
                </Button>
              </Form.Item>
            </Form>
          </Card>
          {contextHolder}
        </div>
      </Spin>
    </PageContainer>
  );
};

export default Signup;
