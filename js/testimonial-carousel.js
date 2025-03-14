/**
 * Testimonial Carousel Script
 * Este script controla o carrossel de recomendações
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel
    const carousel = document.querySelector('.testimonial-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const indicators = document.querySelector('.testimonial-indicators');
    
    // Variáveis de controle
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Não inicializar se não houver cards
    if (!carousel || cards.length === 0) return;
    
    // Criar indicadores
    cards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('testimonial-indicator');
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        
        indicators.appendChild(indicator);
    });
    
    // Atualizar indicadores
    const updateIndicators = () => {
        const allIndicators = document.querySelectorAll('.testimonial-indicator');
        allIndicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };
    
    // Ir para um slide específico
    const goToSlide = (index) => {
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;
        
        // Calcular a posição do slide
        const cardWidth = cards[0].offsetWidth;
        const offset = -currentIndex * cardWidth;
        
        // Aplicar a transformação
        carousel.style.transform = `translateX(${offset}px)`;
        
        // Atualizar indicadores
        updateIndicators();
    };
    
    // Eventos de botões
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Eventos de toque para dispositivos móveis
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // Lidar com o gesto de swipe
    const handleSwipe = () => {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda (próximo)
            goToSlide(currentIndex + 1);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita (anterior)
            goToSlide(currentIndex - 1);
        }
    };
    
    // Ajustar o carrossel quando a janela for redimensionada
    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });
    
    // Inicializar o carrossel
    goToSlide(0);
    
    // Auto-play opcional (descomente para ativar)
    /*
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    */
}); 