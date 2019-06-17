import React from 'react';

export default function Icon(props) {
  const { type } = props;
  return (
    <svg {...props} className="icon">
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}
