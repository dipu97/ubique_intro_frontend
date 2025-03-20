import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser,updateProfile } from "@/services/apiCard";
import SmallSpinner from "@/component/SmallSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SmallSpinnerText from "@/component/SmallSpinnerText";
import InputError from "@/component/InputError";
import { Textarea } from "@/components/ui/textarea";

const SignupPage = ({ userInfo, updateForm, toggleModal }) => {

  console.log(userInfo)

  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, watch } = useForm({defaultValues: userInfo ? userInfo : {}});
  const { errors } = formState;

  const password = watch("password");

  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully!")
      toggleModal()
      queryClient.invalidateQueries({queryKey: ["users", userInfo?.username]})
    },

    onError: (err) => {
      toast.error(err.message)
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("You have successfully created an account!!!");
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    if(updateForm){
      const formData = new FormData()
      formData.append("username", data.username)
      formData.append("first_name", data.first_name)
      formData.append("last_name", data.last_name)
      formData.append("email", data.email)
      formData.append("job_title", data.job_title)
      formData.append("company", data.company)
      formData.append("bio", data.bio)
      formData.append("facebook",data.facebook)
      formData.append("instagram",data.instagram)
      formData.append("twitter",data.twitter)
      formData.append("contact",data.contact)
      formData.append("address",data.address)
      formData.append("location",data.location)

      if(data.profile_picture && data.profile_picture[0]){
        if(data.profile_picture[0] != "/"){
          formData.append("profile_picture", data.profile_picture[0])
        }
      }

      updateProfileMutation.mutate(formData)


    }

    else{
      mutation.mutate(data)
    }
    
  }

  return (
    <form
      className={`${
        updateForm && "h-[90%] overflow-auto"
      } md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">
          {updateForm ? "Update Profile Form" : "SignUp Form"}
        </h3>
        <p>
          {updateForm
            ? "You can tell us more about you."
            : "Create your account to get started!"}
        </p>
      </div>

      <div>
        <Label htmlFor="username" className="dark:text-[97989F]">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Enter username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <InputError error={errors.username.message} />
        )}
      </div>

      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          {...register("first_name", {
            required: "First Name is required",
            minLength: {
              value: 3,
              message: "First Name must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.first_name?.message && (
          <InputError error={errors.first_name.message} />
        )}
      </div>

      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          {...register("last_name", {
            required: "Last Name is required",
            minLength: {
              value: 3,
              message: "Last Name must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.last_name?.message && (
          <InputError error={errors.last_name.message} />
        )}
      </div>
      <div>
        <Label htmlFor="email" className="dark:text-[97989F]">
          Your Mail Address 
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter Mail Address"
          {...register("email", {
            minLength: {
              value: 11,
              message: "Your Mail Address Must be valid",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.email?.message && (
          <InputError error={errors.email.message} />
        )}
      </div>
      {updateForm && <div>
        <Label htmlFor="contact" className="dark:text-[97989F]">
          Contact Number
        </Label>
        <Input
          type="text"
          id="contact"
          placeholder="Enter Phone Number Must be +880 or Country Code"
          {...register("contact", {
            required: "Your contact is required",
            minLength: {
              value: 11,
              message: "Your job title must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.contact?.message && (
          <InputError error={errors.contact.message} />
        )}
      </div>}
        {updateForm && <div>
        <Label htmlFor="job_title" className="dark:text-[97989F]">
          Job Title
        </Label>
        <Input
          type="text"
          id="job_title"
          placeholder="Enter Job Title"
          {...register("job_title", {
            required: "Your job title is required",
            minLength: {
              value: 3,
              message: "Your job title must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.job_title?.message && (
          <InputError error={errors.job_title.message} />
        )}
      </div>}
      {updateForm && <div>
        <Label htmlFor="company" className="dark:text-[97989F]">
          Company
        </Label>
        <Input
          type="text"
          id="company"
          placeholder="Enter Your Company Name"
          {...register("company", {
            required: "Your Company is required",
            minLength: {
              value: 3,
              message: "Your company name must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.company?.message && (
          <InputError error={errors.company.message} />
        )}
      </div>}
      {updateForm && <div>
        <Label htmlFor="address" className="dark:text-[97989F]">
          Your Address
        </Label>
        <Input
          type="text"
          id="address"
          placeholder="Enter You Address"
          {...register("address", {
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.address?.message && (
          <InputError error={errors.address.message} />
        )}
      </div>}
      {updateForm && <div>
        <Label htmlFor="location" className="dark:text-[97989F]">
          Your Location Address
        </Label>
        <Input
          type="link"
          id="location"
          placeholder="Enter Your Location Address"
          {...register("location", {
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.location?.message && (
          <InputError error={errors.location.message} />
        )}
      </div>}

      {updateForm && <div>
        <Label htmlFor="content">Bio</Label>
        <Textarea
          id="content"
          placeholder="Tell us more about you"
          {...register("bio", {
            required: "Your bio is required",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[300px] text-justify"
        />
        {errors?.bio?.message && (
          <InputError error={errors.bio.message} />
        )}
      </div>}
      {updateForm && <div>
        <Label htmlFor="facebook" className="dark:text-[97989F]">
          Facebook
        </Label>
        <Input
          type="link"
          id="facebook"
          placeholder="Enter Facebook Link"
          {...register("facebook", {
            minLength: {
              value: 3,
              message: "Your facebook link must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.facebook?.message && (
          <InputError error={errors.facebook.message} />
        )}
      </div>}
      {updateForm && <div>
        <Label htmlFor="instagram" className="dark:text-[97989F]">
          Instagram
        </Label>
        <Input
          type="text"
          id="instagram"
          placeholder="Enter Job Title"
          {...register("instagram", {
            minLength: {
              value: 3,
              message: "Your instagram name must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.instagram?.message && (
          <InputError error={errors.instagram.message} />
        )}
      </div>}
      {updateForm && <div>
        <Label htmlFor="twitter" className="dark:text-[97989F]">
          Twitter
        </Label>
        <Input
          type="link"
          id="twitter"
          placeholder="Enter Twitter Link"
          {...register("twitter", {
            
            minLength: {
              value: 3,
              message: "Your twitter name must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.twitter?.message && (
          <InputError error={errors.twitter.message} />
        )}
      </div>}
      {updateForm && <div className="w-full">
        <Label htmlFor="profile_picture">Profile Picture</Label>
        <Input
          type="file"
          id="picture"
          {...register("profile_picture", {
            required: false,
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
        />

        {/* {errors?.profile_picture?.message && (
          <InputError error={errors.profile_picture.message} />
        )} */}
      </div>}


      {updateForm || <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.password?.message && (
          <InputError error={errors.password.message} />
        )}
      </div>}

     {updateForm ||  <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.confirmPassword?.message && (
          <InputError error={errors.confirmPassword.message} />
        )}
      </div>}

      <div className="w-full flex items-center justify-center flex-col my-4">
        {updateForm ? (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {updateProfileMutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Updating user..." />
              </>
            ) : (
              <SmallSpinnerText text="Update user profile" />
            )}
          </button>
        ) : (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Creating user..." />
              </>
            ) : (
              <SmallSpinnerText text="Signup" />
            )}
          </button>
        )}
       {updateForm || <p className="text-[14px]">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>}
      </div>
    </form>
  );
};

export default SignupPage;