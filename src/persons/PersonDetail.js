import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { apiGet } from '../utils/api'
import Country from './Country'

const PersonDetail = () => {
  const { id } = useParams()
  const [person, setPerson] = useState({})
  const [purchases, setPurchases] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    apiGet(`/api/persons/${id}`).then((data) => setPerson(data))
  }, [id])

  useEffect(() => {
    if (person.identificationNumber) {
      apiGet(
        `/api/identification/${person.identificationNumber}/purchases`
      ).then((data) => setPurchases(data))
      apiGet(`/api/identification/${person.identificationNumber}/sales`).then(
        (data) => setSales(data)
      )
    }
  }, [person.identificationNumber])
  const country =
    Country.CZECHIA === person.country ? 'Česká republika' : 'Slovensko'

  return (
    <>
      <div>
        <h1>Detail osoby</h1>
        <hr />
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <h3>
              {person.name} ({person.identificationNumber})
            </h3>
            <p>
              <strong>DIČ:</strong>
              <br />
              {person.taxNumber}
            </p>
            <p>
              <strong>Bankovní účet:</strong>
              <br />
              {person.accountNumber}/{person.bankCode} ({person.iban})
            </p>
            <p>
              <strong>Tel.:</strong>
              <br />
              {person.telephone}
            </p>
            <p>
              <strong>Mail:</strong>
              <br />
              {person.mail}
            </p>
            <p>
              <strong>Sídlo:</strong>
              <br />
              {person.street}, {person.city},{person.zip}, {country}
            </p>
            <p>
              <strong>Poznámka:</strong>
              <br />
              {person.note}
            </p>
          </div>

          <div className='col-md-6 col-sm-12'>
            <h3>Vystavené faktury</h3>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>číslo faktury</th>
                  <th>Odběratel</th>
                  <th>Datum vystavení</th>
                  <th>Datum splatnosti</th>
                  <th>Částka</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.seller.identificationNumber}</td>
                    <td>{purchase.seller.name}</td>
                    <td>{purchase.issued}</td>
                    <td>{purchase.dueDate}</td>
                    <td>{purchase.price} Kč</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Přijaté faktury</h3>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>číslo faktury</th>
                  <th>Odběratel</th>
                  <th>Datum vystavení</th>
                  <th>Datum splatnosti</th>
                  <th>Částka</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.buyer.identificationNumber}</td>
                    <td>{sale.buyer.name}</td>
                    <td>{sale.issued}</td>
                    <td>{sale.dueDate}</td>
                    <td>{sale.price} Kč</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Link to={'/persons'}>
        <button className='btn btn-success'>Zpět</button>
      </Link>
    </>
  )
}

export default PersonDetail
