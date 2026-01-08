// CityCore_12.x/cli/CityCLI.js

import readline from "readline";

export function createCityCLI({ app }) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function printHelp() {
    console.log(`
=== CITY CLI 12.x ===

Komendy:
  districts           - lista districtĂłw
  goto <id>           - przeĹ‚Ä…cz na district
  view <name>         - przeĹ‚Ä…cz widok
  snapshot            - pokaĹĽ snapshot
  workflows           - pokaĹĽ workflow engine
  ai                  - pokaĹĽ AI pipeline
  panels              - pokaĹĽ panele
  stop                - zatrzymaj miasto
  start               - uruchom miasto
  help                - pomoc
  exit                - wyjĹ›cie
`);
  }

  function handleCommand(line) {
    const [cmd, arg] = line.trim().split(" ");

    switch (cmd) {
      case "districts":
        console.log(app.runtime.router.districts.map(d => d.id));
        break;

      case "goto":
        app.runtime.router.navigateToDistrict(arg);
        console.log("PrzeĹ‚Ä…czono na district:", arg);
        break;

      case "view":
        app.runtime.router.navigateToView(arg);
        console.log("PrzeĹ‚Ä…czono widok:", arg);
        break;

      case "snapshot":
        console.log(app.runtime.router.resolve({}).activeDistrict.store.getSnapshot());
        break;

      case "workflows":
        console.log(app.runtime.router.resolve({}).activeDistrict.workflows.debug());
        break;

      case "ai":
        console.log(app.runtime.router.resolve({}).activeDistrict.ai.debug());
        break;

      case "panels":
        console.log(app.runtime.router.resolve({}).immersive);
        break;

      case "stop":
        app.stop();
        console.log("Miasto zatrzymane.");
        break;

      case "start":
        app.start({ name: "CLI" }, 500);
        console.log("Miasto uruchomione.");
        break;

      case "help":
        printHelp();
        break;

      case "exit":
        rl.close();
        process.exit(0);

      default:
        console.log("Nieznana komenda. Wpisz 'help'.");
    }
  }

  printHelp();

  rl.on("line", handleCommand);
}

