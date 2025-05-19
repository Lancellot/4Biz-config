🛠️ ##Filtro Automático com Melhorias de Usabilidade
Este script JavaScript foi desenvolvido para automatizar e melhorar a usabilidade de um sistema web com filtros de pesquisa, aplicando seleções pré-definidas e pequenas melhorias visuais (CSS). Ele é especialmente útil em sistemas onde o usuário realiza constantemente os mesmos filtros e buscas, como em centrais de atendimento.

🚀 ##Objetivo
O código tem como finalidade:

Aplicar automaticamente filtros de pesquisa predefinidos ao carregar a página.

Selecionar o SLA "Normal".

Selecionar o grupo executor "CADI - Atendimento ao Público Externo - N1".

Acionar automaticamente o botão de pesquisa assim que os elementos estiverem carregados e ativos.

Melhorar a experiência do usuário, reduzindo a repetição de ações manuais.

💡 ##Como Funciona
O script utiliza setInterval para aguardar que os elementos da página estejam completamente carregados.

Uma vez que os elementos de filtro (select) e o botão de pesquisa estejam disponíveis:

Define o SLA como "Normal".

Define o Grupo Executor como "CADI - Atendimento ao Público Externo - N1".

Dispara um clique no botão de pesquisa.

Todas as alterações nos selects disparam eventos para garantir que o sistema reconheça a mudança.
