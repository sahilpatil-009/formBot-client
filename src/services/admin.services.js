const URL = "https://formbot-server-r31d.onrender.com";

//get all user created folders
export const getAllFolder = async () => {
  return fetch(`${URL}/admin/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

//create folder
export const createFolder = async (data) => {
  return fetch(`${URL}/admin/folder-create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

// delete folder
export const deleteFolder = async (id) => {
  return fetch(`${URL}/admin/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

// create Form
export const createForm = async (data) =>{
  return fetch(`${URL}/admin/form`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
}

// get from which created at Global WorkSpace
export const getFormsAtWorkSpace = async () =>{
  return fetch(`${URL}/admin/global-form`,{
    method:"GET",
    headers:{
      "Content-Type" : "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  })
}

// delete from by id
export const deleteForm = async (id) =>{
  return fetch(`${URL}/admin/form/${id}`, {
    method: "DELETE",
    headers :{
      "Content-Type" : "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    }
  })
}

// get form by Id
export const getFormById = async (id) =>{
  return fetch(`${URL}/admin/form/${id}`, {
    method: "GET",
    headers :{
      "Content-Type" : "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    }
  })
}

// fetch form detial by form-bot
export const getFormDetailsForBot = async (id) =>{
  return fetch(`${URL}/admin/form-bot/${id}`, {
    method: "GET",
    headers :{
      "Content-Type" : "application/json",
    }
  })
}


