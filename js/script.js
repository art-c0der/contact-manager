class Contact{
    constructor (name, phone, email, group){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.group = group;
        }
};

let alenka = new Contact ('Аленка', '380001111111', 'mail1@mail.com', "сім'я");
let anton = new Contact ('Антон', '380001111112', 'mail2@mail.com', "сім'я");
let ira = new Contact ('Ира', '380001111113', 'mail3@mail.com', "сім'я");

class ContactManager{
    constructor(){
        this.listOfContacts = [];
    };
    
    empty(){
        this.listOfContacts = [];
    };

    add(contact){
        this.listOfContacts.push(contact);
    };
    
    remove(contact){
        for (let i = 0; i < this.listOfContacts.length; i++){
            let c = this.listOfContacts[i];
            if (c.phone === contact.phone){
                this.listOfContacts.splice(i, i);
                break;
            }
        }
    };
    
    printToConsole(){
        this.listOfContacts.forEach(function(c){
            console.log(c.name);
        });
    };
    
    sort(){
        this.listOfContacts.sort(ContactManager.compareByName);
    };
    
    static compareByName (a,b){
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        else return 0;
    };
    
    save(){
      localStorage.contacts = JSON.stringify(this.listOfContacts);  
    };
    
    load(){
        if(localStorage.contacts !== undefined)
            this.listOfContacts = JSON.parse(localStorage.contacts);
    };

		displayContactsAsTable(idOfContainer){
			let container = document.querySelector("#" + idOfContainer);
			container.innerHTML = "";

			if (this.listOfContacts.length === 0) {
				container.innerHTML = "<p>Немає контактів для відображення</p>";
				return;
			}

			let table = document.createElement("table");
			let row1 = table.insertRow();
			row1.innerHTML = "<th>Ім'я</th>" +
							"<th>Телефонний номер</th>" +
							"<th>Поштова скринька</th>" +
							"<th>Група</th>";
			this.listOfContacts.forEach(function(currentContact){			
				let row2 = table.insertRow();
				row2.innerHTML = "<td>" + currentContact.name + "</td>" +
								"<td>" + currentContact.phone + "</td>" +
								"<td>" + currentContact.email + "</td>" +
								"<td>" + currentContact.group + "</td>";
			});
			container.appendChild(table);
		};
}

window.onload = init;

let cm;

function init (){
	cm = new ContactManager();
	cm.add(alenka);
	cm.add(ira);
	cm.add(anton);
	cm.sort();
	cm.printToConsole();
	cm.displayContactsAsTable("contacts");
}

function formSubmited(){
	let name = document.querySelector("#name");
	let phone = document.querySelector("#phone");
	let email = document.querySelector("#email");
	let group = document.querySelector("#group");

	let newContact = new Contact(name.value, phone.value, email.value, group.value);
	cm.add(newContact);

	name.value = "";
	phone.value = "";
	email.value = "";
	group.value = "";

	cm.displayContactsAsTable("contacts");
	cm.printToConsole();

	return false;
}

function emptyList(){
	cm.empty();
	cm.displayContactsAsTable("contacts");
}

function loadList(){
	cm.load();
	cm.displayContactsAsTable("contacts");
}

function saveList(){
	cm.save();
	cm.displayContactsAsTable("contacts");
}
