const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  /* {courses.map(course =>
          <h1 key={course.name}>{course.name}</h1>
        )} */
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
          )}
        
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const sumParts = parts.reduce(
      (sum, currentValue) => sum + currentValue.exercises,
      0,
    );
    return (
      <div>
        <b>Total of exercises {sumParts}</b>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Course = ({ courses }) => {
    console.log(courses)
    return (
      <>
       {courses.map(course => (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </>
    )
  }
  
  /*<Content parts={course.parts}/>
      <Total parts={course.parts}/> */
  

export default Course