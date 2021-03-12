const speechRecog = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();

speechRecog.lang = "en-US";

var colors = [
    "aqua",
    "azure",
    "beige",
    "bisque",
    "black",
    "blue",
    "brown",
    "chocolate",
    "coral",
];
var grammar =
    "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";

var speechRecognitionList = new (webkitSpeechGrammarList ||
    mozSpeechGrammarList ||
    msSpeechGrammarList)();

speechRecognitionList.addFromString(grammar, 1);
speechRecog.grammars = speechRecognitionList;

console.log(speechRecog.grammars);
console.log(speechRecog.lang);

const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const myCollapse = document.getElementById("myCollapse");
let bsCollapse;

// bsCollapse.hide();

start.addEventListener("click", (e) => {
    speechRecog.start();
    console.log("Started Listening.....");
});

speechRecog.addEventListener("result", (e) => {
    console.log(e);

    const res = e.results[0][0].transcript;
    bsCollapse = bsCollapse || new bootstrap.Collapse(myCollapse);
    myCollapse.innerHTML = `
    <div class="card card-body d-flex justify-content-center">
        <h3>${res}</h3>
    </div>`;
    document.querySelector("body").style.backgroundColor = res;
    bsCollapse.show();
    // speechRecog.stop();
});

// document.addEventListener("click", (e) => {
//     bsCollapse.hide();
// });

speechRecog.addEventListener("end", (e) => {
    console.log("Recognition Stopped");
});

speechRecog.onnomatch = function (event) {
    console.log("NO match");
};

// speechRecog.end = () => {
//     speechRecog.start();
// };

stop.onclick = (e) => {
    speechRecog.stop();
};
