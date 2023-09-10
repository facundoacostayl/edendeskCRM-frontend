const apiUrl = {
  DEV: {
    url: "http://localhost:4000",
    active: false,
  },
  PROD: {
    url: "https://edendesk-crm-backend.onrender.com",
    active: true,
  },
};

const currentUrl = apiUrl.PROD.active ? apiUrl.PROD.url : apiUrl.DEV.url;

export { currentUrl };
