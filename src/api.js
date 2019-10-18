const config = {
  apiHost: "http://localhost:8888"
}

export async function getToken(props) {
  const url = `${config.apiHost}/api/auth?p=${props.password}`;
  const headers = {
    method: "GET",
    headers: new Headers({}),
  };

  try {
    const response = await fetch(url, headers);
    if (!response.ok) {
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
    body: formData
  };

  try {
    const response = await fetch(url, headers);
    if (!response.ok) {
      throw new Error("Loading failed");
    }

    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}