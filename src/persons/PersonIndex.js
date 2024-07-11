import React, { useEffect, useState } from 'react'

import { apiDelete, apiGet } from '../utils/api'

import PersonTable from './PersonTable'

const PersonIndex = () => {
  const [persons, setPersons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const deletePerson = async (id) => {
    try {
      await apiDelete('/api/persons/' + id)
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
    setPersons(persons.filter((item) => item._id !== id))
  }

  useEffect(() => {
    apiGet('/api/persons').then((data) => setPersons(data))
  }, [])

  const paginate = (invoices) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return invoices.slice(startIndex, endIndex)
  }

  return (
    <div>
      <h1>Seznam osob</h1>
      <PersonTable
        deletePerson={deletePerson}
        items={paginate(persons)}
        label='Počet osob:'
      />
      {persons.length > itemsPerPage && (
        <div>
          {[...Array(Math.ceil(persons.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn border-0 mt-3 ${
                  currentPage === index + 1
                    ? 'bg-primary text-white'
                    : 'bg-light text-dark'
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
export default PersonIndex
