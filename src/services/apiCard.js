import api from "@/api/api";

export async function getCards(page) {
    try {
      const response = await api.get(`card_list?page=${page}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  export async function getCard(id) {
    try {
      const response = await api.get(`cards/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  export async function registerUser(data){
    try{
      const response = await api.post("register_user/", data)
      return response.data
    }
  
    catch(err){
      console.log(err)
      if(err.status == 400){
        throw new Error("Username already exists")
      }
      throw new Error(err)
    }
  }

  export async function signin(data){


    try{
      const response = await api.post("token/", data)
      return response.data
    }
  
    catch(err){
  
      if(err.status===401){
        throw new Error("Invalid Credentials")
      }
  
      throw new Error(err)
  
    }
  
  }

  export async function getUsername() {
    try {
      const response = await api.get("get_username");
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  export async function createCard(data) {
    try {
      const response = await api.post("create_card/", data);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }


  export async function getUserInfo(username){
    try{
      const response = await api.get(`get_userinfo/${username}`)
      return response.data
    }
    catch(err){
      throw new Error(err.message)
    }
  }

  export async function updateProfile(data) {
    try {
      const response = await api.put(`update_user/`, data);
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        throw new Error(
          err?.response?.data.username[0] || "Failed to update profile"
        );
      }
  
      throw new Error(err.message);
    }
  }

  export async function updateCard(data, id){
    try{
      const response = await api.put(`update_card/${id}/`, data)
      return response.data
    }
  
    catch(err){
      if(err.response){
        throw new Error(err.response?.data?.message || "Failed to update Card" )
      }
  
      throw new Error(err.message)
    }
  }

  export async function deleteCard(id) {
    try {
      const response = await api.post(`delete_card/${id}/`);
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response?.data?.message || "Failed to delete Card");
      }
  
      throw new Error(err.message);
    }
  }