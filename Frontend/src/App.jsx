// import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { CompaniesComp } from './Components/Companies/companies'
import { Footer } from './Components/Footer/footer'
import { HeroComp } from './Components/HeroComponent/heroComp'
import { InfinixPrdct } from './Components/InfinixPrdct/InfinixPrdct'
import { IphonePrdct } from './Components/IphonePrdct/IphonePrdct'
import { Navbar } from './Components/Navbar/navbar'
import { OppoPrdct } from './Components/OppoPrdct/OppoPrdct'
import { SamsungPrdct } from './Components/SumgsamgPrdct/SumsamgPrdct'
import { VivoPrdct } from './Components/VivoPrdct/VivoPrdct'

function App() {
  return (
    <>
      <header>
        <ToastContainer />
        <Navbar />
        <HeroComp />
      </header>
      <main>
        <section>
          <CompaniesComp />
        </section>
        <section className='img-Sec' id='Su-sec'></section>
        <section>
          <SamsungPrdct />
          <VivoPrdct />
        </section>
        <section className='img-Sec' id='Ap-sec'></section>
        <section>
          <IphonePrdct />
          <InfinixPrdct />
          <OppoPrdct />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
