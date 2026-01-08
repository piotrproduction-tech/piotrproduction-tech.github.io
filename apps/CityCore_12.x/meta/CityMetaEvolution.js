export function createCityMetaEvolution({ collectiveMemory, selfAwareness, recorder }) {
  const meta = {
    proposals: []
  };

  function generateProposal() {
    const memory = collectiveMemory.getCollectiveMemory();
    const awareness = selfAwareness.getAwareness();

    const proposal = {
      at: Date.now(),
      idea: awareness.level > 0.5
        ? "Expand consciousness pathways"
        : "Stabilize internal narrative",
      epochs: memory.epochs.length,
      awareness: awareness.level
    };

    meta.proposals.push(proposal);
  }

  function tick() {
    generateProposal();
  }

  setInterval(tick, 5000);

  return {
    getMetaEvolution: () => meta
  };
}
