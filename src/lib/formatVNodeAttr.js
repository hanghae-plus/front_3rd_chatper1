export function formatVNodeAttr(key, value) {
  if (key.startsWith('on') && typeof value === 'function') {
    return [key.slice(2).toLowerCase(), value];
  }

  if (key === 'className') {
    return ['class', value];
  }

  if (key === 'style') {
    return [
      key,
      Object.entries(value)
        .reduce((acc, [key, value]) => {
          const _key = key.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
          const _value = typeof value === 'string' ? value : `${value}px`;
          return acc + `${_key}: ${_value}; `;
        }, '')
        .trim(),
    ];
  }

  return [key, value];
}
