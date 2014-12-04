toCsv
=====

A small utility function that turns a list of objects into a csv table.


Import into you're javascript environment.


    var list = [{
      name: 'Dave',
      age: 35,
      address: {
        street: "1 Acacia Road",
        town: "Bondon"
      }
    },{
      name: 'Bob',
      age: 40,
      address: {
        street: "2 Sesame Street",
        town: "New York"
      }
    }];

    toCsv(list);

This will return a string containing:

    name,age,address.street,address.town
    Dave,35,1 Acacia Road,Bondon
    Bob,40,2 Sesame Street,New York
