import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter = ({newFilter, handleFilter}) => {
  return (
    <>
      filter shown with
      <input 
      value={newFilter}
      onChange={handleFilter}
      />
      </>
  )
}

const PersonForm = ({handlers, newName, newNumber}) => {
  const { handleNameChange, handleNumberChange, addPerson } = handlers
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
  )
}

const Persons = ({persons, deletePerson}) => {
  console.log('filuihmiset', persons)
  return (
  <>
  <ul>
    {persons.map(person => 
      <li key={person.name}>{person.name} {person.number} <button className='delete' onClick={() => deletePerson(person)}>Delete</button></li>
    )}
    </ul>
  </>
  )
}

const Notification = ({ notification }) => {
  console.log('notification', notification)
  if (notification.message === null) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({message: null, type: ''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
    name: newName,
    number: newNumber
  }

  const isNameInList = persons.filter(person => person.name === personObject.name)

  if (isNameInList.length > 0) {
    //window.alert(`${newName} is already added to phonebook`)
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      console.log('success')
      const person = persons.find(person => person.name === personObject.name)
      const id = person.id
      console.log('person', person.id)
      const changedPerson = {...person, number: newNumber}
      personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification({message: `Updated ${newName}`, type: 'success'})
        setTimeout(() => {
          setNotification({message: null, type: ''})
        }, 3000)
      })
      .catch(error => {
        setNotification({message: `Information of ${person.name} has already been removed from server`, type: 'error'})
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setNotification({message: null, type: ''})
        }, 3000)
      })
    }
  }
  
  else {
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotification({message: `Added ${personObject.name}`, type: 'success'})
        setTimeout(() => {
          setNotification({message: null, type: ''})
        }, 3000)
    })

  }
  }


  const deletePerson = (deletedPerson) => {
    console.log('person ID',deletedPerson.id)
    console.log('person',deletedPerson)
    const id = deletedPerson.id
    const name = deletedPerson.name
    if (window.confirm(`Delete ${name} ?`)) {
    personService
    .deletePerson(id)
    .then(() => {
    setPersons(persons.filter(person => person.id !== id))
    setNotification({message: `Deleted ${name}`, type: 'success'})
        setTimeout(() => {
          setNotification({message: null, type: ''})
        }, 5000)
    })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handlers = {
    handleNameChange,
    handleNumberChange,
    addPerson
  }

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))


  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleFilter={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
      handlers={handlers} 
      newName={newName} 
      newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )

}

export default App