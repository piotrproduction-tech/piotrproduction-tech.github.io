import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "./cityPersonalityEngine";

export function personalityBroadcast(message) {
  const profile = cityPersonality.profiles[cityPersonality.personality];
  const finalMessage = `${profile.emoji} ${profile.broadcastPrefix} ${message}`;
  cityBroadcast.push(finalMessage);
}