export class PlaybackResponse {
  constructor({ allowed, reason, streamUrl, subtitles, dubbing }) {
    this.allowed = allowed;
    this.reason = reason; // "OK" | "NO_ACCESS" | "NO_TICKET" | "NOT_FOUND"
    this.streamUrl = streamUrl || null;

    // subtitles: { enabled, languages: [], aiEnabled }
    this.subtitles = subtitles || {
      enabled: false,
      languages: [],
      aiEnabled: false
    };

    // dubbing: { enabled, languages: [], aiEnabled }
    this.dubbing = dubbing || {
      enabled: false,
      languages: [],
      aiEnabled: false
    };
  }
}