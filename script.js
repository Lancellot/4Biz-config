(function () {
 
  function selecionarOpcaoPorTexto(selectElement, texto) {
    if (!selectElement) return;

    Array.from(selectElement.options).forEach(option => option.removeAttribute('selected'));

    const option = Array.from(selectElement.options).find(opt => opt.text.trim() === texto);
    if (option) {
      option.setAttribute('selected', 'selected');
      selectElement.value = option.value;
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  
  const filtroInterval = setInterval(() => {
    const slaSelect = document.getElementById('select-filtro-tarefa-sla');
    const grupoSelect = document.getElementById('select-grupo-executor');
    const botaoPesquisar = document.getElementById('button-filtro-pesquisar');

    const elementosCarregados = slaSelect?.options.length > 0 &&
                                grupoSelect?.options.length > 0 &&
                                botaoPesquisar;

    if (elementosCarregados) {
      clearInterval(filtroInterval);

      
      selecionarOpcaoPorTexto(slaSelect, 'Normal');
      selecionarOpcaoPorTexto(grupoSelect, 'CADI - Atendimento ao Público Externo - N1');

      
      const clickInterval = setInterval(() => {
        if (!botaoPesquisar.disabled) {
          clearInterval(clickInterval);
          botaoPesquisar.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          }));
          console.log('✅ Botão de pesquisa clicado com sucesso!');
        } else {
          console.log('⏳ Aguardando botão de pesquisa ser ativado...');
        }
      }, 100);
    }
  }, 100);
})();


window.addEventListener('load', () => {
  setInterval(() => {
    const refreshButton = document.getElementById('button-list-refresh-lista');
    if (refreshButton && !refreshButton.disabled) {
      refreshButton.click();
      console.log('️ Lista atualizad.');
    }
  }, 20000); 
});
