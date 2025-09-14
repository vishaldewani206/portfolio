import storage from "local-storage-fallback";


const onClickWrapper = (onClickMethod, isDark, event) => {
    
  

  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = event.target.getBoundingClientRect();
  const offsetTop = elemRect.top - bodyRect.top;
  const offsetLeft = elemRect.left - bodyRect.left;

  console.log('event', event)

  // this tells us how much the user has zoomed in using the pinch gesture
  const deviceZoomRatio = document.documentElement.clientWidth / window.innerWidth;

  const customEventState = {
    x: offsetLeft + elemRect.width / 2,
    // if the user is pinch zoomed in, then use the pinch zoom coordinate detection logic,
    // otherwise, use the distance of the icon from the top of the page. For some reason
    // offsetTop doesn't work when the user scrolls down and the zoom ratio == 1 (iOS14)
    y: (deviceZoomRatio > 1 ? offsetTop : elemRect.top) + elemRect.height / 2,
  };

  const darkModeToggleEvent = new CustomEvent("darkModeToggle", { detail: customEventState });
  onClickMethod(isDark);
  storage.setItem("theme", isDark.toString());
  dispatchEvent(darkModeToggleEvent);
};

const DarkModeToggle = ({ isDark, onClickMethod }) => {
 

    return(
  <div  className=" bg-blue-200 p-1 rounded-full w-32 flex justify-between">
          <button
            className={
              `px-4 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${!isDark ? "bg-blue-900 text-white" : "text-blue-900"}`
            }
            onClick={isDark ? ((event) => onClickWrapper(onClickMethod, !isDark, event)) : null}
            >
            Light
          </button>
          <button
            
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-200
              ${isDark  ? "bg-blue-900 text-white" : "text-blue-900"}`}
            onClick={!isDark ? ((event) => onClickWrapper(onClickMethod, isDark, event)) : null}
            >
            Dark
          </button>
        </div>
)}


export default DarkModeToggle;
