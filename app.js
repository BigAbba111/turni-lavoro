// ======================
// STATO APPLICAZIONE
// ======================

let categoriaCorrente = "Pub";
let filtroCorrente = "Tutti";

let turnoSelezionato = null;
let categoriaModale = "Pub";

// ======================
// ELEMENTI DOM
// ======================

const homePage =
    document.getElementById("homePage");

const archivioPage =
    document.getElementById("archivioPage");

const impostazioniPage =
    document.getElementById("impostazioniPage");

// Home

const pubBtn =
    document.getElementById("pubBtn");

const ristoranteBtn =
    document.getElementById("ristoranteBtn");

const dataInput =
    document.getElementById("dataInput");

const inizioInput =
    document.getElementById("inizioInput");

const fineInput =
    document.getElementById("fineInput");

const salvaBtn =
    document.getElementById("salvaBtn");

const archivioBtn =
    document.getElementById("archivioBtn");

const impostazioniBtn =
    document.getElementById("impostazioniBtn");

// Archivio

const archivioContainer =
    document.getElementById(
        "archivioContainer"
    );

const filterAllBtn =
    document.getElementById(
        "filterAllBtn"
    );

const filterPubBtn =
    document.getElementById(
        "filterPubBtn"
    );

const filterRistoranteBtn =
    document.getElementById(
        "filterRistoranteBtn"
    );

const backHomeBtn =
    document.getElementById(
        "backHomeBtn"
    );

// Impostazioni

const nomeInput =
    document.getElementById(
        "nomeInput"
    );

const salvaImpostazioniBtn =
    document.getElementById(
        "salvaImpostazioniBtn"
    );

const exportBackupBtn =
    document.getElementById(
        "exportBackupBtn"
    );

const importBackupBtn =
    document.getElementById(
        "importBackupBtn"
    );

const importBackupInput =
    document.getElementById(
        "importBackupInput"
    );

const backHomeFromSettingsBtn =
    document.getElementById(
        "backHomeFromSettingsBtn"
    );

// Modale

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const modalData =
    document.getElementById(
        "modalData"
    );

const modalInizio =
    document.getElementById(
        "modalInizio"
    );

const modalFine =
    document.getElementById(
        "modalFine"
    );

const modalPubBtn =
    document.getElementById(
        "modalPubBtn"
    );

const modalRistoranteBtn =
    document.getElementById(
        "modalRistoranteBtn"
    );

const saveEditBtn =
    document.getElementById(
        "saveEditBtn"
    );

const deleteTurnBtn =
    document.getElementById(
        "deleteTurnBtn"
    );

const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );

// ======================
// STORAGE
// ======================

function getTurni() {

    return JSON.parse(
        localStorage.getItem("turni")
        || "[]"
    );

}

function setTurni(turni) {

    localStorage.setItem(
        "turni",
        JSON.stringify(turni)
    );

}

function getSettings() {

    return JSON.parse(
        localStorage.getItem(
            "settings"
        )
        ||
        '{"nome":""}'
    );

}

function setSettings(settings) {

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

}

// ======================
// NAVIGAZIONE
// ======================

function nascondiTutteLePagine() {

    homePage.classList.add(
        "hidden"
    );

    archivioPage.classList.add(
        "hidden"
    );

    impostazioniPage.classList.add(
        "hidden"
    );

}

function mostraHome() {

    nascondiTutteLePagine();

    homePage.classList.remove(
        "hidden"
    );

}

function mostraArchivio() {

    nascondiTutteLePagine();

    archivioPage.classList.remove(
        "hidden"
    );

    renderArchivio();

}

function mostraImpostazioni() {

    nascondiTutteLePagine();

    impostazioniPage.classList.remove(
        "hidden"
    );

    const settings =
        getSettings();

    nomeInput.value =
        settings.nome;

}

// ======================
// CATEGORIA HOME
// ======================

function aggiornaCategoriaHome() {

    pubBtn.classList.remove(
        "active"
    );

    ristoranteBtn.classList.remove(
        "active"
    );

    if(
        categoriaCorrente === "Pub"
    ){

        pubBtn.classList.add(
            "active"
        );

    }else{

        ristoranteBtn.classList.add(
            "active"
        );

    }

}

pubBtn.addEventListener(
    "click",
    () => {

        categoriaCorrente = "Pub";

        aggiornaCategoriaHome();

    }
);

ristoranteBtn.addEventListener(
    "click",
    () => {

        categoriaCorrente =
            "Ristorante";

        aggiornaCategoriaHome();

    }
);

// ======================
// SALVATAGGIO TURNO
// ======================

function salvaTurno() {

    const data =
        dataInput.value;

    const inizio =
        inizioInput.value;

    const fine =
        fineInput.value;

    if(
        !data ||
        !inizio ||
        !fine
    ){

        alert(
            "Compila tutti i campi."
        );

        return;
    }

    const nuovoTurno = {

        id: Date.now(),

        data,

        inizio,

        fine,

        categoria:
            categoriaCorrente

    };

    const turni =
        getTurni();

    turni.push(
        nuovoTurno
    );

    setTurni(turni);

    inizioInput.value = "";
    fineInput.value = "";

    alert(
        "Turno salvato."
    );

}

// ======================
// EVENTI PRINCIPALI
// ======================

salvaBtn.addEventListener(
    "click",
    salvaTurno
);

archivioBtn.addEventListener(
    "click",
    mostraArchivio
);

impostazioniBtn.addEventListener(
    "click",
    mostraImpostazioni
);

backHomeBtn.addEventListener(
    "click",
    mostraHome
);

backHomeFromSettingsBtn
.addEventListener(
    "click",
    mostraHome
);

// ======================
// AVVIO APP
// ======================

function inizializzaApp() {

    dataInput.valueAsDate =
        new Date();

    aggiornaCategoriaHome();

    mostraHome();

}

inizializzaApp();

// ======================
// CALCOLO DURATA TURNO
// ======================

function calcolaMinutiTurno(
    inizio,
    fine
){

    const [h1,m1] =
        inizio
        .split(":")
        .map(Number);

    const [h2,m2] =
        fine
        .split(":")
        .map(Number);

    let start =
        h1 * 60 + m1;

    let end =
        h2 * 60 + m2;

    // turno oltre mezzanotte

    if(end < start){

        end += 1440;

    }

    return end - start;

}

function formattaDurata(
    minuti
){

    const ore =
        Math.floor(
            minuti / 60
        );

    const min =
        minuti % 60;

    return `${ore}h ${min}m`;

}

// ======================
// NOMI MESI
// ======================

const NOMI_MESI = [

    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"

];

function formattaData(data){

    const parti =
        data.split("-");

    return `${parti[2]}/${parti[1]}/${parti[0]}`;

}
// ======================
// FILTRI ARCHIVIO
// ======================

function aggiornaFiltroUI(){

    filterAllBtn.classList.remove(
        "active"
    );

    filterPubBtn.classList.remove(
        "active"
    );

    filterRistoranteBtn
    .classList.remove(
        "active"
    );

    if(
        filtroCorrente ===
        "Tutti"
    ){

        filterAllBtn.classList.add(
            "active"
        );

    }

    if(
        filtroCorrente ===
        "Pub"
    ){

        filterPubBtn.classList.add(
            "active"
        );

    }

    if(
        filtroCorrente ===
        "Ristorante"
    ){

        filterRistoranteBtn
        .classList.add(
            "active"
        );

    }

}

filterAllBtn.addEventListener(
    "click",
    () => {

        filtroCorrente =
            "Tutti";

        aggiornaFiltroUI();

        renderArchivio();

    }
);

filterPubBtn.addEventListener(
    "click",
    () => {

        filtroCorrente =
            "Pub";

        aggiornaFiltroUI();

        renderArchivio();

    }
);

filterRistoranteBtn
.addEventListener(
    "click",
    () => {

        filtroCorrente =
            "Ristorante";

        aggiornaFiltroUI();

        renderArchivio();

    }
);

// ======================
// RAGGRUPPAMENTO MESI
// ======================

function raggruppaPerMese(
    turni
){

    const gruppi = {};

    turni.forEach(turno => {

        const data =
            new Date(
                turno.data
            );

        const anno =
            data.getFullYear();

        const mese =
            data.getMonth();

        const key =
            `${anno}-${mese}`;

        if(!gruppi[key]){

            gruppi[key] = {

                anno,

                mese,

                turni:[],

                totaleMinuti:0

            };

        }

        gruppi[key]
        .turni
        .push(turno);

        gruppi[key]
        .totaleMinuti +=
        calcolaMinutiTurno(
            turno.inizio,
            turno.fine
        );

    });

    return gruppi;

}

// ======================
// ARCHIVIO
// ======================

function renderArchivio(){

    archivioContainer
    .innerHTML = "";

    let turni =
        getTurni();

    if(
        filtroCorrente !==
        "Tutti"
    ){

        turni =
            turni.filter(
                t =>
                t.categoria ===
                filtroCorrente
            );

    }

    turni.sort(
        (a,b)=>
        b.data.localeCompare(
            a.data
        )
    );

    const gruppi =
        raggruppaPerMese(
            turni
        );

    const chiavi =
        Object.keys(
            gruppi
        )
        .sort()
        .reverse();

    chiavi.forEach(
        chiave => {

        const gruppo =
            gruppi[
                chiave
            ];

        const monthCard =
            document
            .createElement(
                "div"
            );

        monthCard.className =
            "month-card";

        const titolo =
            document
            .createElement(
                "div"
            );

        titolo.className =
            "month-title";

        titolo.textContent =
            `${NOMI_MESI[
                gruppo.mese
            ]} ${
                gruppo.anno
            }`;

        monthCard
        .appendChild(
            titolo
        );

        const totale =
            document
            .createElement(
                "div"
            );

        totale.className =
            "month-total";

        totale.textContent =
            "Totale mese: "
            +
            formattaDurata(
                gruppo
                .totaleMinuti
            );

        monthCard
        .appendChild(
            totale
        );

        // =================
        // BOTTONE ESPORTA
        // =================

        const exportBtn =
            document
            .createElement(
                "button"
            );

        exportBtn.className =
            "primary-btn export-btn";

        exportBtn.textContent =
            "Esporta mese";

        exportBtn
        .addEventListener(
            "click",
            () => {

                esportaMese(
                    gruppo
                );

            }
        );

        monthCard
        .appendChild(
            exportBtn
        );

        // =================
        // TURNI
        // =================

        gruppo.turni
        .forEach(turno=>{

            const card =
                document
                .createElement(
                    "div"
                );

            card.className =
                "turn-card";

            const minuti =
                calcolaMinutiTurno(
                    turno.inizio,
                    turno.fine
                );

            card.innerHTML =

            `
            <div class="turn-date">

            ${
               formattaData(
    turno.data
)
            }

            </div>

            <div class="turn-time">

            ${turno.inizio}
            →
            ${turno.fine}

            </div>

            <div class="turn-category">

            ${turno.categoria}

            </div>

            <div class="turn-total">

            ${formattaDurata(
                minuti
            )}

            </div>
            `;

            // verrà usato
            // nella Parte C

            card.addEventListener(
                "click",
                () => {

                    apriModaleTurno(
                        turno.id
                    );

                }
            );

            monthCard
            .appendChild(
                card
            );

        });

        archivioContainer
        .appendChild(
            monthCard
        );

    });

}
