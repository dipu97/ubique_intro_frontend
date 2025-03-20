import React from 'react'
import pic from "../images/pic4.jpg"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { HiPencilAlt } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { MdPhoneInTalk } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import { BASE_URL } from '@/api/api';
// import vCardsJS from 'vcards-js';


const Hero = ({userInfo,authUserName,toggleModal}) => {
  

  return (
    <div className="padding-x py-9 max-container flex flex-col items-center justify-center gap-4 bg-[#F6F6F7] dark:bg-[#242535] rounded-md">
    <div className="flex gap-4 justify-center items-center flex-wrap">
      <div className="w-[300px] h-[300px] rounded-lg overflow-hidden">
        <img
          src={`${BASE_URL}${userInfo?.profile_picture}`}
          className="w-[300px] h-[300px] rounded-lg object-cover"
        />
      </div>

      <span>
        <p className="text-2xl  text-[#181A2A] dark:text-white">{userInfo.first_name} {userInfo.last_name}</p>
        <p className="text-[14px] text-[#696A75] font-thin dark:text-[#BABABF]">
          {userInfo.job_title}
        </p>
        <p className="text-[14px] text-[#696A75] font-thin dark:text-[#BABABF]">
          {userInfo.company}
        </p>
      </span>
      {userInfo?.username === authUserName && (
          <span>
            <HiPencilAlt
              className="dark:text-white text-2xl cursor-pointer"
              onClick={toggleModal}
            />
          </span>
        )}
        {
          userInfo.is_staff?(
            
            <NavLink className="font-semibold text-[#141624] text-xl dark:text-[#FFFFFF]"
          to="/create"
        >Create Card
        </NavLink>
          ):''
        }
    </div>

    <p className="text-[#3B3C4A] text-[16px] max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-[#BABABF]">
     {userInfo.bio}
    
    </p>
    
      <Link to={`mailto:${userInfo.email}`}>
      <div className='flex items-center  justify-between gap-5 text-[#3B3C4A] dark:text-[#BABABF]'>
      <p><BiLogoGmail/></p>
      <p>{userInfo.email}</p>
      <p><IoIosArrowForward/></p>
      </div>
      </Link>
      <Link to={`callto:${userInfo.contact}`}>
      <div className='flex items-center  justify-between gap-5 text-[#3B3C4A] dark:text-[#BABABF]'>
      <p><MdPhoneInTalk/></p>
      <p>{userInfo.contact}</p>
      <p><IoIosArrowForward/></p>
      </div>
      </Link>
      <Link to={userInfo.location} target='_blank'>
      <div className='flex items-center  justify-between gap-5 text-[#3B3C4A] dark:text-[#BABABF]'>
      <p><BiCurrentLocation/></p>
      <p>{userInfo.address}</p>
      <p><IoIosArrowForward/></p>
      </div>
      </Link>
    <div className="flex gap-4 justify-center items-center text-white text-xl">
      <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
      <Link to={userInfo.instagram} target='_blank'> <FaInstagram /> </Link> 
      </div>
      <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
        <Link to={userInfo.facebook}><FaFacebookF /></Link>
      </div>
      <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
        <Link to={userInfo.twitter}><BsTwitterX /></Link>
      </div>
      <button onClick={''}>Add</button>
    </div>
  </div>
  )
}

export default Hero
