import Badge from './Badge'
import CardFooter from './CardFooter'
import thumbnail from "../images/pic4.jpg"
import { Link } from 'react-router-dom'
import {BASE_URL} from '../api/api'

const IntroCard = ({card}) => {
  return (
    <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
    <div className="w-full h-[200px] border rounded-md overflow-hidden">
      <img
        src={`${BASE_URL}${card.featured_image}`}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>

      <Badge  card={card}/>
    
      <Link to={`/cards/${card.id}`}>
      <h3 className="font-semibold  leading-normal text-[#181A2A] mb-0 dark:text-white">
        {card.title}
      </h3></Link>

    <CardFooter card={card} />
  </div>
  )
}

export default IntroCard
