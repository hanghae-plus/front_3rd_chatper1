export function formatVNodeAttr(key, value, callback) {
  if (key.startsWith('on')) {
    if (!value || typeof value !== 'function') {
      throw new Error('Invalid event handler');
    }
    callback.eventWorker(key.slice(2).toLowerCase(), value);
    return;
  }

  if (key === 'style') {
    const _value = Object.entries(value)
      .reduce((acc, [key, value]) => {
        const _key = key.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
        const _value = typeof value === 'string' ? value : `${value}px`;
        return acc + `${_key}: ${_value}; `;
      }, '')
      .trim();
    callback.attributeWorker('style', _value);
    return;
  }

  if (key === 'className') {
    callback.attributeWorker('class', value);
    return;
  }

  callback.attributeWorker(key, value);
}
