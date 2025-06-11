let nomesDisponiveis = [];
let todosNomesInseridos = [];

function sortear() {
    // Obter valores dos campos
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const nomesInput = document.getElementById('nomes').value.trim();
    
    // Se não há nomes disponíveis, carregar novos
    if (nomesDisponiveis.length === 0) {
        if (nomesInput === '') {
            alert("Por favor, insira novos nomes para sortear!");
            return false;
        }
        
        // Processar novos nomes
        todosNomesInseridos = nomesInput.split(',')
            .map(nome => nome.trim())
            .filter(nome => nome !== '');
            
        if (todosNomesInseridos.length === 0) {
            alert("Nenhum nome válido foi inserido!");
            return false;
        }
        
        // Resetar lista disponível
        nomesDisponiveis = [...todosNomesInseridos];
        document.getElementById('nomes').value = ''; // Limpar campo
    }
    
    // Validar quantidade
    if (isNaN(quantidade) || quantidade < 1 || quantidade > nomesDisponiveis.length) {
        alert(`Insira uma quantidade entre 1 e ${nomesDisponiveis.length}!`);
        return false;
    }
    
    // Realizar sorteio
    const sorteados = [];
    
    for (let i = 0; i < quantidade; i++) {
        const indice = Math.floor(Math.random() * nomesDisponiveis.length);
        sorteados.push(nomesDisponiveis[indice]);
        nomesDisponiveis.splice(indice, 1);
    }
    
    // Exibir resultados
    exibirResultados(sorteados);
    
    // Verificar se acabaram os nomes
    if (nomesDisponiveis.length === 0) {
        setTimeout(() => {
            alert("Todos os nomes foram sorteados! Insira novos nomes para continuar.");
        }, 500);
    }
    
    // Ativar botão reiniciar
    document.getElementById('btn-reiniciar').classList.remove('disabled');
    return true;
}

function exibirResultados(sorteados) {
    const resultado = document.getElementById('resultado');
    const restantes = document.getElementById('restantes');
    
    // Exibir sorteados
    resultado.innerHTML = `
        <div class="sorteado-container">
            <span class="texto__paragrafo">Nomes sorteados:</span>
            ${sorteados.map(nome => `
                <div class="sorteado-destaque">${nome}</div>
            `).join('')}
        </div>
    `;
    
    // Exibir restantes (se houver)
    if (nomesDisponiveis.length > 0) {
        restantes.style.display = 'flex';
        restantes.innerHTML = `
            <i class="fas fa-list-ol"></i>
            <span>Nomes restantes: ${nomesDisponiveis.join(', ')}</span>
        `;
    } else {
        restantes.style.display = 'none';
    }
}

function reiniciar() {
    // Resetar todos os campos e variáveis
    document.getElementById('quantidade').value = '';
    document.getElementById('nomes').value = '';
    document.getElementById('resultado').innerHTML = `
        <i class="fas fa-trophy"></i>
        <span>Nomes sorteados: nenhum até agora</span>
    `;
    document.getElementById('restantes').style.display = 'none';
    
    nomesDisponiveis = [];
    todosNomesInseridos = [];
    
    // Desativar botão reiniciar
    document.getElementById('btn-reiniciar').classList.add('disabled');
}