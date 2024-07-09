import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { apiGet } from '../utils/api'

const InvoiceDetail = () => {
  const { id } = useParams()
  const [invoice, setInvoice] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/api/invoices/' + id)
      .then((data) => {
        setInvoice({
          invoiceNumber: data.invoiceNumber,
          issued: data.issued,
          dueDate: data.dueDate,
          product: data.product,
          price: data.price,
          vat: data.vat,
          note: data.note,
          buyer: data.buyer,
          seller: data.seller,
        })
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  // display a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>
  }

  const dueDate = new Date(invoice.dueDate).toLocaleString()
  const issued = new Date(invoice.issued).toLocaleString()

  return (
    <div>
      <h1>Detail Faktury</h1>
      <hr />
      <h3>Číslo faktury: {invoice.invoiceNumber}</h3>
      <p>
        <p>
          <strong>Datum vystavení: </strong>
          {invoice.issued}
          <br />
        </p>
        <p>
          <strong>Datum splatnosti: </strong>
          {invoice.dueDate}
          <br />
        </p>
        <p>
          <strong>Product: </strong>
          {invoice.product}
          <br />
        </p>
        <p>
          <strong>Cena: </strong>
          {invoice.price}
          <br />
        </p>
        <p>
          <strong>VAT: </strong>
          {invoice.vat}
          <br />
        </p>
        <p>
          <strong>Poznámky: </strong>
          {invoice.note}
          <br />
        </p>
        <p />
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <h3>Prodávající</h3>
            <p>
              <strong>Název: </strong>
              {invoice.seller.name}
              <br />
              <strong>IČO: </strong>
              {invoice.seller.identificationNumber}
              <br />
              <strong>DIČ: </strong>
              {invoice.seller.taxNumber}
              <br />
              <strong>Účet číslo: </strong>
              {invoice.seller.accountNumber}
              <br />
              <strong>Kód banky: </strong>
              {invoice.seller.bankCode}
              <br />
              <strong>IBAN: </strong>
              {invoice.seller.iban}
              <br />
              <strong>Telefon: </strong>
              {invoice.seller.telephone}
              <br />
              <strong>Email: </strong>
              {invoice.seller.mail}
              <br />
              <strong>Adresa: </strong>
              {invoice.seller.street}, {invoice.seller.zip}{' '}
              {invoice.seller.city}, {invoice.seller.country}
              <br />
              <strong>Poznámka: </strong>
              {invoice.seller.note}
            </p>
          </div>

          <div className='col-md-6 col-sm-12'>
            <h3>Nakupující</h3>
            <p>
              <strong>Název: </strong>
              {invoice.buyer.name}
              <br />
              <strong>IČO: </strong>
              {invoice.buyer.identificationNumber}
              <br />
              <strong>DIČ: </strong>
              {invoice.buyer.taxNumber}
              <br />
              <strong>Účet číslo: </strong>
              {invoice.buyer.accountNumber}
              <br />
              <strong>Kód banky: </strong>
              {invoice.buyer.bankCode}
              <br />
              <strong>IBAN: </strong>
              {invoice.buyer.iban}
              <br />
              <strong>Telefon: </strong>
              {invoice.buyer.telephone}
              <br />
              <strong>Email: </strong>
              {invoice.buyer.mail}
              <br />
              <strong>Adresa: </strong>
              {invoice.buyer.street}, {invoice.buyer.zip} {invoice.buyer.city},{' '}
              {invoice.buyer.country}
              <br />
              <strong>Poznámka: </strong>
              {invoice.buyer.note}
            </p>
          </div>
        </div>
      </p>
      <Link to={'/invoices'}>
        <button className='btn btn-success'>Zpět</button>
      </Link>
    </div>
  )
}

export default InvoiceDetail
