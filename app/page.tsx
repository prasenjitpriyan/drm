'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { LampContainer } from '@/components/ui/lamp'

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="mb-4 text-2xl font-bold tracking-widest text-cyan-400"
      >
        SKFSD DRM BILL
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
        className="mb-8 max-w-xl text-center text-lg md:text-xl text-slate-200"
      >
        Consolidate and manage your DRM bills smoothly for 40 offices across
        South Kolkata First Sub Division. Click “Get Started” below to begin
        data selection and entry.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          href="/chooseOffice"
          className="rounded bg-cyan-500 px-6 py-3 font-semibold text-white text-lg hover:bg-cyan-600 shadow-lg transition-all"
        >
          Get Started
        </Link>
      </motion.div>
    </LampContainer>
  )
}
