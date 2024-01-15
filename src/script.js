let mode = document.querySelector('.mode');

//change slides numbers according to screen size
window.addEventListener('load', () => {
  if (window.innerWidth <= 786) {
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      mousewheel: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth <= 786) {
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
});

//toggle dark/light mode
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
  mode.src = 'src/images/night-mode.png';
}

function changeMode(e) {
  let source = e.src.lastIndexOf('/');
  let src = e.src.slice(source, e.src.length);
  console.log(src);
  if (src == '/brightness.png') {
    e.src = 'src/images/night-mode.png';
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  } else {
    e.src = 'src/images/brightness.png';
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  }
}
const myText = new SplitType('#heading');
gsap.from('#head', {
  rotate: 5,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: 'linear',
  transformOrigin: 'center',
});
gsap.from('#right-hand', {
  rotate: 2,
  duration: 1,
  delay: 0.2,
  repeat: -1,
  yoyo: true,
  ease: 'linear',
  transformOrigin: 'center',
});
gsap.from('#left-leg', {
  rotate: 2,
  duration: 1,
  delay: 0.4,
  repeat: -1,
  yoyo: true,
  ease: 'linear',
  transformOrigin: 'center',
});
gsap.from(['#left-eye', '#right-eye'], {
  scaleY: 0.5,
  duration: 1,
  delay: 1,
  repeat: -1,
  yoyo: true,
  ease: 'linear',
  transformOrigin: 'center',
});

//GSAP ANIMATIONS
var tl = gsap.timeline();
tl.fromTo(
  '.mainImg',
  {
    opacity: 0,
    scale: 1.4,
    duration: 2,
  },
  {
    opacity: 1,
    scale: 1,
  }
)
  .from('.char', {
    opacity: 0,
    stagger: 0.05,
    delay: 0.2,
    // scale: 1.3,
    y: 100,
  })
  .from('.title', {
    opacity: 0,
    y: -30,
  })
  .from(['.btn1', '.btn2'], {
    opacity: 0,
    y: -30,
  });

gsap.from('.second-heading', {
  scrollTrigger: {
    trigger: '.second-heading',
    scroller: 'body',
    // markers: true,
    start: 'top 70%',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  duration: 0.5,
});
gsap.from('.btn3', {
  scrollTrigger: {
    trigger: '.second-heading',
    scroller: 'body',
    // markers: true,
    start: 'top 70%',
    end: 'bottom 100%',
    // delay: 0.5,
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  delay: 0.2,
  duration: 0.5,
});

gsap.from('.about', {
  scrollTrigger: {
    trigger: '.about',
    scroller: 'body',
    // markers: true,
    start: 'top 70%',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  delay: 0.2,
  duration: 0.5,
});

gsap.from('.paragraph', {
  scrollTrigger: {
    trigger: '.about',
    scroller: 'body',
    // markers: true,
    start: 'top 70%',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  delay: 0.5,
  duration: 0.5,
});

gsap.from('.img', {
  scrollTrigger: {
    trigger: '.about',
    scroller: 'body',
    // markers: true,
    start: 'top 70%',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  scale: 1.3,

  duration: 0.5,
});

gsap.from('.third-heading', {
  scrollTrigger: {
    trigger: '.third-heading',
    scroller: 'body',
    // markers: true,
    start: 'top center',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  // delay: 0.5,
  duration: 0.5,
});

gsap.from('.box', {
  scrollTrigger: {
    trigger: '.third-heading',
    scroller: 'body',
    // markers: true,
    start: 'top center',
    end: 'bottom 100%',
  },
  y: 150,
  opacity: 0,
  stagger: {
    // wrap advanced options in an object
    each: 0.2,
    from: 'left',
    grid: 'auto',
    ease: 'power2.inOut',
    // repeat: -1, // Repeats immediately, not waiting for the other staggered animations to finish
  },
  // scale: 1.3,
  // delay: 0.5,
  duration: 0.5,
});

gsap.from('.forth-heading', {
  scrollTrigger: {
    trigger: '.forth-heading',
    scroller: 'body',
    // markers: true,
    start: 'top center',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  delay: 0.3,
  duration: 0.5,
});

gsap.from('.project', {
  scrollTrigger: {
    trigger: '.forth-heading',
    scroller: 'body',
    // markers: true,
    start: 'top center',
    end: 'bottom 100%',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  delay: 0.5,
  duration: 0.5,
});

gsap.from('.fifth-heading', {
  scrollTrigger: {
    trigger: '.project',
    scroller: 'body',
    // markers: true,
    // start: '-350% 70% ',
    // end: '-300% bottom',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  // delay: 0.5,
  duration: 0.7,
});

gsap.from('.contact', {
  scrollTrigger: {
    trigger: '.project',
    scroller: 'body',
    // markers: true,
    // start: 'top 80%',
    // end: 'bottom ',
  },
  opacity: 0,
  y: -30,
  // scale: 1.3,
  delay: 0.5,
  duration: 0.5,
});
