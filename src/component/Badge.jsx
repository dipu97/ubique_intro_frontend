import React from 'react'

const Badge = ({card}) => {
    return (
      <span className="px-2 py-[3px] text-[12px] font-semibold bg-[#4B6BFB] text-[#FFFFFF] rounded-sm self-start">
        {card?.category}
      </span>
    );
  };
  
  export default Badge;
