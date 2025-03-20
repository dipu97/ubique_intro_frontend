import Badge from '@/component/Badge'
import React, { useState } from 'react'
import IntroPost from './IntroPost'
import banner from '../images/intro.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCard, getCard } from '@/services/apiCard'
import Spinner from '@/component/Spinner'
import { BASE_URL } from '@/api/api'
import Modal from '@/component/Modal'
import { HiPencilAlt } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import CreateCardPage from './CreateCardPage'
import { toast } from 'react-toastify'

const IntroDetails = ({username,isAuthenticated}) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false)
  const navigate=useNavigate()
  function toggleModal(){
    setShowModal(curr => !curr)
  }
  const {
    isPending,
    isError,
    error,
    data: card,
  } = useQuery({
    queryKey: ["card", id],
    queryFn: () => getCard(id),
  });
  const cardID = card?.id
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCard(id),
    onSuccess: () => {
      toast.success("Your post has been deleted successfully!")
      navigate("/")
    },

    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    }
  })

  function handleDeleteCard(){
    const popUp = window.confirm("Are you sure you want to delete this Card?")
    if(!popUp){
      return;
    }

    deleteMutation.mutate(cardID)



  }
  if (isPending) {
    return <Spinner/>;
  }


    return (
      <>
      <div className="padding-dx max-container py-9">
        <Badge card={card}/>
  
        <div className="flex justify-between items-center">
          <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
           {card.title}
          </h2>
          {isAuthenticated && username === card.author.username && (
            <span className="flex justify-between items-center gap-2">
              <HiPencilAlt onClick={toggleModal} className="dark:text-white text-3xl cursor-pointer" />

              <MdDelete onClick={handleDeleteCard} className="dark:text-white text-3xl cursor-pointer" />
            </span>
          )}
        </div>
  
        <IntroPost card={card}/>
  
       <div className='flex flex-col md:flex-row justify-between gap-10 items-center rounded-lg '>
<div className='w-1/2'>
<div className="w-full h-[350px]  my-9 overflow-hidden shadow-lg rounded-sm">
          <img className="w-full h-full object-cover rounded-sm" src={`${BASE_URL}${card.featured_image}`} />
        </div>
</div>
<div className='w-1/2 h-[350px] shadow-sm m-2 p-4 text-center'>
<p className="text-[36px] leading-[2rem] mt-4  text-[#3B3C4A] dark:text-[#BABABF]">
          BDT:{card.price}
        </p>
        <p className="text-[24px] leading-[2rem] mt-4 text-[#3B3C4A] dark:text-[#BABABF]">
          Sub Category :{card.sub_category}
        </p></div>

       </div>
        <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
          {card.content}
        </p>
      </div>
      {showModal && <Modal toggleModal={toggleModal}> 
      <CreateCardPage card={card} />
    </Modal>}
      </>
    )
  }
  
  export default IntroDetails
