import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGet, apiPost, apiPut } from '../utils/api'
import FlashMessage from '../components/FlashMessage'
import InputField from '../components/InputField'
import InputSelect from '../components/InputSelect'

const InvoiceForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [sentState, setSent] = useState(false)
  const [successState, setSuccess] = useState(false)
  const [errorState, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    issued: '',
    dueDate: '',
    product: '',
    price: '',
    vat: '',
    note: '',
    buyer: { _id: '1' },
    seller: { _id: '1' },
  })
  const [personList, setPersonListState] = useState([])

  useEffect(() => {
    if (id) {
      apiGet('/api/invoices/' + id).then((data) => setInvoice(data))
    }
    apiGet('/api/persons').then((data) => setPersonListState(data))
    setLoading(false)
  }, [id])

  // display a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>
  }

  const sent = sentState
  const success = successState

  const handleSubmit = (e) => {
    e.preventDefault()
    if (invoice.issued > invoice.dueDate) {
      setError(
        'Datum vystaveni faktury nemůže být větší než datum splatnosti faktury.'
      )
      return
    }
    ;(id
      ? apiPut('/api/invoices/' + id, invoice)
      : apiPost('/api/invoices', invoice)
    )
      .then((data) => {
        setSent(true)
        setSuccess(true)
        setTimeout(() => {
          navigate('/invoices')
        }, 1000)
      })
      .catch((error) => {
        console.log(error.message)
        setError(error.message)
        setSent(true)
        setSuccess(false)
      })
  }

  return (
    <div>
      <h1> {id ? 'Upravit' : 'Vytvořit'} fakturu</h1>
      <hr />
      {errorState ? (
        <div className='alert alert-danger'>{errorState}</div>
      ) : null}
      {sent && (
        <FlashMessage
          theme={success ? 'success' : ''}
          text={success ? 'Uložení osobnosti proběhlo úspěšně.' : ''}
        />
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type='number'
          name='invoiceNumber'
          min='7'
          placeholder='1234567'
          label='ID Faktury'
          prompt='Zadejte identifikační číslo faktury'
          value={invoice.invoiceNumber}
          handleChange={(e) => {
            setInvoice({ ...invoice, invoiceNumber: e.target.value })
          }}
        />

        <InputField
          required={true}
          type='date'
          name='issued'
          placeholder='yyyy-mm-dd'
          label='Datum vystaveni faktury'
          prompt='Zadejte datum ve tvaru yyyy-mm-dd'
          value={invoice.issued}
          handleChange={(e) => {
            setInvoice({ ...invoice, issued: e.target.value })
          }}
        />

        <InputField
          required={true}
          type='date'
          name='dueDate'
          placeholder='yyyy-mm-dd'
          label='Datum splatnosti faktury'
          prompt='Zadejte datum ve tvaru yyyy-mm-dd'
          value={invoice.dueDate}
          handleChange={(e) => {
            setInvoice({ ...invoice, dueDate: e.target.value })
          }}
        />

        <InputField
          required={true}
          type='text'
          name='product'
          placeholder='Článek'
          label='Produkt'
          prompt='Zadejte název produktu'
          value={invoice.product}
          handleChange={(e) => {
            setInvoice({ ...invoice, product: e.target.value })
          }}
        />

        <InputField
          required={true}
          type='number'
          name='price'
          placeholder='100'
          label='Cena'
          prompt='Zadejte cenu'
          value={invoice.price}
          handleChange={(e) => {
            setInvoice({ ...invoice, price: e.target.value })
          }}
        />

        <InputField
          required={true}
          type='number'
          name='vat'
          placeholder='15'
          label='VAT'
          prompt='Zadejte VAT'
          value={invoice.vat}
          handleChange={(e) => {
            setInvoice({ ...invoice, vat: e.target.value })
          }}
        />

        <InputField
          type='text'
          name='note'
          label='Poznámky'
          prompt='Zadejte poznámku'
          value={invoice.note}
          handleChange={(e) => {
            setInvoice({ ...invoice, note: e.target.value })
          }}
        />

        <InputSelect
          required={true}
          name='buyer'
          items={personList}
          multiple={false}
          label='Nakupující'
          prompt='Označte nakupující'
          value={invoice.buyer._id}
          handleChange={(e) => {
            setInvoice({ ...invoice, buyer: { _id: e.target.value } })
          }}
        />

        <InputSelect
          required={true}
          name='seller'
          items={personList}
          multiple={false}
          label='Prodávající'
          prompt='Označte prodávající'
          value={invoice.seller._id}
          handleChange={(e) => {
            setInvoice({ ...invoice, seller: { _id: e.target.value } })
          }}
        />

        <input type='submit' className='btn btn-primary' value='Uložit' />
      </form>
    </div>
  )
}

export default InvoiceForm
