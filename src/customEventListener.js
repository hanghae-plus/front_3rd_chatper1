import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";

const customEventListener = () => {
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args) {
      try {
        return listener.bind(this)(...args);
      } catch (error) {
        const errorBoundary = new ErrorBoundaryPage({
          props: {
            errorMessage: error.message,
          },
        });

        errorBoundary.render();
      }
    };

    return originalAddEventListener.call(this, type, wrappedListener, options);
  };
};

export default customEventListener;
