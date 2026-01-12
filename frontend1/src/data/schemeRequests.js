export let schemeRequests = [];

export function addRequest(req) {
  schemeRequests.push(req);
}

export function removeRequest(index) {
  schemeRequests.splice(index, 1);
}
