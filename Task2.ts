
/// <reference lib="es2015" />
class Contact {
  name:string;
  email:string;
  phone:string;
  group:string;
  
 

  constructor(name:string, email:string, phone:string,group:string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.group = group;
    

  }
}

type Tcontact = { name: string; email: string; phone: string; group: string;}


class AddressBook {
  contacts :Contact[]=[]
 
  addContact: (contact:Tcontact ) => any =(contact)=> {
    const emailRegex:any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      throw new Error("Invalid email format");
    }

    // Name validation (example - check for empty name)
    if (!contact.name || contact.name.trim() === "") {
      throw new Error("Name cannot be empty");
    }

    // You can add further validations for phone number format, etc.

    this.contacts.push(contact);
  }

  findContactByName(name:string){
    return this.contacts.find((contact) => (contact.name === name));
    
  }

  filterByGroup(group:string) {
    return this.contacts.filter((contact) => contact.group === group);
  }

  sortByName() {
    this.contacts.sort((contact4, contact1) => contact4.name.localeCompare(contact1.name));
  }

  // New functionalities:
  // 1. Validate various contact properties on addition (already implemented)
  // 2. Search contacts by name (partial match)

  searchContacts:(searchTerm:string) => any =(searchTerm) =>{
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedSearchTerm)
    );
  }
  
  printContacts() : void{
    
    
    for (const contact of this.contacts) {
      console.log(`Name: ${contact.name}`);
      console.log(`Email: ${contact.email}`);
      console.log(`Phone: ${contact.phone}`);
      console.log("-----");
    }
  }
}

const addressBook = new AddressBook();

const contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890","Family");

const contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123","Friends"); // Invalid email
const contact3 = new Contact("", "valid@email.com", "789-012-3456","Friends"); // Empty name
const contact4 = new Contact("Aya", "ay@example.com", "123-456-7227","Family");


addressBook.addContact(contact1);
addressBook.addContact(contact4);

try {
  addressBook.addContact(contact2); // This will throw an error (invalid email)
} catch (error:any) {
  console.error("Error adding contact:", error.message);
}

try {

  addressBook.addContact(contact3); // This will throw an error (empty name)
} catch (error:any) {
  console.error("Error adding contact:", error.message);
}

console.log("Contacts:");
addressBook.printContacts();


const findName=addressBook.findContactByName("Aya");
console.log("find-Name:  Aya :",findName);

const filterByGroup=addressBook.filterByGroup("Family");
console.log("filter-By-Group:  Family :",filterByGroup);

// const sortByName=addressBook.sortByName();
// console.log("Sort-By-Name: ",sortByName);


// Example usage of new search functionality
const searchResults = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach((contact:Contact) => console.log(`  - ${contact.name}`));