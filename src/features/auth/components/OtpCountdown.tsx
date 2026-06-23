'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface OtpCountdownProps {
  cooldownSeconds?: number;
  onResend: () => void;
}

export default function OtpCountdown({
  cooldownSeconds = 60,
  onResend,
}: OtpCountdownProps) {
  const t = useTranslations('auth.links');
  const tActions = useTranslations('auth.actions');

  const [targetTime, setTargetTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(cooldownSeconds);

  useEffect(() => {
    // Save target Unix timestamp to prevent browser delay drift
    setTargetTime(Date.now() + cooldownSeconds * 1000);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (targetTime === 0) return;

    const timer = setInterval(() => {
      const delta = Math.max(0, Math.round((targetTime - Date.now()) / 1000));
      setTimeLeft(delta);
      if (delta === 0) {
        clearInterval(timer);
      }
    }, 250);

    return () => clearInterval(timer);
  }, [targetTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeLeft > 0) {
    return (
      <p className="text-sm text-stone-500 font-medium">
        {t('resend_in', { time: formatTime(timeLeft) })}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={onResend}
      className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
    >
      {tActions('resend_otp')}
    </button>
  );
}
