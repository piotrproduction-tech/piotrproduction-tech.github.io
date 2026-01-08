// CityCore_12.x/time/CityTimeMachine.js

export function createCityTimeMachine({ app, snapshots = [] }) {
  let index = 0;
  let playing = false;
  let timer = null;

  function captureSnapshot() {
    const resolved = app.runtime.router.resolve({});
    const district = resolved.activeDistrict;

    return {
      at: Date.now(),
      districtId: district?.id,
      view: resolved.viewObject?.view,
      snapshot: district?.store?.getSnapshot?.(),
      panels: resolved.immersive
    };
  }

  function record() {
    snapshots.push(captureSnapshot());
  }

  function interpolate(a, b, t) {
    const out = {};
    for (const key in a) {
      const va = a[key];
      const vb = b[key];

      if (typeof va === "number" && typeof vb === "number") {
        out[key] = va + (vb - va) * t;
      } else {
        out[key] = t < 0.5 ? va : vb;
      }
    }
    return out;
  }

  function apply(snapshot) {
    const district = app.runtime.router.districts.find(
      d => d.id === snapshot.districtId
    );

    if (!district) return;

    app.runtime.router.navigateToDistrict(snapshot.districtId);
    app.runtime.router.navigateToView(snapshot.view);

    district.store?.setSnapshot?.(snapshot.snapshot);
  }

  function step() {
    if (index >= snapshots.length - 1) return false;

    const a = snapshots[index];
    const b = snapshots[index + 1];

    for (let t = 0; t <= 1; t += 0.1) {
      const interpolated = {
        ...a,
        snapshot: interpolate(a.snapshot, b.snapshot, t)
      };
      apply(interpolated);
    }

    index++;
    return true;
  }

  function play(interval = 200) {
    if (playing) return;
    playing = true;

    timer = setInterval(() => {
      if (!step()) stop();
    }, interval);
  }

  function stop() {
    playing = false;
    if (timer) clearInterval(timer);
  }

  function reset() {
    stop();
    index = 0;
  }

  function printStatus() {
    console.log("=== CITY TIME MACHINE ===");
    console.log("Snapshots:", snapshots.length);
    console.log("Index:", index);
    console.log("Playing:", playing);
  }

  return {
    record,
    play,
    stop,
    reset,
    step,
    printStatus,
    snapshots
  };
}

