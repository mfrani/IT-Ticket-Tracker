

//array used for localStorage
let tickets = [];
var key = 'ticketList';
// let data = JSON.parse(localStorage.getItem("MyTicketList"));

fetch(key, render);


// for(let i = 0; i<data.length;i++){
//       // create a new div element
//   let newDiv = document.createElement("div");

//   // and give it some content
//   let newContent = document.createTextNode(data[i].description);

//   // add the text node to the newly created div
//   newDiv.appendChild(newContent);

//   // add the newly created element and its content into the DOM
//   document.getElementById("ticketList").appendChild(newDiv);
// }


function addTicket(e){
    e.preventDefault();

    let descriptionInput = document.getElementById('description-box').value;
    let severityInput = document.getElementById('severity-drop-down');
    let selectedSeverity = severityInput.options[severityInput.selectedIndex].text;
    let assignmentInput = document.getElementById('assignment');
    let selectedAssignment = assignmentInput.options[assignmentInput.selectedIndex].text;

    //basic form validation 
    if (descriptionInput == ''){
        alert("Please add a description for this ticket");
        return false;
    }
    if (severityInput.value==0){
        alert('Please select severity level!');
        return false;
    }
    if (assignmentInput.value==0){
        alert('Please select a tech to assign this ticket to!');
        return false;
    }
        let ticket ={
            description: descriptionInput,
            severity: selectedSeverity,
            assignment: selectedAssignment
        }
    
        tickets.push(ticket);
        console.warn('added', {tickets});
        document.querySelector('form').reset();
    
        // let pre = document.querySelector('#ticketList pre');
        // pre.textContent = '\n' + JSON.stringify(tickets, '\t', 2);
        
        //saving to localStorage
        // localStorage.setItem('MyTicketList', JSON.stringify(tickets));
        storeTicketInput(tickets,'ticketList');
        // let data = JSON.parse(localStorage.getItem("MyTicketList"));
        renderHtml(descriptionInput, selectedSeverity, selectedAssignment);
 
}

function renderHtml(descVal, sevVal, assVal){
    let addTr = document.createElement('tr');
    let addTh = document.createElement('th');
    let addTd1 = document.createElement('td');
    let addTd2 = document.createElement('td');
    let addTd3 = document.createElement('td');
    let tableBody = document.getElementById('tableBody');
    let descriptionInput = document.createTextNode(descVal);
    let selectedSeverity = document.createTextNode(sevVal);
    let selectedAssignment = document.createTextNode(assVal);

    let ticketTable = document.getElementById('ticketTable');

   
    //append table row to table body
    tableBody.appendChild(addTr);

    //append table head to table row
    addTr.appendChild(addTh)

    //add scope='row' attribute to tablehead
    addTh.setAttribute('row', 'scope');

    //append td1, td2, td3 to table row
    addTr.appendChild(addTd1);
    addTr.appendChild(addTd2);
    addTr.appendChild(addTd3);

    //append values to td's
    addTd1.appendChild(selectedSeverity);
    addTd2.appendChild(descriptionInput);
    addTd3.appendChild(selectedAssignment);
}



function storeTicketInput(listItemArray, key, fetch){
    let tickets = JSON.stringify(listItemArray);
    if(tickets){
        localStorage.setItem(key, tickets);
    }
    
}

function fetch(key, callback){
    tickets = JSON.parse(localStorage.getItem(key)) || [];
    callback(tickets);
}

function render(data) {
    data.forEach(function(current, index, array) {
        renderHtml(current);
    });

}



