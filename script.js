// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll için navigasyon linklerini ayarla
    setupSmoothScroll();
    
    
    // Scroll efekti için navbar'ı ayarla
    setupNavbarScroll();
    
    // Animasyonları başlat
    setupAnimations();
    
    // Mobil menü toggle fonksiyonunu ayarla
    setupMobileMenu();
    
    // Dark mode toggle'ı ayarla
    setupDarkMode();
    
    // Back to top butonunu ayarla
    setupBackToTop();
    
    // Modal popup'ları ayarla
    setupModals();
});

// Smooth scroll fonksiyonu
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Navbar yüksekliği için
                
                // Smooth scroll animasyonu
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
    
    // CTA butonu için smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                smoothScrollTo(offsetTop, 800);
            }
        });
    }
}

// Gelişmiş smooth scroll fonksiyonu
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// Easing fonksiyonu
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}


// Navbar scroll efekti
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Aşağı scroll - navbar'ı gizle
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Yukarı scroll - navbar'ı göster
            navbar.style.transform = 'translateY(0)';
        }
        
        // Scroll pozisyonuna göre navbar arka planını değiştir
        if (scrollTop > 50) {
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
            navbar.style.background = isDarkMode ? 'rgba(45, 45, 45, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        } else {
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
            navbar.style.background = isDarkMode ? 'rgba(45, 45, 45, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animasyonları ayarla
function setupAnimations() {
    // Intersection Observer ile scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Staggered animasyon için gecikme ekle
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Animasyon yapılacak elementleri seç ve gecikme ekle
    const animateElements = document.querySelectorAll('.about-content, .project-card, .contact-form, .about-image');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        el.dataset.delay = index * 100; // Her element için 100ms gecikme
        observer.observe(el);
    });
    
    // Proje kartları için özel animasyon
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.dataset.delay = index * 150; // Proje kartları için daha fazla gecikme
    });
}

// Proje kartlarına hover efekti ekle
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Navbar linklerine aktif durum ekle
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Sayfa yüklendiğinde aktif link fonksiyonunu başlat
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Mobil menü ayarları
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        // Hamburger menü toggle
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Body scroll'u engelle/etkinleştir
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Menü linklerine tıklandığında menüyü kapat
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Menü dışına tıklandığında menüyü kapat
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // ESC tuşuna basıldığında menüyü kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Responsive menü için mobil toggle
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Body scroll'u engelle/etkinleştir
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Dark Mode Toggle
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Local storage'dan tema tercihini yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        darkModeToggle.checked = savedTheme === 'dark';
        
        // Navbar arka planını tema ile uyumlu hale getir
        const navbar = document.querySelector('.navbar');
        if (savedTheme === 'dark') {
            navbar.style.background = 'rgba(45, 45, 45, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            const navbar = document.querySelector('.navbar');
            
            if (this.checked) {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                // Navbar arka planını dark mode'a göre güncelle
                navbar.style.background = 'rgba(45, 45, 45, 0.95)';
            } else {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                // Navbar arka planını light mode'a göre güncelle
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
}

// Back to Top Button
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Scroll pozisyonunu takip et
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Butona tıklama
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Modal Popup'ları
function setupModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Proje kartlarına tıklama
    projectCards.forEach(card => {
        const modalId = card.getAttribute('data-modal');
        if (modalId) {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('project-btn')) return;
                e.preventDefault();
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    
    // Modal kapatma
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Modal dışına tıklama ile kapatma
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // ESC tuşu ile kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// Klavye navigasyonu desteği
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Escape tuşuna basıldığında açık modal'ları kapat
        const alerts = document.querySelectorAll('[style*="position: fixed"]');
        alerts.forEach(alert => alert.remove());
    }
});
