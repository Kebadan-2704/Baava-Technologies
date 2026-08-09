import React from 'react';
import { AnimatePresence } from 'framer-motion';
import MacroHub from './flows/MacroHub';
import ErpFlow from './flows/ErpFlow';
import RpaFlow from './flows/RpaFlow';
import DataEntryFlow from './flows/DataEntryFlow';
import SupportFlow from './flows/SupportFlow';
import SupplyChainFlow from './flows/SupplyChainFlow';
import DocMgmtFlow from './flows/DocMgmtFlow';
import BomFlow from './flows/BomFlow';

export default function PortalInfographic({ activeService }) {
  const renderFlow = () => {
    switch (activeService) {
      case 'erp':
        return <ErpFlow key="erp" />;
      case 'rpa':
        return <RpaFlow key="rpa" />;
      case 'data':
        return <DataEntryFlow key="data" />;
      case 'support':
        return <SupportFlow key="support" />;
      case 'supply':
        return <SupplyChainFlow key="supply" />;
      case 'docs':
        return <DocMgmtFlow key="docs" />;
      case 'bom':
        return <BomFlow key="bom" />;
      default:
        return <MacroHub key="macro" activeService={activeService} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderFlow()}
    </AnimatePresence>
  );
}
