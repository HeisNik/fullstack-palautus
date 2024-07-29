

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

  export default Persons