import React from 'react'
import Person from './Person'

const People = ({ filteredName, people, handleDelete }) => {
    const displayContact = () => {
        const filteredPeople = filteredName ?
            people.filter(person => person.name.toLowerCase().match(filteredName.toLowerCase()))
            : people
        return (
            filteredPeople.map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />)
        )
    }
    return displayContact()
}

export default People