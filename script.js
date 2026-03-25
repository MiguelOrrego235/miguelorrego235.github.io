        // State
        let activeSection = 'home';
        let darkMode = false;
        let mobileMenuOpen = false;

        // Dark Mode Toggle
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

        // Mobile Menu Toggle
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

        // Scroll to Section
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

                // Close mobile menu if open
                if (mobileMenuOpen) {
                    toggleMobileMenu();
                }
            }
        }

        // Scroll Spy - Update Active Section
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

        // Update Navigation Links Active State
        function updateNavLinks() {
            // Desktop nav
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

            // Mobile nav
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

        // Copy Email Function
        function copyEmail() {
            const email = 'lorem.ipsum@email.com';
            const btn = document.getElementById('copy-email-btn');
            const copyIcon = document.getElementById('copy-icon');
            const checkIcon = document.getElementById('check-icon');
            const copyText = document.getElementById('copy-text');

            // Try modern clipboard API first
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
                // Update button appearance
                btn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'active:bg-blue-800');
                btn.classList.add('bg-green-600');
                copyIcon.classList.add('hidden');
                checkIcon.classList.remove('hidden');
                copyText.textContent = 'Copied!';

                // Revert after 2 seconds
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

        // Modal Functions
        function openModal() {
            document.getElementById('download-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('download-modal').classList.add('hidden');
            document.body.style.overflow = '';
        }

        function downloadCV() {
            // Prototype behavior - would trigger actual PDF download in production
            alert('CV download initiated (prototype behavior)');
            closeModal();
        }

        // Event Listeners
        window.addEventListener('scroll', updateActiveSection);
        window.addEventListener('load', () => {
            updateActiveSection();
            updateNavLinks();
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !document.getElementById('download-modal').classList.contains('hidden')) {
                closeModal();
            }
        });