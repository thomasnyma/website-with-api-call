'use strict'
window.addEventListener('load', function () {
    GetApiData();
    // InfoKasser();
});

const tbl = document.querySelector("#data");
const current_page = window.location.pathname.split("/").pop().replace(".html", "");

function GetApiData() {
    if (current_page == "index") {
        fetchFunk("posts", 12);
    }
    if (current_page == "poster") {
        fetchFunk("posts", 100);
    }
    if (current_page == "profilside") {
        let current = window.location.href.split("?").pop().split("=").pop();
        if (current == "null") {
            window.location.replace("index.html");
        }
        fetchFunk("users/" + current, 1)
    }
}

function fetchFunk(endpoint, amount, title = null) {
    fetch('https://jsonplaceholder.typicode.com/' + endpoint, {method: "get"})
        .then(resp => resp.json())
        .then(data => visData(data, amount, title))
        .catch(err => {
            console.log("Der opstod en fejl");
            console.log(err);
        });
}

function visData(data, amount, title) {
    const tbl = document.querySelector("#data");
    let tblData = '';

    if (current_page == "index") {
        var i;
        for (i = 0; i < amount; i++) {
            tblData += `
                <div class="card-container">
                    <h2 class="card-title">${data[i].title}</h2>
                    <p class="card-body">${data[i].body}</p><span class=""></span>
                    <a class="card-link" href="profilside.html?userid=${data[i].userId}"">View profile</a>
                </div>
             `;
        }
    } else if (current_page == "poster") {
        var i;
        var count = 0;
        if (title != null) {
            document.getElementById("data").innerHTML = "";
            for (i = 0; i < amount; i++) {
                if (data[i].title.includes(title)) {
                    count++;
                    tblData += `

                    <div>
                        <h2 class="card-title">${data[i].title}</h2>
                        
                        <div class="card-body">
                            <p>${data[i].body}</p>
                            <a class="card-link" href="profilside.html?userid=${data[i].userId}">View profile</a>
                        </div>
                    </div>
                 `;
                }
            }
            if (count < 32) {
                document.getElementsByTagName("BODY")[0].id = "shortpage";
            } else {
                document.getElementsByTagName("BODY")[0].removeAttribute("id");
            }
        } else {
            for (i = 0; i < amount; i++) {
                tblData += `

                <li class="poster-item">
                    <h2 class="card-title">${data[i].title}</h2>
                    
                    <div class="card-body">
                       <p>${data[i].body}</p>
                       <a class="card-link" href="profilside.html?userid=${data[i].userId}">View profile</a>
                   </div>
                </li>
             `;
            }
        }
    } else if (current_page == "profilside") {
        tblData += `
                <div class="card-container">
                    <h2 class="card-title">${data.name}</h2>
                        <div class="profile-card">
                            <p>Email:</p>
                            <p>${data.email}</p>

                            <p>Firma:</p>
                            <p>${data.company.name}</p>

                            <p>Catchphrase:</p>
                            <p>${data.company.catchPhrase}</p>

                            <h3 class="card-title">Address:</h3>
                            <span></span>
                            <p>Street:</p>
                            <p>${data.address.street}</p>

                            <p>Suite:</p>
                            <p>${data.address.suite}</p>

                            <p>City:</p>
                            <p>${data.address.city}</p>

                            <p>Zipcode:</p>
                            <p>${data.address.zipcode}</p>

                            <p>Website:</p>
                            <p>${data.website}</p>
                        </div>
                </div>
             `;
    }

    tbl.insertAdjacentHTML('beforeend', tblData);
}

function searchPoster() {
    var title = document.getElementById("posterSearch");
    fetchFunk("posts", 100, title.value);
}

// function InfoKasser() {
//     for(let i = 0;i<document.getElementsByClassName('poster-item').length;i++) {
//         console.log('test');
//         document.getElementsByClassName('poster-item')[i].onclick = InfoKasseSkift;
//     }
// }

// function InfoKasseSkift() {
//     if(this.getElementsByTagName('div')[0].style.display != "block") {
//         this.getElementsByTagName('div')[0].style.display = "block";
//     } else {
//         this.getElementsByTagName('div')[0].style.display = "none";
//     }
// }