document.addEventListener("DOMContentLoaded", () => {
    const catalogoContainer = document.getElementById("catalogo");
    
    // Pega os elementos do Modal que acabamos de criar no HTML
    const modal = document.getElementById("modal-imagem");
    const imgAmpliada = document.getElementById("imagem-ampliada");
    const btnFechar = document.querySelector(".fechar-modal");

    fetch("dados.json")
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro ao carregar os dados.");
            }
            return resposta.json();
        })
        .then(camisetas => {
            camisetas.forEach(camiseta => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <div class="numero-card">${camiseta.id}</div>
                    <img src="${camiseta.imagem}" alt="Camiseta ${camiseta.id}">
                `;

                // NOVO: Adiciona a ação de clique no card
                card.addEventListener("click", () => {
                    imgAmpliada.src = camiseta.imagem; // Copia a imagem do card para o modal
                    modal.style.display = "flex"; // Mostra o modal na tela
                });

                catalogoContainer.appendChild(card);
            });
        })
        .catch(erro => {
            console.error(erro);
            catalogoContainer.innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar o catálogo.</p>";
        });

    // NOVO: Ação para fechar o modal clicando no botão X
    btnFechar.addEventListener("click", () => {
        modal.style.display = "none"; // Esconde o modal
    });

    // NOVO: Ação para fechar o modal se o usuário clicar fora da imagem (no fundo escuro)
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });
});