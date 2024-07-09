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
        items={invoices}
        label='Počet faktur:'
        deleteInvoice={deleteInvoice}
      />
    </div>
  )
}

export default InvoiceIndex
