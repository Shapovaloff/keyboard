const iosChecker = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
};

class ScrollLock {
  constructor() {
    this._iosChecker = iosChecker;
    this._lockClass = this._iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
    this._scrollTop = null;
    this._fixedBlockElements = document.querySelectorAll('[data-fix-block]');
  }

  _getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  _getBodyScrollTop() {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  }

  disableScrolling() {
    this._scrollTop = document.body.dataset.scroll = document.body.dataset.scroll ? document.body.dataset.scroll : this._getBodyScrollTop();
    if (this._getScrollbarWidth()) {
      document.body.style.paddingRight = `${this._getScrollbarWidth()}px`;
      this._fixedBlockElements.forEach((block) => {
        block.style.paddingRight = `${this._getScrollbarWidth()}px`;
      });
    }
    document.body.style.top = `-${this._scrollTop}px`;
    document.body.classList.add(this._lockClass);
  }

  enableScrolling() {
    document.body.classList.remove(this._lockClass);
    window.scrollTo(0, +document.body.dataset.scroll);
    document.body.style.paddingRight = null;
    document.body.style.top = null;
    this._fixedBlockElements.forEach((block) => {
      block.style.paddingRight = null;
    });
    document.body.removeAttribute('data-scroll');
    this._scrollTop = null;
  }
}

window.scrollLock = new ScrollLock();

const scrollbar = new ScrollLock();

scrollbar.disableScrolling();


const heightEl = document.querySelector('.test');
// const fieldEl = document.querySelector('.test__field');
const scrollItem = document.querySelector('.scroll-item');
const fieldEl = document.querySelector('.test__textarea-block textarea');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollItem.textContent = scrollTop;
  // window.scrollTo({top: 0})
});

const preventTouch = (evt) => {
  if (!evt.targetTouches[0].target.closest('.test__textarea-block textarea')) {
    evt.preventDefault();
  }
  evt.preventDefault();
};
// window.addEventListener('touchend', () => {window.scrollTo({top: 0})}, {passive: false});
// window.addEventListener('touchmove', preventTouch, {passive: false});

fieldEl.addEventListener('focus', () => setTimeout(() => window.scrollTo({top: 0}), 100))

window.visualViewport.addEventListener('resize', () => {
  heightEl.style.height = `${window.visualViewport.height}px`;
  const block = document.createElement('div');
  block.classList.add('test-tippy');
  block.textContent = window.visualViewport.height;
  // scrollbar.enableScrolling();
  // console.log(window.visualViewport.height)
  // modal.style.height = `${window.visualViewport.height}px`;
  setTimeout(() => {
    // document.documentElement.style.minHeight = `${window.visualViewport.height}px`;
    // document.documentElement.style.height = `${window.visualViewport.height}px`;
    // document.documentElement.style.maxHeight = `${window.visualViewport.height}px`;
    // document.body.style.minHeight = `${window.visualViewport.height}px`;
    // document.body.style.height = `${window.visualViewport.height}px`;
    // document.body.style.maxHeight = `${window.visualViewport.height}px`;
    // document.body.style.maxHeight = `${window.visualViewport.height}px`;
    // document.body.style.top = `-${window.visualViewport.height}px`;
    // document.body.style.pointerEvents = 'none';
    // heightEl.style.transform = `translateY(-200px)`;
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }, 500)



  // document.documentElement.style.setProperty('--app-height', `${window.visualViewport.height}px`);

  // modal.style.overflow = 'hidden';
  document.body.insertAdjacentElement('beforeend', block);
  // scrollbar.disableScrolling();
  setTimeout(() => block.remove(), 4000);
})
