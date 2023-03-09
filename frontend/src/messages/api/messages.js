export const getMessages = async () => {
  const rest = await fetch("http://localhost:5000/api/messages");
  return await rest.json();
};

export const createMessage = async ({
  sender_id,
  username,
  message,
  token,
}) => {
  const res = await fetch("http://localhost:5000/api/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      sender_id,
      username,
      message,
    }),
  });
  return await res.json();
};

export const deleteMessage = async ({ id, token }) => {
  const res = await fetch("http://localhost:5000/api/messages/" + id, 
  {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await res.text();
}
