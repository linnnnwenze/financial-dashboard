import { FinancialData, DashboardStats } from '../types/financial';

export const financialData: FinancialData[] = [
  {
    id: '1',
    businessSegment: '软件开发',
    category: '技术服务',
    currentMonthRevenue: 1200000,
    yearToDateRevenue: 13700000,
    currentMonthCost: 800000,
    yearToDateCost: 8500000,
    budgetAmount: 15000000,
    costBudget: 10000000,
    completionRate: 91.33,
    costCompletionRate: 85.00,
    growthRate: 15.50,
    profitRate: 37.95,
    month: 7,
    year: 2025
  },
  {
    id: '2',
    businessSegment: '数据分析',
    category: '咨询服务',
    currentMonthRevenue: 800000,
    yearToDateRevenue: 9200000,
    currentMonthCost: 600000,
    yearToDateCost: 6800000,
    budgetAmount: 10000000,
    costBudget: 8000000,
    completionRate: 92.00,
    costCompletionRate: 85.00,
    growthRate: 12.30,
    profitRate: 26.09,
    month: 7,
    year: 2025
  },
  {
    id: '3',
    businessSegment: '云服务',
    category: '基础设施',
    currentMonthRevenue: 1500000,
    yearToDateRevenue: 16800000,
    currentMonthCost: 900000,
    yearToDateCost: 10200000,
    budgetAmount: 18000000,
    costBudget: 12000000,
    completionRate: 93.33,
    costCompletionRate: 85.00,
    growthRate: 18.20,
    profitRate: 39.29,
    month: 7,
    year: 2025
  },
  {
    id: '4',
    businessSegment: '移动应用',
    category: '产品开发',
    currentMonthRevenue: 900000,
    yearToDateRevenue: 10500000,
    currentMonthCost: 700000,
    yearToDateCost: 7800000,
    budgetAmount: 12000000,
    costBudget: 9000000,
    completionRate: 87.50,
    costCompletionRate: 86.67,
    growthRate: 10.50,
    profitRate: 25.71,
    month: 7,
    year: 2025
  },
  {
    id: '5',
    businessSegment: '人工智能',
    category: '研发服务',
    currentMonthRevenue: 1100000,
    yearToDateRevenue: 12500000,
    currentMonthCost: 850000,
    yearToDateCost: 9500000,
    budgetAmount: 14000000,
    costBudget: 11000000,
    completionRate: 89.29,
    costCompletionRate: 86.36,
    growthRate: 14.80,
    profitRate: 24.00,
    month: 7,
    year: 2025
  },
  {
    id: '6',
    businessSegment: '网络安全',
    category: '安全服务',
    currentMonthRevenue: 700000,
    yearToDateRevenue: 8200000,
    currentMonthCost: 500000,
    yearToDateCost: 5800000,
    budgetAmount: 9000000,
    costBudget: 7000000,
    completionRate: 91.11,
    costCompletionRate: 82.86,
    growthRate: 16.20,
    profitRate: 29.27,
    month: 7,
    year: 2025
  },
  {
    id: '7',
    businessSegment: '区块链',
    category: '创新技术',
    currentMonthRevenue: 600000,
    yearToDateRevenue: 6800000,
    currentMonthCost: 450000,
    yearToDateCost: 5200000,
    budgetAmount: 7500000,
    costBudget: 6000000,
    completionRate: 90.67,
    costCompletionRate: 86.67,
    growthRate: 13.50,
    profitRate: 23.53,
    month: 7,
    year: 2025
  }
];

export const getDashboardStats = (data: FinancialData[]): DashboardStats => {
  const totalRevenue = data.reduce((sum, item) => sum + item.yearToDateRevenue, 0);
  const totalCost = data.reduce((sum, item) => sum + item.yearToDateCost, 0);
  const totalProfit = totalRevenue - totalCost;
  const totalBudget = data.reduce((sum, item) => sum + item.budgetAmount, 0);
  const currentMonthTotal = data.reduce((sum, item) => sum + item.currentMonthRevenue, 0);
  const yearToDateTotal = totalRevenue;
  
  const overallCompletionRate = totalBudget > 0 ? (totalRevenue / totalBudget) * 100 : 0;
  const costCompletionRate = data.reduce((sum, item) => sum + item.costBudget, 0) > 0 ? 
    (totalCost / data.reduce((sum, item) => sum + item.costBudget, 0)) * 100 : 0;
  const profitRate = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  return {
    totalRevenue,
    totalCost,
    totalProfit,
    overallCompletionRate,
    currentMonthTotal,
    yearToDateTotal,
    costCompletionRate,
    profitRate,
    totalBudget
  };
};

export const getCategories = (data: FinancialData[]): string[] => {
  return Array.from(new Set(data.map(item => item.category)));
};

export const getBusinessSegments = (data: FinancialData[]): string[] => {
  return Array.from(new Set(data.map(item => item.businessSegment)));
};
