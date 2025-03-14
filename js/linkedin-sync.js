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