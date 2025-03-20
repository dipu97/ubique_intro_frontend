import { getUserInfo } from "@/services/apiCard";
import BlogContainer from "@/component/BlogContainer";
import Hero from "@/component/Hero";
import Spinner from "@/component/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from "@/component/Modal";
import { useState } from "react";
import SignupPage from "./SignupPage";

const ProfilePage = ({authUserName}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(curr => !curr)
  }
  const {username} = useParams()

  const { isPending, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username)
  })

  const cards = data?.author_posts

  if(isPending){
    return <Spinner />
  }

  return (
    <>
      <Hero userInfo={data} authUserName={authUserName} toggleModal={toggleModal}  />
      <BlogContainer cards={cards} title={`${username}'s Posts`} />
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <SignupPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default ProfilePage;