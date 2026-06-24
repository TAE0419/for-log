const cloverWrap = document.querySelector(".cloverWarp");

if (cloverWrap) {
    for (let i = 1; i <= 10; i++) {
        const num = String(i).padStart(2, "0");
        const object = document.createElement("object");

        object.type = "image/svg+xml";
        object.data = `./img/forlog-forlog_products/clover-products${num}.svg`;

        cloverWrap.appendChild(object);
    }
}
