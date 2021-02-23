const getCurrentUser = () =>
  fetch("/api/v1/user-sessions/current", {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
}).then((resp) => {
  if (resp.ok) {
    return resp.json().then((user) => user);
  }
  const errorMessage = `${resp.status} (${resp.statusText})`;
  const error = new Error(errorMessage);
  throw error;
});

export default getCurrentUser;
