# Painel Administrativo de Recomendações do LinkedIn

Este painel administrativo permite gerenciar as recomendações do LinkedIn que serão exibidas no seu portfólio, sem a necessidade de modificar o código-fonte.

## Como acessar

1. Acesse o painel administrativo através do link no canto superior direito da seção de recomendações do seu portfólio.
2. Digite a senha de acesso (padrão: `admin123`).

## Funcionalidades

### Adicionar recomendações

1. Preencha o formulário com os detalhes da recomendação:
   - Nome do autor
   - Cargo/Posição
   - Data (mês e ano)
   - Relacionamento com você
   - Texto da recomendação
   - URL do perfil no LinkedIn (opcional)

2. Clique em "Adicionar Recomendação" para salvar.

### Editar recomendações

1. Clique no botão "Editar" na recomendação que deseja modificar.
2. O formulário será preenchido com os dados da recomendação.
3. Faça as alterações necessárias.
4. Clique em "Atualizar Recomendação" para salvar as alterações.

### Excluir recomendações

1. Clique no botão "Excluir" na recomendação que deseja remover.
2. Confirme a exclusão na caixa de diálogo.

## Exibição no portfólio

- As 3 recomendações mais recentes serão exibidas automaticamente no seu portfólio.
- As recomendações são ordenadas pela data de adição/atualização (mais recentes primeiro).
- As recomendações são armazenadas localmente no navegador (localStorage).

## Segurança

- A senha padrão é `admin123`. Recomendamos alterar esta senha no código-fonte do arquivo `linkedin-sync-panel.html`.
- Este sistema utiliza armazenamento local (localStorage) para salvar as recomendações. Isso significa que as recomendações são armazenadas apenas no navegador do usuário.
- Para maior segurança em ambiente de produção, considere implementar um sistema de autenticação mais robusto e armazenamento em servidor.

## Personalização

Você pode personalizar o painel administrativo editando o arquivo `linkedin-sync-panel.html`. Algumas personalizações possíveis:

- Alterar a senha de acesso (variável `ADMIN_PASSWORD`)
- Modificar o número de recomendações exibidas no portfólio (variável `maxRecommendations` no arquivo `js/linkedin-sync.js`)
- Personalizar as cores e estilos do painel

## Suporte

Se encontrar algum problema ou tiver dúvidas sobre o uso do painel administrativo, entre em contato com o desenvolvedor. 