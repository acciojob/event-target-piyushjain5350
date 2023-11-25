class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const eventListeners = this.listeners.get(event);
    if (!eventListeners.includes(callback)) {
      eventListeners.push(callback);
    }
  }

  removeEventListener(event, callback) {
    if (this.listeners.has(event)) {
      const eventListeners = this.listeners.get(event);
      this.listeners.set(
        event,
        eventListeners.filter((listener) => listener !== callback)
      );
    }
  }

  dispatchEvent(event) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      for (const listener of eventListeners) {
        listener();
      }
    }
  }
}

// Sample Usage
const target = new EventTarget();
const logHello = () => console.log('hello');
const logWorld = () => console.log('world');

target.addEventListener('hello', logHello);
target.addEventListener('world', logWorld);

target.dispatchEvent('hello'); // Console logs: hello
target.dispatchEvent('world'); // Console logs: world

target.removeEventListener('hello', logHello);

target.dispatchEvent('hello'); // No console log, as the listener is removed
target.dispatchEvent('world'); // Console logs: world