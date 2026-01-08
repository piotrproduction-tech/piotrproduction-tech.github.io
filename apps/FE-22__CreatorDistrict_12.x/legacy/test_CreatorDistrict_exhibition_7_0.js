import { CreatorDistrict_ExhibitionEngine_7_0 } from "../engines/CreatorDistrict_ExhibitionEngine_7_0.js";

const engine = new CreatorDistrict_ExhibitionEngine_7_0();
const ex = engine.createExhibition({ title: "Test" });

console.log("Exhibition 7.0 created:", ex);