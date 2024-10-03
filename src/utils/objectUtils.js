export function isChanged(prev, next, key) {
  return prev[key] !== next[key];
}

export function isRemoved(next, key) {
  return !next[key];
}

export function isAdded(prev, next, key) {
  return !prev[key];
}

export function updateOnlyChanged(origin, prev, next) {
  Object.keys(prev).forEach((key) => {
    if (prev[key] !== next[key]) {
      origin[key] = next[key];
    }

    if (!next[key]) {
      origin[key] = undefined;
    }
  });

  Object.keys(next).forEach((key) => {
    if (!prev[key]) {
      origin[key] = next[key];
    }
  });
}
