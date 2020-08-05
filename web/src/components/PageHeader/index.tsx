import React from 'react'
import { Link } from 'react-router-dom'

//Styles
import './styles.css'

//Assets
import logoSvg from '../../assets/images/logo.svg'

//Assets/Icons
import backIcon from '../../assets/images/icons/back.svg'

interface PageHeaderProps {
  title: string
  description?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">

      <div className="top-bar-container">
        <Link to="/">
          <img src={ backIcon } alt="Voltar"/>
        </Link>

        <img src={ logoSvg } alt="Proffy"/>

      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        { props.description && <p>{props.description}</p>}

        {props.children}
      </div>

    </header>
  )
}

export default PageHeader
