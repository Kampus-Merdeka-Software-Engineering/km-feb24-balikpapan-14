const product = [
    {
        name: "Bookcase",
        category: "Furniture",
        price: 2_500_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/bookcase.png?alt=media&token=1692f2f3-9ef2-4ef8-abc6-a03364fbc81f",
    },
    {
        name: "Tables",
        category: "Furniture",
        price: 1_050_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/tables.png?alt=media&token=e3ec9f18-ca3e-427e-92a9-06b6c37f670e",
    },
    {
        name: "Furnishing",
        category: "Furniture",
        price: 640_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/furnishing.png?alt=media&token=9a314b24-f08b-4608-a9ac-00e24bd9b51f",
    },
    {
        name: "Sofas",
        category: "Furniture",
        price: 4_500_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/sofas.png?alt=media&token=1d797492-6e71-4a57-a5ea-0bdf9664b23e",
    },
    {
        name: "Phones",
        category: "Technology",
        price: 9_600_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/phones.png?alt=media&token=df0f2f6e-7ba1-4896-b629-460ea1f004f8",
    },
    {
        name: "Copiers",
        category: "Technology",
        price: 3_500_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/copiers.png?alt=media&token=20e7758b-2af6-4f16-91dd-c9668c47a9d8",
    },
    {
        name: "Accessories",
        category: "Technology",
        price: 15_500_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/accessories.png?alt=media&token=b7992c40-9ea7-404b-94db-4becd03f4939",
    },
    {
        name: "Machines",
        category: "Technology",
        price: 5_000_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/machines.png?alt=media&token=324043fb-cb1b-454e-87fe-b2e8ea663815",
    },
    {
        name: "Envelopes",
        category: "Office Supply",
        price: 100_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/envelopes.png?alt=media&token=e83933c3-ddb3-456b-be60-cce14b447c2d",
    },
    {
        name: "Paper",
        category: "Office Supply",
        price: 10_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/paper.png?alt=media&token=fd258f66-8a98-43da-9d9d-8d4d1e4f4911",
    },
    {
        name: "Storages",
        category: "Office Supply",
        price: 700_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/storages.png?alt=media&token=ecee7be4-9fb8-45ac-8f9d-360b9b54221e",
    },
    {
        name: "Binders",
        category: "Office Supply",
        price: 16_000,
        image: "https://firebasestorage.googleapis.com/v0/b/superstore-product.appspot.com/o/binders.png?alt=media&token=26932e9f-e58d-4de0-95b2-78f931492a90",
    },
];

const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");
console.log(search);
const containerSearch = document.getElementById("container-search");
const isSearch = product.filter((item) =>
    item.name.toLowerCase().includes(search)
);

if (isSearch.length === 0) {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.className = "no-products";
    noProductsMessage.textContent = "Tidak ada barang";
    containerSearch.appendChild(noProductsMessage);
}

isSearch.forEach((product) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement("p");
    name.innerHTML = `<b>${product.name}</b>`;

    const category = document.createElement("p");
    category.className = "category";
    category.textContent = product.category;

    const price = document.createElement("p");
    price.innerHTML = `<b>Rp ${product.price.toLocaleString("id-ID")}</b>`;

    cardContainer.appendChild(img);
    cardContainer.appendChild(name);
    cardContainer.appendChild(category);
    cardContainer.appendChild(price);

    containerSearch.appendChild(cardContainer);
});
