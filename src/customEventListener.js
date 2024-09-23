import ErrorBoundary from "./components/ErrorBoundary";

const customEventListener = () => {
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args) {
      try {
        return listener.bind(this)(...args);
      } catch (error) {
        new ErrorBoundary({
          $root: document.getElementById("root"),
          errorMessage: error.message,
        });
      }
    };

    return originalAddEventListener.call(this, type, wrappedListener, options);
  };
};

export default customEventListener;
