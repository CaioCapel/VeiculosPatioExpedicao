let container;

function carregar() {
    fetch('http://192.168.0.31:8092/REST/VeiculosPatioExpedicao/api/v1/consultaVeiculos')
    .then(response => response.json())
    .then(data => {
        const veiculos = data.veiculos;
        veiculos.forEach(veiculo => {
            container = document.querySelector("#veiculos-container");
            const card = document.createElement("div");
            card.classList.add("card");

            const nomeContainer = document.createElement("div");
            nomeContainer.className = 'nome-container';
            
            const imgNome = document.createElement("img");
            imgNome.src = "./img/nome.png"; // Coloque o caminho da imagem do usuário
            imgNome.alt = "Nome";

            const nome = document.createElement("h3");
            nome.className = 'nome';
            nome.textContent = veiculo.nome;

            nomeContainer.appendChild(imgNome);
            nomeContainer.appendChild(nome);

            const rg = document.createElement("p");
            rg.className = 'rg';
            rg.textContent = veiculo.rg;

            const id_carregamento = document.createElement("p");
            id_carregamento.textContent = veiculo.id_carregamento;
            id_carregamento.className = 'id';

            const status = document.createElement("p");
            status.className = 'status';
            status.textContent = "Status: " + veiculo.status;

            const dados_veiculo = document.createElement("p");
            dados_veiculo.className = 'dados_veiculo';
            

            const dadosPlacaContainer = document.createElement("div");
            dadosPlacaContainer.className = 'dados-container';

            const dados_placa = document.createElement("img");
            dados_placa.className = 'dados_placa';
            dados_placa.src = "./img/placa-de-carro.png";
            dados_placa.alt = "Placa";

            const placa = document.createElement("p");
            placa.textContent = veiculo.placa;
            placa.className = 'dados';

            dadosPlacaContainer.appendChild(dados_placa);
            dadosPlacaContainer.appendChild(placa);

            const dadosDescricaoContainer = document.createElement("div");
            dadosDescricaoContainer.className = 'dados-container';

            const dados_descricao = document.createElement("img");
            dados_descricao.className = 'dados_descricao';
            dados_descricao.src = "./img/caminhao.png";
            dados_descricao.alt = "Descrição";

            const descricao_veiculo = document.createElement("p");
            descricao_veiculo.textContent = veiculo.descricao_veiculo;
            descricao_veiculo.className = 'dados';

            dadosDescricaoContainer.appendChild(dados_descricao);
            dadosDescricaoContainer.appendChild(descricao_veiculo);

            const carregamento = document.createElement("p");
            carregamento.className = 'dados_carregamento';
            carregamento.textContent = "";

            const entradaContainer = document.createElement("div");
            entradaContainer.className = 'entrada-container';

            const dados_entrada = document.createElement("img");
            dados_entrada.className = 'dados_entrada';
            dados_entrada.src = "./img/data-e-hora.png";
            dados_entrada.alt = "Data e Hora Entrada";

            const dt_entrada = document.createElement("p");
            dt_entrada.className = 'entrada';
            dt_entrada.textContent = veiculo.dt_entrada + " " + veiculo.hr_entrada;

            entradaContainer.appendChild(dados_entrada);
            entradaContainer.appendChild(dt_entrada);

            const carregamentoContainer = document.createElement("div");
            carregamentoContainer.className = 'carregamento-container';

            const dados_carga = document.createElement("img");
            dados_carga.className = 'dados_carga';
            dados_carga.src = "./img/data-carregamento.png";
            dados_carga.alt = "Data e Hora Carregamento";
            if (veiculo.dt_carregamento === '00/00/00') {
                dados_carga.style.display = 'none';
                entradaContainer.style.margin = 'auto'
            }

            const dt_carregamento = document.createElement("p");
            dt_carregamento.className = 'carregamento';
            dt_carregamento.textContent = veiculo.dt_carregamento + " " + veiculo.hr_carregamento;
            if (veiculo.dt_carregamento !== '00/00/00') {
                dt_carregamento.textContent = veiculo.dt_carregamento + " " + veiculo.hr_carregamento;
            } else {
                dt_carregamento.style.display = 'none';
            }

            carregamentoContainer.appendChild(dados_carga);
            carregamentoContainer.appendChild(dt_carregamento);

            const portaria = document.createElement("p");
            portaria.className = 'portaria';
            portaria.textContent = veiculo.portaria;


            switch (veiculo.status) {
                case "1":
                    status.textContent = "SEM AUTORIZAÇÃO";
                    card.classList.add("card-vermelho");
                    break;
                case "2":
                    status.textContent = "CARGA LIBERADA";
                    card.classList.add("card-verde");
                    break;
                case "3":
                    status.textContent = "CARGA LIBERADA MANUALMENTE";
                    card.classList.add("card-amarelo");
                    break;
                case "4":
                    status.textContent = "SAÍDA CONTINGÊNCIA";
                    card.classList.add("card-pink");
                    break;
                case "5":
                    status.textContent = "SAÍDA NORMAL";
                    card.classList.add("card-preto");
                    break;
                case "6":
                    status.textContent = "SAÍDA LIBERADA - ENTREGA";
                    card.classList.add("card-branco");
                    break;
                default:
                    card.classList.add("card-cinza");
            }

            card.appendChild(portaria);
            card.appendChild(id_carregamento);
            card.appendChild(nomeContainer);
            card.appendChild(rg);
            card.appendChild(status);
            card.appendChild(dados_veiculo);
            card.appendChild(dadosPlacaContainer);
            card.appendChild(dadosDescricaoContainer);
            card.appendChild(carregamento);
            card.appendChild(entradaContainer);
            card.appendChild(carregamentoContainer);
            container.appendChild(card);

        });
    });
}

setTimeout(function(){
    location.reload();
}, 60000);

document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    var veiculosContainer = document.getElementById("veiculos-container");

    // Verifica se há conteúdo visível e mostra/oculta o loader
    function checkContent() {
        var isVisible = veiculosContainer.offsetHeight > 0;
        loader.style.display = isVisible ? "none" : "block";
    }

    // Executa a verificação inicial
    checkContent();

    // Adiciona um observador de mutação para monitorar mudanças no conteúdo
    var observer = new MutationObserver(checkContent);
    observer.observe(veiculosContainer, { childList: true, subtree: true });
});



carregar();
