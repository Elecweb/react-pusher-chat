import { fetchPost } from "./fetch";
import { baseUrl } from "./constants";

const addMessage = message => {
  const url = baseUrl + "/message";
  return fetchPost(
    url,
    {
      message
    },
    true
  );
};

export default addMessage;
