// Gerenciamento de tema (claro/escuro)
document.addEventListener('DOMContentLoaded', function() {
    // Ajustar partículas para dispositivos móveis
    if (window.innerWidth < 768) {
        const particlesJS = document.getElementById('particles-js');
        if (particlesJS) {
            particlesJS.style.opacity = '0.2'; // Reduzir opacidade
        }
    }
    
    // Inicializar AOS (Animate on Scroll) com configurações mais rápidas
    AOS.init({
        duration: 800, // Reduzindo a duração das animações
        easing: 'ease-in-out',
        once: true, // Definindo como true para que a animação ocorra apenas uma vez
        mirror: false,
        disable: window.innerWidth < 768 // Desativar em dispositivos móveis
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
        
        // Ajustar cores para elementos específicos com base no tema
        updateThemeSpecificElements(theme);
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
    
    // Atualizar elementos específicos por tema
    function updateThemeSpecificElements(theme) {
        // Código de bloco do hero - atualizar borda e cor de fundo
        const codeBlock = document.querySelector('.hero-code-block');
        if (codeBlock) {
            if (theme === 'light') {
                codeBlock.style.borderColor = 'var(--border)';
                codeBlock.style.background = 'rgba(249, 249, 249, 0.8)';
            } else {
                codeBlock.style.borderColor = 'var(--border)';
                codeBlock.style.background = 'rgba(30, 30, 30, 0.8)';
            }
        }
        
        // Atualizar o fundo das seções de acordo com o tema
        const heroSection = document.querySelector('.hero-section');
        const testimonialSection = document.querySelector('.testimonial-section');
        const particlesJS = document.querySelector('#particles-js');
        
        if (heroSection) {
            heroSection.style.backgroundColor = `var(--bg-primary)`;
        }
        
        if (testimonialSection) {
            testimonialSection.style.backgroundColor = `var(--bg-primary)`;
        }
        
        if (particlesJS) {
            particlesJS.style.backgroundColor = `var(--bg-primary)`;
        }
        
        // Ajustar ícones de tecnologia
        const techIcons = document.querySelectorAll('.tech-icon');
        if (techIcons.length > 0) {
            techIcons.forEach(icon => {
                if (theme === 'light') {
                    icon.style.background = 'var(--bg-secondary)';
                    icon.style.boxShadow = 'var(--shadow-sm)';
                } else {
                    icon.style.background = 'var(--bg-tertiary)';
                    icon.style.boxShadow = 'var(--shadow-sm)';
                }
            });
        }
        
        // Ajustar cores dos cards de habilidades
        const skillCards = document.querySelectorAll('.skill-card');
        if (skillCards.length > 0) {
            skillCards.forEach(card => {
                if (theme === 'light') {
                    card.style.background = 'var(--bg-secondary)';
                } else {
                    card.style.background = 'var(--bg-tertiary)';
                }
            });
        }
        
        // Ajustar cor de fundo da imagem de perfil
        const profileBackdrop = document.querySelector('.profile-backdrop');
        if (profileBackdrop) {
            if (theme === 'light') {
                profileBackdrop.style.background = 'var(--primary-light)';
                profileBackdrop.style.opacity = '0.15';
            } else {
                profileBackdrop.style.background = 'var(--primary)';
                profileBackdrop.style.opacity = '0.2';
            }
        }
        
        // Tema no botão de alternância
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            if (theme === 'light') {
                themeToggle.style.background = 'var(--bg-secondary)';
            } else {
                themeToggle.style.background = 'var(--bg-tertiary)';
            }
        }
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

    // Efeito de parallax para os círculos de fundo (otimizado)
    // Desativar em dispositivos móveis para melhor performance
    if (window.innerWidth > 768) {
        setupParallaxEffect();
    }
    
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
    setupMobileNavigation();
    
    // Inicializar abas
    setupTabs();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar o scroll inicial para definir o estado do header
    handleScroll();
    
    // Adicionar efeitos de mouse hover nos itens da seção Sobre Mim
    // Desativar em dispositivos móveis para melhor performance
    if (window.innerWidth > 768) {
        setupAboutHoverEffects();
    }
    
    // Adicionar efeito de luz nos botões e cards
    // Desativar em dispositivos móveis para melhor performance
    if (window.innerWidth > 768) {
        setupLightEffects();
    }
    
    // Initialize experience timeline animation
    initExperienceTimeline();
});

// Configurar efeito parallax (otimizado)
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-circle');
    
    // Usando uma abordagem mais eficiente com throttling para limitar as chamadas
    let lastScrollPosition = 0;
    let ticking = false;
    
    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = e.clientX;
                const y = e.clientY;
                
                // Velocidade do efeito reduzida
                const speed = 0.03;
                
                parallaxElements.forEach(element => {
                    // Mover o elemento com base na posição do mouse (simplificado)
                    const moveX = (x - window.innerWidth / 2) * speed;
                    const moveY = (y - window.innerHeight / 2) * speed;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Adicionar efeito de luz nos botões (otimizado)
function setupLightEffects() {
    // Efeito de luz que segue o cursor nos botões e cards com hover-glow
    const hoverElements = document.querySelectorAll('.hover-glow, .primary-btn, .secondary-btn, .download-cv-btn, .contact-btn, .social-links a');
    
    // Limitar a frequência de atualização para melhorar o desempenho
    let throttleTimer;
    
    hoverElements.forEach(element => {
        element.addEventListener('mousemove', e => {
            if (!throttleTimer) {
                throttleTimer = setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Coordenadas em percentagem da largura/altura do elemento
                    const xPercent = Math.round(x / rect.width * 100);
                    const yPercent = Math.round(y / rect.height * 100);
                    
                    // Atualizar variáveis CSS para controlar a posição do gradiente radial
                    element.style.setProperty('--x-pos', `${xPercent}%`);
                    element.style.setProperty('--y-pos', `${yPercent}%`);
                    
                    throttleTimer = null;
                }, 50); // Limitar a 20 atualizações por segundo
            }
        });
    });
    
    // Efeito para os cards - versão mais leve
    const liftElements = document.querySelectorAll('.hover-lift');
    
    liftElements.forEach(element => {
        element.addEventListener('mousemove', e => {
            if (!throttleTimer) {
                throttleTimer = setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Rotação mais sutil
                    const xRotation = ((rect.height / 2 - y) / 50);
                    const yRotation = ((x - rect.width / 2) / 50);
                    
                    // Aplicar transformação mais leve
                    element.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-3px)`;
                    
                    throttleTimer = null;
                }, 50);
            }
        });
        
        // Resetar a transformação quando o mouse sair
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'none';
        });
    });
}

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

// Versão aprimorada de Mobile navigation
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    if (!menuToggle || !navLinks || !navItems.length) return;
    
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Fechar menu ao clicar em qualquer área fora
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Fechar menu quando clicar em um link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Adicionar classe 'active' ao link correspondente à seção visível
    window.addEventListener('scroll', () => {
        const sections = ['home', 'about', 'experience', 'skills', 'projects', 'testimonial', 'contact'];
        let current = '';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (!element) return;
            
            const rect = element.getBoundingClientRect();
            // Ajuste para considerar uma seção visível
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Efeitos de mouse hover para elementos da seção Sobre Mim (otimizado)
function setupAboutHoverEffects() {
    // Efeito 3D mais leve nos cards de educação
    const educationItems = document.querySelectorAll('.education-item, .language-item');
    
    educationItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Usando uma transformação simples em vez de 3D complexa
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 20px var(--shadow)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'none';
            item.style.boxShadow = 'none';
        });
    });
    
    // Efeito simples para a imagem de perfil
    const profileImage = document.querySelector('.about-profile-image');
    if (profileImage) {
        // Limitando o evento mousemove para melhorar performance
        let profileImageThrottle;
        
        document.addEventListener('mousemove', (e) => {
            if (!profileImageThrottle) {
                profileImageThrottle = setTimeout(() => {
                    // Movimento mais sutil
                    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
                    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
                    
                    profileImage.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
                    
                    profileImageThrottle = null;
                }, 100); // Atualizando apenas 10 vezes por segundo
            }
        });
    }
}

// Abas na seção Sobre Mim (sem scroll)
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
            
            // Iniciar animação mais simples e remover restrições de scroll
            setTimeout(() => {
                targetContent.classList.add('active');
                targetContent.style.overflow = 'visible';
                targetContent.style.maxHeight = 'none';
                
                // Animação mais simples para os itens
                const items = targetContent.querySelectorAll('.education-item, .language-item');
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                });
                
                // Ajustar altura do container se necessário
                const aboutContainer = document.querySelector('.about-container');
                if (aboutContainer) {
                    aboutContainer.style.height = 'auto';
                }
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
    
    // Otimização do efeito parallax ao rolar - usando throttle
    let scrollThrottle;
    if (!scrollThrottle) {
        scrollThrottle = setTimeout(() => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                // Aplicar efeito parallax mais suave
                const parallaxBg = section.querySelector('.parallax-bg');
                if (parallaxBg) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    // Verificar se a seção está visível
                    if (scrollPosition > sectionTop - window.innerHeight && 
                        scrollPosition < sectionTop + sectionHeight) {
                        // Deslocamento mais sutil
                        const yOffset = (scrollPosition - sectionTop) * 0.1;
                        parallaxBg.style.transform = `translateY(${yOffset}px)`;
                    }
                }
            });
            
            scrollThrottle = null;
        }, 50); // Limitar a 20 atualizações por segundo
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

// Timeline animation for experience section
function initExperienceTimeline() {
    const experienceSection = document.querySelector('.experience-section');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    if (!experienceSection || experienceItems.length === 0) return;
    
    const animateTimeline = () => {
        const sectionTop = experienceSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPoint) {
            experienceSection.classList.add('in-view');
            
            experienceItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 300 * index);
            });
            
            window.removeEventListener('scroll', animateTimeline);
        }
    };
    
    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Check on load
} 