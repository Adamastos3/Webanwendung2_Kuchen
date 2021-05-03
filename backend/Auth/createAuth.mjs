import cryptoRandomString from "crypto-random-string";

function createAuthString() {
  const safeString = cryptoRandomString({ length: 60, type: "url-safe" });
  return safeString;
}
