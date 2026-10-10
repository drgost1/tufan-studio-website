/**
 * Tiny signal between the loading screen and the hero: the hero entrance
 * waits for the intro shutter to open, otherwise it plays (unseen) behind
 * the loader. Reset on every loader mount so client-side navigation back to
 * the home page replays the sequence in the right order.
 */
let introDone = false;
const listeners = new Set<() => void>();

export function resetIntro() {
  introDone = false;
}

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function onIntroDone(listener: () => void): () => void {
  if (introDone) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
