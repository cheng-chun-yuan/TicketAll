// Print Status messages to UI.
const status = document.getElementById("status");
function Status(text) {
    const currentText = status.innerText;

    if (typeof text === 'object' && text !== null) {
        text = JSON.stringify(text, null, 2)
    }

    var newLine =
        "[" + new Date().toLocaleTimeString() + "]: " + text + "\n";
    status.innerText = newLine + currentText;
}
Status("Welcome! Please register or sign in");

if (!API_KEY || API_KEY[0] === "<" || API_KEY === "catty:public:12c712ffae424ffb94690cb619ee869f") {
    Status("⚠️⚠️⚠️ Missing API Key. Please change the API_KEY in index.html and API_KEY_SECRET in app.js before running the example.")
}