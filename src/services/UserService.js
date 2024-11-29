import Keycloak from "keycloak-js";

const _kc = new Keycloak({
  clientId: "react-client",
  realm: "freelancer",
  url: "http://localhost:8080/",
});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  // Check if token exists and is valid

  _kc.updateToken(120).then((refreshed) => {
    if (refreshed) {
      console.info("Token refreshed" + refreshed);
    } else {
      console.warn(
        "Token not refreshed, valid for " +
          Math.round(
            _kc.tokenParsed.exp + _kc.timeSkew - new Date().getTime() / 1000
          ) +
          " seconds"
      );
      onAuthenticatedCallback();
    }
  });

  _kc
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.htm",
      pkceMethod: "S256",
    })
    .then((authenticated) => {
      if (!authenticated) {
        //doLogin();
        console.log("user is not authenticated..!");
      }

      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const userRoles = () => _kc.resourceAccess;

const isTokenExpired = () => _kc.isTokenExpired(30);

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  userRoles,
  isTokenExpired,
};

export default UserService;
