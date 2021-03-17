import React from 'react';
import { Result } from 'antd';

const NotPage: React.FC = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a pagina procurada não existe"
      />
    </>
  );
};

export default NotPage;
