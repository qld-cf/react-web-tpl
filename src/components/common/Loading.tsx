import React from 'react';
import '@css/loading.scss';

const Loading = () => {
  return (
    <div className='loading'>
      <div className='loader'>
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
      </div>
    </div>
  );
}
export default Loading;
