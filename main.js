var huidigeAnimatie

// Voor debuggen kan forceerUren veranderd worden om de zon onder te zien gaan of op te zien komen bij tijdsveranderingen.
var forceerUren

function klok() {
    var klokDatum = new Date();

    if (this.forceerUren != undefined) {
        klokDatum.setHours(forceerUren)
    }

    var uren = klokDatum.getHours()

    var isNacht = (uren >= 18 && uren <= 23) || (uren >= 0 && uren <= 7)
    if (isNacht && huidigeAnimatie !== "nacht") {
        huidigeAnimatie = "nacht"
        animeer(isNacht)
    } else if (!isNacht && huidigeAnimatie !== 'dag' ) {
        huidigeAnimatie = "dag"
        animeer(isNacht)
    }

    var tijd = klokDatum.toISOString().
        split("T")[1].
        split('.')[0]

    document.getElementById("klok").innerHTML = tijd;
}

// Herstart de animatie door het element te verwijderen en opnieuw toe te voegen.
function herstartAnimatie(element) {
    var parent = element.parentNode
    parent.removeChild(element)
    parent.appendChild(element)
}


// Start de animaties.
// Wanneer isNacht waar is zal de zon onder gaan, de lucht donker kleuren en de maan verschijnen.
// Wanner isNacht onwaar is zal de zon op komen, de lucht blauw worden en de maan verdwijnen.
function animeer(isNacht) {
    var zon = document.getElementById("zon")
    var maan = document.getElementById("maan")
    var body = document.getElementsByTagName("body")[0]

    if (isNacht) {
        zon.style.animation = "zonsondergang 15s linear forwards"
        maan.style.opacity = 0
        maan.style.animation = "nacht 0.8s 14s forwards"
        body.style.animation = "lucht 15s forwards"
    }
    else {
        zon.style.animation = "zonsondergang 15s linear reverse"
        maan.style.opacity = 1
        maan.style.animation = "licht 0.8s 1s forwards"
        body.style.animation = "lucht 15s reverse"
    }

    herstartAnimatie(zon)
    herstartAnimatie(maan)
    herstartAnimatie(body)
}

window.onload = function() {
    klok();
    setInterval(klok, 1000);
}
