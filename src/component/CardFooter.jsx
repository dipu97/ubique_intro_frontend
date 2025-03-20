import React from 'react'
import { BASE_URL } from '@/api/api'
import pic from "../images/pic1.jpg"
import { Link } from 'react-router-dom'
import { FormatDate } from '@/services/formatDate'

const CardFooter = ({card}) => {
  return (
    
    <Link to={`/user/profile/${card.author.username}`}>
    <div className="flex items-center gap=4 ">
    <span className="flex items-center gap-2">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          src={`${BASE_URL}${card.author.profile_picture}`}
          className="c rounded-full w-full h-full object-cover"
        />
      </div>

      <small className="text-[#97989F] text-[12px] font-semibold">
        {card.author.first_name} {card.author.last_name}
      </small>
    </span>

    <small className="text-[#97989F] text-[12px] font-semibold ml-3">
      {FormatDate(card.published_date)}
    </small>
  </div>
  </Link>
  )
}

export default CardFooter
