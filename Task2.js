/// <reference lib="es2015" />
var Contact = /** @class */ (function () {
    function Contact(name, email, phone, group) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group;
    }
    return Contact;
}());
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        var _this = this;
        this.contacts = [];
        this.addContact = function (contact) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contact.email)) {
                throw new Error("Invalid email format");
            }
            // Name validation (example - check for empty name)
            if (!contact.name || contact.name.trim() === "") {
                throw new Error("Name cannot be empty");
            }
            // You can add further validations for phone number format, etc.
            _this.contacts.push(contact);
        };
        // New functionalities:
        // 1. Validate various contact properties on addition (already implemented)
        // 2. Search contacts by name (partial match)
        this.searchContacts = function (searchTerm) {
            var normalizedSearchTerm = searchTerm.toLowerCase();
            return _this.contacts.filter(function (contact) {
                return contact.name.toLowerCase().includes(normalizedSearchTerm);
            });
        };
    }
    AddressBook.prototype.findContactByName = function (name) {
        return this.contacts.find(function (contact) { return (contact.name === name); });
    };
    AddressBook.prototype.filterByGroup = function (group) {
        return this.contacts.filter(function (contact) { return contact.group === group; });
    };
    AddressBook.prototype.sortByName = function () {
        this.contacts.sort(function (contact4, contact1) { return contact4.name.localeCompare(contact1.name); });
    };
    AddressBook.prototype.printContacts = function () {
        for (var _i = 0, _a = this.contacts; _i < _a.length; _i++) {
            var contact = _a[_i];
            console.log("Name: ".concat(contact.name));
            console.log("Email: ".concat(contact.email));
            console.log("Phone: ".concat(contact.phone));
            console.log("-----");
        }
    };
    return AddressBook;
}());
var addressBook = new AddressBook();
var contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890", "Family");
var contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123", "Friends"); // Invalid email
var contact3 = new Contact("", "valid@email.com", "789-012-3456", "Friends"); // Empty name
var contact4 = new Contact("Aya", "ay@example.com", "123-456-7227", "Family");
addressBook.addContact(contact1);
addressBook.addContact(contact4);
try {
    addressBook.addContact(contact2); // This will throw an error (invalid email)
}
catch (error) {
    console.error("Error adding contact:", error.message);
}
try {
    addressBook.addContact(contact3); // This will throw an error (empty name)
}
catch (error) {
    console.error("Error adding contact:", error.message);
}
console.log("Contacts:");
addressBook.printContacts();
var findName = addressBook.findContactByName("Aya");
console.log("find-Name:  Aya :", findName);
var filterByGroup = addressBook.filterByGroup("Family");
console.log("filter-By-Group:  Family :", filterByGroup);
// const sortByName=addressBook.sortByName();
// console.log("Sort-By-Name: ",sortByName);
// Example usage of new search functionality
var searchResults = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach(function (contact) { return console.log("  - ".concat(contact.name)); });
