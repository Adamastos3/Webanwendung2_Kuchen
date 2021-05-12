function logout() {
  sessionStorage.clear;
  deleteCookie("kc");
  deleteCookie("kn");
  location.href = "/logout";
}
