export default function Publisher() {
  let subscribers = []

  function subscribe(listener) {
    subscribers.push(listener)
  }

  function unsubscribe(listener) {
    subscribers = subscribers.filter((sub) => sub !== listener)
  }

  function publish(data) {
    subscribers.forEach((sub) => sub(data))
    console.log('publish:', data)
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  }
}
