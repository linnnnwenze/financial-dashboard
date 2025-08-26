import { FinancialData, CostData } from '../types';

// 示例收入数据（基于您提供的图片数据，已转换为万元单位）
export const sampleRevenueData: FinancialData[] = [
  {
    businessSegment: '业务区服务收入(含客房)',
    currentMonthRevenue: 20.76,
    yearToDateRevenue: 325.62,
    budgetAmount: 700.00,
    completionRate: 46.52,
    department: '品质一部'
  },
  {
    businessSegment: '呼叫中心服务收入',
    currentMonthRevenue: 54.74,
    yearToDateRevenue: 80.38,
    budgetAmount: 227.92,
    completionRate: 35.26,
    department: '数字技术部'
  },
  {
    businessSegment: '基础信息化服务收入',
    currentMonthRevenue: 0,
    yearToDateRevenue: 77.53,
    budgetAmount: 318.87,
    completionRate: 24.31,
    department: '数字技术部'
  },
  {
    businessSegment: '档案整理及数字化加工服务收入',
    currentMonthRevenue: 0,
    yearToDateRevenue: 202.78,
    budgetAmount: 400.00,
    completionRate: 50.70,
    department: '数字技术部'
  },
  {
    businessSegment: '基础物业服务收入',
    currentMonthRevenue: 269.08,
    yearToDateRevenue: 1865.67,
    budgetAmount: 3379.68,
    completionRate: 55.20,
    department: '品质一部'
  },
  {
    businessSegment: '食堂服务收入',
    currentMonthRevenue: 108.34,
    yearToDateRevenue: 784.69,
    budgetAmount: 1498.24,
    completionRate: 52.37,
    department: '品质二部'
  },
  {
    businessSegment: '咖啡吧收入',
    currentMonthRevenue: 3.76,
    yearToDateRevenue: 24.38,
    budgetAmount: 65.31,
    completionRate: 37.33,
    department: '品质二部'
  },
  {
    businessSegment: '场地运营管理服务收入',
    currentMonthRevenue: 5.15,
    yearToDateRevenue: 15.95,
    budgetAmount: 81.00,
    completionRate: 19.69,
    department: '品质一部'
  },
  {
    businessSegment: '司机服务收入',
    currentMonthRevenue: 14.32,
    yearToDateRevenue: 103.46,
    budgetAmount: 188.10,
    completionRate: 55.00,
    department: '品质一部'
  },
  {
    businessSegment: '文创产品收入',
    currentMonthRevenue: -0.000001,
    yearToDateRevenue: 5.01,
    budgetAmount: 15.00,
    completionRate: 33.38,
    department: '数字技术部'
  },
  {
    businessSegment: '其他商务服务收入',
    currentMonthRevenue: 0,
    yearToDateRevenue: 0.000001,
    budgetAmount: 19.93,
    completionRate: 0.00,
    department: '数字技术部'
  },
  {
    businessSegment: '圳易甄选销售收入',
    currentMonthRevenue: 1.18,
    yearToDateRevenue: 22.39,
    budgetAmount: 180.00,
    completionRate: 12.44,
    department: '数字技术部'
  },
  {
    businessSegment: '活动策划、执行服务收入',
    currentMonthRevenue: 0,
    yearToDateRevenue: 3.57,
    budgetAmount: 15.00,
    completionRate: 23.77,
    department: '品质一部'
  },
  {
    businessSegment: '其他',
    currentMonthRevenue: 7.21,
    yearToDateRevenue: 52.99,
    budgetAmount: 86.53,
    completionRate: 61.24,
    department: '品质一部'
  }
];

// 示例成本数据（模拟数据，已转换为万元单位）
export const sampleCostData: CostData[] = [
  {
    costCategory: '人工成本',
    currentMonthCost: 150.00,
    yearToDateCost: 1200.00,
    budgetAmount: 2000.00,
    costRate: 60.00,
    department: '品质一部'
  },
  {
    costCategory: '运营成本',
    currentMonthCost: 80.00,
    yearToDateCost: 640.00,
    budgetAmount: 1000.00,
    costRate: 64.00,
    department: '品质一部'
  },
  {
    costCategory: '技术成本',
    currentMonthCost: 50.00,
    yearToDateCost: 400.00,
    budgetAmount: 600.00,
    costRate: 66.67,
    department: '数字技术部'
  },
  {
    costCategory: '设备成本',
    currentMonthCost: 30.00,
    yearToDateCost: 240.00,
    budgetAmount: 400.00,
    costRate: 60.00,
    department: '数字技术部'
  },
  {
    costCategory: '服务成本',
    currentMonthCost: 60.00,
    yearToDateCost: 480.00,
    budgetAmount: 800.00,
    costRate: 60.00,
    department: '品质二部'
  },
  {
    costCategory: '管理成本',
    currentMonthCost: 40.00,
    yearToDateCost: 320.00,
    budgetAmount: 500.00,
    costRate: 64.00,
    department: '品质一部'
  }
]; 