import React, {createContext} from 'react';
import {Operation} from './types';

type ChartContextProps = {
    getOperationData: () => Promise<void>;
    operationData: Operation;
}

export const ChartContext = createContext<ChartContextProps>({} as ChartContextProps);