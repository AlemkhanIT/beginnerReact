import React from 'react'

const Modal = ({modal, setModal, children}) =>{
  return (
        <div className={`overlay animop ${modal?'show':''}`}>
          <div className='modal'>
            {children}
            <button onClick={() => setModal(false)}>X</button>
          </div>
        </div>
  )
}

export default Modal