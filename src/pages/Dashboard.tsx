/** biome-ignore-all lint/complexity/useLiteralKeys: ignore */
import { useState } from 'react'
import searchSvg from '../assets/search.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Pagination } from '../components/Pagination'
import { RefundItem } from '../components/RefundItem'
import { CATEGORIES } from '../utils/categories'
import { formatCurrency } from '../utils/formatCurrency'

const REFUND_EXAMPLE = {
  id: '123',
  name: 'Pedro',
  category: 'Alimentação',
  amount: formatCurrency(34.5),
  categoryImg: CATEGORIES['food'].icon,
}

export function Dashboard() {
  const [name, setName] = useState('')

  function fetchRefunds(e: React.FormEvent) {
    e.preventDefault()

    console.log(name)
  }

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="ícone de pesquisar" className="w-5" />
        </Button>
      </form>

      <div className="flex flex-col gap-4 mt-6 max-h-[342px] overflow-y-scroll">
        <RefundItem data={REFUND_EXAMPLE} />
      </div>

      <Pagination current={1} total={10} />
    </div>
  )
}
