export interface StreakData {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  updated_at: string;
}

export interface PointsHistoryItem {
  id: string;
  user_id: string;
  points: number;
  action: "lesson_complete" | "topic_complete" | "quiz_pass" | "daily_login";
  reference_id: string;
  note: string;
  created_at: string;
}

export interface PointsData {
  total: number;
  history: PointsHistoryItem[];
}


export interface AchievementLevel {
  label: string;
  threshold: number;
  image_url: string;
  unlocked: boolean;
  earned_at: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  highest_level: "bronze" | "silver" | "gold" | null;
  levels: {
    bronze: AchievementLevel;
    silver: AchievementLevel;
    gold: AchievementLevel;
  };
}

export interface AchievementsData {
  achievements: Achievement[];
}