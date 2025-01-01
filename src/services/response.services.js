const URL = "http://localhost:8000";

// submit user response
export const submitResponse = async (data) => {
  return fetch(`${URL}/response/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const trackLinkClicked = async (formId) => {
  return fetch(`${URL}/response/track-form-view`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });
};

export const trackFormStart = async (formId) => {
  return fetch(`${URL}/response/track-form-start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });
};

// 
export const getAnalyticalData = async (formId) => {
  return fetch(`${URL}/response/form-analytics/${formId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
