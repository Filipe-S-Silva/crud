
function adicionarCliente() {
    //chamando os elementos html
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;
    let tabela = document.getElementById('listaClientes');
    
    //validacao campos vazios
    if (nome === '' || telefone === '' || email === '') {
        alert('Preencha todos os campos!');
        return;
    }
    
    //validacao telefone
    if(telefone.length !== 15){
        alert('Numero incompleto')
        return;
    }
    
    //criacao de uma nova tabela
    let novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).innerText = nome;
    novaLinha.insertCell(1).innerText = telefone;
    novaLinha.insertCell(2).innerText = email;
    //criação do btnExcluir
    let acaoCell = novaLinha.insertCell(3);
    let botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.classList.add('btn-excluir');

    botaoExcluir.onclick = function () {
        document.getElementById('dialog').style.display = 'flex'
        document.getElementById('title').textContent = `PARA EXCLUIR O CLIENTE ${novaLinha.cells[0].innerText} DIGITE O CODIGO ABAIXO: `
        const codigoGerado =  gerarStringAleatoria();
        document.getElementById('code').textContent = codigoGerado
        const btnExcluir = document.getElementById('btn')
        
        btnExcluir.onclick = function () {
            const codigoDigitado = document.getElementById('txt').value

            if (codigoGerado == codigoDigitado) {
                tabela.deleteRow(novaLinha.rowIndex - 1);   
                document.getElementById('dialog').style.display = 'flex'             
                alert('cliente foi deletado')
            } else {
                alert('cliente não foi deletado')
            }            
        }
        

    };

    acaoCell.appendChild(botaoExcluir);
    
    //limpaTela
    limparInputs() 
    
}

function formatarTelefone(input) {
    let telefone = input.value.replace(/\D/g, "");

    if (telefone.length > 11) {
        telefone = telefone.slice(0, 11); 
      }

    if (telefone.length <= 2) {
      telefone = telefone.replace(/^(\d{0,2})/, "($1");
    } else if (telefone.length <= 6) {
      telefone = telefone.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    input.value = telefone;
}

function limparInputs() {
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
}

function gerarStringAleatoria() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let resultado = "";
    let tamanho = Math.floor(Math.random() * 13)
    if (tamanho < 6) {
        tamanho = 6
    }
    for (let i = 0; i < tamanho; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return resultado;
}