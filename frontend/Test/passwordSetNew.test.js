const passwort = require("../API_Access/IhreDaten/password");
const data = {
  passOld: "123456789Ab.",
  pass: "123456789Ab.",
};
const result = JSON.stringify({ fehler: null });

test("Sets a new password for the user", async () => {
  expect(await passwort.setNewPassword(data, 1)).toEqual(result);
});
