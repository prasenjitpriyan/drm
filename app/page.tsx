'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import OfficeForm from '@/components/OfficeForm'

interface Office {
  serial: number
  name: string
}

const allOffices: Office[] = [
  { serial: 1, name: 'Baghajatin' },
  { serial: 2, name: 'Ballygunge' },
  { serial: 3, name: 'Ballygunge RS' },
  { serial: 4, name: 'Ballygunge SC' },
  { serial: 5, name: 'Baishnab Ghata Patuli Township' },
  { serial: 6, name: 'Bijoygargh' },
  { serial: 7, name: 'Bosepukur Road' },
  { serial: 8, name: 'Dhakuria' },
  { serial: 9, name: 'Doverlane' },
  { serial: 10, name: 'East Kolkata Township' },
  { serial: 11, name: 'Ganguly Bagan' },
  { serial: 12, name: 'Garcha Road' },
  { serial: 13, name: 'Garfa' },
  { serial: 14, name: 'Garia B T' },
  { serial: 15, name: 'Gariahat Market' },
  { serial: 16, name: 'Golfgreen' },
  { serial: 17, name: 'Golpark' },
  { serial: 18, name: 'Haltu' },
  { serial: 19, name: 'Jadavgargh' },
  { serial: 20, name: 'Jadavpur University' },
  { serial: 21, name: 'Jodhpur Park' },
  { serial: 22, name: 'K P Roy Lane' },
  { serial: 23, name: 'Kalikapur' },
  { serial: 24, name: 'Kasba' },
  { serial: 25, name: 'Lake Gardens' },
  { serial: 26, name: 'Lake Market' },
  { serial: 27, name: 'Madurdaha' },
  { serial: 28, name: 'Mukundapur' },
  { serial: 29, name: 'Naktala' },
  { serial: 30, name: 'Panchasayar' },
  { serial: 31, name: 'PGH Shah Road' },
  { serial: 32, name: 'Purbachal Main Road' },
  { serial: 33, name: 'Rajpur Jorabagan' },
  { serial: 34, name: 'Ras Behari Avenue' },
  { serial: 35, name: 'Regent Estate' },
  { serial: 36, name: 'RK Seva Pratisthan' },
  { serial: 37, name: 'Sammilani Mahavidyalaya' },
  { serial: 38, name: 'Santoshpur Avenue' },
  { serial: 39, name: 'Santoshpur DSO' },
  { serial: 40, name: 'Sarat Bose Road' },
  { serial: 41, name: 'Viveknagar' },
  { serial: 42, name: 'South Kolkata 1st Sub Division' }
]

const accountOffices = ['Tollygunge', 'Alipore']

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <Header />

      {!showForm ? (
        <Hero onGetStarted={() => setShowForm(true)} />
      ) : (
        <OfficeForm allOffices={allOffices} accountOffices={accountOffices} />
      )}
    </main>
  )
}
