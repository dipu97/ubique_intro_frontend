
import { useParams } from 'react-router-dom'
import IntroCard from './IntroCard'
import Spinner from './Spinner'

const BlogContainer = ({isPending,cards}) => {
  
    if(isPending){
        return <Spinner/>
      }
    
      return (
        <section className="padding-x py-6  max-container">
        <h2 className="font-semibold text-xl mb-6 dark:text-white text-center">
          Latest Card
        </h2>
    
        <div className="flex items-center gap-6 justify-center flex-wrap">
      

        { cards.map((card) => <IntroCard key={card.id} card={card} />)}
        </div>
      </section>
      )
    }

export default BlogContainer
