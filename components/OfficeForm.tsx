import { useState } from 'react'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      `Selected Office: ${selectedOffice}\nSelected Account Office: ${selectedAccountOffice}`
    )
  }

  return (
    <section className="flex flex-col items-center mt-12 space-y-8 max-w-3xl w-full">
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Select Office and Account Office
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white p-6 rounded shadow"
      >
        <div>
          <label
            htmlFor="officeSelect"
            className="block mb-2 font-medium text-gray-700"
          >
            Name of the Office
          </label>
          <select
            id="officeSelect"
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          >
            <option value="">-- Select an Office --</option>
            {allOffices.map((office) => (
              <option key={office.serial} value={office.name}>
                {office.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="accountOfficeSelect"
            className="block mb-2 font-medium text-gray-700"
          >
            Account Office
          </label>
          <select
            id="accountOfficeSelect"
            value={selectedAccountOffice}
            onChange={(e) => setSelectedAccountOffice(e.target.value)}
            className="block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          >
            <option value="">-- Select Account Office --</option>
            {accountOffices.map((ac) => (
              <option key={ac} value={ac}>
                {ac}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </section>
  )
}
