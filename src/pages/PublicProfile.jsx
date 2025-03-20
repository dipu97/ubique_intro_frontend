import { getUserInfo } from "@/services/apiCard";
import BlogContainer from "@/component/BlogContainer";
import Hero from "@/component/Hero";
import Spinner from "@/component/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";


const PublicProfile = () => {
  const {username} = useParams()

  const { isPending, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username)
  })
  

  if(isPending){
    return <Spinner />
  }
    return (
      <div className='padding-x py-6  max-container'>
      <div className='flex justify-between mb-3'>
        <div >
        <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
          Ubique
        </Link>
        </div>
        <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 dark:text-[#FFFFFF]">
          <Link to='/'>Shop</Link>
          <Link to='/login/'>Login</Link>
        </ul>
      </div>
      <Hero userInfo={data} />
      </div>
    );
  };
  
  export default PublicProfile;
