'use client';

import { useTranslations } from 'next-intl';
import { TimelineEntry } from '@/types/api.types';
import { CheckCircle2, Clock } from 'lucide-react';

interface OrderTimelineProps {
  timeline: TimelineEntry[];
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  const t = useTranslations('orders.timeline');

  // Sort timeline by timestamp ascending or descending. Usually descending (newest on top) looks great
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {sortedTimeline.map((entry, index) => {
          const isLatest = index === 0;
          const formattedTime = new Date(entry.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const formattedDate = new Date(entry.timestamp).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
          });

          return (
            <li key={`${entry.status}-${index}`}>
              <div className="relative pb-8">
                {index !== sortedTimeline.length - 1 && (
                  <span
                    className="absolute top-4 start-4 -ms-px h-full w-0.5 bg-zinc-800"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3 rtl:space-x-reverse items-start">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-zinc-950 ${isLatest ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-zinc-800 text-zinc-400'}`}>
                      {isLatest ? (
                        <Clock className="h-4 w-4 animate-pulse" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4 rtl:space-x-reverse">
                    <div>
                      <p className={`text-sm font-semibold ${isLatest ? 'text-white' : 'text-zinc-400'}`}>
                        {t(entry.status)}
                      </p>
                      {entry.description && (
                        <p className="mt-1 text-xs text-zinc-500">{entry.description}</p>
                      )}
                    </div>
                    <div className="text-end text-xs whitespace-nowrap text-zinc-500">
                      <div>{formattedTime}</div>
                      <div>{formattedDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
