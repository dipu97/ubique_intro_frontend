import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import InputError from "@/component/InputError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard,updateCard} from "@/services/apiCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/component/SmallSpinner";
import SmallSpinnerText from "@/component/SmallSpinnerText";
import LoginPage from "./LoginPage";

const CreateCardPage = ({card,isAuthenticated }) => {
  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: card ? card : {},
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cardID = card?.id;

  const updateMutation = useMutation({
    mutationFn: ({ data, id }) => updateCard(data, id),
    onSuccess: () => {
      navigate("/");
      toast.success("Your post has been updated successfully!");
      console.log("Your post has been updated successfully!");
    },

    onError: (err) => {
      toast.error(err.message);
      console.log("Error updating blog", err);
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => createCard(data),
    onSuccess: () => {
      toast.success("New post added successfully");
      queryClient.invalidateQueries({ queryKey: ["card"] });
      navigate("/");
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("sub_category", data.sub_category);
    formData.append("price", data.price);

    if (data.featured_image && data.featured_image[0]) {
      if (data.featured_image[0] != "/") {
        formData.append("featured_image", data.featured_image[0]);
      }
    }
    if (card && cardID) {
      updateMutation.mutate({ data: formData, id: cardID });
    } else {
      mutation.mutate(formData);
    }
  }

  if (isAuthenticated === false) {
    return <LoginPage />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        card && "h-[90%] overflow-auto"
      }  md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl max-sm:text-xl">
          {card ? "Update Card" : "Create Card"}
        </h3>

        <p className="max-sm:text-[14px]">
          {card
            ? "Do you want to update your Card?"
            : "Create a new Card "}
        </p>
      </div>

      <div>
        <Label htmlFor="title" className="dark:text-[97989F]">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "Card's title is required",
            minLength: {
              value: 3,
              message: "The title must be at least 3 characters",
            },
          })}
          placeholder="Give your Card a title"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.title?.message && <InputError error={errors.title.message} />}
      </div>

      <div>
        <Label htmlFor="content">Details</Label>
        <Textarea
          id="content"
          placeholder="Write your Card Details"
          {...register("content", {
            required: "Card's Details is required",
            minLength: {
              value: 10,
              message: "The Details must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify max-sm:w-[300px] max-sm:text-[14px]"
        />
        {errors?.content?.message && (
          <InputError error={errors.content.message} />
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="category">Category</Label>

        <Select
          {...register("category", { required: "Card's category is required" })}
          onValueChange={(value) => setValue("category", value)}
          defaultValue={card ? card.category : ""}
        >
          <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="PVC White">PVC White</SelectItem>
              <SelectItem value="PVC Black">PVC Black</SelectItem>
              <SelectItem value="Metal White">Metal White</SelectItem>
              <SelectItem value="Metal Black">Metal Black</SelectItem>
              
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors?.category?.message && (
          <InputError error={errors.category.message} />
        )}
      </div>
      <div className="w-full">
        <Label htmlFor="sub_category">Sub Category</Label>

        <Select
          {...register("sub_category", { required: "Card's Sub category is required" })}
          onValueChange={(value) => setValue("sub_category", value)}
          defaultValue={card ? card.sub_category : ""}
        >
          <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
            <SelectValue placeholder="Select Sub category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sub Categories</SelectLabel>
              <SelectItem value="Ubique Logo">Ubique Logo</SelectItem>
              <SelectItem value="Custom Logo">Custom Logo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors?.sub_category?.message && (
          <InputError error={errors.sub_category.message} />
        )}
      </div>
<div className="w-full">
     
        <Label htmlFor="featured_image">Card Image</Label>
        <Input
          type="file"
          id="picture"
          {...register("featured_image", {
            required: card ? false : "Card's featured image is required",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.featured_image?.message && (
          <InputError error={errors.featured_image.message} />
        )}
      </div>
      <div className="w-1/2">

      </div>
      <div>
        <Label htmlFor="price" className="dark:text-[97989F]">
          Price
        </Label>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "Card's price is required",
            
          })}
          placeholder="Give your Card a price"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.price?.message && <InputError error={errors.price.message} />}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        {card ? (
          <button
            disabled={updateMutation.isPending}
            className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
          >
            {updateMutation.isPending ? (
              <>
                {" "}
                <SmallSpinner /> <SmallSpinnerText text="Updating Card..." />{" "}
              </>
            ) : (
              <SmallSpinnerText text="Update Card" />
            )}
          </button>
        ) : (
          <button
            disabled={mutation.isPending}
            className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                {" "}
                <SmallSpinner /> <SmallSpinnerText text="Creating Card..." />{" "}
              </>
            ) : (
              <SmallSpinnerText text="Create Card" />
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateCardPage;