'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'

interface Office {
  serial: number
  name: string
}

interface OfficeFormProps {
  allOffices: Office[]
  accountOffices: string[]
}

export default function OfficeForm({
  allOffices,
  accountOffices
}: OfficeFormProps) {
  const [selectedOffice, setSelectedOffice] = useState('')
  const [selectedAccountOffice, setSelectedAccountOffice] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
      `/dashboard?office=${encodeURIComponent(
        selectedOffice
      )}&account=${encodeURIComponent(selectedAccountOffice)}`
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-3xl">
        {/* Home Link */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-block text-cyan-400 hover:text-cyan-300 underline transition"
          >
            <FaHome className="text-3xl" />
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-cyan-500 text-center mb-8">
          Select Office and Account Office
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto space-y-6 rounded-2xl p-8 backdrop-blur-lg bg-white/10 border border-white/10 shadow-xl"
        >
          <div>
            <label
              htmlFor="officeSelect"
              className="block mb-2 font-medium text-white"
            >
              Name of the Office
            </label>
            <select
              id="officeSelect"
              value={selectedOffice}
              onChange={(e) => setSelectedOffice(e.target.value)}
              className="block w-full rounded-lg border border-cyan-500 bg-slate-900 text-white py-2 px-3 shadow-md focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              required
            >
              <option value="" className="bg-slate-800 text-white">
                -- Select an Office --
              </option>
              {allOffices.map((office) => (
                <option
                  key={office.serial}
                  value={office.name}
                  className="bg-slate-800 text-white"
                >
                  {office.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="accountOfficeSelect"
              className="block mb-2 font-medium text-white"
            >
              Account Office
            </label>
            <select
              id="accountOfficeSelect"
              value={selectedAccountOffice}
              onChange={(e) => setSelectedAccountOffice(e.target.value)}
              className="block w-full rounded-lg border border-cyan-500 bg-slate-900 text-white py-2 px-3 shadow-md focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              required
            >
              <option value="" className="bg-slate-800 text-white">
                -- Select Account Office --
              </option>
              {accountOffices.map((ac) => (
                <option key={ac} value={ac} className="bg-slate-800 text-white">
                  {ac}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white font-semibold py-2 rounded hover:bg-cyan-600 transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
