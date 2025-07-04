import React from 'react'
import Layout from './dashboard/Layout'
import Header from './dashboard/Header'
import Board from './dashboard/Board'

const Pages = () => {
  return (
    <Layout>
        <Header />
        <Board />
    </Layout>
  )
}

export default Pages