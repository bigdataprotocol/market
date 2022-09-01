import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import loadable from '@loadable/component'
import styles from './Menu.module.css'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import UserPreferences from './UserPreferences'
import Badge from '../atoms/Badge'
import Logo from '../atoms/Logo'
import Networks from './UserPreferences/Networks'
import SearchBar from './SearchBar'
import { useWeb3 } from '../../providers/Web3'

const Wallet = loadable(() => import('./Wallet'))

declare type MenuItem = {
  name: string
  link: string
}

function MenuLink({ item }: { item: MenuItem }) {
  const location = useLocation()

  const classes =
    location?.pathname === item.link
      ? `${styles.link} ${styles.active}`
      : styles.link

  return (
    <Link key={item.name} to={item.link} className={classes}>
      {item.name}
    </Link>
  )
}

export default function Menu(): ReactElement {
  const { accountId } = useWeb3()
  const whitelistedAddress = '0x89717015882D6460e4A0daeB945B3D4032f2D9D6'

  const { menu, siteTitle } = useSiteMetadata()

  return (
    <nav className={styles.menu}>
      <Link to="/" className={styles.logo}>
        <Logo noWordmark />
        <h1 className={styles.title}>
          {siteTitle} <Badge label="v3" />
        </h1>
      </Link>

      <ul className={styles.navigation}>
        {menu.map(
          (item: MenuItem) =>
            (item.name != 'Publish' ||
              (item.name == 'Publish' && accountId == whitelistedAddress)) && (
              <li key={item.name}>
                <MenuLink item={item} />
              </li>
            )
        )}
      </ul>

      <div className={styles.actions}>
        <SearchBar />
        <Networks />
        <Wallet />
        <UserPreferences />
      </div>
    </nav>
  )
}
