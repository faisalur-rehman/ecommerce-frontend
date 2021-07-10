import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export async function postData(endpoint, data) {
  return api.post(`${endpoint}`, {
    ...data,
  });
}
export async function formPostContent(endpoint, data, token) {
  return api.post(
    `${endpoint}`,
    {
      ...data,
    },
    {
      headers: {
        "x-auth-token": token,
        accept: "application/json",
        "Content-Type": `multipart/form-data`,
      },
    }
  );
}
export async function formPostData(endpoint, data, token) {
  return api.post(
    `${endpoint}`,
    {
      ...data,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export async function formGetData(endpoint, token) {
  return api.get(`${endpoint}`, {
    headers: {
      authorization: token,
    },
  });
}
export async function patchData(endpoint, id, data, token) {
  return api.patch(
    `${endpoint}/${id}`,
    { ...data },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
}

export async function verifyEmail(endpoint, data) {
  return api.post(`${endpoint}`, { ...data });
}

export async function getUsers(endpoint, token) {
  return api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}
export async function deleteData(endpoint, id, token) {
  return api.patch(`${endpoint}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export async function deleteItem(endpoint) {
  return api.delete(`${endpoint}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}
export async function checkDetails(endpoint, data) {
  return api.put(
    `${endpoint}`,
    { ...data },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
}
