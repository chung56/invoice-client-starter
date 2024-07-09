import { useState, useEffect } from 'react'
import { apiGet } from '../utils/api'

const InvoiceStatistic = () => {
  const [persons, setPersons] = useState([])
  const [invoice, setInvoice] = useState({
    currentYearSum: '',
    allTimeSum: '',
    invoicesCount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/api/invoices/statistic').then((data) => setInvoice(data))
    apiGet('/api/persons/statistics').then((data) => setPersons(data))
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Statistika faktur</h1>
      <table className='table table-striped text-center'>
        <thead>
          <tr>
            <th>Součet za letošní rok</th>
            <th>Součet za všechna období</th>
            <th>počet záznamů</th>
          </tr>
        </thead>
        <tbody>
          <tr key='invoice-statistic'>
            <td> {invoice.currentYearSum.toLocaleString('cs-CZ')} Kč</td>
            <td>{invoice.allTimeSum.toLocaleString('cs-CZ')} Kč</td>
            <td>{invoice.invoicesCount}</td>
          </tr>
        </tbody>
      </table>
      <p />
      <h1>Statistika osob</h1>
      <table className='table table-stripe text-center'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Jméno</th>
            <th>Příjmy</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{item.personName}</td>
              <td>{item.revenue.toLocaleString('cs-CZ')} Kč</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoiceStatistic
