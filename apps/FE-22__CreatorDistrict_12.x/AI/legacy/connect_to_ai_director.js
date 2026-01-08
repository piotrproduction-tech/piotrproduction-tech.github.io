export function connectCreatorDistrictToAIDirector(aiDirector, director) {
  aiDirector.registerModule("CreatorDistrict", {
    run: (context, orchestrator) => director.run(context, orchestrator)
  });
  console.log("✔ CreatorDistrict podłączony do AI Director");
}