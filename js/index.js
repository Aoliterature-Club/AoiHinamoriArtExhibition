// Simple parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-backdrop-image');
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }
});

// Intersection Observer for scroll reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section > div').forEach((div) => {
    div.style.opacity = '0';
    observer.observe(div);
});

const pvModal = document.getElementById('pv-modal');
const pvPlayer = document.getElementById('pv-player');
const pvFrameWrap = document.getElementById('pv-frame-wrap');
const pvLocalWarning = document.getElementById('pv-local-warning');
const pvOpenButton = document.getElementById('pv-open');
const pvNavOpenButton = document.getElementById('pv-nav-open');
const pvCloseButton = document.getElementById('pv-modal-close');
const pvSoundToggle = document.getElementById('pv-sound-toggle');
const transportModal = document.getElementById('transport-modal');
const transportCloseButton = document.getElementById('transport-modal-close');
const transportOpenButton = document.getElementById('transport-open');
const calculatorModal = document.getElementById('calculator-modal');
const calculatorFrame = document.getElementById('calculator-frame');
const calculatorTriggers = document.querySelectorAll('.calculator-trigger');
const calculatorCloseButton = document.getElementById('calculator-modal-close');
const imageModal = document.getElementById('image-modal');
const imageModalMedia = document.querySelector('.image-modal-media');
const imageModalContent = document.getElementById('image-modal-content');
const imageModalImageStage = document.querySelector('.image-modal-image-stage');
const imageModalTitle = document.getElementById('image-modal-title');
const imageModalText = document.getElementById('image-modal-text');
const imageModalLink = document.getElementById('image-modal-link');
const imageModalCloseButton = document.getElementById('image-modal-close');
const imageModalZoomInButton = document.getElementById('image-modal-zoom-in');
const imageModalZoomOutButton = document.getElementById('image-modal-zoom-out');
const imageModalZoomResetButton = document.getElementById('image-modal-zoom-reset');
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
let imageModalZoom = 1;
let isImageModalPanning = false;
let imageModalPanStartX = 0;
let imageModalPanStartY = 0;
let imageModalPanScrollLeft = 0;
let imageModalPanScrollTop = 0;

function withOrigin(src) {
    const videoUrl = new URL(src);
    if (window.location.origin.startsWith('http')) {
        videoUrl.searchParams.set('origin', window.location.origin);
    }
    return videoUrl.toString();
}

function openPvModal(isUserClick = false) {
    if (!pvModal || !pvPlayer) return;

    if (window.location.protocol === 'file:') {
        pvFrameWrap?.classList.add('hidden');
        pvLocalWarning?.classList.remove('hidden');
        pvModal.classList.add('is-open');
        pvModal.setAttribute('aria-hidden', 'false');
        return;
    }

    pvFrameWrap?.classList.remove('hidden');
    pvLocalWarning?.classList.add('hidden');

    let videoUrl = withOrigin(pvPlayer.dataset.src);
    if (isUserClick) {
        videoUrl = videoUrl.replace('mute=1', 'mute=0');
        pvSoundToggle?.classList.add('hidden');
    } else {
        pvSoundToggle?.classList.remove('hidden');
    }

    pvPlayer.src = videoUrl;
    pvModal.classList.add('is-open');
    pvModal.setAttribute('aria-hidden', 'false');
}

function closePvModal() {
    if (!pvModal || !pvPlayer) return;

    pvModal.classList.remove('is-open');
    pvModal.setAttribute('aria-hidden', 'true');
    pvPlayer.src = '';
    pvSoundToggle?.classList.remove('hidden');
}

function enablePvSound() {
    if (!pvPlayer?.contentWindow) return;

    pvPlayer.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'unMute',
        args: [],
    }), '*');
    pvPlayer.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'setVolume',
        args: [100],
    }), '*');
    pvPlayer.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: [],
    }), '*');
    pvSoundToggle?.classList.add('hidden');
}

function openTransportModal() {
    if (!transportModal) return;

    transportModal.classList.add('is-open');
    transportModal.setAttribute('aria-hidden', 'false');
}

function closeTransportModal() {
    if (!transportModal) return;

    transportModal.classList.remove('is-open');
    transportModal.setAttribute('aria-hidden', 'true');
}

function openCalculatorModal(event) {
    event?.preventDefault();
    if (!calculatorModal || !calculatorFrame) return;

    const targetSrc = calculatorFrame.dataset.src || 'goods-calculator.html';
    if (calculatorFrame.getAttribute('src') !== targetSrc) {
        calculatorFrame.setAttribute('src', targetSrc);
    }
    calculatorModal.classList.add('is-open');
    calculatorModal.setAttribute('aria-hidden', 'false');
}

function closeCalculatorModal() {
    if (!calculatorModal) return;

    calculatorModal.classList.remove('is-open');
    calculatorModal.setAttribute('aria-hidden', 'true');
}

function setModalText(element, value) {
    if (!element) return;

    if (value) {
        const normalizedText = value
            .replace(/\\n/g, '\n')
            .replace(/<br\s*\/?>/gi, '\n');

        element.textContent = '';
        normalizedText.split(/\r?\n/).forEach((line, index) => {
            if (index > 0) {
                element.appendChild(document.createElement('br'));
            }
            element.appendChild(document.createTextNode(line));
        });
        element.classList.remove('hidden');
    } else {
        element.textContent = '';
        element.classList.add('hidden');
    }
}

function openImageModal(src, title, description, link) {
    if (!imageModal || !imageModalContent) return;
    imageModalContent.style.width = '';
    imageModalContent.style.height = '';
    imageModalImageStage?.style.removeProperty('width');
    imageModalImageStage?.style.removeProperty('height');

    setModalText(imageModalTitle, title);
    setModalText(imageModalText, description);

    if (imageModalLink) {
        if (link) {
            imageModalLink.href = link;
            imageModalLink.classList.remove('hidden');
            imageModalLink.classList.add('flex');
        } else {
            imageModalLink.classList.add('hidden');
            imageModalLink.classList.remove('flex');
        }
    }

    imageModal.classList.add('is-open');
    imageModal.setAttribute('aria-hidden', 'false');
    imageModalContent.onload = () => requestAnimationFrame(() => setImageModalZoom(1));
    imageModalContent.src = src;
    if (imageModalContent.complete) {
        requestAnimationFrame(() => setImageModalZoom(1));
    }
}

function closeImageModal() {
    if (!imageModal) return;
    imageModal.classList.remove('is-open');
    imageModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => { imageModalContent.src = ''; }, 300); // Clear after transition
}

function setImageModalZoom(nextZoom) {
    if (!imageModalContent || !imageModalMedia) return;

    imageModalZoom = Math.min(2.5, Math.max(0.75, nextZoom));
    const naturalWidth = imageModalContent.naturalWidth;
    const naturalHeight = imageModalContent.naturalHeight;

    if (naturalWidth && naturalHeight) {
        const fitScale = Math.min(
            imageModalMedia.clientWidth / naturalWidth,
            imageModalMedia.clientHeight / naturalHeight
        );
        const imageWidth = Math.round(naturalWidth * fitScale * imageModalZoom);
        const imageHeight = Math.round(naturalHeight * fitScale * imageModalZoom);

        imageModalContent.style.width = `${imageWidth}px`;
        imageModalContent.style.height = `${imageHeight}px`;
        imageModalImageStage?.style.setProperty('width', `${Math.max(imageWidth, imageModalMedia.clientWidth)}px`);
        imageModalImageStage?.style.setProperty('height', `${Math.max(imageHeight, imageModalMedia.clientHeight)}px`);
    }

    const isMinZoom = imageModalZoom <= 0.75;
    const isMaxZoom = imageModalZoom >= 2.5;
    imageModalZoomOutButton?.toggleAttribute('disabled', isMinZoom);
    imageModalZoomInButton?.toggleAttribute('disabled', isMaxZoom);

    requestAnimationFrame(() => {
        imageModalMedia.scrollLeft = (imageModalMedia.scrollWidth - imageModalMedia.clientWidth) / 2;
        imageModalMedia.scrollTop = (imageModalMedia.scrollHeight - imageModalMedia.clientHeight) / 2;
    });
}

pvOpenButton?.addEventListener('click', () => openPvModal(true));
pvNavOpenButton?.addEventListener('click', (e) => {
    e.preventDefault();
    openPvModal(true);
});
pvCloseButton?.addEventListener('click', closePvModal);
pvSoundToggle?.addEventListener('click', enablePvSound);
transportCloseButton?.addEventListener('click', closeTransportModal);
transportOpenButton?.addEventListener('click', openTransportModal);
calculatorTriggers.forEach(btn => btn.addEventListener('click', openCalculatorModal));
calculatorCloseButton?.addEventListener('click', closeCalculatorModal);
transportModal?.addEventListener('click', (event) => {
    if (event.target === transportModal) {
        closeTransportModal();
    }
});
calculatorModal?.addEventListener('click', (event) => {
    if (event.target === calculatorModal) {
        closeCalculatorModal();
    }
});
lightboxTriggers.forEach(img => {
    img.addEventListener('click', () => {
        openImageModal(img.src, img.dataset.title, img.dataset.description, img.dataset.link);
    });
});
imageModalCloseButton?.addEventListener('click', closeImageModal);
imageModalZoomInButton?.addEventListener('click', () => setImageModalZoom(imageModalZoom + 0.25));
imageModalZoomOutButton?.addEventListener('click', () => setImageModalZoom(imageModalZoom - 0.25));
imageModalZoomResetButton?.addEventListener('click', () => setImageModalZoom(1));
imageModalMedia?.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || event.target.closest('.image-modal-zoom-button')) return;

    isImageModalPanning = true;
    imageModalPanStartX = event.clientX;
    imageModalPanStartY = event.clientY;
    imageModalPanScrollLeft = imageModalMedia.scrollLeft;
    imageModalPanScrollTop = imageModalMedia.scrollTop;
    imageModalMedia.classList.add('is-dragging');
    imageModalMedia.setPointerCapture(event.pointerId);
    event.preventDefault();
});
imageModalMedia?.addEventListener('pointermove', (event) => {
    if (!isImageModalPanning) return;

    imageModalMedia.scrollLeft = imageModalPanScrollLeft - (event.clientX - imageModalPanStartX);
    imageModalMedia.scrollTop = imageModalPanScrollTop - (event.clientY - imageModalPanStartY);
});
imageModalMedia?.addEventListener('pointerup', (event) => {
    isImageModalPanning = false;
    imageModalMedia.classList.remove('is-dragging');
    imageModalMedia.releasePointerCapture(event.pointerId);
});
imageModalMedia?.addEventListener('pointercancel', () => {
    isImageModalPanning = false;
    imageModalMedia.classList.remove('is-dragging');
});
imageModal?.addEventListener('click', (event) => {
    if (event.target === imageModal) {
        closeImageModal();
    }
});
pvModal?.addEventListener('click', (event) => {
    if (event.target === pvModal) {
        closePvModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePvModal();
        closeTransportModal();
        closeCalculatorModal();
        closeImageModal();
    }
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    setTimeout(() => {
        mobileMenu.classList.add('is-visible');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-visible');
    setTimeout(() => {
        mobileMenu.classList.remove('is-open');
    }, 300);
    document.body.style.overflow = '';
}

mobileMenuBtn?.addEventListener('click', openMobileMenu);
mobileMenuCloseBtn?.addEventListener('click', closeMobileMenu);
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Scroll Spy for Navigation Links
const navLinks = document.querySelectorAll('.desktop-nav-link, .mobile-nav-link');
const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.remove('text-on-surface-variant', 'hover:text-secondary');
                    link.classList.add('text-secondary', 'hover:text-primary');
                } else {
                    link.classList.remove('text-secondary', 'hover:text-primary');
                    link.classList.add('text-on-surface-variant', 'hover:text-secondary');
                }
            });
        }
    });
}, { rootMargin: '-30% 0px -30% 0px' });

document.querySelectorAll('section[id]').forEach(sec => spyObserver.observe(sec));

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-inline-pv="true"]').forEach((player) => {
        player.src = withOrigin(player.dataset.src);
    });
    window.setTimeout(() => openPvModal(false), 500);
});
