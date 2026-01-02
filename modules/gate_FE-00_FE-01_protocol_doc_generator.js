// modules/gate_FE-00_FE-01_protocol_doc_generator.js

import fs from "fs";
import path from "path";

export function generateFestivalCityProtocolDoc() {
  const targetDir = "docs";
  const targetFile = path.join(targetDir, "FESTIVAL_CITY_protocol.md");

  // 1. Upewnij się, że katalog docs istnieje
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 2. Jeśli istnieje folder o nazwie pliku → usuń go
  if (fs.existsSync(targetFile) && fs.lstatSync(targetFile).isDirectory()) {
    fs.rmSync(targetFile, { recursive: true, force: true });
  }

  // 3. Treść protokołu
  const content = `
# 📘 FESTIVAL ↔ CITY PROTOCOL (v1.0 — FROZEN)
Kontrakt danych między FESTIVAL ENGINE 5.0 a CITY ENGINE 5.0  
Status: **ZAMROŻONY**

---

## 1. Cel protokołu
Ten dokument definiuje stabilny, niezmienny kontrakt danych między FESTIVAL ENGINE (FE‑01) a CITY ENGINE (FE‑00).  
Po zamrożeniu:
- nie wolno zmieniać nazw pól,
- nie wolno zmieniać typów,
- nie wolno zmieniać zakresów,
- można jedynie dodawać nowe pola jako opcjonalne.

To jest kręgosłup GATE 1.0.

---

## 2. Architektura pętli FESTIVAL ↔ CITY

\`\`\`
CITY → FESTIVAL → CITY → FESTIVAL → ...
\`\`\`

Każda klatka:
1. CITY generuje stan miasta
2. FESTIVAL przetwarza stan i generuje scenę
3. FESTIVAL wysyła event do CITY
4. CITY aktualizuje swoje warstwy

---

## 3. CITY → FESTIVAL (input)

\`\`\`json
{
  "pulse": number,
  "mood": "Calm" | "Chaotic" | "Celebratory" | "Neutral",
  "rhythm": string,
  "phase": "RISING" | "PEAK" | "FALLING",
  "scene": string,
  "narrativePhase": string,
  "crowdEnergy": number,
  "energyWave": number,
  "intent": string,
  "heatmap": {
    "north": { "intensity": number, "lastEvent": number },
    "south": { "intensity": number, "lastEvent": number },
    "east":  { "intensity": number, "lastEvent": number },
    "west":  { "intensity": number, "lastEvent": number }
  }
}
\`\`\`

---

## 4. FESTIVAL → CITY (output)

\`\`\`json
{
  "type": "festival.frame",
  "pulse": number,
  "wave": number,
  "phase": "RISING" | "PEAK" | "FALLING",
  "overlay": {
    "mode": string,
    "effects": object
  },
  "energy": number
}
\`\`\`

---

## 5. Zasady priorytetu (FESTIVAL)

1. director intent  
2. scene  
3. energy  
4. default  

---

## 6. Zasady interpretacji (CITY)

- phase RISING → zwiększ pulse  
- phase PEAK → stabilizuj pulse  
- phase FALLING → obniż pulse  
- overlay CHAOS → mood = Chaotic  
- overlay RISING → mood = Calm  
- energy > 70 → rhythm = FestivalMode  
- energy < 40 → rhythm = NightCreators  

---

## 7. Zasady synchronizacji

- CITY aktualizuje pulse/mood/rhythm co 300–500 ms  
- FESTIVAL generuje klatkę co 300–500 ms  
- heatmap decay co 1–2 s  
- mood decay co 2–3 s  

---

## 8. Stabilność protokołu

Po zamrożeniu:
- nie wolno zmieniać istniejących pól,
- nie wolno zmieniać typów,
- nie wolno zmieniać zakresów,
- można dodawać nowe pola opcjonalne.

---

## 9. Przykład pełnej pętli

CITY → FESTIVAL:

\`\`\`json
{
  "pulse": 80,
  "mood": "Calm",
  "rhythm": "EveningWindDown",
  "phase": "RISING",
  "scene": "crowd_rising",
  "narrativePhase": "opening",
  "crowdEnergy": 60,
  "energyWave": 0.4,
  "intent": "flow",
  "heatmap": { "north": 0.5, "south": 0.2, "east": 0.3, "west": 0.1 }
}
\`\`\`

FESTIVAL → CITY:

\`\`\`json
{
  "type": "festival.frame",
  "pulse": 80,
  "wave": 0.4,
  "phase": "RISING",
  "overlay": { "mode": "RISING" },
  "energy": 60
}
\`\`\`

---

## 10. Status protokołu
**ZAMROŻONY — v1.0**  
Zmiany tylko poprzez dodanie nowych pól opcjonalnych.
`;

  // 4. Zapisz plik
  fs.writeFileSync(targetFile, content, "utf8");
  console.log("Generated:", targetFile);
}

// AUTO-RUN WHEN EXECUTED DIRECTLY
if (process.argv[1].includes("gate_FE-00_FE-01_protocol_doc_generator")) {
  generateFestivalCityProtocolDoc();
}
