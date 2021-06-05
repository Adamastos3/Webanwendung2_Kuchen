import cryptoRandomString from "crypto-random-string";
import md5 from "md5";

function createAuthString() {
  const safeString = cryptoRandomString({ length: 60, type: "url-safe" });
  return {
    Datenbank: md5(safeString),
    oeffentlich: safeString,
  };
}

console.log(createAuthString());

module.exports(createAuthString);
