import { useState } from "react";
import { getCards } from "@/services/apiCard";
import BlogContainer from "@/component/BlogContainer";
import Header from "@/component/Header";
import Paginations from "@/component/Paginations";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const numOfCardsPerPage = 3;

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["cards", page],
    queryFn: () => getCards(page),
    placeholderData: keepPreviousData,
  });
  console.log(data)

  const cards = data?.results || [];
  const numOfPages = Math.ceil(data?.count / numOfCardsPerPage);

  function handleSetPage(val) {
    setPage(val);
  }

  function increasePageValue() {
    setPage((curr) => curr + 1);
  }

  function decreasePageValue() {
    setPage((curr) => curr - 1);
  }

  return (
    <>
      <Header />
      <BlogContainer isPending={isPending} cards={cards} />
      <Paginations
        increasePageValue={increasePageValue}
        decreasePageValue={decreasePageValue}
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}
      />
    </>
  );
};

export default HomePage;