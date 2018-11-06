var produtos = [];

window.onload = function () {
    criaMenu();

    carregaProdutos(true);

    var formulario = document.getElementById("formularioProduto");

    formulario.addEventListener("submit", function(evento){
        evento.preventDefault();

        var dadosForm = new FormData(evento.target);

        // for(var campo of dadosForm) {
        //     alert(campo.join(": "));
        // }
        
        if (dadosForm.get("Nome") == "") {
            
            alert(`Você precisa URGENTEMENTE preencher o campo 
            'nome'!!`);

            return;
        } else if(dadosForm.get("Nome").length < 3) {
            alert(`O nome tem que ter mais de 3 letras.`);

            return;
        }

        /*  o codigo abaixo está obsoleto
            devido ao fato que agora usamos
            uma API pra salvar os produtos,
            e não é possivel adicionar um produto 
            com o mesmo ID (como era possível no array)

        // - o ID não pode ser repetido
        // - antes de adicionar, buscar
        //   no array algum produto
        //   cujo o id seja igual
        //   ao dadosForm.get("ID").
        //   se achar esse produto,
        //   dar um return e parar de adicionar

        
        var indiceProdutoEncontrado = produtos
            .findIndex(function(prod){
                return prod.id == dadosForm.get("ID");
            });
        
        if (indiceProdutoEncontrado >= 0) {
            alert("ID já utilizado");
            return;
        }
        */

        var novoProduto = new produto(
            dadosForm.get("Nome"),
            dadosForm.get("Descricao"),
            dadosForm.get("Preco")
        );

        //faleceu ==> produtos.push(novoProduto);

        //agora criamos na API, magnata

        var request = new XMLHttpRequest();

        request.addEventListener("readystatechange", function(){
            if (this.readyState === this.DONE) {
                carregaProdutos(true);
            }
        });

        request.open("POST", urlBase + "/products");

        request.setRequestHeader("content-type"
            ,"application/json");

        var meuTexto = JSON.stringify(novoProduto);

        request.send(meuTexto);

        //limpar o form
        evento.target.reset();
        
        criaTabelaProdutos(produtos, true);
    });
}

var produto = function (id, nome, descricao, preco) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;

    return this;
}
