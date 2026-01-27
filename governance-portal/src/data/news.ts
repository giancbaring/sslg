
export interface NewsArticle {
  id: number;
  title: string;
  content: string;
}

export const news: NewsArticle[] = [
  {
    id: 1,
    title: 'First General Assembly',
    content: 'The first general assembly for the new school year will be held this Friday. All students are required to attend.',
  },
  {
    id: 2,
    title: 'Club Registrations',
    content: 'Registrations for all official school clubs are now open. Visit the SSLG office to sign up.',
  },
];
