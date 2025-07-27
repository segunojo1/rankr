'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RankrService } from '@/services/rankr.service';

// Client component for the layout
export default function RankLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const [metadata, setMetadata] = useState<{
    title: string;
    description: string;
  }>({
    title: 'Loading... | Rankr',
    description: 'Loading rank information...',
  });

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await RankrService.getInstance().getRankr(params.id as string);
        const rank = response.rankr;

        if (rank) {
          setMetadata({
            title: `${rank.title} | Rankr`,
            description: `Vote for your favorite: ${rank.person_one_name} vs ${rank.person_two_name}`,
          });
        }
      } catch (error) {
        console.error('Error fetching rank data:', error);
        setMetadata({
          title: 'Rank Not Found | Rankr',
          description: 'The requested rank could not be found.',
        });
      }
    };

    if (params?.id) {
      fetchRankData();
    }
  }, [params?.id]);

  // Update the document title
  useEffect(() => {
    if (metadata.title) {
      document.title = metadata.title;
    }
  }, [metadata.title]);
  return <>{children}</>;
}
