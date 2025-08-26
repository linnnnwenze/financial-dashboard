export interface FinancialData {
  id: string;
  businessSegment: string;
  category: string;
  currentMonthRevenue: number;
  yearToDateRevenue: number;
  currentMonthCost: number;
  yearToDateCost: number;
  budgetAmount: number;
  costBudget: number;
  completionRate: number;
  costCompletionRate: number;
  growthRate: number;
  profitRate: number;
  month: number;
  year: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  overallCompletionRate: number;
  currentMonthTotal: number;
  yearToDateTotal: number;
  costCompletionRate: number;
  profitRate: number;
  totalBudget: number;
}

export interface FilterOptions {
  businessSegments: string[];
  categories: string[];
  dateRange: [string, string];
  completionRateRange: [number, number];
}
