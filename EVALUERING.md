# Evaluering
*Dette er vores egen evaluering af midtvejsopgaven.*
### Algoritme-valg





### Datastrukturer

I dette projekt har vi valgt at modellere flyet som et todimensionelt array. Implementeringen er udført ved hjælp af nested loops, hvilket giver en klar og effektiv struktur. Valget af denne løsning bygger på flere overvejelser:

#### Naturlig og logisk struktur
Flyets sæder er organiseret i rækker og kolonner, hvilket gør et 2D-array til en intuitiv og direkte måde at repræsentere den fysiske opsætning på. Denne datastruktur afspejler virkelighedens layout og gør det let at navigere og manipulere sæderne under simulationen.

#### Understøttelse af objektorienteret design
Ved at kombinere 2D-arrayet med objektorienteret design har vi kunnet repræsentere de enkelte elementer i flyet, såsom sæder, sædetyper og gangen, som selvstændige objekter. Det skaber en tydelig ansvarsfordeling og gør koden mere fleksibel og udvidelsesvenlig. Hvis vi på et senere tidspunkt vil ændre reglerne for sædevalg, tilføje nye sædetyper eller udvide funktionaliteten, kan det gøres uden at påvirke resten af systemets struktur.

Udover vores 2D-array benytter vi også en række lister til at understøtte simulationens logik . En af de vigtigste designbeslutninger har handlet om, hvordan vi håndterer ledige sæder på en effektiv måde.

I stedet for løbende at scanne hele sæde-grid’et for ledige pladser valgte vi at indsamle alle ledige sæder én gang i starten af hver iteration og opbevare dem i en separat liste. Når et sæde bliver booket, fjernes det med det samme fra listen. På den måde arbejder bookeren altid med en opdateret og filtreret mængde af muligheder, uden at skulle foretage 
gentagne gennemløb af hele grid’et.

Denne tilgang har resulteret i en markant forbedring i køretiden, da vi undgår unødvendige, gentagne scanninger af grid’et og i stedet arbejder direkte på en mindre og mere relevant datastruktur. 
