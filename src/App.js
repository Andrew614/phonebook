import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import FilterSearch from './components/FilterSearch'
import People from './components/People'
import contactService from './services/contacts'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    contactService.getAll().then(contacts => setPeople(contacts))
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredName = (event) => {
    setFilteredName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (people.includes(people.find(p => p.name === person.name))) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      contactService.create(person).then(returnedContact => {
        setPeople([...people, returnedContact])
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSearch filteredName={filteredName} handleFilteredName={handleFilteredName} />
      <h2>Add A New Contact</h2>
      <Form handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <div>
        <People people={people} filteredName={filteredName} />
      </div>
    </div >
  )
}

export default App;
