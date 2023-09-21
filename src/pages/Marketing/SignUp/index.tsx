import { PageContainer } from '@ant-design/pro-components';
import { useModel,useIntl } from '@umijs/max';
import { Button, Card, Form, InputNumber, Switch, Table } from 'antd';
import React, { useEffect } from 'react';
import './index.css';
import {getSettingByCategoryUsingGET,updateSettingByKeyUsingPUT,getSettingByKeyUsingGET} from '../../../services/admin/appSettingApi';

import { useState } from 'react';
const Signup: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const category="marketing.signup";


  useEffect(() => {
    getSettingByCategoryUsingGET({category:category}).then((responseData)=>{
      const data= responseData.data;
      console.log(data);
      if(data && data.length){
        data.forEach(item=>{
          if(item.settingKey==='marketing.signup.status'){
            form.setFieldValue("status",item.settingValue==="1");
          }else if(item.settingKey==='marketing.signup.gpt4_amount'){
            form.setFieldValue("gpt4_amount",parseInt(item.settingValue));
          }else if(item.settingKey==='marketing.signup.mj_amount'){
            form.setFieldValue("mj_amount",parseInt(item.settingValue));
          }
        })
      }
    });
  }, []);

  const ObjecttoString=(val:any)=>{
    return Number(val)+"";
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', Object.keys(values));
    Object.keys(values).forEach((item)=>{
      const value=ObjecttoString(values[item]);
      updateSettingByKeyUsingPUT({
        key:category+"."+item,
        value:value
      });
    })
  };
  return (
    <PageContainer>
      <div className="marketing-signup-page">
         <Card>
         <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label= {intl.formatMessage({
            id: 'pages.marketing.signup.status'
          })} name="status" valuePropName="checked" rules={[{ required: true }]}>
            <Switch></Switch>
            </Form.Item>
            <Form.Item label= {intl.formatMessage({
            id: 'pages.marketing.signup.gpt4_amount'
          })} name="gpt4_amount" rules={[{ required: true }]}>
            <InputNumber
              />
            </Form.Item>
            <Form.Item label= {intl.formatMessage({
            id: 'pages.marketing.signup.mj_amount'
          })} name="mj_amount" rules={[{ required: true }]}>
              <InputNumber
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({
                id: 'pages.marketing.signup.save'
              })}
            </Button>
        </Form.Item>
        </Form>
         </Card>
      </div>
    </PageContainer>
  );
};

export default Signup;
