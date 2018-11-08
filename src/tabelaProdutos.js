var produtos = [];

function criaTabelaProdutos(temColunaExcluir, pagina) {
    //criando o html com as <tr> e <td>

    var linhasProdutos = "";

    var totalDeRegistros = produtos.length;
    var tamanhoDaPagina  = 10;
    
    var quantidadeDePaginas = Math.ceil(totalDeRegistros / tamanhoDaPagina);
    
    var multiplicaPagina = pagina * tamanhoDaPagina;

    var inicioSlice = multiplicaPagina - tamanhoDaPagina;

    var paginaDeProdutos = produtos.slice(inicioSlice, multiplicaPagina);

    for (var contador = 0;
        contador < paginaDeProdutos.length;
        contador++) {
        linhasProdutos = linhasProdutos + `
            <tr>
                <td>`+ paginaDeProdutos[contador].id + `</td>
                <td>`+ paginaDeProdutos[contador].nome + `</td>
                <td>`+ paginaDeProdutos[contador].descricao + `</td>
                <td>`+ paginaDeProdutos[contador].preco + `</td>
        `;

        if (temColunaExcluir) {
            linhasProdutos = linhasProdutos +
                `<td>
                    <i class="fas fa-edit cP"
                        onclick="editarProduto('` + paginaDeProdutos[contador].id 
                        + `');"> 
                    </i>
                    <i class="fas fa-times cP"
                        onclick="excluirProduto('` + paginaDeProdutos[contador].id 
                        + `','` 
                        + paginaDeProdutos[contador].nome + `');"> 
                    </i>
                </td>`;
        }

        linhasProdutos = linhasProdutos + '</tr>';
    }

    var tabela = document.getElementById("tabelaProdutos");

    var tabelaCorpo = tabela.getElementsByTagName("tbody")[0];

    tabelaCorpo.innerHTML = linhasProdutos;

    var tabelaFoot = tabela.getElementsByTagName("tfoot")[0];

    var rodapeComPaginas = "";

    for(var i = 1; i <= quantidadeDePaginas; i++) {
        rodapeComPaginas = rodapeComPaginas 
            + "<a class='mR10px' href='#' onclick='criaTabelaProdutos(" 
            + temColunaExcluir
            +","
            +i
            +")'>" 
            + i 
            + "</a>";
            //<a href='#' onclick='criaTabelaProdutos(true, 1)'>1</a>
    }

    tabelaFoot.innerHTML = "<tr><td colspan='3'>" 
        + rodapeComPaginas
        + "</td></tr>";

}

function carregaProdutos(mostraExcluir) {
    var request = new XMLHttpRequest();

    //aqui configuramos o request para
    //executar uma funcao ao término
    //da requisição.

    request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            produtos = JSON.parse(this.responseText);
            
            criaTabelaProdutos(mostraExcluir, 1);
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

function editarProduto(idProduto) {
    var produto = produtos.find(function(produtoPercorrido){
        return produtoPercorrido.id == idProduto;
    });

    var campoId = document.getElementById("IdProduto");

    campoId.value = produto.id;

    var campoNome = document.getElementById("Nome");

    campoNome.value = produto.nome;

    var campoDescricao = document.getElementById("Descricao");

    campoDescricao.value = produto.descricao;

    var campoPreco = document.getElementById("Preco");

    campoPreco.value = produto.preco;

    var botao = document.getElementById("botaoAdicionar");

    botao.innerText = "Editar";
}