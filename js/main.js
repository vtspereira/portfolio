// Gerenciamento de tema (claro/escuro)
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

// Verificar preferência salva ou preferência do sistema
const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
};

// Aplicar tema
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        metaThemeColor.setAttribute('content', '#121212');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        metaThemeColor.setAttribute('content', '#f8f9fa');
    }
    localStorage.setItem('theme', theme);
};

// Alternar tema
const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
};

// Observador de interseção para animações de entrada
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observar todas as seções para animação
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar tema inicial
    setTheme(getCurrentTheme());
    
    // Adicionar evento de clique ao botão de tema
    themeToggle.addEventListener('click', toggleTheme);
    
    // Observar todas as seções
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
    
    // Animação de digitação para o nome
    const heroTitle = document.querySelector('.hero-content h1 span');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        typeWriter(text, heroTitle);
    }
    
    // Adicionar classe ativa ao link de navegação com base na seção visível
    setupScrollSpy();
    
    // Inicializar scroll suave para links de âncora
    setupSmoothScroll();
    
    // Remover a tela de carregamento após o carregamento da página
    const loader = document.querySelector('.loading');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Animação de digitação otimizada
const typeWriter = (text, element, speed = 100) => {
    if (!element) return;
    
    let i = 0;
    const characters = text.split('');
    
    function type() {
        if (i < characters.length) {
            element.textContent += characters[i];
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
};

// Configurar scroll spy para destacar links de navegação ativos
const setupScrollSpy = () => {
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
};

// Configurar scroll suave para links de âncora
const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Efeito de parallax para o hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        hero.style.opacity = 1 - (scrollPosition * 0.002);
    }
}); 