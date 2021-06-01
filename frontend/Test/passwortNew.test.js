const passwort = require("../API_Access/IhreDaten/password");
const data = {
  username: "Test",
  email: "Test@test.de",
};
const result = JSON.stringify({ fehler: null });

test("reset the password for the user after he forgot it", async () => {
  expect(await passwort.resetPassword(data)).toEqual(result);
});
