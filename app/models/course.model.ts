export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface Course {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  status: string;
  date: string;
  modified: string;
  featured_media: number;
  price_type: "open" | "closed" | "free" | "paynow" | "subscribe";
  course_start_date: string;
  course_end_date: string;
  _embedded?: {
    "wp:featuredmedia"?: [WPFeaturedMedia];
  };
}

export function getCourseImage(course: Course): string | undefined {
  return course._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

export interface Lesson {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  status: string;
  course: number;
  menu_order: number;
  video_enabled: boolean;
  video_url: string;
  materials_enabled: boolean;
  materials: { rendered: string };
  forced_timer_enabled: boolean;
  forced_timer_amount: string | number;
  assignment_upload_enabled: boolean;
  is_sample: boolean;
}