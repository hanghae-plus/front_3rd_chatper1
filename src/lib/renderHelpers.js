import { addEvent, removeEvent } from '@lib/eventManager'

export function removeAttribute(target, attribute, value) {
  if (attribute.startsWith('on')) return removeEvent(target, attribute.slice(2).toLowerCase(), value)
  if (attribute === 'className') return target.removeAttribute('class')
  if (attribute === 'style') return (target.style.cssText = '')
  return target.removeAttribute(attribute)
}

export function updateAttribute(target, attribute, newValue, oldValue) {
  if (newValue === oldValue) return

  if (attribute.startsWith('on') && typeof newValue === 'function') {
    const eventType = attribute.slice(2).toLowerCase()
    if (typeof oldValue === 'function') {
      removeEvent(target, eventType, oldValue)
    }
    addEvent(target, eventType, newValue)
  } else if (attribute === 'className') {
    target.className = newValue || ''
  } else if (attribute === 'style' && typeof newValue === 'object') {
    updateStyles(target, newValue, oldValue)
  } else {
    if (newValue == null || newValue === false) {
      target.removeAttribute(attribute)
    } else {
      target.setAttribute(attribute, newValue)
    }
  }
}

export function updateStyles(target, newStyles, oldStyles = {}) {
  Object.keys(oldStyles).forEach((styleName) => {
    if (!(styleName in newStyles)) {
      target.style[styleName] = ''
    }
  })

  Object.assign(target.style, newStyles)
}
