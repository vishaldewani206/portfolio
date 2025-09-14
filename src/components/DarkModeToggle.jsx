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
  return (
    <div className="relative bg-blue-200 p-1 rounded-full w-32 flex justify-between transition-all">
      {/* Sliding background */}
      <div
        className={`absolute top-1 left-1.5 w-14 h-7 rounded-full bg-primary transition-transform duration-300 ${
          isDark ? "translate-x-16" : "translate-x-0"
        }`}
      ></div>

      <button
        className={`relative z-10 px-4 py-1 rounded-full text-sm font-semibold ${
          !isDark ? "text-white" : "text-primary"
        }`}
        onClick={() => onClickMethod(false)}
      >
        Light
      </button>
      <button
        className={`relative z-10 px-4 py-1 rounded-full text-sm font-semibold ${
          isDark ? "text-white" : "text-primary"
        }`}
        onClick={() => onClickMethod(true)}
      >
        Dark
      </button>
    </div>
  );
};


export default DarkModeToggle;
