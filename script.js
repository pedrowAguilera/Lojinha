const itensCarrinho = {}
//guarda os itens do carrinho

let precoGeral = 0

function addCarrinho(itemNome, itemPreco){
    if(itensCarrinho[itemNome]){//verifica se o item ja ta no carrinho
        itensCarrinho[itemNome].quantidade++
        itensCarrinho[itemNome].precoTotal += itemPreco
        console.log("R$" + itensCarrinho[itemNome].precoTotal.toFixed(2))
        itensCarrinho[itemNome].liItem.querySelector('.quantidade').innerHTML = itensCarrinho[itemNome].quantidade
        itensCarrinho[itemNome].liItem.querySelector('.precoTotal').innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2)
        precoGeral +=itemPreco
    } else{
        const liItem = document.createElement('li')
        liItem.innerHTML = `<div class="item">
        <span>${itemNome}</span>
        <button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})">-</button>
        <span class="quantidade">1</span>
        <button class="add" onclick="addCarrinho('${itemNome}', ${itemPreco})">+</button>
        <span class="precoTotal">R$${itemPreco.toFixed(2)}</span>
        </div>`

        document.getElementById('itens-lista').appendChild(liItem)


        itensCarrinho[itemNome] = {
            quantidade: 1,
            precoTotal: itemPreco,
            liItem: liItem
        }
        precoGeral += itemPreco
    }

    console.log('Total: R$'+ precoGeral.toFixed(2))
    document.querySelector('#preco-total').innerHTML = 'Total: R$'+ precoGeral.toFixed(2)

    updateCarrinho()
}

function removeCarrinho(itemNome, itemPreco){
    if(itensCarrinho[itemNome]){//verifica se o item ja ta no carrinho
        if(itensCarrinho[itemNome].quantidade > 1){
            itensCarrinho[itemNome].quantidade--
            itensCarrinho[itemNome].precoTotal -= itemPreco
            itensCarrinho[itemNome].liItem.querySelector('.quantidade').innerHTML = itensCarrinho[itemNome].quantidade
            itensCarrinho[itemNome].liItem.querySelector('.precoTotal').innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2)
            precoGeral -= itemPreco
        }else {
            document.getElementById('itens-lista').removeChild(itensCarrinho[itemNome].liItem)
            delete itensCarrinho[itemNome]
            precoGeral -= itemPreco
        }
        document.querySelector('#preco-total').innerHTML = 'Total: R$'+ precoGeral.toFixed(2)
        updateCarrinho()
    }
}

function updateCarrinho(){
    let cont = 0
    for (let item in itensCarrinho){
        cont += itensCarrinho[item].quantidade
    }
    document.getElementById('cont-carrinho').innerHTML = cont
}

function toggleCarrinho(){
    const itensCarrinhoDiv = document.getElementById('carrinho-itens')

    if(itensCarrinhoDiv.style.display == 'none'){
        itensCarrinhoDiv.style.display = 'block'
    }else{
        itensCarrinhoDiv.style.display = 'none'
    }
}

function limparCarrinho() {
    document.getElementById('itens-lista').innerHTML = ""
    document.getElementById("preco-total").innerHTML = "Valor Total: R$ 0.00"

    for (let itemNome in itensCarrinho) {
        delete itensCarrinho[itemNome]
    }
    updateCarrinho()
}

function buscarProduto(){
    const buscarInput = document.getElementById("buscar-input")
    const produto = document.getElementsByClassName("produto")
    
    for(let i = 0; i<produto.length; i++){
        const produtoNome = produto[i].querySelector("h3").innerText.toLowerCase()

        if(produtoNome.includes(buscarInput.value.toLowerCase())){
            produto[i].style.display = "block"
        } else {
            produto[i].style.display = "none"
        }
    }
}