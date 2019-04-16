import Vue from 'vue';
/* eslint-disable */
let exportObj = {};

if (!Vue.prototype.$isServer) {
  const docStyle = document.documentElement.style;
  let engine;
  let translate3d = false;

  if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }

  const cssPrefix = {
    trident: '-ms-',
    gecko: '-moz-',
    webkit: '-webkit-',
    presto: '-o-',
  }[engine];

  const vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O',
  }[engine];

  const helperElem = document.createElement('div');
  const perspectiveProperty = `${vendorPrefix}Perspective`;
  const transformProperty = `${vendorPrefix}Transform`;
  const transformStyleName = `${cssPrefix}transform`;
  const transitionProperty = `${vendorPrefix}Transition`;
  const transitionStyleName = `${cssPrefix}transition`;
  const transitionEndProperty = `${vendorPrefix.toLowerCase()}TransitionEnd`;

  if (helperElem.style[perspectiveProperty] !== undefined) {
    translate3d = true;
  }

  const getTranslate = function(element) {
    const result = { left: 0, top: 0 };
    if (element === null || element.style === null) return result;

    const transform = element.style[transformProperty];
    const matches = /translate\(\s*(-?\d+(\.?\d+?)?)em,\s*(-?\d+(\.\d+)?)em\)\s*translateZ\(0em\)/gi.exec(
      transform,
    );
    if (matches) {
      result.left = +matches[1];
      result.top = +matches[3];
    }

    return result;
  };
  const cancelTranslateElement = function(element) {
    if (element === null || element.style === null) return;
    let transformValue = element.style[transformProperty];
    if (transformValue) {
      transformValue = transformValue.replace(
        /translate\(\s*(-?\d+(\.?\d+?)?)em,\s*(-?\d+(\.\d+)?)em\)\s*translateZ\(0em\)/g,
        '',
      );
      element.style[transformProperty] = transformValue;
    }
  };
  const translateElement = function(element, x, y) {
    if (x === null && y === null) return;

    if (element === null || element === undefined || element.style === null) return;

    if (!element.style[transformProperty] && x === 0 && y === 0) return;

    if (x === null || y === null) {
      const translate = getTranslate(element);
      if (x === null) {
        x = translate.left;
      }
      if (y === null) {
        y = translate.top;
      }
    }

    cancelTranslateElement(element);

    if (translate3d) {
      element.style[transformProperty] += ` translate(${x ? `${x}em` : '0em'},${
        y ? `${y}em` : '0em'
      }) translateZ(0em)`;
    } else {
      element.style[transformProperty] += ` translate(${x ? `${x}em` : '0em'},${
        y ? `${y}em` : '0em'
      })`;
    }
  };

  exportObj = {
    transformProperty,
    transformStyleName,
    transitionProperty,
    transitionStyleName,
    transitionEndProperty,
    getElementTranslate: getTranslate,
    translateElement,
    cancelTranslateElement,
  };
}

export default exportObj;
