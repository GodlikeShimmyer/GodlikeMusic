import { useState, useEffect } from "react";

let state = {
  queue: [],
  index: 0,
  listeners: []
};

function notify() {
  state.listeners.forEach(fn => fn(state));
}

export function usePlayer() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const fn = () => setTick(t => t + 1);
    state.listeners.push(fn);
    return () => {
      state.listeners = state.listeners.filter(l => l !== fn);
    };
  }, []);

  const setQueue = (q = []) => {
    state.queue = q;
    state.index = 0;
    notify();
  };

  const setIndex = (i) => {
    state.index = i;
    notify();
  };

  return {
    queue: state.queue,
    index: state.index,
    setQueue,
    setIndex,
    addToQueue: (item) => { state.queue.push(item); notify(); }
  };
}
