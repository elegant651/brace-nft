import { useEffect, useState } from "react"
import { useCovalent } from "../hooks/useCovalent"

export default function HistoryList({ addr }: { addr: string}) {
  const CONTRACT_ADDR = '0xB4967cb579330A89A285Fe6E875ac95ac09D7B3f'

  const [dataRows, setDataRows] = useState<any>([])
  const [transactions, setTransactions] = useState<any>([])
 
  // covalent list
  const { 
    getNFTTokenIdsForContract, 
    getNFTTransactionsForContract, 
    getNFTExternalMetadataForContract 
  } = useCovalent()

  useEffect(() => {
    const fetch = async () => {
      const tokenIds = await getNFTTokenIdsForContract(CONTRACT_ADDR)
      console.log('t', tokenIds)
      // const txs = await getNFTTransactionsForContract(CONTRACT_ADDR, '3')
      // console.log('s', txs)
      // const metadata = await getNFTExternalMetadataForContract(CONTRACT_ADDR, "3")
      // console.log('m', metadata)
      setDataRows(tokenIds.data.items)
    }
    fetch()
  }, [addr])

  const getTransactions = async (tokenId: string) => {
    const txs = await getNFTTransactionsForContract(CONTRACT_ADDR, '3')
    console.log('s', txs)
    setTransactions(txs.data.items)
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <h2>{CONTRACT_ADDR} transaction list</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                      Token Id
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                      Contract Address
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                      Contract Name
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                      Contract Ticker Symbol
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                      Transactions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                { dataRows.map((row : any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-white-800 whitespace-nowrap">
                       {row.token_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                      {row.contract_address.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                      {row.contract_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                      {row.contract_ticker_symbol}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <div style={{ cursor: 'pointer'}} onClick={() => getTransactions(row.token_id)}>get transactions</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>Transactions:</div>
      <div>
        { transactions.map((row : any, index: number) => (
            <>{JSON.stringify(row)}</>
          ))
        }
      </div>
    </div>
  );

}