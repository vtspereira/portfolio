/**
 * LinkedIn Sync Script
 * Este script facilita a sincronização das experiências profissionais com o LinkedIn
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar quando foi a última sincronização
    const lastSync = localStorage.getItem('linkedinLastSync') || 'Nunca';
    const syncIndicator = document.querySelector('.linkedin-sync a');
    
    if (syncIndicator) {
        syncIndicator.setAttribute('title', `Última sincronização: ${lastSync}`);
        
        // Adicionar evento de clique para atualização manual
        syncIndicator.addEventListener('click', function(e) {
            // Não interromper a navegação para o LinkedIn
            // Apenas registrar a data da sincronização
            const now = new Date().toLocaleString('pt-BR');
            localStorage.setItem('linkedinLastSync', now);
            
            // Atualizar o título
            this.setAttribute('title', `Última sincronização: ${now}`);
            
            // Mostrar mensagem para o usuário
            alert('Para sincronizar, atualize manualmente as informações do seu portfólio com base no seu perfil do LinkedIn.\n\nNo futuro, esta funcionalidade poderá ser automatizada com a API do LinkedIn.');
        });
    }
    
    // Verificar se há experiências novas para adicionar
    checkForNewExperiences();
});

/**
 * Função para verificar novas experiências
 * No futuro, esta função pode ser expandida para usar a API do LinkedIn
 */
function checkForNewExperiences() {
    // Esta é uma implementação simulada
    // Em uma implementação real, usaríamos a API do LinkedIn
    
    console.log('Verificando experiências do LinkedIn...');
    console.log('Para atualizar as experiências, edite o HTML manualmente com base no seu perfil do LinkedIn.');
    
    // Adicionar uma classe para indicar que os itens estão sincronizados
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.classList.add('linkedin-synced');
    });
}

/**
 * Função para atualizar as experiências (implementação futura)
 */
function updateExperiences(linkedinData) {
    // Esta função seria implementada quando tivermos acesso à API do LinkedIn
    console.log('Atualizando experiências com dados do LinkedIn:', linkedinData);
}

/**
 * Exibição de Recomendações do LinkedIn
 * 
 * Este script exibe as recomendações do LinkedIn no portfólio em um carrossel horizontal.
 * As recomendações são definidas diretamente no código para simplicidade.
 */

class LinkedInRecommendations {
    constructor() {
        this.container = document.getElementById('testimonial-container');
        this.refreshButton = document.querySelector('.linkedin-refresh');
        this.lastSyncElement = document.querySelector('.linkedin-last-sync');
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.autoplayInterval = null;
        this.isMobile = window.innerWidth <= 768;
        
        // Recomendações definidas diretamente no código
        this.recommendations = [
            {
                author: "Bruno Ferreira",
                position: "Desenvolvedor .NET | C#",
                date: "Março de 2023",
                relationship: "trabalhou com Vitor na Smart One",
                text: "Tive o prazer de trabalhar com Vitor em diversos projetos na Smart One. Sua capacidade técnica e dedicação são impressionantes. Ele sempre demonstrou grande habilidade em resolver problemas complexos e implementar soluções elegantes. Além de suas competências técnicas, Vitor é um excelente colega de equipe, sempre disposto a ajudar e compartilhar conhecimento. Recomendo fortemente o trabalho do Vitor para qualquer empresa que busque um profissional completo e dedicado.",
                profileUrl: "https://linkedin.com/in/bruno-ferreira"
            },
            {
                author: "Iago D'Ippolito",
                position: "Software Developer | .NET | Node.js | SAP B1",
                date: "Janeiro de 2023",
                relationship: "foi colega de Vitor na Smart One",
                text: "Vitor é um profissional excepcional, com quem tive o prazer de trabalhar na Smart One. Sua capacidade de aprendizado rápido e adaptação a novas tecnologias é notável. Durante nosso tempo juntos, ele demonstrou grande competência no desenvolvimento de soluções para SAP B1, criando integrações eficientes e interfaces de usuário intuitivas. Além de suas habilidades técnicas, Vitor possui excelente comunicação e trabalho em equipe, o que torna a colaboração com ele muito produtiva. Recomendo Vitor sem hesitação para qualquer posição de desenvolvimento de software.",
                profileUrl: "https://linkedin.com/in/iago-dippolito"
            },
            {
                author: "Ricardo Rüppell",
                position: "Desenvolvedor Full Stack",
                date: "Outubro de 2022",
                relationship: "trabalhou com Vitor durante a pandemia",
                text: "Trabalhei com Vitor por aproximadamente 1 ano ao longo da pandemia de Covid em 2020/2021. Embora nosso contato tenha sido majoritariamente remoto, Vitor sempre se mostrou muito comprometimento, aberto para novos aprendizados e de grande facilidade para construir relacionamentos com pares e colegas. Durante esse período em que iniciava sua carreira na área de desenvolvimento, foi perceptível sua acelerada evolução tanto em questões técnicas quanto aprimoramento das comportamentais. É uma pessoa e profissional que agrega muito no aspecto cultural, tornando o clima leve e respeitoso. Além disso, também busca ativamente por pontos de melhoria e lida bem com feedbacks recebidos.",
                profileUrl: "https://linkedin.com/in/ricardo-ruppell"
            },
            {
                author: "Lucas Soares Pereira",
                position: "Tech Lead",
                date: "Julho de 2022",
                relationship: "liderou Vitor por 4 anos",
                text: "Durante os 4 anos em que liderei o Vitor, pude testemunhar seu crescimento profissional. Ele se destacou como desenvolvedor, demonstrando excelente domínio técnico, sempre atento as melhores práticas e dedicado a compreender as regras de negócio antes de implementar soluções. Vitor colaborou ativamente com equipes multidisciplinares. Sua postura proativa na resolução de problemas e capacidade de adaptação a novos desafios foram fundamentais para diversos projetos. Recomendo Vitor como um profissional completo, que certamente trará contribuições valiosas a qualquer equipe ou organização. Foi um privilégio trabalhar ao seu lado e acompanhar sua trajetória profissional.",
                profileUrl: "https://linkedin.com/in/lucas-soares-pereira"
            }
        ];
        
        // Inicializar eventos
        this.initEvents();
    }
    
    /**
     * Inicializa os eventos e carrega os dados
     */
    init() {
        this.renderCarousel();
        this.updateLastSyncTime();
        this.startAutoplay();
    }
    
    /**
     * Inicializa os eventos da interface
     */
    initEvents() {
        // Adicionar evento de clique ao botão de atualização
        if (this.refreshButton) {
            this.refreshButton.addEventListener('click', () => {
                this.refreshButton.classList.add('fa-spin');
                this.showLoadingState();
                
                // Simular carregamento
                setTimeout(() => {
                    this.renderCarousel();
                    this.updateLastSyncTime();
                    this.refreshButton.classList.remove('fa-spin');
                }, 1500);
            });
        }
    }
    
    /**
     * Renderiza o carrossel de recomendações
     */
    renderCarousel() {
        if (!this.container) return;
        
        // Limpar container
        this.container.innerHTML = '';
        
        // Determinar número de cards por slide
        const itemsPerSlide = window.innerWidth <= 768 ? 1 : 2;
        
        // Criar estrutura do carrossel
        const carousel = document.createElement('div');
        carousel.className = 'testimonial-carousel';
        
        const carouselInner = document.createElement('div');
        carouselInner.className = 'testimonial-carousel-inner';
        
        // Calcular número de slides necessários
        this.totalSlides = Math.ceil(this.recommendations.length / itemsPerSlide);
        
        // Criar slides
        for (let i = 0; i < this.totalSlides; i++) {
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';
            
            // Adicionar recomendações ao slide
            for (let j = 0; j < itemsPerSlide; j++) {
                const index = (i * itemsPerSlide) + j;
                if (index < this.recommendations.length) {
                    const card = this.createRecommendationCard(this.recommendations[index]);
                    slide.appendChild(card);
                } else if (itemsPerSlide === 2) {
                    // Adicionar um card vazio para manter o layout em grid quando há número ímpar de recomendações
                    const emptyCard = document.createElement('div');
                    emptyCard.className = 'testimonial-card empty-card';
                    slide.appendChild(emptyCard);
                }
            }
            
            carouselInner.appendChild(slide);
        }
        
        // Adicionar controles do carrossel
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-control carousel-control-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.setAttribute('aria-label', 'Recomendação anterior');
        prevButton.addEventListener('click', () => this.prevSlide());
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-control carousel-control-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.setAttribute('aria-label', 'Próxima recomendação');
        nextButton.addEventListener('click', () => this.nextSlide());
        
        // Adicionar indicadores
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
            indicator.setAttribute('aria-label', `Slide ${i+1} de ${this.totalSlides}`);
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicators.appendChild(indicator);
        }
        
        // Montar carrossel
        carousel.appendChild(carouselInner);
        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);
        
        // Adicionar ao container
        this.container.appendChild(carousel);
        this.container.appendChild(indicators);
        
        // Resetar slide atual
        this.currentSlide = 0;
        this.updateCarouselPosition();
        
        // Adicionar evento de redimensionamento
        window.addEventListener('resize', () => {
            // Recriar o carrossel apenas se a largura da tela mudar significativamente
            const isMobile = window.innerWidth <= 768;
            if (this.isMobile !== isMobile) {
                this.isMobile = isMobile;
                this.renderCarousel();
            }
        });
    }
    
    /**
     * Cria um card de recomendação
     * @param {Object} recommendation - Dados da recomendação
     * @returns {HTMLElement} Elemento do card
     */
    createRecommendationCard(recommendation) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        card.innerHTML = `
            <div class="linkedin-badge">
                <i class="fab fa-linkedin-in"></i>
            </div>
            <div class="testimonial-header">
                <div class="testimonial-author">
                    <h4>${recommendation.author}</h4>
                    <div class="testimonial-position">${recommendation.position}</div>
                    <div class="testimonial-date">Em ${recommendation.date}, ${recommendation.author} ${recommendation.relationship}</div>
                </div>
            </div>
            <div class="testimonial-content">
                <p>${recommendation.text}</p>
            </div>
            <a href="${recommendation.profileUrl}" class="linkedin-profile-link" target="_blank">
                <i class="fab fa-linkedin"></i> Ver perfil no LinkedIn
            </a>
        `;
        
        return card;
    }
    
    /**
     * Avança para o próximo slide
     */
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarouselPosition();
    }
    
    /**
     * Volta para o slide anterior
     */
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarouselPosition();
    }
    
    /**
     * Vai para um slide específico
     * @param {number} index - Índice do slide
     */
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarouselPosition();
    }
    
    /**
     * Atualiza a posição do carrossel
     */
    updateCarouselPosition() {
        const carouselInner = document.querySelector('.testimonial-carousel-inner');
        if (!carouselInner) return;
        
        carouselInner.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Atualizar indicadores
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Reiniciar autoplay
        this.restartAutoplay();
    }
    
    /**
     * Inicia o autoplay do carrossel
     */
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    /**
     * Reinicia o autoplay do carrossel
     */
    restartAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
    
    /**
     * Mostra o estado de carregamento
     */
    showLoadingState() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="linkedin-loading">
                <div class="linkedin-loading-spinner"></div>
                <p>Carregando recomendações do LinkedIn...</p>
            </div>
        `;
    }
    
    /**
     * Atualiza o tempo da última sincronização
     */
    updateLastSyncTime() {
        if (!this.lastSyncElement) return;
        
        const date = new Date();
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        this.lastSyncElement.textContent = `Última atualização: ${formattedDate}`;
    }
}

// Inicializar a exibição de recomendações quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const linkedinRecommendations = new LinkedInRecommendations();
    linkedinRecommendations.init();
});

// Configurações
const STORAGE_KEY = 'linkedin_recommendations';
const LAST_SYNC_KEY = 'linkedin_last_sync';
const ITEMS_PER_SLIDE_DESKTOP = 2;
const ITEMS_PER_SLIDE_MOBILE = 1;

// Elementos DOM
const testimonialContainer = document.getElementById('testimonial-container');
const refreshButton = document.getElementById('refresh-testimonials');
const lastSyncStatus = document.getElementById('last-sync-status');

// Recomendações de exemplo (para demonstração)
const sampleRecommendations = [
    {
        name: "João Silva",
        position: "Tech Lead na Empresa XYZ",
        date: "12 de março de 2023",
        text: "Tive o prazer de trabalhar com Vitor em vários projetos. Sua habilidade técnica e dedicação são impressionantes. Ele sempre entrega soluções de alta qualidade e está constantemente buscando aprender novas tecnologias. Um profissional que realmente faz a diferença em qualquer equipe.",
        linkedinUrl: "https://linkedin.com/in/joao-silva"
    },
    {
        name: "Maria Oliveira",
        position: "Gerente de Projetos na Empresa ABC",
        date: "5 de janeiro de 2023",
        text: "Vitor é um desenvolvedor excepcional com quem tive o prazer de trabalhar. Sua capacidade de resolver problemas complexos e sua atenção aos detalhes são notáveis. Além de suas habilidades técnicas, ele é um excelente comunicador e trabalha muito bem em equipe. Recomendo fortemente!",
        linkedinUrl: "https://linkedin.com/in/maria-oliveira"
    },
    {
        name: "Carlos Mendes",
        position: "CTO na Startup DEF",
        date: "18 de novembro de 2022",
        text: "Trabalhei com Vitor em um projeto desafiador e fiquei impressionado com sua capacidade técnica e profissionalismo. Ele não apenas entregou código de alta qualidade, mas também trouxe ideias inovadoras que melhoraram significativamente o produto. Um verdadeiro talento na área de desenvolvimento.",
        linkedinUrl: "https://linkedin.com/in/carlos-mendes"
    },
    {
        name: "Ana Souza",
        position: "Product Owner na Empresa GHI",
        date: "3 de agosto de 2022",
        text: "Vitor é um profissional excepcional. Sua capacidade de entender requisitos de negócio e transformá-los em soluções técnicas elegantes é impressionante. Ele é proativo, comprometido e sempre disposto a ajudar a equipe. Foi um prazer trabalhar com ele e recomendo-o sem hesitação.",
        linkedinUrl: "https://linkedin.com/in/ana-souza"
    }
];

// Função para carregar recomendações (do armazenamento local ou exemplos)
function loadRecommendations() {
    let recommendations = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    if (!recommendations) {
        // Se não houver dados salvos, usar os exemplos
        recommendations = sampleRecommendations;
        saveRecommendations(recommendations);
    }
    
    return recommendations;
}

// Função para salvar recomendações no armazenamento local
function saveRecommendations(recommendations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recommendations));
    const now = new Date();
    localStorage.setItem(LAST_SYNC_KEY, now.toLocaleString());
    lastSyncStatus.textContent = `Última sincronização: ${now.toLocaleString()}`;
}

// Função para atualizar o status da última sincronização
function updateLastSyncStatus() {
    const lastSync = localStorage.getItem(LAST_SYNC_KEY);
    if (lastSync) {
        lastSyncStatus.textContent = `Última sincronização: ${lastSync}`;
    } else {
        lastSyncStatus.textContent = 'Última sincronização: Nunca';
    }
}

// Função para renderizar o carrossel de recomendações
function renderCarousel(recommendations) {
    if (!testimonialContainer) return;
    
    // Limpar o container
    testimonialContainer.innerHTML = '';
    
    // Determinar quantos itens por slide com base na largura da tela
    const itemsPerSlide = window.innerWidth < 768 ? ITEMS_PER_SLIDE_MOBILE : ITEMS_PER_SLIDE_DESKTOP;
    
    // Calcular o número total de slides
    const totalSlides = Math.ceil(recommendations.length / itemsPerSlide);
    
    // Criar o wrapper do carrossel
    const carouselElement = document.createElement('div');
    carouselElement.className = 'testimonial-carousel';
    
    // Criar o container interno do carrossel
    const carouselInner = document.createElement('div');
    carouselInner.className = 'testimonial-carousel-inner';
    
    // Criar slides
    for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        
        // Adicionar cards ao slide
        for (let j = 0; j < itemsPerSlide; j++) {
            const index = i * itemsPerSlide + j;
            
            if (index < recommendations.length) {
                // Criar card com recomendação
                const recommendation = recommendations[index];
                const card = createRecommendationCard(recommendation);
                slide.appendChild(card);
            } else if (i === totalSlides - 1 && j < itemsPerSlide) {
                // Adicionar card vazio para manter o layout
                const emptyCard = document.createElement('div');
                emptyCard.className = 'testimonial-card empty-card';
                slide.appendChild(emptyCard);
            }
        }
        
        carouselInner.appendChild(slide);
    }
    
    carouselElement.appendChild(carouselInner);
    
    // Adicionar controles de navegação se houver mais de um slide
    if (totalSlides > 1) {
        // Botão anterior
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-control carousel-control-prev';
        prevButton.innerHTML = '<i class="bx bx-chevron-left"></i>';
        prevButton.setAttribute('aria-label', 'Anterior');
        prevButton.addEventListener('click', () => navigateCarousel(-1));
        
        // Botão próximo
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-control carousel-control-next';
        nextButton.innerHTML = '<i class="bx bx-chevron-right"></i>';
        nextButton.setAttribute('aria-label', 'Próximo');
        nextButton.addEventListener('click', () => navigateCarousel(1));
        
        carouselElement.appendChild(prevButton);
        carouselElement.appendChild(nextButton);
        
        // Indicadores
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(indicator);
        }
        
        testimonialContainer.appendChild(carouselElement);
        testimonialContainer.appendChild(indicators);
    } else {
        testimonialContainer.appendChild(carouselElement);
    }
    
    // Armazenar o slide atual
    carouselElement.dataset.currentSlide = 0;
}

// Função para criar um card de recomendação
function createRecommendationCard(recommendation) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    // Adicionar badge do LinkedIn
    const badge = document.createElement('div');
    badge.className = 'linkedin-badge';
    badge.innerHTML = '<i class="bx bxl-linkedin"></i>';
    
    // Adicionar cabeçalho com informações do autor
    const header = document.createElement('div');
    header.className = 'testimonial-header';
    
    const author = document.createElement('div');
    author.className = 'testimonial-author';
    
    const name = document.createElement('h4');
    name.textContent = recommendation.name;
    
    const position = document.createElement('div');
    position.className = 'testimonial-position';
    position.textContent = recommendation.position;
    
    const date = document.createElement('div');
    date.className = 'testimonial-date';
    date.textContent = recommendation.date;
    
    author.appendChild(name);
    author.appendChild(position);
    header.appendChild(author);
    header.appendChild(date);
    
    // Adicionar conteúdo da recomendação
    const content = document.createElement('div');
    content.className = 'testimonial-content';
    content.textContent = recommendation.text;
    
    // Adicionar link para o perfil do LinkedIn
    const link = document.createElement('a');
    link.className = 'linkedin-profile-link';
    link.href = recommendation.linkedinUrl;
    link.target = '_blank';
    link.textContent = 'Ver perfil no LinkedIn';
    link.innerHTML += ' <i class="bx bx-link-external"></i>';
    
    // Montar o card
    card.appendChild(badge);
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(link);
    
    return card;
}

// Função para navegar no carrossel
function navigateCarousel(direction) {
    const carousel = document.querySelector('.testimonial-carousel');
    const carouselInner = document.querySelector('.testimonial-carousel-inner');
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!carousel || !carouselInner || slides.length === 0) return;
    
    let currentSlide = parseInt(carousel.dataset.currentSlide || 0);
    let newSlide = currentSlide + direction;
    
    // Verificar limites
    if (newSlide < 0) newSlide = slides.length - 1;
    if (newSlide >= slides.length) newSlide = 0;
    
    // Atualizar posição
    updateCarouselPosition(newSlide);
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === newSlide);
    });
    
    // Atualizar slide atual
    carousel.dataset.currentSlide = newSlide;
}

// Função para ir para um slide específico
function goToSlide(slideIndex) {
    const carousel = document.querySelector('.testimonial-carousel');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!carousel) return;
    
    // Atualizar posição
    updateCarouselPosition(slideIndex);
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
    
    // Atualizar slide atual
    carousel.dataset.currentSlide = slideIndex;
}

// Função para atualizar a posição do carrossel
function updateCarouselPosition(slideIndex) {
    const carouselInner = document.querySelector('.testimonial-carousel-inner');
    if (!carouselInner) return;
    
    const slideWidth = 100; // 100%
    const translateX = -slideIndex * slideWidth;
    carouselInner.style.transform = `translateX(${translateX}%)`;
}

// Função para simular a sincronização com o LinkedIn
function syncWithLinkedIn() {
    // Mostrar indicador de carregamento
    testimonialContainer.innerHTML = '<div class="linkedin-loading"><div class="linkedin-loading-spinner"></div></div>';
    
    // Simular um atraso de rede
    setTimeout(() => {
        // Em um cenário real, aqui seria feita uma chamada à API do LinkedIn
        // Para este exemplo, apenas recarregamos os dados de exemplo
        const recommendations = sampleRecommendations;
        
        // Salvar e renderizar
        saveRecommendations(recommendations);
        renderCarousel(recommendations);
    }, 1500);
}

// Função para lidar com o redimensionamento da janela
function handleResize() {
    const recommendations = loadRecommendations();
    renderCarousel(recommendations);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Carregar recomendações
    const recommendations = loadRecommendations();
    
    // Renderizar carrossel
    renderCarousel(recommendations);
    
    // Atualizar status da última sincronização
    updateLastSyncStatus();
    
    // Adicionar evento ao botão de atualização
    if (refreshButton) {
        refreshButton.addEventListener('click', syncWithLinkedIn);
    }
    
    // Adicionar evento de redimensionamento
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 200);
    });
}); 