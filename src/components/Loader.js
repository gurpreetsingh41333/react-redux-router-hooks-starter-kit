import React from 'react';
import { Spinner } from 'reactstrap';

const overlay = {
  position: 'absolute',
  display: 'block',
  top: '50%',
  left: '50%',
  backgroundColor: 'transparent',
  zIndex: 100
}

const Loader = ({ loading, size = 'md' }) => {
  return (
    loading ?
      <div style={loading ? overlay : {}}>
        <Spinner color="primary" size={size} />
      </div> : null
  );
}

export default Loader;
