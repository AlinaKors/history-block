import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Year } from './YearsBlockStyle';
import gsap from 'gsap';

interface IYearsBlock {
  year: number;
  color: string;
}

export const YearsBlock: React.FC<IYearsBlock> = ({ year, color }) => {
  const yearBlock = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (yearBlock.current) {
      gsap.set(yearBlock.current, { innerHTML: year });
    }
  }, []);

  useEffect(() => {
    gsap.to(yearBlock.current, {
      innerHTML: year,
      duration: 0.5,
      snap: { innerHTML: 1 },
      modifiers: { innerHTML: (innerHTML) => Number(innerHTML).toFixed(0) },
      ease: 'power1.in',
    });
  }, [year]);
  return <Year color={color} ref={yearBlock}></Year>;
};
