import React from 'react';
import {EthConnect,  getQARewardContract} from './EthLib';

const {EthProvider, EthSigner} = EthConnect();
//const multiERC20Contract = getMultiERC20Contract(EthSigner);
const qarewardContract = getQARewardContract(EthSigner);
const defaultContext = {
    EthProvider, EthSigner, qarewardContract
}

const AppContext=React.createContext(defaultContext);

export {AppContext, defaultContext};