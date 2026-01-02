


// FE_FESTIVAL_AI_DIRECTOR_MEMORY

// Prosta pamięć w procesie — w przyszłości możesz ją podmienić na persystencję.
const _directorMemory = {
  history: [],
  maxEntries: 200
};

export function rememberDirectorEvent(event) {
  const entry = {
    timestamp: Date.now(),
    ...event
  };

  _directorMemory.history.push(entry);

  if (_directorMemory.history.length > _directorMemory.maxEntries) {
    _directorMemory.history.shift();
  }
}

export function getDirectorHistory(limit = 50) {
  if (!_directorMemory.history.length) return [];
  return _directorMemory.history.slice(-limit);
}

export function getLastDirectorState() {
  if (!_directorMemory.history.length) return null;
  return _directorMemory.history[_directorMemory.history.length - 1];
}
