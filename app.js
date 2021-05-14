

//array used for localStorage
let tickets = [];
var key = 'ticketList';
// let data = JSON.parse(localStorage.getItem("MyTicketList"));

fetch(key, render);

function addTicket(e){
    e.preventDefault();

    let descriptionInput = document.getElementById('description-box').value;
    let severityInput = document.getElementById('severity-drop-down');
    let selectedSeverity = severityInput.options[severityInput.selectedIndex].text;
    let assignmentInput = document.getElementById('assignment');
    let selectedAssignment = assignmentInput.options[assignmentInput.selectedIndex].text;
    let status = 'OPEN';

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
            status:status,
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
        renderHtml(status, descriptionInput, selectedSeverity, selectedAssignment, ticket);
 
}

function renderHtml(status, descVal, sevVal, assVal, currTicket){
    let addTr = document.createElement('tr');
    let addTh = document.createElement('th');
    let addTd1 = document.createElement('td');
    let addTd2 = document.createElement('td');
    let addTd3 = document.createElement('td');
    let addTd4 = document.createElement('td');
    let addTd5 = document.createElement('td');
    let tableBody = document.getElementById('tableBody');
    let descriptionInput = document.createTextNode(descVal);
    let selectedSeverity = document.createTextNode(sevVal);
    let selectedAssignment = document.createTextNode(assVal);
    let deleteBtn = document.createElement('button');

    let statusDropdown = document.createElement('select');
    let statusOption1 = document.createElement('option');
    let statusOption2 = document.createElement('option');

    statusDropdown.setAttribute('id', 'currStatus');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.classList.add('btn-danger','btn');
    deleteBtn.textContent ='Delete';
    
    statusOption1.setAttribute('value', status);
    statusOption1.textContent = status;
    statusDropdown.appendChild(statusOption1);

    statusOption2.setAttribute('value','closed');
    statusOption2.textContent = 'CLOSED';
    statusDropdown.appendChild(statusOption2);


   
    //append table row to table body
    tableBody.appendChild(addTr);

    //append table head to table row
    addTr.appendChild(addTh)

    //add scope='row' attribute to tablehead
    addTh.setAttribute('row', 'scope');

    //append td1, td2, td3, td4 ,td5 to table row
    addTh.appendChild(addTd1);
    addTr.appendChild(addTd2);
    addTr.appendChild(addTd3);
    addTr.appendChild(addTd4);
    addTr.appendChild(addTd5);
    //append values to td's
    addTd1.appendChild(statusDropdown);
    addTd2.appendChild(selectedSeverity);
    addTd3.appendChild(descriptionInput);
    addTd4.appendChild(selectedAssignment);
    addTd5.appendChild(deleteBtn);

    deleteBtn.addEventListener('click',function(){
        console.warn(currTicket);
        var index = tickets.indexOf(currTicket);
        tickets.splice(index, 1);
        storeTicketInput(tickets, 'ticketList');
        tableBody.removeChild(addTr);
        alert('Ticket deleted!');
    })
    console.log(currTicket);
    statusDropdown.addEventListener('change', function(){
        
    })
    
    
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


//modify localStorage
function setObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

function updateItem(key, property, value)
{
    var obj = getObject(key);
    obj[property] = value;    
    setObject(key, obj);
}

function getObject(key) {
    return JSON.parse(localStorage.getItem(key));
}