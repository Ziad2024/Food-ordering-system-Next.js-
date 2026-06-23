'use client';

import React, { useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface OtpInputProps {
  name: string;
}

export default function OtpInput({ name }: OtpInputProps) {
  const { setValue, watch, trigger } = useFormContext();
  const otpValue = watch(name) || '';
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = async (index: number, val: string) => {
    // Only accept numeric entries
    const cleanVal = val.replace(/[^0-9]/g, '');
    if (!cleanVal) return;

    const otpArray = otpValue.split('');
    // Take only the last character entered
    otpArray[index] = cleanVal[cleanVal.length - 1];
    const newOtp = otpArray.join('');
    setValue(name, newOtp);

    // Auto-focus next input field
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.length === 6) {
      await trigger(name);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const otpArray = otpValue.split('');
      
      if (!otpArray[index] && index > 0) {
        // Empty element backspace focuses previous input
        otpArray[index - 1] = '';
        setValue(name, otpArray.join(''));
        inputRefs.current[index - 1]?.focus();
      } else {
        otpArray[index] = '';
        setValue(name, otpArray.join(''));
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center dir-ltr" style={{ direction: 'ltr' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          value={otpValue[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-12 text-center text-xl font-bold border-2 border-stone-200 rounded-md focus:border-orange-500 focus:outline-none bg-white text-stone-900 transition-colors"
        />
      ))}
    </div>
  );
}
