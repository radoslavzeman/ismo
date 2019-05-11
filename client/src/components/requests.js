export function getPersons(self) {
    console.log("getting all persons");
    fetch('http://localhost:4000/get-persons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        return response.json()
    }).then(data => {
        return data; //({ persons: response, slicedData: response.slice(0, 10) });
    }).catch(err => console.log("Error while fetching persons: " + err))
};