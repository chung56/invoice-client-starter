import React, { useState } from 'react'
import InputSelect from '../components/InputSelect'
import InputField from '../components/InputField'

const InvoiceFilter = (props) => {
  const handleChange = (e) => {
    props.handleChange(e)
  }

  const handleSubmit = (e) => {
    props.handleSubmit(e)
  }

  const handleReset = (e) => {
    props.handleReset(e)
  }

  const filter = props.filter

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <InputSelect
            name='buyerID'
            items={props.buyerList}
            handleChange={handleChange}
            label='Kupující'
            prompt='nevybrán'
            value={filter.buyerID}
          />
        </div>

        <div className='col'>
          <InputSelect
            name='sellerID'
            items={props.sellerList}
            handleChange={handleChange}
            label='Prodávající'
            prompt='nevybrán'
            value={filter.sellerID}
          />
        </div>

        <div className='col'>
          <InputField
            type='number'
            min='1'
            name='limit'
            handleChange={handleChange}
            label='Limit počtu faktur'
            prompt='neuveden'
            value={filter.limit ? filter.limit : ''}
          />
        </div>

        <div className='row'>
          <div className='col'>
            <InputField
              type='number'
              min='0'
              name='minPrice'
              handleChange={handleChange}
              label='Minimální cena'
              prompt='neuveden'
              value={filter.minPrice ? filter.minPrice : ''}
            />
          </div>
          <div className='col'>
            <InputField
              type='number'
              min='0'
              name='maxPrice'
              handleChange={handleChange}
              label='Maximálni cena'
              prompt='neuveden'
              value={filter.maxPrice ? filter.maxPrice : ''}
            />
          </div>
          <div className='col'>
            <InputField
              type='text'
              name='product'
              items={props.productList}
              handleChange={handleChange}
              label='Produkt'
              prompt='neuveden'
              value={filter.product ? filter.product : ''}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div>
          <input
            type='submit'
            className='btn btn-secondary mt-3 px-5 '
            value={props.confirm}
          />
          <button
            className='btn btn-secondary mt-3 px-5 mx-4'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}

export default InvoiceFilter
