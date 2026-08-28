export interface PaymentRecord {
  month: string;
  year: string;
  amount: string;
  dueDate: string;
  paidDate: string;
  daysEarly: number; // positive = early, 0 = on due date, negative = late
  status: "early" | "on_time" | "late";
  score: number; // 0 to 100
}
