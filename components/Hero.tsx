interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center flex-grow space-y-6 max-w-3xl text-center px-4">
      <h2 className="text-4xl font-semibold text-gray-800">
        Welcome to the SKFSD DRM Bill Management
      </h2>
      <p className="text-gray-600 max-w-xl">
        Consolidate and manage your DRM bills smoothly for 42 offices across
        South Kolkata. Click “Get Started” below to begin data selection and
        entry.
      </p>
      <button
        onClick={onGetStarted}
        className="px-8 py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </section>
  )
}
