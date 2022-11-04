import { Box, Button, CardBody, CardProps, Flex, Text, TokenPairImage, Input } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FlexGap } from 'components/Layout/Flex'
import { vaultPoolConfig } from 'config/constants/pools'
import { useTranslation } from 'contexts/Localization'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool, VaultKey, DeserializedLockedCakeVault, DeserializedCakeVault } from 'state/types'
import styled from 'styled-components'

import CardFooter from '../PoolCard/CardFooter'
import PoolCardHeader, { PoolCardHeaderTitle } from '../PoolCard/PoolCardHeader'
import { StyledCard } from '../PoolCard/StyledCard'
import { VaultPositionTagWithLabel } from '../Vault/VaultPositionTag'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'
import { StakingApy } from './StakingApy'
import VaultCardActions from './VaultCardActions'
import LockedStakingApy from '../LockedPool/LockedStakingApy'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

interface CakeVaultProps extends CardProps {
  pool: DeserializedPool
  showStakedOnly: boolean
  defaultFooterExpanded?: boolean
  showICake?: boolean
}

interface CakeVaultDetailProps {
  isLoading?: boolean
  account: string
  pool: DeserializedPool
  vaultPool: DeserializedCakeVault
  accountHasSharesStaked: boolean
  defaultFooterExpanded?: boolean
  showICake?: boolean
  performanceFeeAsDecimal: number
}



const CommitTokenCard = () => {
  const { account } = useWeb3React()
  return (
    <StyledCard>
      <StyledCardBody isLoading={false}>
        <h1>Commit Wakanda</h1>
        {account ? (
          <>
            <Input style={{ marginTop: '3rem' }} type="number" />
            <Button style={{ marginTop: '3rem' }}>Commit WKd</Button>
          </>
        ) : null}

        {!account && <ConnectWalletButton style={{ marginTop: '9rem', width:"100%" }} />}
      </StyledCardBody>
    </StyledCard>
  )
}

export default CommitTokenCard
