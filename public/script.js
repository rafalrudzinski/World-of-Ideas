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
    
    var url = '/arguments';
    var data = { title: title, premises: premiseEnvelope, conclusion: conclusion };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}