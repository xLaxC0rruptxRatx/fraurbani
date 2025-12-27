const requests = async (req, endpoint, method, body) => {
  const request = await fetch(endpoint, {
    method,
    headers: {
      "Authorization": req.headers.authorization,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = request.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await request.json();
  }

  return await request.text();
}

export default requests