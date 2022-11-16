import { useWeb3React } from '@web3-react/core'
import { useLaunchPadContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { multicallv2 } from 'utils/multicall'
import { useWkdCommit } from 'views/Pools/hooks/useWkdCommit'
import bsc from '../../../config/constants/launchPad'
import React,{useCallback} from "react"
import launchpadabi from "../../../config/abi/launchpad.json"

export const useLaunchPad = () => {
  const { active, account } = useWeb3React()
  let contract = useLaunchPadContract(bsc.test[56])
  const { getUserCommitBalance } = useWkdCommit()
  // const [balance, setBalance] = useState(0)
// console.log(contract)
  //   useEffect(() =>{
  // fetchUserCommit()
  //   },[active,account])

  // const fetchUserCommit = async() =>{
  //   const result:any = await getUserCommitBalance()
  //   setBalance(result.toString())
  // }

  // console.log('balance', balance)

  const getIfoInfo = async () => {
    try {
      const info = await contract.getLaunchPadInfo()
      return info
    } catch (error) {
      console.log(error)
    }
  }

  const getAmountRaised = async () => {
    try {
      const info = await contract.raisedAmount()
      return info
    } catch (error) {
      console.log(error)
    }
  }

  const depositBnb = async (amount, callback) => {
    if (!active) return
    try {
      await contract.deposit(amount).then(callback)
    } catch (error) {
      throw error
    }
  }

  const claimToken = async() =>{
    if(!active)return;
    try {
      await contract.claimToken()
    } catch (error) {
      throw error
    }
  }


  const getClaimedStatus = async(account) =>{
    try {
    const result = await contract.hasClaimed(account)
    return  result
    } catch (error) {
     throw error 
    }
  }

const address = bsc.test[56]
  const fetchBlock = async() =>{
    const[startBlock, endBlock] = await multicallv2(launchpadabi,[
      {
        address,
        name:'StartBlock'
      },
      {
        address,
        name:'EndBlock'
      }
    ].filter(Boolean))
    return {
      startBlock, endBlock
    }
  }

  return {
    contract,
    getIfoInfo,
    depositBnb,
    getAmountRaised,
    fetchBlock,
    claimToken,
    getClaimedStatus
    
  }
}
