import {fetchWithTimeout} from "./libs/fetchWithTimeout";

const config = {
  apiHost: "https://inteles.bincik.sk"
}

export async function getToken(props) {
  const url = `${config.apiHost}/api/auth?p=${props.password}`;
  const headers = {
    method: "GET",
    headers: new Headers({}),
    // mode: 'no-cors'
  };

  try {
    const response = await fetch(url, headers);
    if (!response.ok) {
      console.error(response);
      throw new Error("Loading failed");
    }

    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}

export async function save(props) {
  const url = `${config.apiHost}/api/save`;
  const formData = new FormData();
  Object.keys(props).forEach((key) => {
    formData.append(key, props[key]);
  });
  const headers = {
    method: "POST",
    headers: new Headers({}),
    body: formData,
  };

  try {
    const response = await fetchWithTimeout(url, headers);
    if (!response.ok) {
      throw new Error("Loading failed");
    }

    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}


export async function saveImage(props) {
  const url = `${config.apiHost}/api/save-image`;
  const formData = new FormData();

  const imageRes = await fetch(props.image);
  const blob = await imageRes.blob();

  formData.append("image", blob, "thumb.jpg");
  formData.append("userToken", props.userToken);
  formData.append("log_id", props.logId);
  const headers = {
    method: "POST",
    headers: new Headers({}),
    body: formData
  };

  try {
    const response = await fetchWithTimeout(url, headers);
    if (!response.ok) {
      throw new Error("Loading failed");
    }

    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}