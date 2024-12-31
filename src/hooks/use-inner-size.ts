import useWindowDimensions from './use-window-dimensions';

function useInnerSize() {
  const windowDimensions = useWindowDimensions({ throttleBy: 25 });

  const availableWidth = windowDimensions.width - 32 * 2;
  // Less available height because there’s a heading right above the canvas. Ideally I should use rems for this, to account for different default font sizes, but it’s not the end of the world if the canvas doesn’t fit as a result.
  const availableHeight = windowDimensions.height - 32 * 2 - 80;

  return Math.min(availableWidth, availableHeight);
}

export default useInnerSize;
