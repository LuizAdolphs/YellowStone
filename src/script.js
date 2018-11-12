var urlBase = "http://5bbe7b6a72de1d00132535f2.mockapi.io/ys/api/v1";

function criaMenu() {
    var menuSite = $("#menuSite");

    /*acento grave para strings de multiplas linhas*/

    var itens = [
        new itemDoMenu("index.html", "Home"),
        new itemDoMenu("produtos.html", "Produtos"),
        new itemDoMenu("cadastro.html", "Cadastro")
    ];

    var arrayDeLi = itens.map(function (itemCorrente) {
        return `<li>
        <a href="`+ itemCorrente.endereco + `">`
            + itemCorrente.descricao + `</a>
        </li>`;
    });

    var concatenado = arrayDeLi.join("");

    var htmlDoMenu = `
    <ul class="menu" > <!-- ul é de unsorted list, ou lista desordenada -->
    `+ concatenado + `
    </ul>`;

    menuSite.html(htmlDoMenu);
}

var itemDoMenu = function (endereco, descricao) {

    this.endereco = endereco;
    this.descricao = descricao;

    return this;
}