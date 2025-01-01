const URL = "http://localhost:8000";

// register new user
export const registerUser = async (data) => {
  return fetch(`${URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// login user
export const userLogin = async (data) => {
  return fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// update user
export const UpdateUser = async (id, data) => {
  return fetch(`${URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

//share workspace to user
export const ShareWorkSpaceViaMail = async (id, data) => {
  return fetch(`${URL}/user/share/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

// get my workspaces
export const getMyWorkSpaces = async () =>{
  return fetch(`${URL}/user/my-workspaces`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
}

// get workspaces folders forms /my-workspaces/:id
export const getMyWorkSpacesFolderForms = async(id) =>{
  return fetch(`${URL}/user/my-workspaces/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
}