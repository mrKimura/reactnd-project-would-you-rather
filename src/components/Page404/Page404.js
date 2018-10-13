import React from 'react'
import { NavLink } from 'react-router-dom'
import './page-404.css'

const Page404 = () => (
  <div className="err">
    <div className="err__num">404</div>
    <div className="err__text">This page was not found</div>
    <NavLink className="err__link" to="/">
      To Home Page
    </NavLink>
  </div>
)

export default Page404
