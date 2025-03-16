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
 * Este script exibe as recomendações do LinkedIn no portfólio em um carrossel horizontal infinito.
 * As recomendações são carregadas do localStorage, onde são salvas pelo painel de administração.
 */

class LinkedInRecommendations {
    constructor() {
        this.container = document.getElementById('testimonial-container');
        this.refreshButton = document.getElementById('refresh-testimonials');
        this.lastSyncElement = document.getElementById('last-sync-status');
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.autoplayInterval = null;
        this.isMobile = window.innerWidth <= 768;
        this.itemsPerSlide = this.isMobile ? 1 : 2;
        this.isAnimating = false;
        
        // Carregar recomendações do localStorage
        this.recommendations = this.loadRecommendationsFromAdmin();
        
        // Inicializar eventos
        this.initEvents();
    }
    
    /**
     * Carrega as recomendações salvas pelo painel de administração
     */
    loadRecommendationsFromAdmin() {
        const savedRecommendations = JSON.parse(localStorage.getItem('linkedinRecommendations') || '[]');
        
        if (savedRecommendations.length === 0) {
            console.warn('Nenhuma recomendação encontrada no localStorage. Verifique o painel de administração.');
            return [];
        }
        
        // Ordenar por timestamp (mais recente primeiro) e retornar
        return savedRecommendations.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    /**
     * Inicializa os eventos e carrega os dados
     */
    init() {
        this.renderCarousel();
        this.updateLastSyncTime();
        this.startAutoplay();
        
        // Adicionar eventos de toque para dispositivos móveis
        this.setupTouchEvents();
    }
    
    /**
     * Inicializa os eventos da interface
     */
    initEvents() {
        // Adicionar evento de clique ao botão de atualização
        if (this.refreshButton) {
            this.refreshButton.addEventListener('click', () => {
                this.refreshButton.classList.add('bx-spin');
                this.showLoadingState();
                
                // Recarregar as recomendações do localStorage
                setTimeout(() => {
                    this.recommendations = this.loadRecommendationsFromAdmin();
                    this.renderCarousel();
                    this.updateLastSyncTime();
                    this.refreshButton.classList.remove('bx-spin');
                }, 1000);
            });
        }
    }
    
    /**
     * Configura eventos de toque para dispositivos móveis
     */
    setupTouchEvents() {
        if (!this.container) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            // Detectar direção do swipe
            if (Math.abs(diff) > 50) { // Limiar de 50px para considerar um swipe
                if (diff > 0) {
                    // Swipe para a esquerda (próximo)
                    this.nextSlide();
                } else {
                    // Swipe para a direita (anterior)
                    this.prevSlide();
                }
            }
        }, { passive: true });
    }
    
    /**
     * Renderiza o carrossel de recomendações
     */
    renderCarousel() {
        if (!this.container) return;
        
        // Limpar container
        this.container.innerHTML = '';
        
        // Verificar se há recomendações para exibir
        if (this.recommendations.length === 0) {
            this.container.innerHTML = `
                <div class="no-recommendations">
                    <p>Nenhuma recomendação encontrada. Adicione recomendações no painel de administração.</p>
                    <a href="admin/linkedin-sync-panel.html" class="primary-btn">Ir para o painel</a>
                </div>
            `;
            return;
        }
        
        // Determinar número de cards por slide
        this.itemsPerSlide = window.innerWidth <= 768 ? 1 : 2;
        
        // Criar estrutura do carrossel
        const carousel = document.createElement('div');
        carousel.className = 'testimonial-carousel';
        
        const carouselInner = document.createElement('div');
        carouselInner.className = 'testimonial-carousel-inner';
        
        // Calcular número de slides necessários
        this.totalSlides = Math.ceil(this.recommendations.length / this.itemsPerSlide);
        
        // Duplicar recomendações para efeito infinito se houver mais de um slide
        let displayRecommendations = [...this.recommendations];
        if (this.totalSlides > 1) {
            // Adicionar cópias das primeiras recomendações ao final para o efeito infinito
            displayRecommendations = [...this.recommendations, ...this.recommendations.slice(0, this.itemsPerSlide)];
        }
        
        // Criar slides
        const slidesCount = Math.ceil(displayRecommendations.length / this.itemsPerSlide);
        
        for (let i = 0; i < slidesCount; i++) {
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';
            
            // Adicionar recomendações ao slide
            for (let j = 0; j < this.itemsPerSlide; j++) {
                const index = (i * this.itemsPerSlide) + j;
                if (index < displayRecommendations.length) {
                    const card = this.createRecommendationCard(displayRecommendations[index]);
                    slide.appendChild(card);
                } else if (this.itemsPerSlide === 2) {
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
        prevButton.innerHTML = '<i class="bx bx-chevron-left"></i>';
        prevButton.setAttribute('aria-label', 'Recomendação anterior');
        prevButton.addEventListener('click', () => this.prevSlide());
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-control carousel-control-next';
        nextButton.innerHTML = '<i class="bx bx-chevron-right"></i>';
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
                <i class="bx bxl-linkedin"></i>
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
                <i class="bx bx-link-external"></i> Ver perfil no LinkedIn
            </a>
        `;
        
        return card;
    }
    
    /**
     * Avança para o próximo slide
     */
    nextSlide() {
        if (this.isAnimating || this.totalSlides <= 1) return;
        
        this.isAnimating = true;
        this.currentSlide++;
        this.updateCarouselPosition();
        
        // Se chegou ao último slide duplicado, voltar para o primeiro após a animação
        if (this.currentSlide >= this.totalSlides) {
            setTimeout(() => {
                const carouselInner = document.querySelector('.testimonial-carousel-inner');
                if (carouselInner) {
                    // Desativar a transição
                    carouselInner.style.transition = 'none';
                    // Voltar para o primeiro slide
                    this.currentSlide = 0;
                    carouselInner.style.transform = `translateX(0)`;
                    // Forçar reflow
                    carouselInner.offsetHeight;
                    // Reativar a transição
                    carouselInner.style.transition = 'transform 0.5s ease';
                    
                    // Atualizar indicadores
                    this.updateIndicators();
                }
                this.isAnimating = false;
            }, 500); // Tempo igual à duração da transição
        } else {
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    }
    
    /**
     * Volta para o slide anterior
     */
    prevSlide() {
        if (this.isAnimating || this.totalSlides <= 1) return;
        
        this.isAnimating = true;
        
        if (this.currentSlide === 0) {
            // Se estiver no primeiro slide, ir para o último instantaneamente e depois animar para o penúltimo
            const carouselInner = document.querySelector('.testimonial-carousel-inner');
            if (carouselInner) {
                // Desativar a transição
                carouselInner.style.transition = 'none';
                // Ir para o último slide (que é uma cópia do primeiro)
                this.currentSlide = this.totalSlides;
                carouselInner.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                // Forçar reflow
                carouselInner.offsetHeight;
                // Reativar a transição
                carouselInner.style.transition = 'transform 0.5s ease';
                
                // Agora animar para o penúltimo slide (que é o último original)
                this.currentSlide--;
                this.updateCarouselPosition();
            }
        } else {
            this.currentSlide--;
            this.updateCarouselPosition();
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    /**
     * Vai para um slide específico
     * @param {number} index - Índice do slide
     */
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        this.currentSlide = index;
        this.updateCarouselPosition();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    /**
     * Atualiza a posição do carrossel
     */
    updateCarouselPosition() {
        const carouselInner = document.querySelector('.testimonial-carousel-inner');
        if (!carouselInner) return;
        
        carouselInner.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Atualizar indicadores
        this.updateIndicators();
        
        // Reiniciar autoplay
        this.restartAutoplay();
    }
    
    /**
     * Atualiza os indicadores do carrossel
     */
    updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        const normalizedIndex = this.currentSlide % this.totalSlides;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === normalizedIndex);
        });
    }
    
    /**
     * Inicia o autoplay do carrossel
     */
    startAutoplay() {
        if (this.totalSlides <= 1) return;
        
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
        
        const lastFetch = localStorage.getItem('linkedinLastFetch');
        let formattedDate = 'Nunca';
        
        if (lastFetch) {
            const date = new Date(parseInt(lastFetch));
            formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        this.lastSyncElement.textContent = `Última atualização: ${formattedDate}`;
    }
}

// Inicializar a exibição de recomendações quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const linkedinRecommendations = new LinkedInRecommendations();
    linkedinRecommendations.init();
}); 