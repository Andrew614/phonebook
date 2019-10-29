import React, { useState } from 'react';
import Person from './components/Person'
import Form from './components/Form'
import FilterSearch from './components/FilterSearch'
import People from './components/People'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

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
      setPeople([...people, person])
      setNewName('')
      setNewNumber('')
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
