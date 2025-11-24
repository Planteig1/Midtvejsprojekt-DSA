# Evaluering
*Dette er vores egen evaluering af midtvejsopgaven.*
### Algoritme-valg & Datastrukturer

### Datastrukturer & Algoritmer

I dette projekt har vi valgt at modellere flyet som et todimensionelt array. Implementeringen er udført ved hjælp af nested loops, hvilket giver en klar og effektiv struktur. Valget af denne løsning bygger på flere overvejelser:

#### Naturlig og logisk struktur
Flyets sæder er organiseret i rækker og kolonner, hvilket gør et 2D-array til en intuitiv og direkte måde at repræsentere den fysiske opsætning på. Denne datastruktur afspejler virkelighedens layout og gør det let at navigere og manipulere sæderne under simulationen.

#### Understøttelse af objektorienteret design
Ved at kombinere 2D-arrayet med objektorienteret design har vi kunnet repræsentere de enkelte elementer i flyet, såsom sæder, sædetyper og gangen, som selvstændige objekter. Det skaber en tydelig ansvarsfordeling og gør koden mere fleksibel og udvidelsesvenlig. Hvis vi på et senere tidspunkt vil ændre reglerne for sædevalg, tilføje nye sædetyper eller udvide funktionaliteten, kan det gøres uden at påvirke resten af systemets struktur.

Udover vores 2D-array benytter vi også en række lister til at understøtte simulationens logik . En af de vigtigste designbeslutninger har handlet om, hvordan vi håndterer ledige sæder på en effektiv måde.

I stedet for løbende at scanne hele sæde-grid’et for ledige pladser valgte vi at indsamle alle ledige sæder én gang i starten af hver iteration og opbevare dem i en separat liste. Når et sæde bliver booket, fjernes det med det samme fra listen. På den måde arbejder bookeren altid med en opdateret og filtreret mængde af muligheder, uden at skulle foretage gentagne gennemløb af hele grid’et.

Denne tilgang har resulteret i en markant forbedring i køretiden, da vi undgår unødvendige, gentagne scanninger af grid’et og i stedet arbejder direkte på en mindre og mere relevant datastruktur. 


Hvis vi kigger på vores booking-algoritme, ser vi, at dens tidskompleksitet er O(m*n)
Begrundelsen er, at for hver passager (m passagerer) gennemgår vi listen over ledige sæder (n sæder) op til 4 gange (én for hver søgning: pris + type + klasse, pris + type, type + klasse, pris).

I værste fald får vi derfor:

O(m⋅n+m⋅n+m⋅n+m⋅n) = O(4*m*n) 

Da Big O notation ignorerer konstante, bliver kompleksiteten:
O(m*n)

Vi ser mulighed for potentielle forbedringer og optimeringer af algoritmens tidskompleksitet. Den nuværende løsning gennemgår listen over ledige sæder flere gange for hver passager, hvilket giver en O(m·n) kompleksitet. Ved at anvende mere effektive datastrukturer, såsom grupperede lister efter sædetyper eller prisintervaller, kunne vi reducere antallet af nødvendige gennemløb og dermed optimere algoritmen






### Visualisering og simulering

#### Visualisering
Vi valgte at visualisere, og derved evaluere, vores algoritmer og datastrukturer ved at illustrere et fly med sæder på vores html side. Dette gjorde vi for at kunne bedre vise vores algoritmer over flere iterationer, og så man bedre kunne se de pladsfordelinger der er, grundet vores normalfordeling (bellcurve fordeling). 

Dette har mundet sig ud i, at vi har et grid af sæder der står hen over et tegnet fly. Disse sæder starter ud som grønne, og bliver alt ud fra deres pris mere røde, hvis de stiger i pris. Vi valgte denne farvenotering med udgangspunkt i passageren, dog kunne man have vendt farverne om, så de blev mere grønne jo højere prisen gik, hvis man tog udgangspunkt i flyselskabet.

Dette giver en meget intuitiv forståelse af, hvordan prisændringerne forekommer, og på hvilke sæder det sker på først, frem for de andre.

Dertil har vi tilføjet nogle ændringsmuligheder som man kan vælge på. Dette vil ændre visualiseringen i den forstand, at simuleringen vil ændre sig, og at visualiseringen så derefter vil ændre sig, da visualiseringen former sig efter simuleringerne.

Til sidst har vi en sektion der hedder "Profit". Dette er med til at samle dataen på en mere overskuelig måde. Specifikt den data den samler er hvor stor forskel der er fra startprisen af sæderne, til hvad de er nu. Dette giver os altså et tal på, hvor meget flyselskabet har i profit over de videre iterationer. Vi har tilføjet dette, da det giver os et reelt tal at forholde os til. De farverige visualiseringer giver en god intuition af prisforskellen, men giver os ikke den konkrete data, hvilket også er relevant.

#### Simulering
Til vores simulering kører vi vores algoritmer hen over en valgt mængde iterationer, som bliver valgt på html siden. Dette giver os god mulighed for at simulere fremgangen i pris på pladser der bliver købt af passagerer. En lille forudsætning er at flyet ikke er ved kapacitet, da sæderne så ellers altid vil blive købt, indtil de når den specifikke, udregnede smertegrænse som de har. Smertegrænsen vil være forskellig for hver person, da vi har brugt en normalkurve til at udregne smertegrænsen, som betyder at forskellige passagerer har forskellige mængder af penge de er villige til at betale. 

Dertil er der flere valgmuligheder der gør det muligt at ændre selve simuleringerne. Vi har i alt følgende som mulige ændringer:
- *Number of passengers*
- *Budget variation*
- *Passenger starting money*
- *Iterations*

Hver af disse håndtag giver mulighed for at ændre i simuleringen, på hver deres vis. *Number of passengers* vil ændre hvor mange sæder der bliver fyldt ud, og derfor også hvordan fordelingen ændrer sig. *Budget variation* skal forståes som hvor meget hver passagers budget ændrer sig mellem dem, altså om der er en forskel på 50 kr. mellem, eller 500 kr. *Passenger Starting Money* skal forståes som hvor meget hver passager har som gennemsnit, hvor man så efterfølgende tager og bruger en normalkurve til at fordele passagerernes pengepung. Til sidst, *Iteration* siger lidt sig selv, men er det antal iterationer man kører igennem når man vælger at køre simuleringen, som vil give dig forskellige fordelinger over tid.





