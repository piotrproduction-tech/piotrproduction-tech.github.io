// CityCore_12.x/engine/CityEventBridge.js

export function createCityEventBridge({ eventBus, cityState }) {
  function attachDistrict(district) {
    eventBus.emit("city:district:attached", { id: district.id });

    district.engine.onInit?.(district.state);

    return {
      tick(beat) {
        district.engine.onHeartbeat?.(beat);
        district.engine.onTick?.(district.state);
      },
      destroy() {
        district.engine.onDestroy?.(district.state);
        eventBus.emit("city:district:detached", { id: district.id });
      }
    };
  }

  function switchDistrict(prevBinding, nextDistrict) {
    if (prevBinding) {
      prevBinding.destroy();
    }
    if (!nextDistrict) return null;

    cityState.setActiveDistrict(nextDistrict.id);
    return attachDistrict(nextDistrict);
  }

  return {
    attachDistrict,
    switchDistrict
  };
}

