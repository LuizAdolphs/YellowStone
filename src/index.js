window.onload = function () {
    criaMenu();
    carregaEstados();
}

function carregaEstados(){

    document.getElementById("cidades").innerHTML ="";

    var request = new XMLHttpRequest();

    request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var meuJson = JSON.parse(this.responseText);
            
            var options = "<option>Selecione o estado</option>";

            for (var indice = 0; 
                indice < meuJson.length; 
                indice++) {
                
                options = options + "<option value='"+meuJson[indice].id +"' >" + meuJson[indice].state + "</option>"
            }

            var select = "<select name='estados' onchange='carregaCidades(this)'>"+options+"</select>";

            document.getElementById("estados").innerHTML = select;
        }
    });

    request.open("GET", urlBase + "/states");

    request.setRequestHeader("content-type","application/json");

    request.send();
}

function carregaCidades(selectDeEstados){

    var idEstado = selectDeEstados.value;

    var request = new XMLHttpRequest();

    request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var meuJson = JSON.parse(this.responseText);
            
            meuJson = meuJson.filter(function(cidade){
                return cidade.id_estado == idEstado;
            });

            var options = "";

            for (var indice = 0; 
                indice < meuJson.length; 
                indice++) {
                
                options = options + "<option value='"+meuJson[indice].id+"'>" + meuJson[indice].nome + "</option>"
            }

            var select = "<select name='cidades' >"+options+"</select>";

            document.getElementById("cidades").innerHTML = select;
        }
    });

    request.open("GET", urlBase + "/cities");

    request.setRequestHeader("content-type","application/json");

    request.send();
}