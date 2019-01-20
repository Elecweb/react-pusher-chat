import { fetchPost } from "./fetch";
import { baseUrl } from "./constants";

const login = username => {
  const url = baseUrl + "/login";
  return fetchPost(url, {
    username
  });
};

export default login;
