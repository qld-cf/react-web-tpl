import React from 'react'

interface IProps {
  id: string;
  type: number;
  children: any;
}

const CommonWrap = (props: IProps) => {
  return (
    <div className='commonWrap' id={props.id}>
      {props.children}
    </div>
  )
}

CommonWrap.defaultProps = {
  type: 1,
  id: 1
}
export default CommonWrap
