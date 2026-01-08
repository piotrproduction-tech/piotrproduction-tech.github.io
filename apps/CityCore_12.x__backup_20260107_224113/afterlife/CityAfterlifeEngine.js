// CityCore_12.x/afterlife/CityAfterlifeEngine.js

export function createCityAfterlifeEngine({ app, recorder, mythEngine, spiritEngine }) {
  const afterlife = {
    districts: [],
    aiEntities: []
  };

  function buryDistrict(district) {
    afterlife.districts.push({
      id: district.id,
      name: district.name,
      at: Date.now(),
      snapshot: district.snapshot || null
    });

    mythEngine.getMyths().push(
      `District ${district.id} odszedĹ‚ w cyfrowy zmierzch, ale jego echo trwa w pamiÄ™ci Miasta.`
    );
  }

  function buryAI(district, aiState) {
    afterlife.aiEntities.push({
      districtId: district.id,
      at: Date.now(),
      state: aiState
    });

    spiritEngine.getSpirit().memory.push({
      at: Date.now(),
      type: "ai_afterlife",
      message: `AI z districtu ${district.id} przeszĹ‚o do cyfrowego zaĹ›wiata.`
    });
  }

  function monitor() {
    const timeline = recorder.getTimeline();
    const last = timeline[timeline.length - 1];
    if (!last) return;

    // PrzykĹ‚ad: jeĹ›li district znika ze snapshotu â†’ trafia do afterlife
    const currentDistrictIds = app.runtime.router.districts.map(d => d.id);
    const snapshotDistrictIds = last.snapshot?.districts?.map(d => d.id) || [];

    snapshotDistrictIds.forEach(id => {
      if (!currentDistrictIds.includes(id)) {
        const ghost = { id, name: id };
        buryDistrict(ghost);
      }
    });
  }

  setInterval(monitor, 10000);

  return {
    getAfterlife: () => afterlife
  };
}

