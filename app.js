let nomesDisponiveis = [];

function sortear() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const nomesInput = document.getElementById('nomes').value;
    
    // Se for o primeiro sorteio ou se reiniciou, carrega todos os nomes
    if (nomesDisponiveis.length === 0) {
        // Limpa e divide os nomes pelo separador de vírgula
        nomesDisponiveis = nomesInput.split(',')
            .map(nome => nome.trim())
            .filter(nome => nome.length > 0);
        
        if (nomesDisponiveis.length === 0) {
            alert("Por favor, insira pelo menos um nome!");
            return;
        }
    }
    
    if (quantidade < 1 || quantidade > nomesDisponiveis.length) {
        alert(`A quantidade deve ser entre 1 e ${nomesDisponiveis.length}!`);
        return;
    }
    
    const sorteados = [];
    
    for (let i = 0; i < quantidade && nomesDisponiveis.length > 0; i++) {
        // Sorteia um índice aleatório
        const indice = Math.floor(Math.random() * nomesDisponiveis.length);
        
        // Adiciona o nome sorteado ao array
        sorteados.push(nomesDisponiveis[indice]);
        
        // Remove o nome sorteado da lista disponível
        nomesDisponiveis.splice(indice, 1);
    }
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Nomes sorteados: ${sorteados.join(', ')}</label>`;
    
    const restantes = document.getElementById('restantes');
    if (nomesDisponiveis.length > 0) {
        restantes.style.display = 'block';
        restantes.innerHTML = `<label class="texto__paragrafo">Nomes restantes: ${nomesDisponiveis.join(', ')}</label>`;
    } else {
        restantes.style.display = 'none';
        alert("Todos os nomes foram sorteados! Reinicie para começar novamente.");
    }
    
    alterarStatusBotao();
}

function alterarStatusBotao() {
    const botao = document.getElementById('btn-reiniciar');
    if (botao.classList.contains('container__botao-desabilitado')) {
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
    } else {
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');
    }
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('nomes').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Nomes sorteados: nenhum até agora</label>';
    document.getElementById('restantes').style.display = 'none';
    nomesDisponiveis = []; // Limpa a lista de nomes disponíveis
    alterarStatusBotao();
}