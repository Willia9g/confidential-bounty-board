import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi'
import { ConfidentialBountyBoardABI } from '@/lib/contract'

export function useBountyBoardContract() {
  const { address } = useAccount()
  
  const contract = useContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: ConfidentialBountyBoardABI,
  })

  return {
    contract,
    address,
  }
}

export function useBountyInfo(bountyId: number) {
  const { data, isLoading, error } = useContractRead({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: ConfidentialBountyBoardABI,
    functionName: 'getBountyInfo',
    args: [BigInt(bountyId)],
  })

  return {
    bounty: data,
    isLoading,
    error,
  }
}

export function useUserReputation(userAddress: string) {
  const { data, isLoading, error } = useContractRead({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: ConfidentialBountyBoardABI,
    functionName: 'getUserReputation',
    args: [userAddress as `0x${string}`],
  })

  return {
    reputation: data,
    isLoading,
    error,
  }
}

export function useCreateBounty() {
  const { write, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: ConfidentialBountyBoardABI,
    functionName: 'createBounty',
  })

  return {
    createBounty: write,
    isLoading,
    error,
  }
}

export function useSubmitApplication() {
  const { write, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: ConfidentialBountyBoardABI,
    functionName: 'submitApplication',
  })

  return {
    submitApplication: write,
    isLoading,
    error,
  }
}

export function useCreateUserProfile() {
  const { write, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: ConfidentialBountyBoardABI,
    functionName: 'createUserProfile',
  })

  return {
    createUserProfile: write,
    isLoading,
    error,
  }
}
