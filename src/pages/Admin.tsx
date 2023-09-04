import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import React from 'react';
const Admin: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    ></PageContainer>
  );
};

export default Admin;
