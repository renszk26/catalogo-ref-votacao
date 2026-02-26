document.addEventListener("DOMContentLoaded", () => {
    const catalogoContainer = document.getElementById("catalogo");
    const modal = document.getElementById("modal-imagem");
    const imgAmpliada = document.getElementById("imagem-ampliada");
    const btnFechar = document.querySelector(".fechar-modal");

    // COLE O LINK DA SUA PLANILHA AQUI (Mantenha as aspas)
    const linkDaPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSaggyezHe-tZyismfRt9qKNL9I24wHeCXB29ibaI4AjDki368qJ6k0mi-t0_5-Uvcbm-3C6fBwHzaX/pub?output=csv";

    // Agora o fetch vai ler o link da planilha no formato CSV
    fetch(linkDaPlanilha)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro ao ler a planilha.");
            }
            return resposta.text(); // Lemos como texto em vez de JSON
        })
        .then(dadosCSV => {
            // Transforma o texto do CSV em uma lista para o JavaScript
            const linhas = dadosCSV.split('\n').filter(linha => linha.trim() !== '');
            linhas.shift(); // Remove a primeira linha (o cabeçalho "id, imagem")

            linhas.forEach(linha => {
                // Separa o ID e o link da imagem (que estão divididos por vírgula no CSV)
                // Usamos um truque aqui caso o link da imagem tenha alguma vírgula no meio
                const partes = linha.split(',');
                const id = partes[0].trim();
                const imagem = partes.slice(1).join(',').trim(); // Junta o resto que é a imagem

                // A partir daqui, é a mesma lógica de antes para criar o card
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <div class="numero-card">${id}</div>
                    <img src="${imagem}" alt="Camiseta ${id}">
                `;

                // Ação para abrir o modal com a imagem em tela cheia
                card.addEventListener("click", () => {
                    imgAmpliada.src = imagem;
                    modal.style.display = "flex";
                });

                catalogoContainer.appendChild(card);
            });
        })
        .catch(erro => {
            console.error(erro);
            catalogoContainer.innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar o catálogo. Verifique o link da planilha.</p>";
        });

    // Fechar o modal no botão X
    btnFechar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fechar o modal clicando fora da imagem
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });
});