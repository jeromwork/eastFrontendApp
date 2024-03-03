// useEventBus.js

import { ref } from 'vue';
interface Listeners {
    [event: string]: Array<(...args: any[]) => void>;
}
const listeners = ref<Listeners>({});

class EventBus{
    on(event:string, callback: (...args: any[]) => void) {
        if (!listeners.value[event]) {
            listeners.value[event] = [];
        }
        listeners.value[event].push(callback);
    }

    off(event:string, callback: (...args: any[]) => void) {
        if (listeners.value[event]) {
            listeners.value[event] = listeners.value[event].filter(cb => cb !== callback);
        }
    }

    emit(event: string, ...args: any[]) {
        if (listeners.value[event]) {
            for (const callback of listeners.value[event]) {
                callback(...args);
            }
        }
    }
}


const eventBus = new EventBus();
const windowEventBusKey = '__myEventBus__';
// Set a property on the window object
if (typeof window !== 'undefined') {
    // Explicitly cast window to any, as windowEventBusKey is a string
    (window as any)[windowEventBusKey] = eventBus;
}

export function useEventBus() {
    return eventBus;
}