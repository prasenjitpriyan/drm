'use client'

import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Entry {
  id: number
  office: string
  account: string
  numberOfOutsiders: string
  startDate: string
  endDate: string
  numberOfDays: string
  hoursPerDay: string
  cause: string
  recommendation: string
}

export default function DataPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [data, setData] = useState<Entry[]>([])
  const office = searchParams.get('office')
  const account = searchParams.get('account')

  useEffect(() => {
    const newEntry = {
      id: Date.now(),
      office,
      account,
      numberOfOutsiders: searchParams.get('numberOfOutsiders') || '',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
      numberOfDays: searchParams.get('numberOfDays') || '',
      hoursPerDay: searchParams.get('hoursPerDay') || '',
      cause: searchParams.get('cause') || '',
      recommendation: searchParams.get('recommendation') || ''
    }

    if (office && account) {
      const prev = JSON.parse(localStorage.getItem('drmData') || '[]')
      const updated = [...prev, newEntry]
      localStorage.setItem('drmData', JSON.stringify(updated))
      setData(updated)
    } else {
      const prev = JSON.parse(localStorage.getItem('drmData') || '[]')
      setData(prev)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exportToExcel = () => {
    const exportData = data.map((row, index) => ({
      'Sl.': index + 1,
      Office: row.office,
      'Account Office': row.account,
      Outsiders: row.numberOfOutsiders,
      Period: `${row.startDate} to ${row.endDate}`,
      Days: row.numberOfDays,
      'Hours/Day': row.hoursPerDay,
      Cause: row.cause,
      Recommendation: row.recommendation
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DRM Data')
    XLSX.writeFile(workbook, 'SKFSD_DRM_Data.xlsx')
  }

  const exportToPDF = async () => {
    const tableElement = document.getElementById('data-table')
    if (!tableElement) return

    const canvas = await html2canvas(tableElement)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('l', 'mm', 'a4')
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight)
    pdf.save('SKFSD_DRM_Data.pdf')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDelete = (id: number) => {
    const filtered = data.filter((entry) => entry.id !== id)
    setData(filtered)
    localStorage.setItem('drmData', JSON.stringify(filtered))
  }

  const handleEdit = (id: number) => {
    alert(`Edit functionality for ID ${id} coming soon.`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 text-sm sm:text-base">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
        DRM Bills Data (SKFSD)
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-slate-400">No data available.</p>
      ) : (
        <div className="overflow-auto rounded-xl border border-slate-700 shadow-lg">
          <table
            id="data-table"
            className="min-w-full border-collapse table-auto bg-slate-800 text-white"
          >
            <thead className="bg-slate-700 text-cyan-400">
              <tr>
                <th className="border border-slate-600 px-3 py-2">Sl.</th>
                <th className="border border-slate-600 px-3 py-2">
                  Name of Office
                </th>
                <th className="border border-slate-600 px-3 py-2">
                  Account Office
                </th>
                <th className="border border-slate-600 px-3 py-2">Outsiders</th>
                <th className="border border-slate-600 px-3 py-2">Period</th>
                <th className="border border-slate-600 px-3 py-2">Days</th>
                <th className="border border-slate-600 px-3 py-2">Hrs/Day</th>
                <th className="border border-slate-600 px-3 py-2">Cause</th>
                <th className="border border-slate-600 px-3 py-2">
                  Recommendation
                </th>
                <th className="border border-slate-600 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr
                  key={entry.id}
                  className="text-center even:bg-slate-900 hover:bg-slate-800"
                >
                  <td className="border border-slate-700 px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.office}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.account}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.numberOfOutsiders}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.startDate} to {entry.endDate}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.numberOfDays}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.hoursPerDay}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.cause}
                  </td>
                  <td className="border border-slate-700 px-2 py-1">
                    {entry.recommendation}
                  </td>
                  <td className="border border-slate-700 px-2 py-1 space-x-2">
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handleEdit(entry.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Export to Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Export to PDF
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
        >
          Print
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
          onClick={() => router.push('/dashboard')}
        >
          + Add More
        </button>
      </div>
    </div>
  )
}
