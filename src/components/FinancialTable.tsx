import React from 'react';
import { Table, Tag } from 'antd';
import { FinancialData, CostData } from '../types';

interface FinancialTableProps {
  data: FinancialData[] | CostData[];
  type: 'revenue' | 'cost';
}

// 格式化金额显示
const formatAmount = (value: number) => {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const FinancialTable: React.FC<FinancialTableProps> = ({ data, type }) => {
  const isRevenue = type === 'revenue';
  
  const columns = isRevenue ? [
    {
      title: '业务板块',
      dataIndex: 'businessSegment',
      key: 'businessSegment',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: '当月收入(万元)',
      dataIndex: 'currentMonthRevenue',
      key: 'currentMonthRevenue',
      render: (value: number) => formatAmount(value)
    },
    {
      title: '本年累计(万元)',
      dataIndex: 'yearToDateRevenue',
      key: 'yearToDateRevenue',
      render: (value: number) => formatAmount(value)
    },
    {
      title: '预算额(万元)',
      dataIndex: 'budgetAmount',
      key: 'budgetAmount',
      render: (value: number) => formatAmount(value)
    },
    {
      title: '完成率(%)',
      dataIndex: 'completionRate',
      key: 'completionRate',
      render: (value: number) => (
        <Tag color={value >= 100 ? 'green' : value >= 80 ? 'orange' : 'red'}>
          {value.toFixed(2)}%
        </Tag>
      )
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text: string) => <Tag color="blue">{text}</Tag>
    }
  ] : [
    {
      title: '成本类别',
      dataIndex: 'costCategory',
      key: 'costCategory',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: '当月成本(万元)',
      dataIndex: 'currentMonthCost',
      key: 'currentMonthCost',
      render: (value: number) => formatAmount(value)
    },
    {
      title: '本年累计成本(万元)',
      dataIndex: 'yearToDateCost',
      key: 'yearToDateCost',
      render: (value: number) => formatAmount(value)
    },
    {
      title: '预算额(万元)',
      dataIndex: 'budgetAmount',
      key: 'budgetAmount',
      render: (value: number) => formatAmount(value)
    },
    {
      title: '成本率(%)',
      dataIndex: 'costRate',
      key: 'costRate',
      render: (value: number) => (
        <Tag color={value <= 100 ? 'green' : value <= 120 ? 'orange' : 'red'}>
          {value.toFixed(2)}%
        </Tag>
      )
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text: string) => <Tag color="blue">{text}</Tag>
    }
  ];

  return (
    <div style={{ 
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginTop: '20px'
    }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>财务数据明细</h3>
      <Table
        columns={columns}
        dataSource={data as any[]}
        rowKey={isRevenue ? 'businessSegment' : 'costCategory'}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default FinancialTable;
