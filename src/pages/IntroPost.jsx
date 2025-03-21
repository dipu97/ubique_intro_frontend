import pic from "../images/pic1.jpg"
import { BASE_URL } from "@/api/api"
import { FormatDate } from "@/services/formatDate"

const IntroPost = ({card}) => {
  return (
    <div className="flex items-center gap=4 ">

      
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={`${BASE_URL}${card.author.profile_picture}`}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
          {card.author.first_name} {card.author.last_name}
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
      {FormatDate(card.published_date)}
      </small>


    </div>
  )
}

export default IntroPost