import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect } from 'react';

const Status: React.FC = () => {

  useEffect(() => {
  }, []);


  return (
    <PageContainer>
      <div className="status-page" >
        <iframe style={{position:'absolute',top:0,bottom:0,right:0,left:0}} src="https://uptime.fary.chat:8443/status/chat"></iframe>
      </div>
    </PageContainer>
  );
};

export default Status;
