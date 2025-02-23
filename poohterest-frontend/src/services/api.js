import axios from "axios";
const API_BASE = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/api`;
// localStorage.removeItem('token');

export const getPin = async () => {
  try {
    const response = await axios.get(`${API_BASE}/pins`);
    return response.data.pins;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const getUserPin = async () => {
  const TOKEN = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_BASE}/user/pins`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data.pins;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const getPinById = async (pinId) => {
  try {
    const response = await axios.get(`${API_BASE}/pins/${pinId}`);
    return response.data.pin;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const createPin = async (formData) => {
  const TOKEN = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_BASE}/pins`, formData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const deletePin = async (pinId) => {
  const TOKEN = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_BASE}/pins/${pinId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const getProfile = async () => {
  const TOKEN = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_BASE}/profile`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const updateProfile = async (formData) => {
  const TOKEN = localStorage.getItem("token");
  try {
    const response = await axios.put(`${API_BASE}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const changePassword = async (formData) => {
  const TOKEN = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_BASE}/profile/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const addComment = async (formData) => {
  const TOKEN = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_BASE}/pins/comments`, formData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const getCommentsByPinId = async (pinId) => {
  try {
    const response = await axios.get(`${API_BASE}/pins/${pinId}/comments`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const deleteComment = async (commentId) => {
  const TOKEN = localStorage.getItem("token");
  try {
    console.log(commentId);
    const response = await axios.delete(`${API_BASE}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error);

      throw error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.errors[0].message;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration error:", error.response.data);
      throw error.response.data.errors || [];
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};


