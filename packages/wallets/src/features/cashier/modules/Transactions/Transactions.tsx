import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { useActiveWalletAccount } from '@deriv/api';
import { WalletDropdown } from '../../../../components';
import FilterIcon from '../../../../public/images/filter.svg';
import { TransactionsCompleted, TransactionsPending } from './components';
import './Transactions.scss';

type TTransactionsPendingFilter = ComponentProps<typeof TransactionsPending>['filter'];
type TTransactionCompletedFilter = ComponentProps<typeof TransactionsCompleted>['filter'];
type TFilterValue = TTransactionCompletedFilter | TTransactionsPendingFilter;

const filtersMapper: Record<string, Record<string, TFilterValue>> = {
    completed: {
        all: undefined,
        deposit: 'deposit',
        transfer: 'transfer',
        withdrawal: 'withdrawal',
    },
    pending: {
        all: 'all',
        deposit: 'deposit',
        withdrawal: 'withdrawal',
    },
};

const Transactions = () => {
    const { data: wallet } = useActiveWalletAccount();
    const [isPendingActive, setIsPendingActive] = useState(false);
    const [filterValue, setFilterValue] = useState('all');

    const filterOptionsList = useMemo(
        () =>
            Object.keys(filtersMapper[isPendingActive ? 'pending' : 'completed'])
                // Filtering out withdrawal option for demo wallets
                .filter(key => !wallet?.is_virtual || key !== 'withdrawal')
                .map(key => ({
                    text:
                        key === 'deposit' && wallet?.is_virtual
                            ? 'Reset balance'
                            : key.replace(/^\w/, c => c.toUpperCase()),
                    value: key,
                })),
        [isPendingActive, wallet?.is_virtual]
    );

    useEffect(() => {
        if (!wallet?.currency_config?.is_crypto && isPendingActive) {
            setIsPendingActive(false);
        }
    }, [wallet?.currency_config?.is_crypto, isPendingActive]);

    useEffect(() => {
        if (isPendingActive && !Object.keys(filtersMapper.pending).includes(filterValue)) {
            setFilterValue('all');
        }
        if (!isPendingActive && !Object.keys(filtersMapper.completed).includes(filterValue)) {
            setFilterValue('all');
        }
    }, [filterValue, isPendingActive]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='wallets-transactions'>
            <div className='wallets-transactions__header'>
                {wallet?.currency_config?.is_crypto && (
                    <div className='wallets-transactions__toggle'>
                        <p>Pending Transactions</p>
                        <input
                            checked={isPendingActive}
                            className='wallets-transactions__toggle-switch'
                            id='toggle-pending'
                            onChange={() => setIsPendingActive(!isPendingActive)}
                            type='checkbox'
                        />
                        <label className='wallets-transactions__toggle-switch__label' htmlFor='toggle-pending'>
                            <span className='wallets-transactions__toggle-switch__button' />
                        </label>
                    </div>
                )}
                <WalletDropdown
                    icon={<FilterIcon />}
                    label='Filter'
                    list={filterOptionsList}
                    onSelect={value => setFilterValue(value)}
                    value={filterValue}
                />
            </div>
            {isPendingActive ? (
                <TransactionsPending filter={filtersMapper.pending[filterValue] as TTransactionsPendingFilter} />
            ) : (
                <TransactionsCompleted filter={filtersMapper.completed[filterValue] as TTransactionCompletedFilter} />
            )}
        </div>
    );
};

export default Transactions;
