var premises = document.getElementById('premises');
var premiseEnvelope = [];

var addButton = document.getElementById('addBtn');
var sendButton = document.getElementById('sendBtn');

addButton.onclick = function() {
    var inputData = document.getElementById('newPremise').value;
    var premiseText = document.createTextNode(inputData);
    var newPremise = document.createElement("Li");
    newPremise.appendChild(premiseText);

    premises.appendChild(newPremise);
    premiseEnvelope.push(inputData);

    document.getElementById('newPremise').value = "";
}

sendButton.onclick = function() {
    var title = document.getElementById('title').value;
    var conclusion = document.getElementById('conclusion').value;

    var data = { title: title, premises: premiseEnvelope, conclusion: conclusion };

    fetch('http://localhost:3000/argument', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        document.getElementById('title').value = "";
        document.getElementById('conclusion').value = "";

        while (premises.firstChild) {
            premises.removeChild(premises.firstChild);
        }

        location.reload();
    });
}

function editArgument(claimType, claim, action) {
    //Code here
}