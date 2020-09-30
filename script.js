window.addEventListener( 'load', () => {
    MenuPunktAktiv();
    document.getElementById("Formular01").onsubmit = Valider;
});

MenuPunktAktiv = () => {
    const current = '' + window.location;
    const nav = document.getElementById( 'navigation' );
    const anchor = nav.getElementsByTagName( 'a' );

    if( current.search( '.html' ) == -1 ) {
        current = current + 'index.html';
    }

    for( let i = 0; i < anchor.length; i++ ) {
        if( current.toLowerCase() == anchor[i].href.toLowerCase() ) {
            anchor[i].className = 'active';
        }
    }
}

function Valider() {
    let AntalFejl = 0;
    let FejlBesked1 = "";
    let FejlBesked2 = "";
    let FejlBesked3 = "";

    if(document.getElementById('InputNavn').value == "") {
        AntalFejl += 1;
        FejlBesked1 = "Skriv dit navn!";
    } else {
        let regexpbogstaver = /^[a-zA-Z ]+$/;
        if(!regexpbogstaver.test(document.getElementById('InputNavn').value)) {
            AntalFejl += 1;
            FejlBesked1 = "Navn må kun indeholde bogstaver og mellemrum!";
        }
    }
    if(document.getElementById('InputPostnummer').value == "") {
        AntalFejl += 1;
        FejlBesked2 = "Skriv sit postnummer!";
    } else {
        let regexptal = /^[0-9]+$/;
        if(!regexptal.test(document.getElementById('InputPostnummer').value)) {
            AntalFejl += 1;
            FejlBesked2 = "Postnummer må kun indeholde tal!";
        }
    }
    if(document.getElementById('InputMail').value == "") {
        AntalFejl += 1;
        FejlBesked3 = "Skriv din mail!";
    } else {
        let regexpmail = /^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(!regexpmail.test(document.getElementById('InputMail').value)) {
            AntalFejl += 1;
            FejlBesked3 = "Mail er ikke gyldig!";
        }
    }
    if(AntalFejl == 0) {
        return true;
    } else {
        document.getElementById('FejlBesked1').innerHTML = FejlBesked1;
        document.getElementById('FejlBesked2').innerHTML = FejlBesked2;
        document.getElementById('FejlBesked3').innerHTML = FejlBesked3;
        return false;
    }
}