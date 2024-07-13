import React from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../contexts/session'

const PersonTable = ({ label, items, deletePerson }) => {
  const { session } = useSession()
  const isAdmin = session.data?.isAdmin === true

  return (
    <div>
      <p>
        {label} {items.length}
      </p>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Jméno</th>
            <th colSpan={3}>Akce</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>
                <div className='btn-group'>
                  <Link
                    to={'/persons/show/' + item._id}
                    className='btn btn-sm btn-info'
                  >
                    Zobrazit
                  </Link>

                  {isAdmin ? (
                    <Link
                      to={'/persons/edit/' + item._id}
                      className='btn btn-sm btn-warning'
                    >
                      Upravit
                    </Link>
                  ) : null}
                  {isAdmin ? (
                    <button
                      onClick={() => deletePerson(item._id)}
                      className='btn btn-sm btn-danger'
                    >
                      Odstranit
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin ? (
        <Link to={'/persons/create'} className='btn btn-success'>
          Nová osoba
        </Link>
      ) : null}
    </div>
  )
}

export default PersonTable
