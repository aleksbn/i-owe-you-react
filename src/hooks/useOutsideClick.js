import { useEffect, useRef } from "react";

/**
 * Custom hook that attaches a click event listener to the document and calls the provided handler function when a click event occurs outside of the reference element.
 *
 * @param {Function} handler - The function to be called when a click event occurs outside of the reference element.
 * @param {boolean} [listenCapturing=true] - Indicates whether the event should be dispatched to this registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
 * @return {React.RefObject} - A reference object that can be attached to a React element to track its click events.
 */
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    /**
     * Handles the click event outside of the reference element.
     *
     * @param {Event} e - The click event.
     * @return {void} This function does not return anything.
     */
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
