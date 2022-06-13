import React from 'react';
import {EthConnect, getMultiERC20Contract} from './EthLib';

const {EthProvider, EthSigner} = EthConnect();
const multiERC20Contract = getMultiERC20Contract(EthSigner);

const defaultContext = {
    EthProvider, EthSigner,multiERC20Contract
}

const AppContext=React.createContext(defaultContext);

export {AppContext, defaultContext};