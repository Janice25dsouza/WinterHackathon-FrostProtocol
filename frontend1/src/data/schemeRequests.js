const KEY = "SCHEME_REQUESTS";

export function getRequests() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function addRequest(req) {
  const existing = getRequests();
  localStorage.setItem(
    KEY,
    JSON.stringify([...existing, { ...req, status: "PENDING" }])
  );
}

export function approveRequest(index) {
  const data = getRequests();
  data[index].status = "APPROVED";
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function rejectRequest(index) {
  const data = getRequests();
  data.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(data));
}
