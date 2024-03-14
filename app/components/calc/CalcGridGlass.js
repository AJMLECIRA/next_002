'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabList, TabPanels, useBreakpointValue } from '@chakra-ui/react';
import { GlassTypeTab, ShapeSizeTab, FittingsTab } from './CalcTabs';
import { GlassTypePanel } from './calcPanels/CalcPanelGlassType';
import { GlassShapeSizePanel } from './calcPanels/CalcPanelShapeSize';
import { FittingsPanel } from './calcPanels/CalcPanelFittings';

export default function CalcGrid() {
  // Count the number of tabs
  const containerRef = useRef(null);
  const [totalTabs, setTotalTabs] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const tabsCount = containerRef.current.querySelectorAll(
        'div[role="tablist"] > .chakra-tabs__tab'
      ).length;
      // console.log('Number of Tabs:', tabsCount);
      setTotalTabs(tabsCount);
    }
  }, []);
  // tabs used for this grid
  const tabComponents = [GlassTypeTab, ShapeSizeTab, FittingsTab];
  // Navigate Tabs with buttons
  const [tabIndex, setTabIndex] = useState(0);
  const goToNextTab = () => {
    if (tabIndex < totalTabs - 1) {
      setTabIndex((prevIndex) => prevIndex + 1);
    }
  };
  const goToPrevTab = () => {
    // console.log('Go to Previous');
    if (tabIndex > 0) {
      setTabIndex((prevIndex) => prevIndex - 1);
    }
  };
  useEffect(() => {
    // console.log(`The active tab is now: ${tabIndex}`);
    // Perform any actions you need when tab changes
  }, [tabIndex]);

  const isMdUp = useBreakpointValue({ base: false, md: true });

  return (
    <Tabs
      index={tabIndex}
      onChange={(index) => setTabIndex(index)}
      variant="enclosed"
      ref={containerRef}
      minHeight={{ base: '75vw', md: '40vw' }}
      display="flex"
      flexDirection={'column'}
      height="100%"
    >
      <TabList
        border="0"
        margin="0"
        backgroundColor="#cccccc"
        borderRadius={{ base: '3vw 3vw 0 0', md: '1.5vw 1.5vw 0 0' }}
      >
        {tabComponents.map((TabComponent, index) => {
          // Determine if the tab is active based on the current index and breakpoint
          const isActive = isMdUp || index === tabIndex;
          return (
            <TabComponent key={index} number={index + 1} isActive={isActive} />
          );
        })}
      </TabList>
      <TabPanels
        background="#E6E6E6"
        display="flex"
        flex="1"
        border="solid 0px red"
      >
        <GlassTypePanel goToNextTab={goToNextTab} goToPrevTab={goToPrevTab} />
        <GlassShapeSizePanel
          goToNextTab={goToNextTab}
          goToPrevTab={goToPrevTab}
        />
        <FittingsPanel goToNextTab={goToNextTab} goToPrevTab={goToPrevTab} />
        {/* ... additional tab panels */}
      </TabPanels>
    </Tabs>
  );
}
