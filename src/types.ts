/* eslint-disable camelcase */

export interface Image {
  preview_url: string;
  width: number;
  height: number;
  size: number;
}

export interface Audio {
  url: string;
  content_type: string;
  byte_size: number;
}

export interface Episode {
  id: number;
  slug?: string;
  number: number;

  title: string;
  subtitle?: string;
  summary?: string;
  author?: string;
  description: string;
  credits?: string;

  published_at?: string;

  explicit: boolean;
  blocked: boolean;

  script?: string;
  'script?'?: boolean;

  image?: Image;

  audio?: {
    duration: number;
    size: number;

    mp3: Audio;
    aac: Audio;
  };
}

export interface Channel {
  title: string;
  language: string;
  copyright: string;
  webmaster: string;
  summary: string;
  subtitle: string;
  owner: {
    name: string;
    email: string;
  };
  author: string;
  explicit: boolean;
  itunes_category: Record<string, string>;
}
