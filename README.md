# Prosjekt-Popcorn

Prosjekt-Popcorn er en nettside der man får informasjon om filmer. På "Discover" kan man filtrere filmene på sjanger, år, regissør og rollebesetning. I søkebaren kan du søke på ønsket film - her vil alle filmer som matcher søket vises. Siden laster kun inn 16 filmer om gangen, så dersom du ønsker flere filmer trykker man på pilen (load more). Når man trykker på en filmkomponent, vil du få opp en popup der du får muligheten til å se mer informasjon om filmen, samt valget om å legge filmen inn i "watch-later" lista. Denne listen finner du ved å trykke på "watch-later" i headeren. Her kan du også fjerne filmer. Hver browser lager en egen bruker, og watch-later lista baserer seg på dette.

## Bygging

Siden alt som er deployed på VM er styrt av NTNU, er det viktig å enten være koblet til NTNUs internett eller koble til NTNUs VPN gjennom hele prosjektet, ellers vil ingenting kjøre.

For å gjøre prosjektet klart for lokal kjøring må en rekke kommandoer kjøres etter repoet har blitt _klonet_. Først må man navigere seg til mappen "Prosjekt-Popcorn" ved å kjøre:

```
cd Prosjekt-Popcorn/frontend
```

Deretter må man installere forskjellige pakker nettsiden er avhengig av med å kjøre kommandoen:

```
npm i
```

### Kjøring

Nettsiden kan åpnes på to forskjellige måter:

_Alternativ 1_

Når du er inne på frontend-mappen, kan den kjøres lokalt ved å bruke kommandoen:

```
npm run dev
```

Da vil nettsiden åpnes i en localhost i nettleseren din.

_Alternativ 2_

Du kan besøke nettsiden på http://it2810-20.idi.ntnu.no/project2
(Kun hvis du er koblet til NTNU sin VPN)

**Backend**  
Vi har deployet backenden på vm og bruker denne lokalt også.

Når du er inne i backend mappen, er det fremdeles mulig å teste backenden lokalt med å installere og kjøre derfra:

```
npm i
npm run dev
```

Og deretter endre url i main.tsx i frontenden til http://localhost:4000/graphql

### Testing

**Prettier**  
Prettier kan sjekkes i både frontend og backend samtidig med å kjøre følgende kommando i directory /Prosjekt-Popcorn:

```
npx prettier . --check
```

Merk at vi ikke har laget en egen fil for prettier og bruker bare default config som kommer med pakken.

**Linting**  
Vi har valgt å ha eslint config-filer i både frontend og backend. For linting kan man derfor benytte følgende kommando i begge directoriene /frontend og /backend:

```
npm run lint
```

Merk at det må gjøres i begge directoriene for å sjekke både front- og backend.

**Komponenttesting**  
Vi har benyttet vitest sammen med react testing library med jsdom environment for våre komponent tester som kravet tilsier. Disse testene innebærer en navigerings-test for headeren, en test for å sjekke om pop-up'en kommer opp og den siste omhandler søkefunksjonalitet. De to siste testene innebærer også mocking av queries gjennom apollo client testing. Ideelt sett skal komponenttester bare innebære rendering av enkelte komponenter for å sjekke funksjonalitet som header-testen. Men ettersom prosjektet vårt ikke har så mange uavhengige enkeltkomponenter, har vi valgt å teste funksjonalitet blant komponenter som henger sammen. Disse testene er fortsatt veldig viktige ettersom de er helt uavhengige av backenden, dvs. om testene mislykkes vet vi med sikkerhet at feilen kun ligger i frontenden.

For å kjøre disse komponenttestene kan man bruke følgende kommando i directorien /frontend:

```
npm test
```

Det står at man ikke skal ta med trivielle tester på besvarelse fra foreleser i piazza. Vi har derfor valgt å kun teste de komponentene som har større funksjonalitet for å unngå slike trivielle og selvsagte tester.

**E2E testing**  
For å dekke kravet om automatisert end-2-end testing har vi benyttet Cypress. Vi har en rekke lenger tester som befinner seg i directorien _"/frontend/cypress/e2e"_.

Den inkluderer blant annet testing av vår søkefunksjonalitet og dynamisk lasting gjennom testen som heter "load-more-search". "Visit-movie" tester scrollmenyen på hjemmesiden samt pop-up'en og muligheten til å trykke innpå en filmside. "Add-remove-watchLater" tester funksjonaliteten til å legge til og fjerne filmer fra watchlater lista gjennom å søke etter en forhåndsbestemt film og legge til og deretter fjerne den fra watch-later lista. Til slutt har vi en test som heter "filter-movies" som tester Discovery-siden vår hvor man har muligheten til å filtrere og sortere filmene.

For å kjøre disse testene kan man bruke følgende kommando i directory _/frontend_:

```
npm run cypress:open
```

Dette vil åpne en side gjennom cypress. Man må velge alternativet "E2E Testing" og deretter velge en nettleser. Videre kan man velge "Specs" på menyen til venstre og deretter trykke innpå testen de vil sjekke på høyre siden.

Merk at man må kjøre nettsiden lokalt for at disse testene skal fungere. Det kan gjøres med å følge alternativ 1 i seksjonen om kjøring. Om du i tillegg vil teste å kjøre backenden lokalt istedenfor den på vm, kan dette gjøres med å følge seksjonen om Backend og hvordan prosjektet kan byttes til lokal backend.

**API testing**  
For å teste API'et har vi benyttet en del manuell testing på apollo serveren lokalt og på vm. Her har vi testet med forskjellige vanskelige queries for å verifisere at API'et fungerer som den skal. Ettersom det ikke var krav om å bruke ekstern testing, valgte vi å bruke manuelle tester som en form for API testing.

### Design

Vi har fokusert på å ha et oversiktlig, enkelt og informativt design for å ta hensyn til bærekraftig webutvikling og universell utforming. Vi har brukt design som de fleste har sett noe lignende av før, men det skal også være enkelt for brukere som ikke er vant til å bruke streamingtjenester. Det at navigeringen er enkel reduserer unødvendig lastetid og energiforbruk.
I brukergrensesnittet har vi kun med det nødvendige, uten noen overflødige elementer.

Responsivitet gjør at det tilpasses ulike enheter og det krever mindre energi for å laste ned og vise innhold på forskjellige skjermstørrelser.
Ideelt sett ville vi satt en standard størrelse for alle filmer i popup og moviePage. Ettersom databasen inneholder litt diverse størrelser på filmbildene, har vi valgt å håndtere det slik at popupen tilpasser seg bildene - og ikke omvendt.

Fargevalget vårt gir høy kontrast, og kan oppfattes selv med lav lysstyrke. Vi har også valgt enkle skrifttyper for å gjøre siden mer lettlest.

Å gi brukeren mulighet til å velge mellom light mode og dark mode, gir en mer universell og tilpasset opplevelse for alle brukere. Vi har tilpasninger som baserer seg på brukerens systeminnstillinger for å ta hensyn til brukerens behov.

Vi har valgt å ha en "daily recommendation", selv om det ikke teller positivt for bærekraftig webutvikling. Dette er for å ha en dynamisk forside og for å skape brukerengasjement. Det gir en visuell måte å presentere innholdet på, og gjør det mer tiltalende å utforske og oppdage nye filmer, sammenlignet med en statisk liste.
Det er viktig å finne balansen mellom en god brukeropplevelse og minimere ressursbruken. I et større prosjekt ville vi ordnet en API for videoene, eller brukt YouTube til å displaye dem. Ettersom våre videoer kun tar ~95MB valgte vi å beholde det slik.

### Komponenter

**FilterBar**  
Filter Bar er komponenten som inneholder alle filtervalgene man kan gjøre på Discover-siden. Valgte å holde den separat fra DiscoverPage for ryddighet. Valgte å ha alle sjangerne som knapper, for å gjøre det enklere å vise alle sjangerne som er valgt. Komponenten bruker Reactive Variables for å lagre filtervalgene, og dette gjør at querien blir kalt automatisk ved oppdatering av filtere så derfor har vi ingen søkeknapp. For å unngå unødvendige kall til backend har vi en delay før søket skjer på inntastingsfelt.

**FilteredMovieComponent**  
Denne komponenten viser filmene etter man har søkt eller filtrert. Dette er for å skille resultatene fra hvordan filemene vises i hjemmesiden gjennom movie component.

**Header**  
Representerer headeren i applikasjonen og er med i alle sidene. Den er et viktig element for navigasjon og visuell presentasjon.

**MovieComponent**  
Denne komponenten viser filmene på _HomePage_, og hvordan de vises i form av lister. Det er her funksjonalitet som scrolling og gruppering av sjanger skjer. Dersom man trykker på en film, vil man bli sendt til _popup_, som videre kan føres til _MovieInfo_. Er skjermstørrelsen liten, går man direkte til _MovieInfo_.

**MovieInfo**  
Her vises all informasjon om hver film. Siden har en egen url. All informasjon blir hentet fra databsen.

**Popup**  
Ansvarlig for visningen av et popup-vindu når man trykker seg inn på en film. Gir brukeren muligheten til å vise detaljer om en film og interagere med brukerens personlige filmliste.
Denne komponenten representerer Den tilpasses skjermstørrelsen og navigasjonen forenkles ved bruk av smalere skjermer.

**SearchBar**  
Denne komponenten gjør det mulig å søke etter filmer og ligger i headeren.

**Toggle**  
Denne komponenten er en bryter(toggle) som gjør at det skiftes mellom lightmode og darkmode på tvers i alle sidene. Toggelen endres ut i fra hvilke tema det er.

**VideoPlayer**  
Denne komponenten tar inn en videokilde og viser videoen på hjemmesiden vår. Den bytter film hver ukedag. Vi har kurert en liste med filmer som vi synes er verdig en plass på vår nettside.

**YearPicker**  
Denne komponenten er for å velge år i filterbar. Det ble en egen komponent for å passe på at man ikke kan velge "End Year" som kommer før "Start Year" og motsatt. Den tar også inn testID for å kunne skille mellom startYear og endYear i testene.

**Context/Theme**  
Gir et rammeverk for å håndtere og dele tema-informasjon i applikasjonen. Her støtter det darkmode-funksjonalitet.
Denne komponenten er en bryter(toggle) for å bytte mellom mørkt og lyst modus i appen. Designet i toggelen endres ut ifa om det er darkmode eller lightmode.

### Sider

**DiscoverPage**  
Denne siden bruker filterbar og tar inn filterne i en query og viser resultatet på siden. For mindre skjermer vil filterne vises oppå hverandre, for å gjøre det litt finere.

**HomePage**.
Dette er hjemmesiden til nettsiden der komponenentene _header_, _VideoPlayer_ og _MovieComponent_ blir importert.

**MoviePage**  
Denne siden viser informasjon om filmene. Importerer _header_ og _MovieInfo_.

**NotFoundPage**  
Denne siden er selve hjemmesiden for prosjektet, her vises komponentene _VideoPlayer_ og _MovieComponent_.

**SearchPage**  
Denne siden benyttet url'en og viser frem resultatene etter at man har søkt via searchbar komponenten. Resultatet vises gjennom _fileteredMovieComponent_.

**WatchLaterPage**  
Denne siden viser listen over filmene brukeren har lagt til i watch later siden gjennom filtered movie component.

### Søkemulighet

Vi har en searchbar i headeren der vi kan søke på filmtitler. Vi har store datasett og tenkte det var mer effektivt å gjøre søket når brukeren faktisk er klar til å se resultatet. Vi har valgt å ikke bruke kontinuerlig oppdatering siden det kan legge press på ytelsen og vi reduserer belastningen på serveren.

### Globale variabler

Vi bruker reactive variables til filtreringssøket, slik at paramaterne blir lagret når man kommer tilbake til discover-page etter å ha navigert rundt andre steder på siden. Reactive variables gjør at querien for søket blir sendt hver gang en variabel oppdateres, og lagres globalt. For å ikke oppdatere for hvert tastetrykk, ved søk på director og cast, la vi til et delay på 1 sekund fra siste tastetrykk før den søker. Siden reactive variables utfører søket ved endringer har vi da ikke en søkeknapp på discoverpage.

### Listebasert presentasjon

En listebasert presentasjon av filmene på forsiden gjør det mulig å bla seg gjennom ønsket sjanger. Man kan enten scrolle til høyre/venstre, eller bruke piler. Dersom man bruker en liten skjermstørrelse, vil pilene alltid vises. Dette fordi det ikke er like lett å scrolle horiontalt på en liten skjerm.

På søk vil det lastes inn 16 filmer om gangen, og 32 på filtrering. Dette vil bidra til en dynamisk brukeropplevelse, samt håndtere store resultatsett. Dersom en ønsker å laste inn flere filmer, trykker man på pilen nederst.

#### Muligheten for å se mer detaljer om hver film

Dersom du trykker på en film, vil du først få opp en popup, der du videre kan trykke på "i" for mer informasjon. På popupen har du mulighet til å legge til, og slette en film fra "watch later" lista. Dersom du er på en liten skjerm, vil du gå direkte til infosiden. Grunnen til dette er fordi popupen vil bli for liten på denne skjermstørrelsen.

### Sortering og filtrering av resultatet

På discoverpage kan man filtrere på sjanger, års-intervall, regissør og skuespiller, samt sortere på årstall eller vurdering. Vi bruker reactive variables som utløser en query til backend som filtrerer resultatlisten basert på filterne hver gang et filter oppdateres.
På søket skriver du inn et søk på filmtittel, som sendes til backenden og behandles der.

### Universell utforming

For å dekke kravet om universell utforming har vi valgt å benytte extensionene "WAVE" og "Lighthouse".

- _WAVE_ gjennomfører en omfattende gjennomgang av nettsider, identifiserer tilgjengelighetsproblemer knyttet til innholdets struktur, kontrast og interaktive elementer. Utvidelsen gir visuelle indikatorer direkte på nettsiden, noe som forenkler identifisering og løsning av spesifikke tilgjengelighetsproblemer. Lighthouse er en automatisert testingsverktøy som analyserer ytelse, beste praksis, SEO (søkemotoroptimalisering), og andre kritiske aspekter av nettsidens ytelse. Den gir omfattende rapporter og forslag til forbedringer, slik at vi kan sikre at nettstedet vårt ikke bare er tilgjengelig, men også optimalisert for en bred brukergruppe.

  Ettersom vi trenger en VPN for å kjøre nettsiden på vm, kan vi ikke bruke wave sin nettside for å teste utformingen. Vi må derfor laste ned WAVE extension via https://wave.webaim.org/extension/ og gjøre det lokalt via nettleseren. Lighthouse kan lastes ned via https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk og deretter følge instruksene på den sida for å kjøre. Vi anbefaler å teste disse extensionsene på sida deployed på vm http://it2810-20.idi.ntnu.no/project2/

- _Tabbing_: vi har og implementert funksjonalitet for å kunne fullstendig navigere og bruke nettsiden gjennom tabbing og enter. Dette er viktig for å sikre at alle brukere, inkludert de som bruker skjermlesere eller andre hjelpemidler, har en smidig opplevelse. Ved å støtte tastaturnavigasjon legger vi til rette for universell tilgjengelighet.

- _Semantisk HTML_ er brukt i stor grad. Dette er brukt slik at eksterne skjermlesere skal forstå koden, samt gi en mer strukturert kode.

### Brukergenererte data

Kravet om brukergenerert data oppfylles med at hver gang appen renderes for første gang får alle brukere en brukerid som er lagret i databasen og huskes gjennom localstorage. Deretter har brukerne muligheten til å legge til og fjerne filmer fra deres watch-later lister. Resultatet presenteres listebasert i "Watch later" sida. Her har vi tatt et design valg om å ikke implementere dynamisk lasting, ettersom de fleste brukere antageligvis ikke vil ha flere tusen filmer i denne lista.

Foreleser skrev at det ikke var anbefalt med vanlig bruker generering i dette prosjektet. Vi valgte derfor en veldig lett løsning som viser frem mutasjoner på en enkel måte. Vi er fullt klare over at man kan slette brukerid'en i localstorage og dermed miste den "brukeren" og at det da vil ligge unødvendig data i databasen. Men for enkelheten i dette prosjektet, har vi gjennom foreleserens anbefaling valgt å løse det på denne måten. Vi har heller ingen behov for reviews av filmer ettersom vi har tilgang til IMDB's ratings på filmene våre gjennom datasettet vi importerte.

### Database og backend

Databasen vi bruker er MongoDB, som blir koblet til backenden vår med Apollo Server og Mongoose. Backenden håndterer dataen med GraphQL, og kobles til frontend med Apollo Client.

Innholdet i databasen hentet vi fra https://www.kaggle.com/datasets/pavan4kalyan/imdb-dataset-of-600k-international-movies. Der var det mange json filer med filmer, så vi lagde et skript for å samle alle i en json fil før vi la det inn i databasen med MongoDB compass. Deretter lagde vi skript for å slette filmer, ettersom det var mange filmer i den opprinnelige databasen som manglet en del informasjon. Vi fjernet blant annet filmer uten beskrivelse og utgivelsesdato. Databasen vår endte til slutt med å bestå av omtrent 130 000 filmer. Bildene våre ligger derimot ikke direkte i databasen, men som en URL som blir lastet fra nettet.
Innholdet i databasen hentet vi fra https://www.kaggle.com/datasets/pavan4kalyan/imdb-dataset-of-600k-international-movies. Der var det mange json filer med filmer, så vi lagde et skript for å samle alle i en json fil før vi la det inn i databasen med MongoDB compass. Deretter lagde vi skript for å slette filmer, ettersom det var mange filmer i den opprinnelige databasen som manglet en del informasjon. Vi fjernet blant annet filmer uten beskrivelse og utgivelsesdato. Databasen vår endte til slutt med å bestå av omtrent 130 000 filmer. Bildene våre ligger derimot ikke direkte i databasen, men som en URL som blir lastet inn når koden kjøres. Siden vi ikke kan kontrollere størrelsen på alle disse bildene, kan det være at noen extensions klager på at vi ikke har samme størrelse på alle bildene. For bilder som ikke kan lastes, har vi et alternativ bilde som kommer opp. Viktig å merke at det vil fremdeles komme en console error når bildene ikke kan lastes fra url'en.
