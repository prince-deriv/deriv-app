import React from 'react';
import { Divider } from '../../../../components/Base';
import { TransactionStatus } from '../TransactionStatus';
import DepositCryptoAddress from './components/DepositCryptoAddress/DepositCryptoAddress';
import DepositCryptoCurrencyDetails from './components/DepositCryptoCurrencyDetails/DepositCryptoCurrencyDetails';
import DepositCryptoDisclaimers from './components/DepositCryptoDisclaimers/DepositCryptoDisclaimers';
import DepositCryptoTryFiatOnRamp from './components/DepositCryptoTryFiatOnRamp/DepositCryptoTryFiatOnRamp';
import './DepositCrypto.scss';

const DepositCrypto = () => {
    return (
        <div className='wallets-deposit-crypto'>
            <div className='wallets-deposit-crypto__main-content'>
                <DepositCryptoCurrencyDetails />
                <DepositCryptoAddress />
                <DepositCryptoDisclaimers />
                <Divider />
                <DepositCryptoTryFiatOnRamp />
            </div>
            <TransactionStatus transactionType='deposit' />
        </div>
    );
};

export default DepositCrypto;
