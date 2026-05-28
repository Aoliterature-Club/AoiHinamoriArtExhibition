// Simple parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('section img');
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
const calculatorOpenButton = document.getElementById('calculator-open');
const calculatorCloseButton = document.getElementById('calculator-modal-close');

function withOrigin(src) {
    const videoUrl = new URL(src);
    if (window.location.origin.startsWith('http')) {
        videoUrl.searchParams.set('origin', window.location.origin);
    }
    return videoUrl.toString();
}

function openPvModal() {
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

    pvPlayer.src = withOrigin(pvPlayer.dataset.src);
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

pvOpenButton?.addEventListener('click', openPvModal);
pvNavOpenButton?.addEventListener('click', (event) => {
    event.preventDefault();
    openPvModal();
});
pvCloseButton?.addEventListener('click', closePvModal);
pvSoundToggle?.addEventListener('click', enablePvSound);
transportCloseButton?.addEventListener('click', closeTransportModal);
transportOpenButton?.addEventListener('click', openTransportModal);
calculatorOpenButton?.addEventListener('click', openCalculatorModal);
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
    }
});

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-inline-pv="true"]').forEach((player) => {
        player.src = withOrigin(player.dataset.src);
    });
    window.setTimeout(openPvModal, 500);
});
