import React, { useEffect, useState } from 'react'
import { apiGet, apiDelete } from '../utils/api'
import InvoiceTable from './InvoiceTable'
import InvoiceFilter from './InvoiceFilter'

const InvoiceIndex = () => {
  const [invoices, setInvoices] = useState([])
  const [persons, setPersons] = useState([])
  const [filterState, setFilterState] = useState({
    buyerID: undefined,
    sellerID: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    product: undefined,
    limit: undefined,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    apiGet('/api/invoices').then((data) => setInvoices(data))
    apiGet('/api/persons').then((data) => setPersons(data))
  }, [])

  const deleteInvoice = async (id) => {
    await apiDelete('/api/invoices/' + id)
    setInvoices(invoices.filter((invoice) => invoice._id !== id))
  }

  const handleChange = (e) => {
    // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
    if (
      e.target.value === 'false' ||
      e.target.value === 'true' ||
      e.target.value === ''
    ) {
      setFilterState((prevState) => {
        return { ...prevState, [e.target.name]: undefined }
      })
    } else {
      setFilterState((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const params = {}

    Object.keys(filterState).forEach((key) => {
      if (filterState[key] !== undefined && filterState[key] !== '') {
        params[key] = filterState[key]
      }
    })

    const data = await apiGet('/api/invoices', params)
    setInvoices(data)
  }

  const handleReset = async (e) => {
    e.preventDefault()

    setFilterState({
      buyerID: '',
      sellerID: '',
      minPrice: undefined,
      maxPrice: undefined,
      product: undefined,
      limit: undefined,
    })
    const data = await apiGet('/api/invoices')
    setInvoices(data)
  }

  const paginate = (invoices) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return invoices.slice(startIndex, endIndex)
  }

  return (
    <div>
      <h1>Seznam Faktur</h1>
      <hr />
      <InvoiceFilter
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        buyerList={persons}
        sellerList={persons}
        filter={filterState}
        confirm='Filtrovat faktury'
      />
      <hr />
      <InvoiceTable
        items={paginate(invoices)}
        label='Počet faktur:'
        deleteInvoice={deleteInvoice}
      />
      {invoices.length > itemsPerPage && (
        <div>
          {[...Array(Math.ceil(invoices.length / itemsPerPage))].map(
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

export default InvoiceIndex
