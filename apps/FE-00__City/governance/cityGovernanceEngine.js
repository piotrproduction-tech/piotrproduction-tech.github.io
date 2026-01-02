import { cityReputation } from "../reputation/cityReputationEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export const cityGovernance = {
  proposals: [],
  activeVotes: [],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  createProposal(type, payload) {
    // Governance ograniczone: tylko dotacje, nominacje, wyróżnienia
    const allowed = ["grant", "nomination", "award"];
    if (!allowed.includes(type)) {
      console.warn("Proposal type not allowed:", type);
      return null;
    }

    const proposal = {
      id: "prop_" + Date.now(),
      type,
      payload,
      votes: {},
      createdAt: Date.now(),
      status: "active"
    };

    this.proposals.push(proposal);
    this.activeVotes.push(proposal);

    this.announceProposal(proposal);
    this.notify();

    return proposal;
  },

  vote(proposalId, userId, value) {
    const proposal = this.activeVotes.find(p => p.id === proposalId);
    if (!proposal) return;

    const rep = cityReputation.users[userId]?.score || 0;
    const weight = Math.max(1, Math.floor(rep / 10)); // reputacja = waga głosu

    proposal.votes[userId] = { value, weight };

    this.notify();
  },

  closeProposal(proposalId) {
    const proposal = this.activeVotes.find(p => p.id === proposalId);
    if (!proposal) return;

    proposal.status = "closed";

    const result = this.calculateResult(proposal);
    this.announceResult(proposal, result);

    this.activeVotes = this.activeVotes.filter(p => p.id !== proposalId);
    this.notify();

    return result;
  },

  calculateResult(proposal) {
    let yes = 0;
    let no = 0;

    Object.values(proposal.votes).forEach(v => {
      if (v.value === "yes") yes += v.weight;
      else no += v.weight;
    });

    return yes >= no ? "accepted" : "rejected";
  },

  announceProposal(proposal) {
    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Nowa propozycja:",
      Energetic: "⚡ Nowa inicjatywa społeczności!",
      Creative: "🎨 Nowa propozycja twórcza!",
      Calm: "🌙 Spokojna inicjatywa:",
      Chaotic: "🌪️ Burzliwa propozycja!",
      Celebratory: "🎉 Propozycja do świętowania!"
    };

    const prefix = prefixMap[personality] || "Propozycja:";
    const msg = `${prefix} ${proposal.type} — głosowanie otwarte.`;

    cityBroadcast.push(msg);
  },

  announceResult(proposal, result) {
    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Wynik głosowania:",
      Energetic: "⚡ Wynik!",
      Creative: "🎨 Decyzja społeczności:",
      Calm: "🌙 Wynik głosowania:",
      Chaotic: "🌪️ Wynik!",
      Celebratory: "🎉 Wynik głosowania!"
    };

    const prefix = prefixMap[personality] || "Wynik:";
    const msg = `${prefix} ${proposal.type} → ${result}.`;

    cityBroadcast.push(msg);
  }
};