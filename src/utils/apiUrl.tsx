const apiUrl = {
  DEV: {
    url: "http://localhost:4000",
    active: false,
  },
  PROD: {
    url: "https://edendeskcrm-backend-production-c8b5.up.railway.app",
    active: true,
  },
};

const currentUrl = apiUrl.PROD.active ? apiUrl.PROD.url : apiUrl.DEV.url;

export { currentUrl };
