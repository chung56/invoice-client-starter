import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import PersonIndex from './persons/PersonIndex'
import PersonDetail from './persons/PersonDetail'
import PersonForm from './persons/PersonForm'
import InvoiceIndex from './invoices/InvoiceIndex'
import InvoiceDetail from './invoices/InvoiceDetail'
import InvoiceForm from './invoices/InvoiceForm'
import InvoiceStatistic from './invoices/InvoiceStatistic'
import { RegistrationPage } from './registration/RegistrationPage'
import { useSession } from './contexts/session'
import { apiDelete } from './utils/api'
import { LoginPage } from './login/LoginPage'

export function App() {
  const { session, setSession } = useSession()

  const handleLogoutClick = () => {
    apiDelete('/api/auth').finally(() =>
      setSession({ data: null, status: 'unauthorized' })
    )
  }

  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/persons'} className='nav-link'>
                Osoby
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={'/invoices'} className='nav-link'>
                Faktury
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={'/invoices/statistics'} className='nav-link'>
                Statistiky
              </Link>
            </li>
          </ul>

          <ul className='navbar-nav align-items-center gap-2'>
            {session.data ? (
              <>
                <li className='nav-item'>{session.data.email}</li>
                <li className='nav-item'>
                  <button
                    className='btn btn-sm btn-secondary'
                    onClick={handleLogoutClick}
                  >
                    Odhlásit se
                  </button>
                </li>
              </>
            ) : session.status === 'loading' ? (
              <>
                <div className='spinner-border spinner-border-sm' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to={'/register'}>Registrace</Link>
                </li>
                <li className='nav-item'>
                  <Link to={'/login'}>Přihlásit se</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route index element={<Navigate to={'/persons'} />} />
          <Route path='/persons'>
            <Route index element={<PersonIndex />} />
            <Route path='show/:id' element={<PersonDetail />} />
            <Route path='create' element={<PersonForm />} />
            <Route path='edit/:id' element={<PersonForm />} />
          </Route>

          <Route element={<Navigate to={'/invoices'} />} />
          <Route path='/invoices'>
            <Route index element={<InvoiceIndex />} />
            <Route path='show/:id' element={<InvoiceDetail />} />
            <Route path='create' element={<InvoiceForm />} />
            <Route path='edit/:id' element={<InvoiceForm />} />
            <Route path='statistics' element={<InvoiceStatistic />} />
          </Route>
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
