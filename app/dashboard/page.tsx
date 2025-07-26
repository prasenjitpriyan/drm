'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaHome, FaCheckCircle, FaTrashAlt, FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const office = searchParams.get('office')
  const account = searchParams.get('account')

  const [formData, setFormData] = useState({
    numberOfOutsiders: '',
    startDate: '',
    endDate: '',
    numberOfDays: '',
    hoursPerDay: '',
    cause: '',
    recommendation: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleDelete = () => {
    setFormData({
      numberOfOutsiders: '',
      startDate: '',
      endDate: '',
      numberOfDays: '',
      hoursPerDay: '',
      cause: '',
      recommendation: ''
    })
    setIsModalOpen(false)
  }

  const handleEdit = () => {
    setIsModalOpen(false)
  }

  const handleFinalSave = () => {
    setIsModalOpen(false)
    alert('Data saved successfully!')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="text-cyan-400 font-bold text-lg text-center sm:text-left">
          {office || 'Office not selected'}
        </div>

        <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition">
          <FaHome className="text-3xl sm:text-2xl" />
        </Link>

        <div className="text-cyan-400 font-bold text-lg text-center sm:text-right">
          {account || 'Account office not selected'}
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl p-6 sm:p-8 space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 text-center mb-4">
            Outsider Utilisation Form
          </h2>

          <div>
            <label className="block mb-1 text-sm sm:text-base">
              Number of Outsiders Temporarily Utilised
            </label>
            <input
              type="number"
              name="numberOfOutsiders"
              value={formData.numberOfOutsiders}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base">
                Number of Days Utilised in Month
              </label>
              <input
                type="number"
                name="numberOfDays"
                value={formData.numberOfDays}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base">
                Hours per Day
              </label>
              <input
                type="number"
                name="hoursPerDay"
                value={formData.hoursPerDay}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base">
              Causes for the Utilisation
            </label>
            <textarea
              name="cause"
              value={formData.cause}
              onChange={handleChange}
              rows={3}
              required
              className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base">
              Recommendation
            </label>
            <select
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="">-- Select --</option>
              <option value="Recommended">Recommended</option>
              <option value="Non-Recommended">Non-Recommended</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-lg w-full bg-white text-black p-6 rounded-2xl space-y-4 shadow-xl">
            <Dialog.Title className="text-lg font-bold text-center mb-2">
              Submitted Data
            </Dialog.Title>

            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <strong>Office:</strong> {office || 'N/A'}
              </li>
              <li>
                <strong>Account Office:</strong> {account || 'N/A'}
              </li>
              <li>
                <strong>Outsiders:</strong> {formData.numberOfOutsiders}
              </li>
              <li>
                <strong>Period:</strong> {formData.startDate} to{' '}
                {formData.endDate}
              </li>
              <li>
                <strong>Days Utilised:</strong> {formData.numberOfDays}
              </li>
              <li>
                <strong>Hours/Day:</strong> {formData.hoursPerDay}
              </li>
              <li>
                <strong>Cause:</strong> {formData.cause}
              </li>
              <li>
                <strong>Recommendation:</strong> {formData.recommendation}
              </li>
            </ul>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 text-red-600 hover:underline"
              >
                <FaTrashAlt /> Delete
              </button>
              <button
                onClick={handleFinalSave}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              >
                <FaCheckCircle /> Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
