var premises = document.getElementById('premises');
var premiseEnvelope = [];

document.getElementById('addBtn').onclick = function() {
    var inputData = document.getElementById('newPremise').value;
    var premiseText = document.createTextNode(inputData);
    var newPremise = document.createElement("Li");
    newPremise.appendChild(premiseText);

    premises.appendChild(newPremise);
    premiseEnvelope.push(inputData);

    document.getElementById('newPremise').value = "";
}

document.getElementById('sendBtn').onclick = function() {
    var title = document.getElementById('title').value;
    var conclusion = document.getElementById('conclusion').value;

    var data = { title: title, premises: premiseEnvelope, conclusion: conclusion };

    fetch('http://localhost:3000/arguments', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err)
    });

    document.getElementById('title').value = "";
    document.getElementById('conclusion').value = "";

    while (premises.firstChild) {
        premises.removeChild(premises.firstChild);
    }

    location.reload();
}

function deleteArgument(id) {
    fetch('http://localhost:3000/arguments', {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: id
    });
}