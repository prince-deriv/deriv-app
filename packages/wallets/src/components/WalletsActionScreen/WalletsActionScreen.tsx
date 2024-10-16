import React, { ComponentProps, PropsWithChildren, ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import WalletButton from '../Base/WalletButton/WalletButton';
import WalletText from '../Base/WalletText/WalletText';
import './WalletsActionScreen.scss';

type TProps = {
    actionText?: ReactNode;
    actionVariant?: ComponentProps<typeof WalletButton>['variant'];
    description: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    onAction?: () => void;
    title?: string;
    type?: 'modal' | 'page';
};

/**
 * Generic component to display status / action screen / final screen
 * As its common and repeated in many places,
 * at the moment of writing this, there are already 3 different patterns use to display ex
 *
 * @param icon
 * @param title
 * @param description
 * @param actionText
 * @param onAction
 * @constructor
 */
const WalletsActionScreen: React.FC<PropsWithChildren<TProps>> = ({
    actionText,
    actionVariant = 'contained',
    description,
    disabled = false,
    icon,
    onAction,
    title,
    type = 'page',
}) => {
    return (
        <div
            className={classNames('wallets-action-screen', {
                'wallets-action-screen__modal': type === 'modal',
            })}
        >
            {icon}
            <div className='wallets-action-screen__content'>
                {title && (
                    <WalletText align='center' size='md' weight='bold'>
                        {title}
                    </WalletText>
                )}
                {isValidElement(description) ? (
                    description
                ) : (
                    <WalletText align='center' size='md'>
                        {description}
                    </WalletText>
                )}
            </div>
            {actionText && (
                <WalletButton
                    color='primary'
                    disabled={disabled}
                    onClick={onAction}
                    size='lg'
                    text={actionText}
                    variant={actionVariant}
                />
            )}
        </div>
    );
};

export default WalletsActionScreen;
