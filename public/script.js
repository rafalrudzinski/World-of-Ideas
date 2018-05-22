var premiseEnvelope = [];

document.getElementById('addBtn').onclick = function() {
    var premises = document.getElementById('premises');
    var inputData = document.getElementById('newPremise').value;
    var premiseText = document.createTextNode(inputData);
    var newPremise = document.createElement("Li");
    newPremise.appendChild(premiseText);

    premises.appendChild(newPremise);
    premiseEnvelope.push(inputData);
    inputData = "";
}

document.getElementById('sendBtn').onclick = function() {
    var title = document.getElementById('title').value;
    var conclusion = document.getElementById('conclusion').value;
    
    fetch('/arguments', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            premises: premiseEnvelope,
            conclusion: conclusion
        }),
        headers: { "Content-Type": "application/json" }
    })
}