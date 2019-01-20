/* eslint-disable  no-console */

const genRequestOptions = (method, body = {}, isAuth) => {
  let parsedBody;

  try {
    parsedBody = JSON.stringify(body);
  } catch (e) {
    throw new Error(`body for send to api isn't valid json`);
  }

  const headers = isAuth
    ? {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `${sessionStorage.getItem("token") || ""}`
      }
    : {
        "Content-Type": "application/json; charset=utf-8 "
      };
  // headers.device = 'web';
  if (method === "GET") {
    delete headers["Content-Type"];
  }
  return {
    method,
    headers,
    body: method === "GET" ? null : parsedBody
  };
};

const handleSuccess = response =>
  response.json().then(body => ({
    ...body,
    response
  }));

const handleFail = response =>
  response.json().then(body => ({
    ...body,
    response
  }));

const handleResponse = response => {
  if (response.ok) {
    return handleSuccess(response);
  }
  return handleFail(response);
};

export const fetchGet = (url, params, isAuth = false) => {
  let urlParams = url;
  try {
    urlParams = new URL(url);
    Object.keys(params || {}).forEach(key =>
      urlParams.searchParams.append(key, params[key])
    );
  } catch (e) {
    console.warn("Url is invalid");
  }

  const requestOptions = genRequestOptions("GET", null, isAuth);
  return fetch(urlParams, requestOptions).then(handleResponse);
};

export const fetchPost = (url, body, isAuth = false) => {
  const requestOptions = genRequestOptions("POST", body, isAuth);
  return fetch(url, requestOptions).then(handleResponse);
};

export const fetchPut = (url, body, isAuth = false) => {
  const requestOptions = genRequestOptions("PUT", body, isAuth);
  return fetch(url, requestOptions).then(handleResponse);
};

export const fetDelete = (url, body, isAuth) => {
  const requestOptions = genRequestOptions("DELETE", body, isAuth);
  return fetch(url, requestOptions).then(handleResponse);
};

export const getSuccessData = res => res.data;

export const getFailData = res => res.errors;

export const fetchPostImage = (url, file, isAuth = false) => {
  const data = new FormData();
  data.append("image", file);

  const requestOptions = {
    method: "POST",
    body: data,
    headers: isAuth
      ? {
          Authorization: `${sessionStorage.getItem("token") || ""}`
        }
      : undefined
  };
  return fetch(url, requestOptions).then(handleResponse);
};
