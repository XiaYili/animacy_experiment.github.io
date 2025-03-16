// JavaScript experiment for testing noun class and pronoun agreement with stimuli, images, and user interaction

var nouns = {
    "+Animate, +Masculine": ["bino-nu", "simu-nu", "moru-nu", "hasi-nu", "kina-nu", "jufa-nu", "ravi-nu", "lona-nu"],
    "+Animate, -Masculine": ["wara-ni", "tulu-ni", "piro-ni", "wetu-ni", "fone-ni", "heku-ni", "kura-ni", "gela-ni"],
    "-Animate, +Masculine": ["kapa-nu", "noko-nu", "tiwi-nu", "wako-nu", "ramu-nu", "sazo-nu", "tivu-nu", "mabu-nu"],
    "-Animate, -Masculine": ["kena-ni", "sino-ni", "volu-ni", "popo-ni", "julo-ni", "tivo-ni", "hoso-ni", "boxo-ni"]
};

var imagePaths = {
    "bino-nu": "images/man.png",
    "simu-nu": "images/cat.png",
    "moru-nu": "images/cow.png",
    "hasi-nu": "images/bird.png",
    "kina-nu": "images/monkey.png",
    "jufa-nu": "images/frog.png",
    "ravi-nu": "images/polar_bear.png",
    "lona-nu": "images/seal.png",
    "wara-ni": "images/woman.png",
    "tulu-ni": "images/dog.png",
    "piro-ni": "images/horse.png",
    "wetu-ni": "images/fish.png",
    "fone-ni": "images/penguin.png",
    "heku-ni": "images/lizard.png",
    "kura-ni": "images/elephant.png",
    "gela-ni": "images/chicken.png",
    "kapa-nu": "images/pen.png",
    "noko-nu": "images/book.png",
    "tiwi-nu": "images/apple.png",
    "wako-nu": "images/table.png",
    "ramu-nu": "images/phone.png",
    "sazo-nu": "images/scissors.png",
    "tivu-nu": "images/coat.png",
    "mabu-nu": "images/car.png",
    "kena-ni": "images/keys.png",
    "sino-ni": "images/chair.png",
    "volu-ni": "images/paper_towel.png",
    "popo-ni": "images/rock.png",
    "julo-ni": "images/purse.png",
    "tivo-ni": "images/tv.png",
    "hoso-ni": "images/house.png",
    "boxo-ni": "images/box.png"
};

var responses = [];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateSentence(nounClass) {
    var noun = getRandomElement(nouns[nounClass]);
    var determiner = noun.includes("-nu") ? "ne" : "ni";
    var verb = getRandomElement(["bouncing", "jiggling", "disappearing", "appearing", "spinning"]);
    var pronoun = noun.includes("-nu") ? "kunu" : "kuni";
    var imagePath = imagePaths[noun] || "images/default.jpg";

    return { text: `Look! ${determiner} ${noun}. ${pronoun} is ${verb}.`, noun, verb, pronoun, imagePath };
}

function displayExperiment() {
    var container = document.getElementById("experiment-container");
    container.innerHTML = ""; 
    
    var stimuli = [];
    for (var category in nouns) {
        stimuli.push(generateSentence(category));
    }

    stimuli.forEach(function(stimulus) {
        var p = document.createElement("p");
        p.innerText = stimulus.text;
        container.appendChild(p);
        
        var img = document.createElement("img");
        img.src = stimulus.imagePath;
        img.alt = stimulus.noun;
        img.style.width = "150px";
        img.style.height = "150px";
        container.appendChild(img);
        
        // Add a "Good" button
        var goodButton = document.createElement("button");
        goodButton.innerText = "Good";
        goodButton.onclick = function() {
            responses.push({ stimulus: stimulus.text, response: "Good", timestamp: new Date().toISOString() });
            console.log("Response recorded:", responses);
            alert("Response recorded: Good");
        };
        container.appendChild(goodButton);
        
        // Add a "Bad" button
        var badButton = document.createElement("button");
        badButton.innerText = "Bad";
        badButton.onclick = function() {
            responses.push({ stimulus: stimulus.text, response: "Bad", timestamp: new Date().toISOString() });
            console.log("Response recorded:", responses);
            alert("Response recorded: Bad");
        };
        container.appendChild(badButton);
    });
    
    var saveButton = document.createElement("button");
    saveButton.innerText = "Save Responses";
    saveButton.onclick = saveResponses;
    container.appendChild(saveButton);
}

function saveResponses() {
    var blob = new Blob([JSON.stringify(responses, null, 2)], { type: "application/json" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "experiment_responses.json";
    link.click();
}

document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.createElement("button");
    startButton.innerText = "Start Experiment";
    startButton.onclick = displayExperiment;
    document.body.appendChild(startButton);
    
    var container = document.createElement("div");
    container.id = "experiment-container";
    document.body.appendChild(container);
});

cognition.run(function() {
    console.log("Experiment ready. Click Start to begin.");
});
