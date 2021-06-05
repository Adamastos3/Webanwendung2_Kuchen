const request = require("../Request/request");
const pas = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";
const validator = require("../../Module/Validator/validator");

async function createWarenkorb(body) {
  let path = "http://localhost:8000/wba2api/warenkorb" + pas;
  const a = await validator.checkWarenkorbPost(body);
  if (a.length < 1) {
    let daten = JSON.stringify({
      benutzerid: body.benutzerid,
      warenkorb: body.warenkorb,
    });

    const c = await request.postRequest(path, daten);
    if (c != null) {
      return JSON.stringify({
        fehler: null,
      });
    } else {
      return JSON.stringify({
        fehler: [{ bezeichnung: "No data" }],
      });
    }
  }
  return JSON.stringify({
    fehler: a,
  });
}

async function getWarenkorbAll() {
  let path = "http://localhost:8000/wba2api/warenkorb/alle" + pas;
  const a = await request.getRequest(path);
  return a;
}

async function getWarenkorById(id) {
  let path = "http://localhost:8000/wba2api/warenkorb/gib/" + id + pas;
  const a = await validator.checkID(id);
  if (a.length < 1) {
    const b = await request.getRequest(path);
    return JSON.stringify({
      fehler: null,
      daten: b.daten,
    });
  } else {
    return JSON.stringify({
      fehler: a,
    });
  }
}

async function existWarenkorb(body) {
  let path =
    "http://localhost:8000/wba2api/warenkorb/existiert/" +
    body.benutzerid +
    pas;
  const a = await validator.checkID(body.benutzerid);
  if (a.length < 1) {
    const b = await request.getRequest(path);
    if (b.daten != null) {
      return JSON.stringify({
        fehler: null,
        daten: b.daten,
      });
    } else {
      return JSON.stringify({
        fehler: [{ bezeichnung: "no Data" }],
      });
    }
  }

  return a;
}

async function updateWarenkorb(body) {
  let path = "http://localhost:8000/wba2api/warenkorb" + pas;
  let p =
    "http://localhost:8000/wba2api/warenkorb/gib/" + body.benutzerid + pas;
  const a = await validator.checkWarenkorb(body);
  if (a.length < 1) {
    const ids = await request.getRequest(p);

    if (ids.fehler == false) {
      let daten = JSON.stringify({
        id: ids.daten.id,
        benutzerid: body.benutzerid,
        warenkorb: body.warenkorb,
      });

      const b = await request.putRequest(path, daten);
      if (b != null) {
        return JSON.stringify({
          fehler: null,
        });
      } else {
        return JSON.stringify({
          fehler: [{ bezeichnung: "No data" }],
        });
      }
    } else {
      return JSON.stringify({
        fehler: [{ bezeichnung: "no Data" }],
      });
    }
  } else {
    return JSON.stringify({
      fehler: a,
    });
  }
}

async function resetWarenkorb(id) {
  let body = {
    benutzerid: id,
    warenkorb: "" + "-" + "",
  };
  const a = await existWarenkorb(body);
  let d = JSON.parse(a);
  if (d.fehler == null && d.daten.existiert) {
    updateWarenkorb(body);
  }
}

async function saveWarenkorb(body) {
  const a = await existWarenkorb(body);
  let ad = JSON.parse(a);

  if (ad.fehler == null) {
    if (ad.daten.existiert) {
      const b = await updateWarenkorb(body);
      return b;
    } else {
      const c = await createWarenkorb(body);
      return c;
    }
  } else {
    return a;
  }
}

module.exports = {
  getWarenkorById,
  getWarenkorbAll,
  existWarenkorb,
  saveWarenkorb,
  resetWarenkorb,
};
