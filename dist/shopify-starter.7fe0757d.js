window.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.js-toggle-button');
    const carousel = document.querySelector('.js-carousel-element');
    const scrollbarTrack = document.querySelector('.js-scrollbar-track');
    const scrollbarThumb = document.querySelector('.js-scrollbar-thumb');
    let isDragging = false;
    let startX = 0;
    let startTransformX = 0;
    let startReverse = false;
    if (!carousel || !scrollbarTrack || !scrollbarThumb || !(carousel instanceof HTMLElement) || !(scrollbarThumb instanceof HTMLElement)) return;
    const updateThumbPosition = ()=>{
        const scrollRatio = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
        const trackWidth = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
        const x = scrollRatio * trackWidth;
        scrollbarThumb.style.transform = `translateX(${x}px)`;
    };
    const resizeScrollbar = ()=>{
        const visibleWidth = carousel.clientWidth;
        const totalWidth = carousel.scrollWidth;
        const scrollbarThumbWidth = visibleWidth / totalWidth * 100;
        scrollbarThumb.style.width = scrollbarThumbWidth + '%';
        updateThumbPosition();
    };
    const startDrag = (e)=>{
        isDragging = true;
        if (!e.target || !(e.target instanceof HTMLElement)) return;
        startReverse = !e.target.classList.contains('js-scrollbar-thumb');
        startX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
        const currentTransform = scrollbarThumb.style.transform.match(/translateX\((.*)px\)/);
        startTransformX = currentTransform ? parseFloat(currentTransform[1]) : 0;
        document.body.classList.add('no-select');
    };
    const onDrag = (e)=>{
        if (!isDragging) return;
        e.preventDefault();
        const x = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
        const dx = x - startX;
        const trackWidth = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
        let newTransformX = startTransformX + dx;
        newTransformX = Math.max(0, Math.min(trackWidth, newTransformX));
        scrollbarThumb.style.transform = `translateX(${newTransformX}px)`;
        const scrollRatio = newTransformX / trackWidth;
        const scrollX = scrollRatio * (carousel.scrollWidth - carousel.clientWidth);
        carousel.style.transform = `translateX(-${scrollX}px)`;
    };
    const stopDrag = ()=>{
        isDragging = false;
        document.body.classList.remove('no-select');
    };
    scrollbarThumb.addEventListener('mousedown', startDrag);
    scrollbarThumb.addEventListener('touchstart', startDrag);
    window.addEventListener('mousemove', onDrag, {
        passive: false
    });
    window.addEventListener('touchmove', onDrag, {
        passive: false
    });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('resize', resizeScrollbar);
    resizeScrollbar();
    if (!toggleButton || !carousel) return;
    let isExpanded = false;
    toggleButton.addEventListener('click', function() {
        isExpanded = !isExpanded;
        if (isExpanded) {
            carousel.classList.remove('grid-rows-[1fr_1fr_0fr_0fr_0fr]');
            carousel.classList.add('grid-rows-[1fr_1fr_1fr_1fr_1fr]');
            toggleButton.textContent = 'Show Less';
        } else {
            carousel.classList.add('grid-rows-[1fr_1fr_0fr_0fr_0fr]');
            carousel.classList.remove('grid-rows-[1fr_1fr_1fr_1fr_1fr]');
            toggleButton.textContent = 'Show More';
        }
    });
});

//# sourceMappingURL=shopify-starter.7fe0757d.js.map
