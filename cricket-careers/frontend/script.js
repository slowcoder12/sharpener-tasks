let isEditing = false;
let currentPlayerId = null; 

const form = document.querySelector('#player-info');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!isEditing) {
        
        const name = document.getElementById("name").value;
        const dob = document.getElementById("dob").value;
        const photourl = document.getElementById("photourl").value;
        const birthplace = document.getElementById("birthplace").value;
        const career = document.getElementById("career").value;
        const matches = document.getElementById("matches").value;
        const score = document.getElementById("score").value;
        const fifties = document.getElementById("fifties").value;
        const centuries = document.getElementById("centuries").value;
        const wickets = document.getElementById("wickets").value;
        const average = document.getElementById("average").value;

        const player = {
            name, dob, photourl, birthplace, career, matches, score, fifties, centuries, wickets, average
        };

        console.log(player);

        axios.post('http://localhost:3000/addPlayer', player)
            .then((response) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });

      
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("photourl").value = "";
        document.getElementById("birthplace").value = "";
        document.getElementById("career").value = "";
        document.getElementById("matches").value = "";
        document.getElementById("score").value = "";
        document.getElementById("fifties").value = "";
        document.getElementById("centuries").value = "";
        document.getElementById("wickets").value = "";
        document.getElementById("average").value = "";
    } else {
        
        const updatedPlayer = {
            name: document.getElementById("name").value,
            dob: document.getElementById("dob").value,
            photourl: document.getElementById("photourl").value,
            birthplace: document.getElementById("birthplace").value,
            career: document.getElementById("career").value,
            matches: document.getElementById("matches").value,
            score: document.getElementById("score").value,
            fifties: document.getElementById("fifties").value,
            centuries: document.getElementById("centuries").value,
            wickets: document.getElementById("wickets").value,
            average: document.getElementById("average").value
        };

        axios.put(`http://localhost:3000/updatePlayer/${currentPlayerId}`, updatedPlayer)
            .then((response) => {
                console.log(response);
                console.log("Entered here");
            })
            .catch(err => {
                console.log("Error occurred here", err);
            });

       
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("photourl").value = "";
        document.getElementById("birthplace").value = "";
        document.getElementById("career").value = "";
        document.getElementById("matches").value = "";
        document.getElementById("score").value = "";
        document.getElementById("fifties").value = "";
        document.getElementById("centuries").value = "";
        document.getElementById("wickets").value = "";
        document.getElementById("average").value = "";

        editPlayer(updatedPlayer);

        isEditing = false; 
        currentPlayerId = null;
    }
});

const searchForm = document.getElementById('search-info');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('search-name').value;

    axios.get(`http://localhost:3000/searchPlayer/${name}`)
        .then((response) => {
            const playerData = response.data;
            const playerId = playerData.id;

            const displaydiv = document.getElementById('player-data');
           

            displaydiv.innerHTML = `
                <div class= first>
                <div class = "name-dob">
                <img src="${playerData.photourl}">
                <p>Name: ${playerData.name} </p>
                <p>Date of Birth: ${playerData.dob}</p>
                </div>
                <div class = "edit"><button id="edit-btn">Edit</button></div>
                </div>
                <div class = "total">
               <div class = "left">
                <h3>Personal information</h3>
                <p>Birthplace: ${playerData.birthplace}</p>
                <p>Matches: ${playerData.matches}</p>
                <p>Score: ${playerData.score}</p>
                <p>Fifties: ${playerData.fifties}</p>
                <p>Centuries: ${playerData.centuries}</p>
                <p>Wickets: ${playerData.wickets}</p>
                <p>Average: ${playerData.average}</p> </div>
                <div class="career">
                <p>Career: ${playerData.career}</p>
                </div>
                
                </div>
                `;

         const editBtn = displaydiv.querySelector('#edit-btn');

            editBtn.addEventListener('click', function () {
                isEditing = true; 
                currentPlayerId = playerId; 
                editPlayer(playerData);
            });
        })
        .catch(err => {
            console.log(err);
        });
});

function editPlayer(playerData) {
    
    document.getElementById("name").value = playerData.name;
    document.getElementById("dob").value = playerData.dob;
    document.getElementById("photourl").value = playerData.photourl;
    document.getElementById("birthplace").value = playerData.birthplace;
    document.getElementById("career").value = playerData.career;
    document.getElementById("matches").value = playerData.matches;
    document.getElementById("score").value = playerData.score;
    document.getElementById("fifties").value = playerData.fifties;
    document.getElementById("centuries").value = playerData.centuries;
    document.getElementById("wickets").value = playerData.wickets;
    document.getElementById("average").value = playerData.average;
    const displaydiv = document.getElementById('player-data');
    displaydiv.innerHTML = `<h2>Player info</h2>
        <p>Name: ${playerData.name} </p>
        <p>Date of Birth: ${playerData.dob}</p>
        <p>Photo URL: ${playerData.photourl}</p>
        <p>Birthplace: ${playerData.birthplace}</p>
        <p>Career: ${playerData.career}</p>
        <p>Matches: ${playerData.matches}</p>
        <p>Score: ${playerData.score}</p>
        <p>Fifties: ${playerData.fifties}</p>
        <p>Centuries: ${playerData.centuries}</p>
        <p>Wickets: ${playerData.wickets}</p>
        <p>Average: ${playerData.average}</p>`;



        displaydiv.innerHTML = `
                <div class= first>
                <div class = "name-dob">
                <img src="${playerData.photourl}">
                <p>Name: ${playerData.name} </p>
                <p>Date of Birth: ${playerData.dob}</p>
                </div>
                <div class = "edit"><button id="edit-btn">Edit</button></div>
                </div>
                <div class = "total">
               <div class = "left">
                <h3>Personal information</h3>
                <p>Birthplace: ${playerData.birthplace}</p>
                <p>Matches: ${playerData.matches}</p>
                <p>Score: ${playerData.score}</p>
                <p>Fifties: ${playerData.fifties}</p>
                <p>Centuries: ${playerData.centuries}</p>
                <p>Wickets: ${playerData.wickets}</p>
                <p>Average: ${playerData.average}</p> </div>
                <div class="career">
                <p>Career: ${playerData.career}</p>
                </div>
                
                </div>
                `;
}
