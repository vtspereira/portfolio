// Carregador de recomendações a partir de JSON
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    let recommendations = [];
    let slideHeight = 0;
    
    // Função para buscar e carregar o JSON de recomendações
    async function loadRecommendations() {
        try {
            const response = await fetch('data/recommendations.json');
            
            if (!response.ok) {
                throw new Error(`Erro ao carregar recomendações: ${response.status}`);
            }
            
            recommendations = await response.json();
            createCarouselStructure();
            displayRecommendations(currentSlide);
        } catch (error) {
            console.error('Falha ao carregar recomendações:', error);
            displayErrorMessage();
        }
    }
    
    // Função para criar a estrutura do carousel
    function createCarouselStructure() {
        const container = document.getElementById('testimonials-container');
        container.innerHTML = '';
        
        // Criar container do carousel
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'testimonial-carousel-container';
        
        // Criar container dos slides
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'testimonial-slides-container';
        slidesContainer.id = 'testimonial-slides';
        
        // Criar controles de navegação
        const controls = document.createElement('div');
        controls.className = 'testimonial-controls';
        
        // Botão anterior
        const prevButton = document.createElement('button');
        prevButton.className = 'testimonial-control prev-button';
        prevButton.innerHTML = '<i class="bx bx-chevron-left"></i>';
        prevButton.addEventListener('click', () => navigateSlide('prev'));
        
        // Botão próximo
        const nextButton = document.createElement('button');
        nextButton.className = 'testimonial-control next-button';
        nextButton.innerHTML = '<i class="bx bx-chevron-right"></i>';
        nextButton.addEventListener('click', () => navigateSlide('next'));
        
        // Botão do LinkedIn
        const linkedinContainer = document.createElement('div');
        linkedinContainer.className = 'testimonial-linkedin-container';
        
        const linkedinButton = document.createElement('a');
        linkedinButton.href = 'https://www.linkedin.com/in/vtspereira';
        linkedinButton.target = '_blank';
        linkedinButton.className = 'testimonial-linkedin-button';
        linkedinButton.innerHTML = '<i class="bx bxl-linkedin"></i> Ver todas as recomendações no LinkedIn';
        
        // Adicionar elementos ao DOM
        controls.appendChild(prevButton);
        controls.appendChild(nextButton);
        
        linkedinContainer.appendChild(linkedinButton);
        
        carouselContainer.appendChild(slidesContainer);
        carouselContainer.appendChild(controls);
        
        container.appendChild(carouselContainer);
        container.appendChild(linkedinContainer);
    }
    
    // Função para navegar entre os slides
    function navigateSlide(direction) {
        const totalSlides = Math.ceil(recommendations.length / 2);
        
        // Não fazer nada se houver apenas um slide
        if (totalSlides <= 1) return;
        
        // Obter o container de slides
        const slidesContainer = document.getElementById('testimonial-slides');
        
        // Preparar o novo slide antes de animar
        let newSlide;
        if (direction === 'prev') {
            newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        } else {
            newSlide = (currentSlide + 1) % totalSlides;
        }
        
        // Preparar novo conteúdo fora da visualização
        prepareSlide(newSlide, direction);
        
        // Transição rápida com fade
        slidesContainer.style.transition = 'opacity 0.2s ease';
        slidesContainer.style.opacity = '0';
        
        // Quando a transição de opacidade terminar, trocar o conteúdo
        setTimeout(() => {
            currentSlide = newSlide;
            displayRecommendations(currentSlide);
            
            // Mostrar o novo slide rapidamente
            setTimeout(() => {
                slidesContainer.style.opacity = '1';
            }, 50);
        }, 200);
    }
    
    // Função para preparar o próximo slide (pré-carregamento)
    function prepareSlide(slideIndex, direction) {
        // Calcular quais recomendações serão mostradas no próximo slide
        const startIndex = slideIndex * 2;
        const endIndex = Math.min(startIndex + 2, recommendations.length);
        const nextRecommendations = recommendations.slice(startIndex, endIndex);
    }
    
    // Função para exibir as recomendações na página
    function displayRecommendations(slideIndex) {
        const slidesContainer = document.getElementById('testimonial-slides');
        
        // Limpar o container antes de adicionar novos slides
        slidesContainer.innerHTML = '';
        
        // Determinar quais recomendações mostrar com base no índice do slide
        const startIndex = slideIndex * 2;
        const endIndex = Math.min(startIndex + 2, recommendations.length);
        const currentRecommendations = recommendations.slice(startIndex, endIndex);
        
        // Criar os cards para o slide atual
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        
        // Para cada recomendação, criar um card e adicionar ao slide
        currentRecommendations.forEach((recommendation, index) => {
            // Se for o último card e estiver sozinho (ímpar), fazer ocupar toda a largura
            const isFullWidth = currentRecommendations.length === 1 && recommendations.length % 2 !== 0;
            const card = createRecommendationCard(recommendation, isFullWidth);
            slide.appendChild(card);
        });
        
        slidesContainer.appendChild(slide);
        
        // Verificar se devemos esconder os botões de navegação se houver apenas um slide
        const totalSlides = Math.ceil(recommendations.length / 2);
        const controls = document.querySelectorAll('.testimonial-control');
        
        if (totalSlides <= 1) {
            controls.forEach(control => {
                control.style.display = 'none';
            });
        }
        
        // Após renderizar, verificar e manter altura constante
        setTimeout(maintainConsistentHeight, 100);
    }
    
    // Função para manter altura consistente do carrossel
    function maintainConsistentHeight() {
        const slidesContainer = document.getElementById('testimonial-slides');
        const slide = slidesContainer.querySelector('.testimonial-slide');
        if (!slide) return;
        
        // Obter altura atual do slide
        const currentHeight = slide.offsetHeight;
        
        // Se a altura já foi definida, usar a maior altura
        if (slideHeight > 0) {
            slidesContainer.style.height = `${Math.max(slideHeight, currentHeight)}px`;
        } else {
            // Caso contrário, definir a altura inicial
            slideHeight = currentHeight;
            slidesContainer.style.height = `${slideHeight}px`;
        }
    }
    
    // Função para criar um card de recomendação
    function createRecommendationCard(recommendation, isFullWidth) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        // Adicionar classe para card de largura total quando for o último ímpar
        if (isFullWidth) {
            card.classList.add('full-width');
        }
        
        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-info">
                    <h3 class="testimonial-name">${recommendation.name}</h3>
                    <p class="testimonial-title">${recommendation.title}</p>
                    <p class="testimonial-date">${recommendation.date}</p>
                </div>
            </div>
            <div class="testimonial-content">
                <p>${recommendation.content}</p>
            </div>
        `;
        
        return card;
    }
    
    // Função para exibir mensagem de erro
    function displayErrorMessage() {
        const container = document.getElementById('testimonials-container');
        container.innerHTML = `
            <div class="testimonial-error">
                <div class="testimonial-error-icon">
                    <i class='bx bx-error-circle'></i>
                </div>
                <p>Não foi possível carregar as recomendações.</p>
                <button class="primary-btn" onclick="location.reload()">Tentar novamente</button>
            </div>
        `;
    }
    
    // Lidar com redimensionamento da janela
    window.addEventListener('resize', () => {
        // Resetar altura armazenada e recalcular
        slideHeight = 0;
        setTimeout(maintainConsistentHeight, 100);
    });
    
    // Iniciar o carregamento das recomendações
    loadRecommendations();
    
    // Configurar slide automático a cada 5 segundos (mais rápido que antes)
    let autoSlideInterval = setInterval(() => {
        navigateSlide('next');
    }, 5000);
    
    // Parar o slide automático quando o mouse estiver sobre o carrossel
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.testimonial-carousel-container')) {
            clearInterval(autoSlideInterval);
        }
    });
    
    // Reiniciar o slide automático quando o mouse sair do carrossel
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.testimonial-carousel-container') && !e.relatedTarget?.closest('.testimonial-carousel-container')) {
            autoSlideInterval = setInterval(() => {
                navigateSlide('next');
            }, 5000);
        }
    });
}); 