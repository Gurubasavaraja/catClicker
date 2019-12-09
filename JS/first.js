var item = document.getElementById("catListbar");
var galleryItem = document.getElementById("gallery")
var displayImage = document.getElementById("displaycenter")
var data = {
    cats: [
        {
            name: "lion",
            age: 24,
            image: 'lion.jpeg'
        },
        {
            name: "tiger",
            age: 30,
            image: "tiger.jpg"
        },
        {
            name: "blacky",
            age: 30,
            image: "blacky.jpeg"
        },
        {
            name: "drama",
            age: 30,
            image: "drama.jpg"
        },
        {
            name: "hunter",
            age: 30,
            image: "hunter.jpg"
        },
        {
            name: "rusty",
            age: 30,
            image: "rusty.jpeg"
        }

    ]
}


var onClicks = () => {
    var s = data.cats.findIndex(({ name }) => name === "drama")
    data.cats[s].age = +1


}
var addCat = () => {
    data.cats.map(data => {
        var cats = document.createElement("div");
        item.appendChild(cats);
        cats.setAttribute("class", "ri");
        var r1 = document.createElement("div");
        var l1 = document.createElement("div");
        cats.appendChild(r1);
        cats.appendChild(l1);
        l1.setAttribute("class", "liStyle")
        r1.innerText = `${data.name}`
        l1.innerText = `${data.age}`
        var img = data.image
        cats.addEventListener("click", () => GFG_Fun(img))
    })
    onGallery()
}
function GFG_Fun(img) {
    var dimage = document.getElementById("dImages")
    dimage.src = img
    document.createElement("div")
    onClicks()
}

function onGallery() {
    data.cats.map(data => {
        var gitem = document.createElement("div");
        galleryItem.appendChild(gitem);
        gitem.setAttribute("class", "gitem");
        var img = document.createElement("img")
        gitem.appendChild(img)
        img.src = data.image
        var img = data.image
        gitem.addEventListener("click", () => GFG_Fun(img))
    })
}