var data = {
    currentcat: null,

    cats: [
        {
            id: 0,
            name: "lion",
            age: 0,
            img: 'lion.jpeg'
        },
        {
            id: 1,
            name: "tiger",
            age: 0,
            img: "tiger.jpg"
        },
        {
            id: 2,
            name: "blacky",
            age: 0,
            img: "blacky.jpeg"
        },
        {
            id: 3,
            name: "drama",
            age: 0,
            img: "drama.jpg"
        },
        {
            id: 4,
            name: "hunter",
            age: 0,
            img: "hunter.jpg"
        },
        {
            id: 5,
            name: "rusty",
            age: 0,
            img: "rusty.jpeg"
        }

    ]
}
var main = {
    //main Object it will intial renders the all components or sections

    init: function () {
        data.currentcat = data.cats[0];  //default cat would be assign to the currentcat property in the data Object
        sidebarView.init();
        catView.init();
        galleryView.init();
        addCat.init();
        galleryView.domrender()
        sidebarView.focus()
        galleryView.focus();
        addCat.render(data.currentcat)
    },
    getCats: function () {  //this will helps to contact  with the data object==> like getters
        return data.cats
    },
    getClickedCats: function () {  //this will returns the currentcat in the data object
        return data.currentcat;
    }
    ,
    onClick: function (cat) {        //when user select any cat from the sidebar or galleryView item this method will invoke by accepting that specific cat.
        return data.currentcat = cat;// this method will manipulate the currentcat in the data object
    },
    incrementClicks: function () {  //this method will invoke by clicking the center cat/image and it will increments the currentcat age; 
        data.currentcat.age += 1;  //hence there is no state management like redux we should update the DOM elements contents
        catView.render();
        galleryView.domrender()
        catView.renderAge()

    },
    updateTitle: function (val) {
        data.currentcat.name = val;
        sidebarView.renderName(val)
        catView.render();
        galleryView.domrender()
    },
    updateAge: function (val) {
        data.currentcat.age = val;
        sidebarView.renderAge(val)
        catView.render();
        galleryView.domrender()
    },
    updateImg: function (val) {
        data.currentcat.img = val;
        catView.render();
        galleryView.domrender()
    }
}
var sidebarView = {       // this init method will create a DOM elements(cats list) by  dynamically depends on the how many cats are in the data object
    init: function () {
        this.sidebarView = document.querySelector(".catListbar");

        var cats = main.getCats()
        var ul = document.createElement('ul');
        cats.forEach((cats) => {
            var li = document.createElement("li");
            var liname = document.createElement("div")

            li.appendChild(liname)
            liname.setAttribute("id", "liname")
            liname.innerText = cats.name
            li.classList.add("ri")

            this.l1 = document.createElement("div");

            li.appendChild(this.l1);
            this.l1.setAttribute("class", "liStyle")
            this.l1.setAttribute("id", "liStyle")

            this.l1.innerText = cats.age


            li.addEventListener("click", function () {
                main.onClick(cats);
                catView.render();
                addCat.render(cats)
                galleryView.focus()

                var s = document.getElementsByClassName("ri")
                for (let index = 0; index < s.length; index++) {
                    s[index].style.borderColor = ""
                    s[index].style.backgroundColor = ""
                    // s[index].style.filter = "blur(1px)"
                }
                this.style.borderColor = "black"
                this.style.backgroundColor = "#89ada5"
                // this.style.filter = "blur(0px)"
            });
            ul.appendChild(li);
        })
        this.sidebarView.appendChild(ul);
    },
    focus: function () {   //this will focus the current selected cat in the sidebar 
        var s = document.getElementsByClassName("ri")
        for (let index = 0; index < s.length; index++) {
            s[index].style.borderColor = ""
            s[index].style.backgroundColor = ""
            // s[index].style.filter = "blur(1px)"
        }
        s[data.currentcat.id].style.borderColor = "black"
        s[data.currentcat.id].style.backgroundColor = "#89ada5"
        // s[data.currentcat.id].style.filter = "blur(0)"
    },
    renderName: function (val) {            //this will render a catName when user editd from form
        var currentcat = main.getClickedCats();
        var ecat = document.getElementsByClassName("ri")
        var x = ecat[currentcat.id]
        x.querySelector("#liname").innerText = val



    }, renderAge: function (val) {     //this will called when user incress
        var currentcat = main.getClickedCats();
        var ecat = document.getElementsByClassName("ri")
        var x = ecat[currentcat.id]
        x.querySelector("#liStyle").innerText = val
    },

}

var catView = {
    init: function () {//this init method will be do center displayed cat
        this.catcontainer = document.getElementById("displaycenter")
        this.countNum = document.getElementsByClassName("liStyle") //this element is from the sidebar list>age of the cat 
        this.name = document.querySelector('.cat-name');
        this.count = document.querySelector('.count');
        this.ageCate = document.querySelector('.ageCate')
        this.img = document.querySelector('.img');
        this.img.addEventListener("click", function () {
            main.incrementClicks();//increases the current cat age
            sidebarView.focus()
            galleryView.focus()
        })
        this.render()
    },
    render: function () {
        var currentcat = main.getClickedCats();
        this.name.innerText = currentcat.name;
        this.img.src = currentcat.img;
        this.count.innerText = `Number of times clicked:${currentcat.age}`;
        this.countNum[currentcat.id].innerText = currentcat.age//when user clicks the center image, Age in the sidebar will be update
        this.renderAge()

        this.img.addEventListener("click", function () {
            addCat.render(currentcat)//this will updates the name and age in the  form of the current cat by sending current cat
        })

    }, renderAge: function () {//this will render a  status of the cats age
        var currentcat = main.getClickedCats();
        console.log("type", currentcat.id)
        if (currentcat.age >= 0 && currentcat.age <= 5) {
            this.ageCate.innerText = "Infant"
        } else if (currentcat.age >= 6 && currentcat.age <= 12) {
            this.ageCate.innerText = "Child"
        } else if (currentcat.age >= 13 && currentcat.age <= 25) {
            this.ageCate.innerText = "Young"
        } else if (currentcat.age >= 26 && currentcat.age <= 40) {
            this.ageCate.innerText = "Middle-age"
        } else if (currentcat.age >= 41 && currentcat.age <= 60) {
            this.ageCate.innerText = "Old"
        } else if (currentcat.age >= 61) {
            this.ageCate.innerText = "Very Old"
        }
    }


}

var galleryView = {

    init: function () {
        this.galleryItem = document.getElementById("gallery");
        this.render()

    },
    render: function () { //this method will create a card for every cat
        var cats = main.getCats()
        cats.map(data => {

            var gitem = document.createElement("div");
            this.galleryItem.appendChild(gitem);
            gitem.setAttribute("class", "gitem");


            var gname = document.createElement("div")

            gitem.appendChild(gname)
            gname.setAttribute("id", "gstyle")

            var rname = document.createElement("div")
            gname.appendChild(rname)
            rname.setAttribute("id", "rName")

            var lname = document.createElement("div")
            gname.appendChild(lname)
            lname.setAttribute("id", "lName")
            this.img = document.createElement("img")
            this.img.setAttribute("class", "gimg")
            gitem.appendChild(this.img)
            this.img.src = data.img
            gitem.addEventListener("click", function () {
                main.onClick(data);
                catView.render();
                sidebarView.focus()
                addCat.render(data)

                var s = document.getElementsByClassName("gitem")
                for (let index = 0; index < s.length; index++) {
                    s[index].style.border = ""
                    s[index].style.boxShadow = ""

                }
                this.style.border = "5px solid white"
                this.style.boxShadow = "4px 10px 21px 10px rgba(0,0,0,0.75)"
                this.style.filter = "blur(0px)"
            })
            this.domrender(data)

        })

    },
    focus: function () {
        var s = document.getElementsByClassName("gitem")
        for (let index = 0; index < s.length; index++) {
            s[index].style.border = ""
            s[index].style.boxShadow = ""

        }
        s[data.currentcat.id].style.border = "5px solid white"
        s[data.currentcat.id].style.boxShadow = "4px 10px 21px 10px rgba(0,0,0,0.75)"

    },
    domrender: function (currentcatData) {
        var currentcat;
        if (currentcatData) {// this if condition because of currentcat would be  default cat or selected cat

            currentcat = currentcatData;

        } else {
            currentcat = main.getClickedCats();
        }

        var gitem = document.getElementsByClassName("gitem")
        var nameAge = gitem[currentcat.id].querySelector("#gstyle")
        nameAge.querySelector("#rName").innerText = currentcat.name
        nameAge.querySelector("#lName").innerText = `Number of times clicked:${currentcat.age}`
        var nameAge = gitem[currentcat.id].querySelector("img")
        nameAge.src = currentcat.img

    },

}
var addCat = { //this will be belongs to form operations
    init: function () {     //this will access the form atribute for further operatons
        this.catName = document.getElementById("catName")
        this.file = document.getElementById("file")
        this.clicks = document.getElementById("clicks")
        this.filename = document.getElementById("filename")
        this.form = document.getElementsByTagName("form")

    },
    render: function (data) {// this will update the form content when user clicks center cat or default cat
        if (data) {
            this.catName.value = data.name
            this.clicks.value = data.age
            this.filename.innerText = `Image name:${data.img}`
            this.filename.style.color = "black"

        }
    },
    edit: function (event) { // this will be the form submition method
        event.preventDefault()
        main.updateTitle(this.catName.value)
        main.updateAge(Number(this.clicks.value))
        catView.renderAge()
        this.render()
        var file = this.file.files[0]
        if (file) {
            var val = URL.createObjectURL(file);
            main.updateImg(val)
        }

    },
    toggle: function () {
        var b = document.getElementById("toggle")
        if (this.form[0].style.display === "none") {
            this.form[0].style.display = "block"
            b.innerText = "close"
        } else {
            this.form[0].style.display = "none"
            b.innerText = "open"
        }

    }
}
main.init();
