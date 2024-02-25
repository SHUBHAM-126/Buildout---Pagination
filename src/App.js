import { useState, useEffect } from 'react'

function App() {

  const [employees, setEmployees] = useState([])
  const [currentRecords, setCurrentRecords] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const maxRecords = 10
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        const data = await res.json()
        setEmployees(data)
        setTotalPages(Math.ceil(data.length / maxRecords))
        setCurrentPage(1)
      }
      catch (err) {
        console.log(err)
        window.alert(err)
      }
    }
    fetchEmployees()
  }, [])

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  useEffect(() => {

    if (employees.length > 0) {
      const startIndex = (currentPage - 1) * maxRecords
      const endIndex = Math.min(currentPage * maxRecords, employees.length - 1)

      setCurrentRecords(employees.slice(startIndex, endIndex))

    }

  }, [currentPage])


  return (
    <div className="table-wrapper">
      <h1>Employee Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 && (
            currentRecords.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination-wrapper">
        <button onClick={handlePrev}>Previous</button>
        <p className="current-page">{currentPage}</p>
        <button onClick={handleNext}>Next</button>
      </div>

    </div>
  );
}

export default App;