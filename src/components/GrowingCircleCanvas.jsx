import React, { useEffect, useRef } from "react";
import { debounce, throttle } from "../utils/Limitors.js";

const COLORS = {
  white: "#FFF",
  midnightBlack: "#09090b",
};
let pageload = false
const RADIUS_GROWTH_PER_MS = 0.02;
const GROWTH_FUNCTION_EXPONENTIAL = 2.9;
const PIXEL_SCALING_FACTOR = 0.5;

const circleCenterCoordinates = {
  x: null,
  y: null,

  resetMouseState: () => {
    circleCenterCoordinates.x = null;
    circleCenterCoordinates.y = null;
  },
};

// circle animation state machine
const m = {
  ctx: null,
  isDark: null,
  radiusMultiplier: null,
  maxRadiusMultiplier: null,
  timeAtPreviousDraw: null,
  height: null,
  width: null,
  loaded: false,

  createMachine: (ctx, isDark) => {
    m.ctx = ctx;
    m.isDark = isDark;
    m.height = Math.max(window.screen.height, window.innerHeight);
    m.width = Math.max(window.screen.width, window.innerWidth);
    m.maxRadiusMultiplier = Math.max(m.width, m.height) ** (1.0 / GROWTH_FUNCTION_EXPONENTIAL);
    m.timeAtPreviousDraw = Date.now();

    // Set initial background color opposite of what we want to show
    document.body.style.backgroundColor = m.isDark ? COLORS.white : COLORS.midnightBlack;

    // adjust canvas pixel ratio
    const { width, height } = m.ctx.canvas.getBoundingClientRect();
    if (m.ctx.canvas.width !== width || m.ctx.canvas.height !== height) {
      const { devicePixelRatio: originalRatio = 1 } = window;
      const lowerResolutionRatio = originalRatio * PIXEL_SCALING_FACTOR;
      m.ctx.canvas.width = width * lowerResolutionRatio;
      m.ctx.canvas.height = height * lowerResolutionRatio;
      m.ctx.scale(lowerResolutionRatio, lowerResolutionRatio);
    }

   

      if(!m.loaded){
        m.radiusMultiplier = m.maxRadiusMultiplier
      }else{
        m.radiusMultiplier = 0
      }
      
    

    return m.start ;
  },

  
  start: () => m.growCircle, // Always grow, regardless of mode

  growCircle: () => {
    m.radiusMultiplier += RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw);
    return m.verifyCircleBounds;
  },
  
  verifyCircleBounds: () => {
    if (m.radiusMultiplier >= m.maxRadiusMultiplier) {
      // Fill canvas with the final color when animation completes
      m.ctx.fillStyle = m.isDark ? COLORS.midnightBlack : COLORS.white;
      m.ctx.fillRect(0, 0, m.width, m.height);
      return null; // Animation complete
    }

    // clear canvas before drawing the next circle
    m.ctx.clearRect(0, 0, m.width, m.height);
    return m.drawCircle;
  },
  
  drawCircle: () => {
    // Use the appropriate color based on mode
    m.ctx.fillStyle = m.isDark ? COLORS.midnightBlack : COLORS.white;
    m.ctx.beginPath();
    m.ctx.arc(
      circleCenterCoordinates.x,
      circleCenterCoordinates.y,
      m.radiusMultiplier ** GROWTH_FUNCTION_EXPONENTIAL,
      0,
      2 * Math.PI
    );
    m.ctx.fill();

    m.timeAtPreviousDraw = Date.now();

    return new Promise((rtn) => {
      const returnAfterAnimating = () => {
        rtn(m.start);
      };
      window.requestAnimationFrame(returnAfterAnimating);
    });
  },
};

const GrowingCircleAnimation = ({ isDark, isLoad }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    m.loaded = isLoad
    let stateMachine =  m.createMachine(ctx, isDark) 
    let isStateMachinePowered = true;

    const stateMachineRunner = () => {
      if (stateMachine !== null && isStateMachinePowered) {
        if (stateMachine instanceof Function) {
          stateMachine = stateMachine();
          stateMachineRunner();
        } else {
          stateMachine.then((val) => {
            stateMachine = val();
            stateMachineRunner();
          });
        }
      }
    };

    
       stateMachineRunner();
    

    const handleClick = (event) => {
      circleCenterCoordinates.x = event.detail.x;
      circleCenterCoordinates.y = event.detail.y;
      // Restart the animation with current isDark value
      stateMachine = m.createMachine(ctx, isDark);
      stateMachineRunner();
    };

    const handleResize = () => {
      m.loaded = false
      circleCenterCoordinates.resetMouseState();
      stateMachine = m.createMachine(ctx, isDark);
      stateMachineRunner();
    };

    window.addEventListener("darkModeToggle", handleClick);
    window.addEventListener("resize", throttle(debounce(handleResize)), false);
    return () => {
      isStateMachinePowered = false;
      window.removeEventListener("darkModeToggle", handleClick);
      window.removeEventListener("resize", throttle(debounce(handleResize)), false);
    };
  }, [isDark]);

  return   <canvas className="w-screen h-screen fixed -z-10" ref={canvasRef} />;
};

export default GrowingCircleAnimation;