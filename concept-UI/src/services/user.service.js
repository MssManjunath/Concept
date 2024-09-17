import axios from "axios";

// Save JWT in chrome storage
const saveJWTInChromeStorage = (token) => {
  chrome.storage.sync.set({ jwtToken: token }, function () {
    console.log('JWT saved in Chrome storage');
  });
};

// Save JWT in local storage (browser storage)
const saveJWTInLocalStorage = (token) => {
  localStorage.setItem('jwtToken', token);
  console.log('JWT saved in local storage');
};

// Sign-up function
export const user_sign_up = async (body) => {
  try {
    const res = await axios.post("http://localhost:8000/signup", body);
    const jwtToken = res?.data?.access_token; 

    if (jwtToken) {
      saveJWTInLocalStorage(jwtToken); // Save JWT in local storage
      saveJWTInChromeStorage(jwtToken); // Save JWT in Chrome storage
    }

    return res?.data;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
};

// Login function
export const user_login = async (body) => {
  try {
    const res = await axios.post("http://localhost:8000/login", body);
    const jwtToken = res?.data?.access_token;
 

    if (jwtToken) {
      saveJWTInLocalStorage(jwtToken); // Save JWT in local storage
      saveJWTInChromeStorage(jwtToken); // Save JWT in Chrome storage (for your extension)
    }

    return res?.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
