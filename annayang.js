const commands = {
    "color :type": {
        regexp: /^colou*r(.*)/,
        callback: (type) => {
            bsCollapse = bsCollapse || new bootstrap.Collapse(myCollapse);
            myCollapse.innerHTML = `
        <div class="card card-body d-flex justify-content-center">
            <h3>${type}</h3>
        </div>`;
            document.querySelector("body").style.backgroundColor = type;
            bsCollapse.show();
        },
    },

    start: () => {
        annyang.addCommands(commands);
        annyang.start();
    },

    stop: () => {
        annyang.abort();
        stopFunc();
    },

    hello: () => {
        myCollapse.innerHTML = `
        <div class="card card-body d-flex justify-content-center">
            <p>How was your day...</p>
        </div>`;
    },
};

// Add our commands to annyang

const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
var myCollapse = document.getElementById("myCollapse");
var bsCollapse;

console.log(annyang.isListening());
annyang.setLanguage("en-IN");
start.addEventListener("click", async (e) => {
    annyang.addCommands(commands);
    annyang.resume();
    console.log(annyang.isListening());
    console.log("Started Listening.....");
    start.classList.toggle("visually-hidden");
    stop.classList.toggle("visually-hidden");
});

const stopFunc = () => {
    start.classList.toggle("visually-hidden");
    stop.classList.toggle("visually-hidden");
    annyang.abort();
    console.log(annyang.isListening());
};

stop.addEventListener("click", stopFunc);

annyang.addCallback("resultNoMatch", (e) => {
    console.log(e);
});

// Start listening.
