let activeSection = 'home';
let darkMode = false;
let mobileMenuOpen = false;

function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
        document.documentElement.classList.add('dark');
        document.getElementById('sun-icon').classList.remove('hidden');
        document.getElementById('moon-icon').classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('sun-icon').classList.add('hidden');
        document.getElementById('moon-icon').classList.remove('hidden');
    }
}

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuOpen) {
        menu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

function updateActiveSection() {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
    const scrollPosition = window.scrollY + 150;

    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (activeSection !== sectionId) {
                    activeSection = sectionId;
                    updateNavLinks();
                }
                break;
            }
        }
    }
}

function updateNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === activeSection) {
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
            link.classList.add('text-blue-600', 'dark:text-blue-400');
        } else {
            link.classList.remove('text-blue-600', 'dark:text-blue-400');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
        }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === activeSection) {
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-blue-900/30');
        } else {
            link.classList.remove('text-blue-600', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-blue-900/30');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
        }
    });
}

function copyEmail() {
    const email = 'miguel.orrego.nl@gmail.com';
    const btn = document.getElementById('copy-email-btn');
    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');
    const copyText = document.getElementById('copy-text');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showCopiedState();
        }).catch(() => {
            fallbackCopyEmail(email);
        });
    } else {
        fallbackCopyEmail(email);
    }

    function showCopiedState() {
        btn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'active:bg-blue-800');
        btn.classList.add('bg-green-600');
        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');
        copyText.textContent = 'Copied!';

        setTimeout(() => {
            btn.classList.remove('bg-green-600');
            btn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'active:bg-blue-800');
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            copyText.textContent = 'Copy Email';
        }, 2000);
    }

    function fallbackCopyEmail(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showCopiedState();
        } catch (err) {
            console.error('Failed to copy email');
        }

        document.body.removeChild(textarea);
    }
}

function openModal() {
    document.getElementById('download-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('download-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = 'M.Orrego%20-%20CV.pdf';
    link.download = 'Miguel-Orrego-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeModal();
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', () => {
    updateActiveSection();
    updateNavLinks();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('download-modal').classList.contains('hidden')) {
        closeModal();
    }
});
