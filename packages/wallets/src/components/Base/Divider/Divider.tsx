import React from 'react';
import './Divider.scss';

type TProps = {
    color?: React.CSSProperties['borderColor'];
    margin?: React.CSSProperties['margin'];
    variant?: 'horizontal' | 'vertical';
};

const Divider: React.FC<TProps> = ({ color = '#f2f3f4', margin, variant = 'horizontal' }) => (
    <div className={`wallets-divider__${variant}`} style={{ borderColor: color, margin }} />
);

export default Divider;
