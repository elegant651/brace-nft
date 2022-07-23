import {connect} from  "@tableland/sdk"
import { ethers } from 'ethers';
import type { ExternalProvider } from '@ethersproject/providers';

export const TABLE_NAME = 'mmtable_80001_513'

export type ROW_TYPE = {
  id: number,
  ca: string,
  metadata: string,
  address: string
}

export function useTableland() {
  const getConnection = async (ethereumProvider : ExternalProvider) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    console.log('dd', signer)

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer: signer });
    // return tableland

    // Create a new table with a supplied SQL schema and optional `prefix`
    // @return {Connection} Connection object, including the table's `name`
    const { name } = await tableland.create(
      `id int, ca text, metadata text, address text, primary key (id)`, // Table schema definition
      `mmtable` // Optional `prefix` used to define a human-readable string
    );

    // // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(name); // e.g., mytable_5_30
    // // Without the supplied `prefix`, `name` would be be `_5_30`

    // // Insert a row into the table
    // // @return {WriteQueryResult} On-chain transaction hash of the write query
    // const writeRes = await tableland.write(`INSERT INTO ${name} (id, name) VALUES (0, 'Bobby Tables');`);

    // // Perform a read query, requesting all rows from the table
    // const readRes = await tableland.read(`SELECT * FROM ${name};`);
    // // Note: a table *must first exist* in Tableland before performing `read`
    // // Use retry logic with the `receipt` method to verify `txnHash` != undefined
    // // See the `read` documentation below for more details

    // console.log('r', readRes)
  }

  const createTable = async (ethereumProvider : ExternalProvider) => {
    const tableland = await getConnection(ethereumProvider)
    console.log('tt', tableland)
    // const { name } = await tableland.create(
    //   `id int, ca text, metadata text, address text, primary key (id)`, // Table schema definition
    //   `mmtable` // Optional `prefix` used to define a human-readable string
    // );
    // const { name } = await tableland.create(
    //   `name text, id int, primary key (id)`, // Table schema definition
    //   `mytable` // Optional `prefix` used to define a human-readable string
    // );
    // console.log('ddddd', name)
    return name
  }

  const writeQuery = async (ethereumProvider : ExternalProvider, tableName: string, data: ROW_TYPE) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    console.log('dd', signer)

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer: signer });
    const writeRes = await tableland.write(`INSERT INTO ${tableName} (id, ca, metadata, address) VALUES (${data.id}, '${data.ca}', '${data.metadata}', '${data.address}');`);
    return writeRes
  }

  const readQuery = async (ethereumProvider : ExternalProvider, tableName: string) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    console.log('dd', signer)

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer: signer });
    const readRes = await tableland.read(`SELECT * FROM ${tableName};`);
    return readRes
  }

  return { getConnection, createTable, writeQuery, readQuery }
}