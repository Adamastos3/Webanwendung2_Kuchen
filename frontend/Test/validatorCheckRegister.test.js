const validator = require("../Module/Validator/validator");
const data = {
  email: "Test@test.de",
  username: "username.value",
  pass: "Passwort123.",
  anrede: "Herr",
  vorname: "Max",
  nachname: "Mustermann",
  geb: "2021-05-21",
  plz: "78628",
  stadt: "Rottweil",
  strasse: "Gartenstrasse",
  hausnr: "6",
};

test("checks the input of the register page", async () => {
  expect(await validator.checkRegister(data)).toEqual([]);
});
