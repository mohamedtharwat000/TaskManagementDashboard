import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { setError, setSuccess } from '../store/slices/globals';
import { useDispatch, useSelector } from 'react-redux';
import Globals from '../types/Globals';
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
  const [variant, setVariant] = useState<'danger' | 'success'>('danger');

  useEffect(() => {
    if (errorMessage || successMessage) {
      setShow(true);
      if (errorMessage) {
        setMessage(errorMessage);
        setVariant('danger');
      } else if (successMessage) {
        setMessage(successMessage);
        setVariant('success');
      }

      const timer = setTimeout(() => {
        setShow(false);
        setMessage('');
        if (errorMessage) dispatchError(setError(''));
        if (successMessage) dispatchSuccess(setSuccess(''));
      }, 5000);

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

export default NotificationAlert;
