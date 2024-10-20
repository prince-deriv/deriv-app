import React, { useCallback, useState } from 'react';
import { useAvailableMT5Accounts } from '@deriv/api';
import { ModalStepWrapper, WalletButton } from '../../../../components/Base';
import { useModal } from '../../../../components/ModalProvider';
import useDevice from '../../../../hooks/useDevice';
import { DynamicLeverageContext } from '../../components/DynamicLeverageContext';
import { MarketTypeDetails } from '../../constants';
import { DynamicLeverageScreen, DynamicLeverageTitle } from '../../screens/DynamicLeverage';
import { JurisdictionScreen } from '../../screens/Jurisdiction';
import { MT5PasswordModal } from '..';
import './JurisdictionModal.scss';

const JurisdictionModal = () => {
    const [selectedJurisdiction, setSelectedJurisdiction] = useState('');
    const [isDynamicLeverageVisible, setIsDynamicLeverageVisible] = useState(false);

    const { modalState, show } = useModal();
    const { isLoading } = useAvailableMT5Accounts();
    const { isMobile } = useDevice();

    const marketType = modalState?.marketType || 'all';
    const platform = modalState?.platform || 'mt5';

    const { title } = MarketTypeDetails[marketType];

    const toggleDynamicLeverage = useCallback(() => {
        setIsDynamicLeverageVisible(!isDynamicLeverageVisible);
    }, [isDynamicLeverageVisible, setIsDynamicLeverageVisible]);

    const jurisdictionTitle = `Choose a jurisdiction for your Deriv MT5 ${title} account`;

    const modalFooter = isDynamicLeverageVisible
        ? undefined
        : () => (
              <WalletButton
                  disabled={!selectedJurisdiction}
                  isFullWidth={isMobile}
                  onClick={() => show(<MT5PasswordModal marketType={marketType} platform={platform} />)}
                  text='Next'
              />
          );

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <DynamicLeverageContext.Provider value={{ isDynamicLeverageVisible, toggleDynamicLeverage }}>
            <ModalStepWrapper
                renderFooter={modalFooter}
                shouldHideHeader={isDynamicLeverageVisible}
                title={jurisdictionTitle}
            >
                {isDynamicLeverageVisible && <DynamicLeverageTitle />}
                <div className='wallets-jurisdiction-modal'>
                    <JurisdictionScreen
                        selectedJurisdiction={selectedJurisdiction}
                        setSelectedJurisdiction={setSelectedJurisdiction}
                    />
                    <DynamicLeverageScreen />
                </div>
            </ModalStepWrapper>
        </DynamicLeverageContext.Provider>
    );
};

export default JurisdictionModal;
