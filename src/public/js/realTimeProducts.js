const socketClient = io()

const form = document.getElementById("form")

const title = document.getElementById("title")
const description = document.getElementById("description")
const code = document.getElementById("code")
const price = document.getElementById("price")
const stock = document.getElementById("stock")
const category = document.getElementById("category")

const products = document.getElementById("products")

form.onsubmit = (e) => {
    e.preventDefault();

    const product = {
        form: form.value,
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        products: products.value
    };
    socketClient.emit("products", product);
}

socketClient.on('productList', (productList) => {

    const prods = productList.map( (prod) => `<div>
    <h1>${prod.title}</h1>
    <h2>${prod.description}</h2>
    <p>${prod.price} | stock:${prod.stock}</p>
    <p>code: ${prod.code}</p>
    <p>${prod.category}</p>
    <hr>
    </div>` ).join(" ")
    console.log(products)

    products.innerHTML = prods;
})