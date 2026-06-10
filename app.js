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

// ======================
// GESTIONE MODALE
// ======================

function apriModaleTurno(id) {

    const turni = getTurni();

    const turno = turni.find(
        t => t.id === id
    );

    if (!turno) {
        return;
    }

    turnoSelezionato = id;

    modalData.value = turno.data;
    modalInizio.value = turno.inizio;
    modalFine.value = turno.fine;

    categoriaModale =
        turno.categoria;

    aggiornaCategoriaModale();

    modalOverlay.classList.remove(
        "hidden"
    );

}

function chiudiModale() {

    modalOverlay.classList.add(
        "hidden"
    );

    turnoSelezionato = null;

}

// ======================
// CATEGORIA MODALE
// ======================

function aggiornaCategoriaModale() {

    modalPubBtn.classList.remove(
        "active"
    );

    modalRistoranteBtn.classList.remove(
        "active"
    );

    if (
        categoriaModale === "Pub"
    ) {

        modalPubBtn.classList.add(
            "active"
        );

    } else {

        modalRistoranteBtn.classList.add(
            "active"
        );

    }

}

modalPubBtn.addEventListener(
    "click",
    () => {

        categoriaModale = "Pub";

        aggiornaCategoriaModale();

    }
);

modalRistoranteBtn.addEventListener(
    "click",
    () => {

        categoriaModale =
            "Ristorante";

        aggiornaCategoriaModale();

    }
);

// ======================
// MODIFICA TURNO
// ======================

function salvaModificheTurno() {

    if (
        turnoSelezionato === null
    ) {
        return;
    }

    const data =
        modalData.value;

    const inizio =
        modalInizio.value;

    const fine =
        modalFine.value;

    if (
        !data ||
        !inizio ||
        !fine
    ) {

        alert(
            "Compila tutti i campi."
        );

        return;
    }

    const turni =
        getTurni();

    const indice =
        turni.findIndex(
            t =>
            t.id ===
            turnoSelezionato
        );

    if (
        indice === -1
    ) {
        return;
    }

    turni[indice].data =
        data;

    turni[indice].inizio =
        inizio;

    turni[indice].fine =
        fine;

    turni[indice].categoria =
        categoriaModale;

    setTurni(turni);

    chiudiModale();

    renderArchivio();

    alert(
        "Turno aggiornato."
    );

}

// ======================
// ELIMINA TURNO
// ======================

function eliminaTurno() {

    if (
        turnoSelezionato === null
    ) {
        return;
    }

    const conferma =
        confirm(
            "Eliminare definitivamente il turno?"
        );

    if (!conferma) {
        return;
    }

    const turni =
        getTurni().filter(
            turno =>
            turno.id !==
            turnoSelezionato
        );

    setTurni(turni);

    chiudiModale();

    renderArchivio();

    alert(
        "Turno eliminato."
    );

}

// ======================
// EVENTI MODALE
// ======================

saveEditBtn.addEventListener(
    "click",
    salvaModificheTurno
);

deleteTurnBtn.addEventListener(
    "click",
    eliminaTurno
);

closeModalBtn.addEventListener(
    "click",
    chiudiModale
);

// chiusura cliccando sullo sfondo

modalOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            modalOverlay
        ) {

            chiudiModale();

        }

    }
);

// ======================
// ESPORTAZIONE MESE
// ======================

function esportaMese(gruppo){

    const settings =
        getSettings();

    const mese =
        NOMI_MESI[
            gruppo.mese
        ];

    let testo =

`Buonasera,

con la presente inoltro il riepilogo delle ore lavorate nel mese di ${mese} ${gruppo.anno}:

`;

    gruppo.turni
    .sort(
        (a,b)=>
        a.data.localeCompare(
            b.data
        )
    )
    .forEach(turno=>{

        const data =
            new Date(
                turno.data
            )
            .toLocaleDateString(
                "it-IT"
            );

        testo +=
`${data}: ${turno.inizio} – ${turno.fine}
`;

    });

    testo +=

`
Cordiali saluti,

${settings.nome}
`;

    navigator.clipboard
    .writeText(testo)
    .then(()=>{

        alert(
            "Testo copiato negli appunti."
        );

    });

}

// ======================
// IMPOSTAZIONI
// ======================

function salvaImpostazioni(){

    const nome =
        nomeInput.value.trim();

    if(!nome){

        alert(
            "Inserisci un nome."
        );

        return;

    }

    setSettings({

        nome

    });

    alert(
        "Impostazioni salvate."
    );

}

salvaImpostazioniBtn
.addEventListener(
    "click",
    salvaImpostazioni
);

// ======================
// ESPORTA BACKUP
// ======================

function esportaBackup(){

    const backup = {

        settings:
            getSettings(),

        turni:
            getTurni()

    };

    const blob =
        new Blob(

            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],

            {
                type:
                "application/json"
            }

        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "backup_turni.json";

    document.body
    .appendChild(a);

    a.click();

    document.body
    .removeChild(a);

    URL.revokeObjectURL(
        url
    );

}

exportBackupBtn
.addEventListener(
    "click",
    esportaBackup
);

// ======================
// IMPORTA BACKUP
// ======================

function importaBackup(){

    const file =
        importBackupInput
        .files[0];

    if(!file){

        alert(
            "Seleziona un file."
        );

        return;

    }

    const reader =
        new FileReader();

    reader.onload =
        function(event){

        try{

            const backup =
                JSON.parse(
                    event.target
                    .result
                );

            if(
                !backup.turni
            ){

                throw new Error();

            }

            localStorage
            .setItem(

                "turni",

                JSON.stringify(
                    backup.turni
                )

            );

            localStorage
            .setItem(

                "settings",

                JSON.stringify(
                    backup.settings
                )

            );

            alert(
                "Backup importato."
            );

            renderArchivio();

        }
        catch{

            alert(
                "File non valido."
            );

        }

    };

    reader.readAsText(
        file
    );

}

importBackupBtn
.addEventListener(
    "click",
    importaBackup
);

// ======================
// SERVICE WORKER
// ======================

if(
    "serviceWorker"
    in navigator
){

    window.addEventListener(
        "load",
        ()=>{

            navigator
            .serviceWorker
            .register(
                "./service-worker.js"
            );

        }
    );

}
