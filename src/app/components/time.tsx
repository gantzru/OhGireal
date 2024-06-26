'use client'

import { useState, useEffect } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';

export default function Time({
  themes
}: {
  themes: {
    id: number;
    theme: string;
    start_time: Date;
    end_time: Date;
    vote_time: Date;
  };
}) {
  const [time, setTime] = useState('00:00');
  const router = useRouter();
  const params = useParams();
  const pageId = params.id;
  const pathName = usePathname();

  const countDown = () => {
    let difference = 0;
    if (pathName === `/answer` || pathName === `/wait_answer/${pageId}`) {
      if (themes.end_time === undefined) {
        difference = 0;
      } else {
        difference = themes.end_time.getTime() - Date.now();
      }
    } else if (pathName === `/vote/${pageId}` || pathName === `/wait_vote/${pageId}`) {
      if (themes.vote_time === undefined) {
        difference = 0;
      } else {
        difference = themes.vote_time.getTime() - Date.now();
      }
    }
    const d = new Date(difference);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');

    if (difference <= 0) {
      setTime('00:00');
      setTimeout(() => {
        if (pathName === `/wait_answer/${pageId}`) {
          router.push(`/vote/${pageId}`)
        } else if (pathName === `/vote/${pageId}` || pathName === `/wait_vote/${pageId}`) {
          router.push(`/result/${pageId}`)
        }
      }, 4000);
    } else {
      setTime(`${m}:${s}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(countDown, 1000);
    return () => {
      clearTimeout(timeoutId)
    };
  }, [time]);

  return (
    <div>
      {`残り時間 ${time}`}
    </div>
  );
}