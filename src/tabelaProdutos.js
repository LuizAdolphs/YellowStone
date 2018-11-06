
function criaTabelaProdutos(produtos, temColunaExcluir) {
    //criando o html com as <tr> e <td>

    var linhasProdutos = "";

    for (var contador = 0;
        contador < produtos.length;
        contador++) {
        linhasProdutos = linhasProdutos + `
            <tr>
                <td>`+ produtos[contador].id + `</td>
                <td>`+ produtos[contador].nome + `</td>
                <td>`+ produtos[contador].descricao + `</td>
                <td>`+ produtos[contador].preco + `</td>
        `;

        if (temColunaExcluir) {
            linhasProdutos = linhasProdutos +
                `<td>
                    <i class="fas fa-times cP"
                        onclick="excluirProduto('` + produtos[contador].id + `','` + produtos[contador].nome + `');"> 
                    </i>
                </td>`;
        }

        linhasProdutos = linhasProdutos + '</tr>';
    }

    var tabela = document.getElementById("tabelaProdutos");

    var tabelaCorpo = tabela.getElementsByTagName("tbody")[0];

    tabelaCorpo.innerHTML = linhasProdutos;
}

function carregaProdutos(mostraExcluir) {
    var request = new XMLHttpRequest();

    //aqui configuramos o request para
    //executar uma funcao ao término
    //da requisição.

    request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var meuJson = JSON.parse(this.responseText);
            
            criaTabelaProdutos(meuJson, mostraExcluir);
        }
    });

    //Aqui informamos o verbo HTTP e o endereço

    request.open("GET", urlBase + "/products");

    //Aqui setamos o cabeçalho com o tipo de requisição a ser feita

    request.setRequestHeader("content-type","application/json");

    //Finalmente executando o request

    request.send();
}

function excluirProduto(idProduto, nome) {

    if (confirm("Você deseja deletar o produto " + nome + "?")) {  

        var request = new XMLHttpRequest();

        request.addEventListener("readystatechange", function(){
            if (this.readyState === this.DONE) {
                carregaProdutos(true);
            }
        });

        request.open("DELETE", urlBase + "/products/" + idProduto);

        request.send();
    }
}
