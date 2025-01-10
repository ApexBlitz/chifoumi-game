import Cookies from 'js-cookie';

const API_URL = "http://fauques.freeboxos.fr:3000";

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
}

export const fetchMatches = async () => {
  const token = Cookies.get('JWT');
  const response = await fetch(`${API_URL}/matches`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const getMatchById = async (matchId) => {
  const token = Cookies.get("JWT");
  try {
    const response = await fetch(`${API_URL}/matches/${matchId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch match details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching match details:", error.message);
    throw error;
  }
};

export const createMatch = async () => {
  const token = Cookies.get("JWT");
  const response = await fetch(`${API_URL}/matches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Erreur API createMatch :", error);
    throw new Error(error.message || "Impossible de créer la partie.");
  }

  const data = await response.json();
  return data;
};


export const getMatchDetails = async (matchId) => {
  const token = Cookies.get('JWT');
  const response = await fetch(`${API_URL}/matches/${matchId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const playTurn = async (matchId, turnId, move) => {
  const token = Cookies.get('JWT');
  const response = await fetch(`${API_URL}/matches/${matchId}/turns/${turnId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ move }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Failed to play turn');
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text(); 
  }
};
