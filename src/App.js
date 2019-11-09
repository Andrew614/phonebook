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

  const handleDelete = (id) => {
    const personToDelete = people.find(p => p.id === id)
    const result = window.confirm(`Delete ${personToDelete.name}?`)
    if (result) {
      contactService.destroy(id).then(() => {
        setPeople(people.filter(p => p.id !== id))
      })
    }
  }

  const addContact = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (people.includes(people.find(p => p.name === person.name))) {
      const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const personToUpdate = people.find(p => p.name === person.name)
        contactService.update(personToUpdate.id, person).then(updatedContact => {
          setPeople(people.map(p => p.id === personToUpdate.id ? updatedContact : p))
        })
      }
    } else {
      contactService.create(person).then(newContact => {
        setPeople([...people, newContact])
      })
    }
    setNewName('')
    setNewNumber('')
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
        <People people={people} filteredName={filteredName} handleDelete={handleDelete} />
      </div>
    </div >
  )
}

export default App;
