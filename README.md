Del 1 – backend og authitficering

1 Hvad er formålet med auth.route.js

Den poster login data, eller definerer en API-endpoint som mådtager loginoplysninger, kalder en login funtion og retunere enten sucess eller fejlbesked

2 Hvad gør funktionen signInUser i authInUser i auth.handler.js

SignInUser funktionen tjekker om de indsente login-oplysninger er korrekte

3 Hvorfor bruger vi bcryptjs til adgangskoder, og hvad er forskellen på en hash og en almindelig tekstreng?

Bcryptjs burger man til adgnangskoder for at beskytte brugerens data og gøre det meget svært for angribere at aflæse elelr gætte koder selv hvis de får adgang til databasen.

Almidelig tekst: det er læsbart fx. “minKode123” den er vendbar men har ingen sikkerhed og er uegnet til adgangskoder

Hash: den er uforståelig fx “$2a$10$Xz” den er ikke vendbar men har dermed høj sikkerhed og er god til sikker lagring af adgangskoder

4 Hvad indeholder den JWT-token, der sendes tilbage til klienten?

Hvis man skal ind på et bibliotek får man et adgangkort som man bruger til at gå ind og ud uden at vise ID. Det adgangskort (JWT-Token) indeholder informattioner om dig fx Din email bruger id rolle osv... JWT-tokenen er underskrevet med hemmelig kode som kun serveren kender, og dermed erfter du er logget ind i en hjemmeside så gemmer den JWT token til localStorage, så når du besøger andre sider sender du tokenen med så den ved hvem du er uden at behøve at logge ind igen.

Tokenen er delt ud i 3 dele adskilt af punktummer xxxxx.yyyyy.zzzzz

1.      Header. angiver hvilken slags token det er. Den viser hvad for en token den er og hviklen algoitme der bruges til signaturen fx. Betyder dette at det er en JWT og at vi bruger HMAC SHA-256 til at underskirve den

“alg”: HS256,

“typ”: JWT.

2. Payload. dette angiver hvem brugeren er. Dette er oplysnigerne om dig. Så fx. Burger-ID emial rolle o hvornår tokenen udløber

3. Signature. dette angiver om den er ægte. Den laved ved at tage hedar + payload og kombinere det til en hemmelig nøgle som gøre det umuligt at ændre n oget uden at signaturen blver ugyldig som fx “S4md93kfaas9diw39dsfl...”

5 Hvorfor bruger vi en try/catch-blok i signInUser-funktionen?

For at fange fejl så programmet ikke crasher og så kan sende en kontrolleret fejlbesked tilbage til klienten.

6 Hvad sker der, hvis process.envJWT_SECRET ikke er defineret?

Typisk sker der en JWT-signering fejl eller en JWT-verifikation fejl. JWT_SECRET er vigtigt fordi den er det eneste der kan underskrive og bekræte tokenens ægthed, uden den kan du hverken lave eller læse tokens korrekt

Den giver oftest en error som ser sådan her ud:

Error: secretoOrPrivateKey must have a value

Del 2 – React-hooken useAuth

7 Hvad er formålet med useAuth-hooken?

UseAuth er en custon react hook, der giver adgang tl brugerens login-status og data.

Den bruges til at:

Tjekke om brugeren er ogget ind

Hente information om den akutelle bruger

Give adgang til login/logout-funktioner

Bestykke sider eller funktioner, så kun loggede brugere ser dem

8 Hvordan gemmes token og brugerdata, så de overlever en opdaterikng/genindlæsning af siden?

Er forklaret før. Men den kan også gemmes i sessionStorage og Cookies istedet for localStorage, det er bare oftest brugt

9 Hvordan ved app’en, om brugeren er logget ind? Hvilken variabel afgør det?

Det gør den i den kode som typisk var gemt i localStorage, så hvis man allerade er logget ind er der jo en JWT-token. Det er variablen status der viser, om login lykkedes (“ok” eller “error”)

10 Hvorfor bruger vi jwt-decode, og hvad bruger vi det til?

Også noget omkring de der Header Payload Signature

Men den udpakker payload’en i tokenen så du kan læse indholdet direkte. Det bliver brugt til at vise brugerens navn eller rolle direkte i UI’et, man kan styre adgang, og man slipper for et ekstra API-kald for at hente basisoplysninger om brugeren.

11 Forklar hvad signIn()-funktionen gør trin for trin.

Opretter forbindelse til dataabasen

Finder brugeren

Tjekker om brugeren findes

Tjekker om adgangskoden er korrekt

Henter JWT-konfiguration

Opretter JWT-token

Retunerer resultatet

Fejl-håndtering

Del 3 – Brug af login komponent

12 Hvordan bruges useAuth-hooken i Login.jsx

Den bruges til at:

Sende loginoplysninger til serveren

Modtager svar fra serveren

Logger det i console.log(“Login successful”, data);

13 Hvad sker der, når brugeren klikker på knappen “Log ind”?

Formen bliver sendt

HandleLogin kører og sender en POST anmodning til serveren

Serveren validerer Login-oplysningerne og sender enten fejl eller succes

Hvis sucsess kommer man ind

Hvis login mislykkes: kommer der en fejlmeddelelse

14 Hvordan vises fejl for brugeren, hvis login fejler?

Der kommer en alert() som er en popup. Og der ankommer en fejlmddelelse logget i konsollen

Del 4 – refleksion og samarbejde

15 Hvilke dele af login-flowet forstod i bedst?

Vi har ikke fået det til at fungere så det kan vi ikke svare på, udaterer senere :P

16 Var der noget, i syntes var svært - og hvordan løste i det?

Det hele var udfordrende, men det om tosdagen vafr rimelig okay.

17 Hvordan fordelte i arbejdet i gruppen?

Silke tog styringen og vi arbejde rimelig fordelt.

18 Hvordan kunne i bruge dette login-system i et større projekt, fx med brugerroller eller adgangbegrænsende sider?

Den kan man næsten bruge til at der har med et system man skal logge ind til. Alt man skal kunne logge ind til. Meget smart at ha lært :)
