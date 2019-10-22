import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';

const Alerts = () => {
  const alerts = useSelector(state => state.alert);
  console.log(alerts);
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <Message
        className={`${alert.type}`}
        key={alert.id}
        icon={alert.type === 'error' ? 'info circle' : 'check'}
        content={`${alert.msg}`}
        header={alert.type === 'error' ? 'Attention' : 'Message'}
      />
    ))
  );
};

export default Alerts;
