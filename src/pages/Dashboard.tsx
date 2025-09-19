/** biome-ignore-all lint/complexity/useLiteralKeys: ignore */
/** biome-ignore-all lint/correctness/noUnusedVariables: ignore */

import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import searchSvg from '../assets/search.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Pagination } from '../components/Pagination'
import { RefundItem, type RefundItemProps } from '../components/RefundItem'
import { api } from '../services/api'
import { CATEGORIES } from '../utils/categories'
import { formatCurrency } from '../utils/formatCurrency'

const REFUND_EXAMPLE = {
  id: '123',
  name: 'Pedro',
  category: 'Alimentação',
  amount: formatCurrency(34.5),
  categoryImg: CATEGORIES['food'].icon,
}

const PER_PAGE = 5

export function Dashboard() {
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE])

  async function fetchRefunds() {
    try {
      const response = await api.get(
        `/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`,
        {}
      )

      console.log(response.data)
    } catch (error) {
      console.log(error)

      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }

      alert('Erro ao buscar solicitações')
    }
  }

  function handlePagination(action: 'previous' | 'next') {
    setPage((prevPage) => {
      if (action === 'next' && prevPage < totalPage) {
        return prevPage + 1
      }

      if (action === 'previous' && prevPage > 1) {
        return prevPage - 1
      }

      return prevPage
    })
  }

  useEffect(() => {
    fetchRefunds()
  }, [])

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

      <div className="flex flex-col gap-4 my-6 max-h-[342px] overflow-y-scroll">
        {refunds.map((item) => (
          <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalPage}
        onNext={() => handlePagination('next')}
        onPrevious={() => handlePagination('previous')}
      />
    </div>
  )
}
