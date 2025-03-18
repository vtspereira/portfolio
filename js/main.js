// Gerenciamento de tema (claro/escuro)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    // Verificar preferência salva ou preferência do sistema
    const getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Aplicar tema
    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
        } else {
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
        }
        localStorage.setItem('theme', theme);
    };
    
    // Alternar tema
    const toggleTheme = () => {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };
    
    // Aplicar tema inicial
    setTheme(getCurrentTheme());
    
    // Adicionar evento de clique ao botão de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Observador de interseção para animações de entrada
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Efeito de digitação para o texto do hero
    const txtElement = document.querySelector('.hero-title-item');
    if (txtElement) {
        const words = ['Desenvolvedor Full Stack', 'Arquiteto de Software', 'Especialista em .NET', 'Entusiasta de DevOps'];
        new TypeWriter(txtElement, words, 3000);
    }
    
    // Animar estatísticas quando a seção about estiver visível
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
    
    // Configurar scroll spy para destacar links de navegação ativos
    setupScrollSpy();
    
    // Configurar menu mobile
    setupMobileMenu();
    
    // Inicializar abas
    setupTabs();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar o scroll inicial para definir o estado do header
    handleScroll();
    
    // Adicionar efeitos de mouse hover nos itens da seção Sobre Mim
    setupAboutHoverEffects();
});

// Efeito de digitação para o texto do hero
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Índice atual da palavra
        const current = this.wordIndex % this.words.length;
        // Texto completo da palavra atual
        const fullTxt = this.words[current];

        // Verificar se está deletando
        if (this.isDeleting) {
            // Remover caractere
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Adicionar caractere
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Inserir txt no elemento
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Velocidade inicial de digitação
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // Se a palavra está completa
        if (!this.isDeleting && this.txt === fullTxt) {
            // Pausa no final
            typeSpeed = this.wait;
            // Definir delete para true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Mover para próxima palavra
            this.wordIndex++;
            // Pausa antes de começar a digitar
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Animação para os números de estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!target) return;
        
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateStat = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target;
            }
        };
        
        updateStat();
    });
}

// Configurar scroll spy para destacar links de navegação ativos
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Configurar menu mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Efeitos de mouse hover para elementos da seção Sobre Mim
function setupAboutHoverEffects() {
    // Adicionar brilho ao passar o mouse sobre os botões
    const buttons = document.querySelectorAll('.download-cv-btn, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            button.style.setProperty('--x-pos', `${x}px`);
            button.style.setProperty('--y-pos', `${y}px`);
        });
    });
    
    // Efeito 3D nos cards de educação
    const educationItems = document.querySelectorAll('.education-item, .language-item');
    
    educationItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height) * 5;
            const yRotation = ((x - rect.width / 2) / rect.width) * -5;
            
            item.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Efeito de movimento paralaxe na imagem do perfil
    const profileImage = document.querySelector('.about-profile-image');
    if (profileImage) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
            
            profileImage.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    }
}

// Abas na seção Sobre Mim
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            // Ocultar todos os conteúdos
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Mostrar conteúdo correspondente com animação
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            
            targetContent.style.display = 'block';
            
            // Iniciar animação com atraso para permitir que o display: block seja aplicado
            setTimeout(() => {
                targetContent.classList.add('active');
                
                // Animar itens dentro da tab com efeito cascata
                const items = targetContent.querySelectorAll('.education-item, .language-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 * (index + 1));
                });
            }, 50);
        });
    });
}

// Navegação suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar classe 'scrolled' ao header quando rolar a página
function handleScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Efeito de parallax para o hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    const profileImage = document.querySelector('.profile-image');
    
    if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.2}px`;
    }
    
    if (profileImage) {
        profileImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
}); 