import React from 'react'
import styles from './innercontainer.module.css'
function Innerconatiner({children}) {
  return (
    <div className={styles.innercontainer}>{children}</div>
  )
}

export default Innerconatiner