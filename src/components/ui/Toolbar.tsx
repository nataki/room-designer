import { Box } from 'lucide-react'

export default function Toolbar() {
  return (
    <header className="flex items-center justify-between px-4 h-12 bg-slate-900 border-b border-slate-700 shrink-0">
      <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
        <Box size={18} />
        <span className="hidden sm:inline text-slate-100">Room Designer</span>
      </div>
    </header>
  )
}
