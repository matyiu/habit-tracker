import anime from 'animejs/lib/anime.es';

function slideToggle(elm, ms) {
    if (elm.style.display == 'none') {
        elm.style.height = 0;
    }
    elm.style.display = 'block';
    const currHeight = elm.offsetHeight;
    const targetHeight = currHeight > 0 ? 0 
    : elm.scrollHeight + elm.clientTop * 2 ;

    anime({
        targets: elm,
        height: targetHeight + 'px',
        easing: 'easeOutCubic',
        duration: ms
    }).finished.then(() => {
        elm.style.display = targetHeight === 0 ? 'none': '';
        elm.style.height = '';
    });
}

export { slideToggle };