const baseUrl = "/api/v1";
export const apiUrls = {
  login: () => `${baseUrl}/login`,
  signup: () => `${baseUrl}/signup`,
  logout: () => `${baseUrl}/logout`,
  getUser: () => `${baseUrl}/getuser`,
  testRoute: () => `${baseUrl}/testdata`,
  uploadPhoto: () => `${baseUrl}/uploadphoto`,
  updateUser: () => `${baseUrl}/updateuser`,
  addOffer: () => `${baseUrl}/addoffer`,
  getCounsellorOffer: () => `${baseUrl}/getcounselloroffer`,
  deleteOffer: () => `${baseUrl}/deleteoffer`,
  getUpdateOffer: () => `${baseUrl}/updateoffer`,
  getOffers: () => `${baseUrl}/getoffers`,
  getOneOffer: (id) => `${baseUrl}/getofferdetail/${id}`,
};
