export interface StepProgress {
  step: number;                  // step post ID
  post_type: "sfwd-lessons" | "sfwd-topic" | "sfwd-quiz";
  step_name: string;
  step_status: "not_started" | "in_progress" | "completed";
  date_started_gmt: string;
  date_started: string;
  date_completed_gmt: string;
  date_completed: string;
  awarded_certificate_url: string;
}

export interface CourseProgress {
  course: number;                // course ID
  last_step: number;
  steps_total: number;
  steps_completed: number;
  date_started_gmt: string;
  date_started: string;
  date_completed_gmt: string;
  date_completed: string;
  progress_status: "not_started" | "in_progress" | "completed";
  _embedded?: {
    steps?: [StepProgress[]];   // steps[0] is the array
  };
}