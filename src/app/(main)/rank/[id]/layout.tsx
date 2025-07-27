import type { Metadata } from 'next';
import { RankrService } from '@/services/rankr.service';

interface RankLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const response = await RankrService.getInstance().getRankr(params.id);
    const rank = response.rankr;
    
    if (!rank) {
      return {
        title: 'Rank Not Found | Rankr',
        description: 'The requested rank could not be found.',
      };
    }

    const title = `${rank.title} | Rankr`;
    const description = `Vote for your favorite: ${rank.person_one_name} vs ${rank.person_two_name}`;
    const imageUrl = rank.person_one_image_url || rank.person_two_image_url || '/assets/logo.png';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${rank.person_one_name} vs ${rank.person_two_name}`,
          },
        ],
        type: 'website',
        siteName: 'Rankr',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for rank:', error);
    return {
      title: 'Rank | Rankr',
      description: 'Vote for your favorite on Rankr',
    };
  }
}

export default function RankLayout({ children }: RankLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
