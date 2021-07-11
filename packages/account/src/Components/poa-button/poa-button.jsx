import { ButtonLink, Text } from '@deriv/components';
import { routes } from '@deriv/shared';
import { localize } from '@deriv/translations';
import React from 'react';

export const PoaButton = () => (
    <ButtonLink className='account-management__button' to={routes.proof_of_address}>
        <Text className='dc-btn__text' as='p' weight='bold'>
            {localize('Proof of address')}
        </Text>
    </ButtonLink>
);
