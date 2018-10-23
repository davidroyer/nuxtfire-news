import Cookie from "js-cookie";

export const saveUserData = ({ idToken, expiresIn, refreshToken }, { email, avatar }) => {
  const tokenExpiration = Date.now() + expiresIn * 1000;
  localStorage.setItem("jwt", idToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expiresIn", tokenExpiration);
  localStorage.setItem("user", email);
  localStorage.setItem("avatar", avatar);

  Cookie.set("jwt", idToken);
  Cookie.set("refreshToken", refreshToken);
  Cookie.set("expiresIn", tokenExpiration);
  Cookie.set("user", email);
  Cookie.set("avatar", avatar);
};

// export const getNewToken = () => {
//   const refreshUrl = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyDttJzMyAZaAaocuNVgS_RcHCEZPdCibts'
  
// }

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return;

  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  const expiresInCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("expiresIn="));
  const userCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("user="));
  const avatarCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("avatar="));

  if (!jwtCookie || !expiresInCookie || !userCookie || !avatarCookie) return;

  const jwt = jwtCookie.split("=")[1];
  const expiresIn = expiresInCookie.split("=")[1];
  const user = userCookie.split("=")[1];
  const avatar = avatarCookie.split("=")[1];

  return { jwt, expiresIn, user, avatar };
};

export const getUserFromLocalStorage = () => {
  if (localStorage) {
    const jwt = localStorage.getItem("jwt");
    const expiresIn = localStorage.getItem("expiresIn");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");
    const avatar = localStorage.getItem("avatar");

    return { jwt, expiresIn, user, avatar, refreshToken };
  }
};

export const clearUserData = () => {
  if (!process.server) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    localStorage.removeItem("refreshToken");
  }
  Cookie.remove("jwt");
  Cookie.remove("expiresIn");
  Cookie.remove("user");
  Cookie.remove("avatar");
  Cookie.remove("refreshToken");
};
