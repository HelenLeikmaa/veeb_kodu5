/* 
    1. Hetkel loodud kell on 24 tunni kell. Muutke see 12 tunni kellaks. ---DONE---
    2. "Tarne hind" nupule vajutamisel peaks näitama, palju tuleb tarne eest maksta (hinnad on koodis kommentaaridena kirjas). ---DONE---
    3. Täiendage olemasolev vorm raadionuppudega, mille sisu valige ise (seotud tarnega), ja kujundage see style.css failis (css-faili uue osa juurde lisage kommentaar). ---DONE---
    4. Lisage vormile sisendi kontroll: tekstiväljad ei tohi olla tühjad, ei tohi sisaldada numbreid, üks raadionuppudest peab olema valitud (vastasel juhul visatakse ette alert aken) jne.
    5. lisage kaardile mõni teine aadress, mis ei asu Tartus (kasutada turvalist protokolli ehk https://..). Lisage uuele aadressile marker ja muutke kaardi keskpunkt ja suum nii, et mõlemad kohad oleksid kaardil vaikimisi nähtavad.
    6. Uurige API dokumentatsioon ja lisage kaardile infobox'id, mis ilmuvad markerile vajutades.
*/




(function() {
    "use strict"; //Vaikimisi üritab JavaScript mõned vead lasta läbi, aga meie soovime neid püüda 
                    // ja kohe ära parandada. Selleks kasutamegi „ranget töörežiimi“.
    
    document.addEventListener("DOMContentLoaded", function() { 
        // deklareeritud funktsiooni kutsume välja ainult siis, kui DOM elemendid on juba kuvatud
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000); // ilma selleta oleks kell lehel staatiline
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            // aeg kujul 0:0:0 

            // viime kella korralikule kujule
            let plel = " EL"; // pealelõunal või (vaikimisi) ennelõunal

            if (h == 24) {
                h = "00";
            }

            else if (h > 12) {
                h -= 12;
                plel = " PL"; // muudan vaikimisi valitud ennelõuna nüüd pealelõunaks
            }

            if (h == 12) {
                plel = " PL";   
               }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + plel; // kasutame .innerHTML meetodit, et näidata kella soovitud formaadis
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {  
        //Enne, kui asume tarne hinda arvutama, kontrollime, kas linn on menüüst valitud. 
        // Kontrollime siis, kui kasutaja on "Arvuta tarne hind" nupule vajutanud.

        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            let sihtkoht = linn.value;
            let hind;

            if (sihtkoht == "trt" || sihtkoht == "nrv") {
                hind = "2,50";
            }

            else if (sihtkoht == "tln") {
                hind = "0,00";
            }
            else if (sihtkoht == "prn") {
                hind = "3,00";
            }

            
            e.innerHTML = hind + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
// API - üht tarkvara teisega ühendav liides
// https://www.bingmapsportal.com/ vajalik Microsofti konto, et saada API võti
// Key type võiks olla Basic ja Application type alt valige Dev/Test 
// üks võti on seotud ühe kaardiga
// genereeritud võti lisatakse HTML-dokumendi lõppu (muude skriptide juurde)

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location( // kaardi keskpunkt, meie valitud
        // aadressist koordinaadid:  https://www.gpsvisualizer.com/geocode 
         58.38104, 
        26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 14,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true // et kasutajal oleks võimalus liigutada kaarti paremale-vasakule üles-alla
        // kaardisätteid: https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/mapoptions-object
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, { // lisame keskpunktile markeri
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });

    map.entities.push(pushpin); // lisame markeri kaardile

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

