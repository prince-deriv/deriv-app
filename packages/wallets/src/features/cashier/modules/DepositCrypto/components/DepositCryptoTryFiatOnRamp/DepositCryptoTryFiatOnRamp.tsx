import React from 'react';
import { useHistory } from 'react-router-dom';
import { WalletText } from '../../../../../../components';
import './DepositCryptoTryFiatOnRamp.scss';

const DepositCryptoTryFiatOnRamp = () => {
    const history = useHistory();

    return (
        <div className='wallets-deposit-crypto-try-fiat-onramp'>
            <WalletText size='xs'>
                Looking for a way to buy cryptocurrencies?&nbsp;
                <a
                    className='link wallets-deposit-crypto-try-fiat-onramp__link'
                    onClick={() => history.push('/wallets/cashier/on-ramp')}
                >
                    Try Fiat onramp
                </a>
                .
            </WalletText>
        </div>
    );
};

export default DepositCryptoTryFiatOnRamp;
