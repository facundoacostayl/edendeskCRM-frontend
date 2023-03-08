const apiUrl = {
  DEV: {
    url: "http://localhost:4000",
    active: true,
  },
  PROD: {
    url: "https://edendeskcrm-backend-production.up.railway.app",
    active: false,
  },
};

const currentUrl = apiUrl.PROD.active ? apiUrl.PROD.url : apiUrl.DEV.url;

export { currentUrl };
