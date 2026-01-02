// BE-21__Marketplace - workflow/licenses.js

const {
  emitLicenseIssued,
  emitLicenseRevoked,
} = require("../events/emitters");

async function issueLicense(data) {
  const result = await emitLicenseIssued(data);
  return result;
}

async function revokeLicense(data) {
  const result = await emitLicenseRevoked(data);
  return result;
}

module.exports = {
  issueLicense,
  revokeLicense,
};
