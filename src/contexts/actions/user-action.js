import Cookies from "js-cookie"; 

const BASE_URL = "http://fauques.freeboxos.fr:3000";

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
}

export function addUser(newValues) {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newValues),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw error;
      });
    }
    return res.json();
  });
}

export async function loginUser(credentials) {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw error;
      });
    }
    return res.json();
  }).then((data) => {
    const { token } = data;
    Cookies.set("JWT", token, { expires: 0.5, secure: true, sameSite: "strict" }); 
    return data;
  });
}
