// Navbar hide on scroll down, show on scroll up
(function initNavbarScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const SCROLL_THRESHOLD = 10;
    const TOP_THRESHOLD = 80;
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        if (scrollY < TOP_THRESHOLD) {
            header.classList.remove('header-hidden');
            header.classList.remove('is-scrolled');
        } else {
            header.classList.add('is-scrolled');
            if (scrollY > lastScrollY && scrollY - lastScrollY > SCROLL_THRESHOLD) {
                header.classList.add('header-hidden');
            } else if (lastScrollY > scrollY && lastScrollY - scrollY > SCROLL_THRESHOLD) {
                header.classList.remove('header-hidden');
            }
        }
        lastScrollY = scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();

// Theme switcher (persisted)
(function initTheme() {
    const select = document.getElementById('themeSelect');
    if (!select) return;

    const themes = ['theme-indigo', 'theme-teal', 'theme-emerald'];

    function applyTheme(theme) {
        document.body.classList.remove(...themes);
        if (themes.includes(theme) && theme !== 'theme-indigo') {
            document.body.classList.add(theme);
        }
        select.value = theme;
    }

    const saved = localStorage.getItem('portfolioTheme') || 'theme-indigo';
    applyTheme(saved);

    select.addEventListener('change', function() {
        const theme = select.value;
        localStorage.setItem('portfolioTheme', theme);
        applyTheme(theme);
    });
})();

// Scroll sections active link
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// Show scroll up button
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

// Smooth scroll for navigation links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to top functionality
document.getElementById('scroll-up').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for home buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Smooth scroll for home scroll indicator
document.querySelector('.home__scroll').addEventListener('click', function(e) {
    e.preventDefault();
    const targetSection = document.getElementById('about');
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});
/* ================= NAVBAR HIDE/SHOW ON SCROLL ================= */

/* ===== PROFESSIONAL NAVBAR HIDE/SHOW ===== */

document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("header");

    let lastScroll = 0;

    window.addEventListener("scroll", function () {

        const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScroll && currentScroll > 100) {

            header.style.transform = "translateY(-100%)";

        }
        else {

            header.style.transform = "translateY(0)";

        }

        lastScroll = currentScroll;

    });

});



// Contact form validation (no backend)
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    const nameError = document.getElementById('contactNameError');
    const emailError = document.getElementById('contactEmailError');
    const messageError = document.getElementById('contactMessageError');
    const notice = document.getElementById('contactFormNotice');

    function setNotice(type, text) {
        notice.className = 'form__notice';
        notice.textContent = '';
        if (!text) return;

        notice.classList.add(type === 'success' ? 'is-success' : 'is-error');
        notice.textContent = text;
    }

    function validateName(value) {
        const v = value.trim();
        if (v.length < 2) return 'Please enter your name.';
        return '';
    }

    function validateEmail(value) {
        const v = value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(v)) return 'Please enter a valid email address.';
        return '';
    }

    function validateMessage(value) {
        const v = value.trim();
        if (v.length < 10) return 'Message should be at least 10 characters.';
        return '';
    }

    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        setNotice('', '');
    }

    function runValidation() {
        const nameMsg = validateName(nameInput.value);
        const emailMsg = validateEmail(emailInput.value);
        const messageMsg = validateMessage(messageInput.value);

        nameError.textContent = nameMsg;
        emailError.textContent = emailMsg;
        messageError.textContent = messageMsg;

        return !(nameMsg || emailMsg || messageMsg);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        const ok = runValidation();
        if (!ok) {
            setNotice('error', 'Please fix the highlighted fields and try again.');
            return;
        }

        setNotice('success', 'Thanks! Your message is ready to send. I’ll get back to you soon.');
        form.reset();
    });

    [nameInput, emailInput, messageInput].forEach(el => {
        el.addEventListener('blur', runValidation);
        el.addEventListener('input', function() {
            // keep it quiet while typing; remove message once they start fixing it
            setNotice('', '');
        });
    });
})();

