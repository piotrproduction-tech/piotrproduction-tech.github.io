// FE-21__Marketplace - api/useMarketplaceApi.js
// Hooki API dla Marketplace (BE-21)
// Obsługuje: workflow, narrację, RTRA, CreatorSync, StreetSync

import { useState } from "react";

async function callApi(endpoint, payload) {
  const res = await fetch("/api/BE-21/" + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

// CENTRALNY HANDLER NARRACJI + RTRA
function handleLifePacket(packet, setState) {
  const {
    rtra,
    roles,
    levels,
    rewards,
    badges
  } = packet;

  setState(prev => ({
    ...prev,
    reputationDelta: rtra?.reputationDelta || 0,
    tokensDelta: rtra?.tokensDelta || 0,
    rewards: rewards || [],
    badges: badges || [],
    roles: roles || [],
    levels: levels || {}
  }));
}

// HOOKI API

export function useCreateOffer() {
  const [state, setState] = useState({});
  async function createOffer(data) {
    const packet = await callApi("offers/create", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { createOffer, state };
}

export function usePublishOffer() {
  const [state, setState] = useState({});
  async function publishOffer(data) {
    const packet = await callApi("offers/publish", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { publishOffer, state };
}

export function useSellOffer() {
  const [state, setState] = useState({});
  async function sellOffer(data) {
    const packet = await callApi("offers/sell", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { sellOffer, state };
}

export function useAddReview() {
  const [state, setState] = useState({});
  async function addReview(data) {
    const packet = await callApi("reviews/add", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { addReview, state };
}

export function useIssueLicense() {
  const [state, setState] = useState({});
  async function issueLicense(data) {
    const packet = await callApi("licenses/issue", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { issueLicense, state };
}

export function useCompleteService() {
  const [state, setState] = useState({});
  async function completeService(data) {
    const packet = await callApi("services/complete", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { completeService, state };
}

// CREATOR PATHWAY HOOKI

export function useCreatorProgress() {
  const [state, setState] = useState({});
  async function updateProgress(data) {
    const packet = await callApi("creator/progress", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { updateProgress, state };
}

export function useCreatorPortfolio() {
  const [state, setState] = useState({});
  async function updatePortfolio(data) {
    const packet = await callApi("creator/portfolio", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { updatePortfolio, state };
}

export function useCreatorFestivalSync() {
  const [state, setState] = useState({});
  async function syncFestival(data) {
    const packet = await callApi("creator/festival", data);
    handleLifePacket(packet, setState);
    return packet;
  }
  return { syncFestival, state };
}
