(function () {
  const interval = setInterval(() => {
    const slaSelect = document.getElementById('select-filtro-tarefa-sla');
    const grupoSelect = document.getElementById('select-grupo-executor');
    const botaoPesquisar = document.getElementById('button-filtro-pesquisar');

    if (slaSelect && slaSelect.options.length > 0 &&
        grupoSelect && grupoSelect.options.length > 0 &&
        botaoPesquisar) {

      clearInterval(interval);

   
      Array.from(slaSelect.options).forEach(option => option.removeAttribute('selected'));
      const normalOption = Array.from(slaSelect.options).find(option => option.text.trim() === 'Normal');
      if (normalOption) {
        normalOption.setAttribute('selected', 'selected');
        slaSelect.value = normalOption.value;
        slaSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      
      Array.from(grupoSelect.options).forEach(option => option.removeAttribute('selected'));
      const cadiOption = Array.from(grupoSelect.options).find(option =>
        option.text.trim() === 'CADI - Atendimento ao Público Externo - N1'
      );
      if (cadiOption) {
        cadiOption.setAttribute('selected', 'selected');
        grupoSelect.value = cadiOption.value;
        grupoSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

     
      const clickInterval = setInterval(() => {
        if (!botaoPesquisar.disabled) {
          clearInterval(clickInterval);
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          botaoPesquisar.dispatchEvent(clickEvent);
          console.log('✅ Botão clicado com sucesso!');
        } else {
          console.log('⏳ Aguardando botão ser ativado...');
        }
      }, 100); 
    }
  }, 100);
})();
