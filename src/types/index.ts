// 财务数据类型定义
export interface FinancialData {
  businessSegment: string;        // 业务板块
  currentMonthRevenue: number;    // 当月收入(元)
  yearToDateRevenue: number;      // 本年累计(元)
  budgetAmount: number;           // 预算额(元)
  completionRate: number;         // 完成率(%)
  department: string;             // 部门
}

export interface CostData {
  costCategory: string;           // 成本类别
  currentMonthCost: number;       // 当月成本(元)
  yearToDateCost: number;         // 本年累计成本(元)
  budgetAmount: number;           // 预算额(元)
  costRate: number;               // 成本率(%)
  department: string;             // 部门
}

export interface DashboardData {
  revenueData: FinancialData[];
  costData: CostData[];
  lastUpdated: string;
}

// 图表配置类型
export interface ChartConfig {
  title: string;
  type: 'bar' | 'pie' | 'line' | 'gauge' | 'treemap';
  data: any[];
  options?: any;
}

// 上传文件类型
export interface UploadFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error';
  url?: string;
  file?: File;
} 