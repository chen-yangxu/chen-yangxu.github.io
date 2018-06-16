document.addEventListener('scroll', () => {
  titleScroll();
  fadeUpAndIn();
});

let untouched = true;

document.addEventListener('scroll', () => {
  if (untouched) {
    unHideAll();
  }
});

let counter = 1;
setInterval(() => {
  const displayJobs = [
    '<h1><span class="type-of-developer">web</span><br /><span class="fade-in">developer</span></h1>',
    '<h1><span class="type-of-developer">JavaScript</span><br />developer</h1>',
    '<h1><span class="type-of-developer">full-stack</span><br />developer</h1>',
    '<h1><span class="type-of-developer">ReactJS</span><br />developer</h1>',
    '<h1><span class="type-of-developer">Node.js</span><br />developer</h1>',
    '<h1><span class="type-of-developer">HTML<br />& CSS</span><br /><span class="fade-after-4-secs">developer</span></h1>',
    '<h1><span class="type-of-developer">composer,</span><br /><span class="type-of-developer">violinist</span></h1>'
  ];
  document.getElementsByClassName('job')[0].innerHTML = displayJobs[counter % displayJobs.length];
  counter++;
}, 4000);

function fadeUpAndIn() {
  [...document.getElementsByClassName('fade-up-and-in')].forEach(element => {
    element.currentlyInView = false;
    if (element.getBoundingClientRect().top <= window.innerHeight && !element.currentlyInView) {
      element.classList.add('fade-up-and-in-animation');
      element.currentlyInView = true;
    } else if (element.getBoundingClientRect().top > window.innerHeight + 100 && !element.currentlyInView) {
      element.classList.remove('fade-up-and-in-animation');
      element.currentlyInView = true;
    }
  });
}

function unHideAll() {
  [...document.getElementsByTagName('section')].forEach(element => {
    element.removeAttribute('hidden');
  });
}

[...document.getElementsByClassName('nav-arrow')].forEach(element => {
  element.addEventListener('click', () => {
    untouched = false;
    [...document.getElementsByTagName('section')].forEach(element => {
      element.setAttribute('hidden', true);
    });
    document.getElementsByClassName(element.classList[1])[1].removeAttribute('hidden');
    window.smoothScrollTo(0, 1000, 1500);
  });
});

[...document.getElementsByClassName('content-nav-arrow')].forEach(element => {
  element.addEventListener('click', () => {
    const scrollToElementClass = element.classList[1];
    const scrollToElementLocation = offset(document.getElementsByClassName(scrollToElementClass)[1]).top - window.innerHeight / 15;
    window.smoothScrollTo(0, scrollToElementLocation, 1200);
  });
});

function titleScroll() {
  const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const distanceFromTop = Math.abs(document.getElementsByTagName('header')[0].getBoundingClientRect().top);
  const distanceToScroll = (windowHeight - distanceFromTop) / windowHeight;
  document.getElementsByClassName('logo')[0].style.top = `${(1 - (distanceToScroll / 2)) * 100}%`;
  document.getElementsByClassName('logo')[0].style.opacity = ((distanceToScroll * 2) - 0.5);
}

[...document.getElementsByTagName('img')].forEach(element => {
  element.src = `./assets/images/portfolio/${element.classList[0]}/1.png`;
  let currentImage = 1;
  [...document.getElementsByClassName('arrow')].forEach(element => {
    if (element.classList[1] === 'left-arrow') {
      const imageElement = [...document.getElementsByTagName('img')].filter(imageElement => imageElement.classList[0] === element.classList[2])[0];
      element.addEventListener('click', () => {
        let maxImages = null;
        if (element.classList[2] === 'poco-a-poco') {
          maxImages = 7;
        } else if (element.classList[2] === 'keyboard-warrior') {
          maxImages = 4;
        } else if (element.classList[2] === 'turtle-todo') {
          maxImages = 3;
        } else if (element.classList[2] === 'sino') {
          maxImages = 4;
        }
        if (currentImage === 1) {
          imageElement.src = `./assets/images/portfolio/${element.classList[2]}/${maxImages}.png`;
          currentImage = maxImages;
        } else {
          imageElement.src = `./assets/images/portfolio/${element.classList[2]}/${currentImage - 1}.png`;
          currentImage -= 1;
        }
      });
    } else {
      const imageElement = [...document.getElementsByTagName('img')].filter(imageElement => imageElement.classList[0] === element.classList[2])[0];
      element.addEventListener('click', () => {
        let maxImages = null;
        if (element.classList[2] === 'poco-a-poco') {
          maxImages = 7;
        } else if (element.classList[2] === 'keyboard-warrior') {
          maxImages = 4;
        } else if (element.classList[2] === 'turtle-todo') {
          maxImages = 3;
        } else if (element.classList[2] === 'sino') {
          maxImages = 4;
        }
        if (currentImage >= maxImages) {
          imageElement.src = `./assets/images/portfolio/${element.classList[2]}/1.png`;
          currentImage = 1;
        } else {
          imageElement.src = `./assets/images/portfolio/${element.classList[2]}/${currentImage + 1}.png`;
          currentImage += 1;
        }
      });
    }
  });
});

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

window.smoothScrollTo = function(endX, endY, duration) {
  var startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  var easeInOutQuart = function(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  var timer = window.setInterval(function() {
    var time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      window.clearInterval(timer);
    }
    window.scrollTo(newX, newY);
  }, 1000 / 60);
};
