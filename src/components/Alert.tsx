import React, { memo, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { setError, setSuccess } from '../store/slices/globals';
import useReduxState from '../store/hooks/useReduxState';

const NotificationAlert: React.FC = () => {
  const [errorMessage, dispatchError] = useReduxState(
    (state) => state.globals.error,
  );

  const [successMessage, dispatchSuccess] = useReduxState(
    (state) => state.globals.success,
  );

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<'' | 'danger' | 'success'>('');

  useEffect(() => {
    if (errorMessage || successMessage) {
      setShow(true);
      if (errorMessage) {
        setMessage(errorMessage);
        setVariant('danger');
      }

      if (successMessage) {
        setMessage(successMessage);
        setVariant('success');
      }

      const timer = setTimeout(() => {
        setShow(false);
        setMessage('');
        dispatchError(setError(''));
        dispatchSuccess(setSuccess(''));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage, dispatchError, dispatchSuccess]);

  return (
    <>
      {show && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1050,
          }}
        >
          <Alert
            variant={variant}
            onClose={() => setShow(false)}
          >
            {message}
          </Alert>
        </div>
      )}
    </>
  );
};

export default memo(NotificationAlert);
