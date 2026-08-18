import React from 'react'
// import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
// import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import BrandStrip from '../../components/BrandStrip/BrandStrip'
import NewArrivals from '../../components/NewArrivals/NewArrivals'
import TopSelling from '../../components/TopSelling/TopSelling'
import BrowseDressStyle from '../../components/BrowseDressStyle/BrowseDressStyle'
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews'

const Home = () => {
  return (
    <>
        <Hero/>
        <BrandStrip/>
        <NewArrivals/>
        <TopSelling/>
        <BrowseDressStyle/>
        <CustomerReviews/>
    </>
  )
}

export default Home
