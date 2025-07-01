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

  function tornarArrastavel(elemento) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // Detectar clique fora de elementos interativos
    elemento.addEventListener('mousedown', function (e) {
      const tag = e.target.tagName.toLowerCase();
      if (['select', 'option', 'input', 'button', 'textarea', 'label'].includes(tag)) {
        return; // não inicia arraste
      }

      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = pararArraste;
      document.onmousemove = moverElemento;
    });

    function moverElemento(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elemento.style.top = (elemento.offsetTop - pos2) + "px";
      elemento.style.left = (elemento.offsetLeft - pos1) + "px";
    }

    function pararArraste() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function criarBotaoFlutuante() {
    const container = document.createElement('div');
    container.id = 'grupo-flutuante';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.left = '20px';
    container.style.zIndex = '9999';
    container.style.background = 'white';
    container.style.border = '1px solid #ccc';
    container.style.padding = '10px';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    container.style.fontFamily = 'sans-serif';
    container.style.cursor = 'move';

    const label = document.createElement('label');
    label.textContent = 'Grupo: ';
    label.setAttribute('for', 'seletor-grupo');

    const seletor = document.createElement('select');
    seletor.id = 'seletor-grupo';
    seletor.style.cursor = 'default'; // mantém o ponteiro padrão no select

    const opcoes = [
      '-- Escolha o grupo --',
      'CADI - Atendimento ao Público Externo - N1',
      'CADI - Atendimento 1º Grau Interior - N1',
      'CADI - Atendimento 1º Grau Poa - N1',
      'CADI - Reclassificar',
      "CADI - Atendimento Sistemas Administrativos - N1"
    ];

    opcoes.forEach(texto => {
      const opt = document.createElement('option');
      opt.textContent = texto;
      seletor.appendChild(opt);
    });

    seletor.addEventListener('change', () => {
      const grupoSelect = document.getElementById('select-grupo-executor');
      const botaoPesquisar = document.getElementById('button-filtro-pesquisar');
      if (grupoSelect && seletor.value && seletor.value !== '-- Escolha o grupo --') {
        selecionarOpcaoPorTexto(grupoSelect, seletor.value);
        if (!botaoPesquisar.disabled) {
          botaoPesquisar.click();
        }
      }
    });

    container.appendChild(label);
    container.appendChild(seletor);
    document.body.appendChild(container);

    tornarArrastavel(container);
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

      criarBotaoFlutuante();
    }
  }, 100);

  window.addEventListener('load', () => {
    setInterval(() => {
      const refreshButton = document.getElementById('button-list-refresh-lista');
      if (refreshButton && !refreshButton.disabled) {
        refreshButton.click();
        console.log('️Lista atualizada.');
      }
    }, 20000);
  });
})();
