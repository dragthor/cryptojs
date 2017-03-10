// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require("electron");
const ipc = electron.ipcRenderer;

// var last = "";

// document.getElementById("body").addEventListener("keydown", function (e) {
//     if (last.length === 0) {
//         last = e.key;
//     } else {
//         if (last === "Control" && e.key === "c") {
//             last = "";

//             var selection = getSelectionText();

//             if (selection != null && selection.length > 0) {
//                 ipc.send("control+C", selection);
//             }
//         } else {
//             last = e.key;
//         }
//     }
// });

// function getSelectionText() {
//     var text = "";
//     if (document.getSelection) {
//         text = document.getSelection().toString();
//     } else if (document.selection && document.selection.type != "Control") {
//         text = document.selection.createRange().text;
//     }
//     return text;
// }