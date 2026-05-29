export type TimelineImage = {
  src: string;
  alt: string;
};

export type TimelineEntry = {
  id: string;
  title: string;
  /** Texto da data (ex.: "6 de abril de 2024") */
  date: string;
  /** ISO 8601 para `<time dateTime>` (ex.: "2024-04-06") */
  dateIso?: string;
  description?: string;
  images?: TimelineImage[];
};
