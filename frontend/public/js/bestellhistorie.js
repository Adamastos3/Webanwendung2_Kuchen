var counter=1;

function requestBestell() {
    var id = 1//cookies()

    if (id > 0) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:8000/wba2api/bestellung/alle')
        request.onload = function () {
            var data = JSON.parse(request.responseText);
            console.log("request")
            console.log(data);
            if (data.fehler == false) {
                setzenHtmlBestell(data.daten, id)
            }
            else {
                console.log("error")
            }

        }
        request.send();
    }

}
function setzenHtmlBestell(data, id) {
    var table1 = document.getElementById("tableBestell")
    var text = "";
    console.log("daten")
    console.log(data.length)
    console.log(data[0].besteller)

    for (let i = 0; i < data.length; i++) {

        //nur zum testen
        if (data[i].besteller == null) {

        } else {
            //normal
            if (data[i].besteller.id == id) {
                console.log("ausgabe"+counter)
                text += "<td><p>" + data[i].id + "</p></td>" +
                    "<td><p>";

                let bestell = data[i].bestellpositionen;
                for (let j = 0; j < bestell.length; j++) {
                    text += "" + bestell[j].menge + "x " + bestell[j].produkt.bezeichnung + "<br>"
                }

                text += "</p></td>" +
                    "<td><p>" + data[i].total.brutto + " € </p></td>" +
                    "<td><p>" + data[i].bestellzeitpunkt + "</p></td>"
                
                console.log(table1)
                console.log(text)
                let rw = table1.insertRow(1);
                rw.innerHTML += text;
                console.log(table1)
                text="";
                counter++
            }
            
        }

    }

}



//aufrufen
requestBestell();