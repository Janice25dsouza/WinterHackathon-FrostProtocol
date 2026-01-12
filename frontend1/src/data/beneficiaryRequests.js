let beneficiaryRequests = [];

export function addBeneficiaryRequest(req) {
  beneficiaryRequests.push(req);
}

export function getBeneficiaryRequests() {
  return beneficiaryRequests;
}

export function approveBeneficiary(index) {
  beneficiaryRequests[index].status = "APPROVED";
}

export function rejectBeneficiary(index) {
  beneficiaryRequests.splice(index, 1);
}
