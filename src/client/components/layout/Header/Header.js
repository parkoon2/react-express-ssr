import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './header.scss'

const cx = classNames.bind(styles)

const Header = () => {
    return (
        <header className={cx('header')}>
            <div className={cx('header__logo')}>
                <Link to="/">SSR Bolierplate!!!</Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/users">API</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
