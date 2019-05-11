
export function getPerson(self, id) {
    console.log("# getting person " + id);
    fetch('http://localhost:4000/get-person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("# get person > setState person", data.person);
        // return ({person: data.person });
        self.setState({ person: data.person });
        // console.log(self.state.person)
    }).catch(err => console.log("Error while fetching persons: " + err))
}

export function addPerson(self, ) {
    console.log("adding person");
    fetch('http://localhost:4000/add-person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: self.state.person.name, surname: self.state.person.surname })
    }).then(response => {
        // console.log(response)
        return response.json()
    }).then(data => {
        // console.log(data.person)
        self.setState({ person: data.person });
    }).catch(err => console.log("Error while fetching persons: " + err))
}

export function updatePerson(self, id) {
    console.log("updating person " + id);
    fetch('http://localhost:4000/update-person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: self.state.person.name, surname: self.state.person.surname, id: id })
    }).then(response => {
        // console.log(response)
        return response.json()
    }).then(data => {
        // console.log(data.person)
        self.setState({ person: data.person });
    }).catch(err => console.log("Error while fetching persons: " + err))
}

export function getPersonUnits(self, id) {
    console.log("getting person units " + id);
    fetch('http://localhost:4000/get-person-units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("# person units:", data);
        // console.log(data)
        self.setState({ units: data });
        // console.log(self.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
}

export function deletePersonMembership(person_id, unit_id) {
    console.log("deleting person membership in unit " + unit_id);
    fetch('http://localhost:4000/delete-membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person_id: person_id, unit_id: unit_id })
    }).then(response => response.json()
    ).then(data => {
        // console.log("DELETE DATA:")
        // console.log(data)
        if (data.affectedRows > 0) {
            this.getPersonUnits(person_id);
        }
        // console.log(self.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
}

export function addPersonMembership(self, person_id, unit_id) {
    console.log("adding person membership in unit " + unit_id);
    fetch('http://localhost:4000/add-membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person_id: person_id, unit_id: unit_id })
    }).then(response => response.json()
    ).then(data => {
        // console.log("DELETE DATA:")
        // console.log(data)
        if (data.affectedRows > 0) {
            self.getPersonUnits(person_id);
        }
        // console.log(self.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
};

  //   export function getAllUnits(self) {
  //     console.log("getting all units");
  //     fetch('http://localhost:4000/get-units', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //     }).then(response => response.json()
  //     ).then(response => {
  //       // console.log("ALL UNITS");
  //       // console.log(response);
  //       self.setState({ all_units: response });
  //     }).catch(err => console.log("Error while fetching units: " + err))
  // }