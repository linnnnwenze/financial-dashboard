import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { FinancialData } from '../types';
import ChartComponent from './ChartComponent';

interface RevenueChartsProps {
  data: FinancialData[];
}

const RevenueCharts: React.FC<RevenueChartsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card title="收入数据概览" style={{ marginBottom: 16 }}>
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          暂无收入数据，请先上传数据文件
        </div>
      </Card>
    );
  }

  // 计算汇总数据
  const totalCurrentMonth = data.reduce((sum, item) => sum + item.currentMonthRevenue, 0);
  const totalYearToDate = data.reduce((sum, item) => sum + item.yearToDateRevenue, 0);
  const totalBudget = data.reduce((sum, item) => sum + item.budgetAmount, 0);
  const overallCompletionRate = totalBudget > 0 ? (totalYearToDate / totalBudget) * 100 : 0;

  // 当月收入柱状图配置
  const currentMonthOption = {
    title: {
      text: '当月收入分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        const value = typeof params[0].value === 'number' ? params[0].value : parseFloat(params[0].value) || 0;
        return params[0].name + ': ' + value.toFixed(2) + ' 万元';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.businessSegment),
      axisLabel: {
        rotate: 45,
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      name: '收入 (万元)',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [{
      data: data.map(item => parseFloat(item.currentMonthRevenue.toFixed(2))),
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#1890ff' },
            { offset: 1, color: '#096dd9' }
          ]
        }
      }
    }]
  };

  // 本年累计收入柱状图配置
  const yearToDateOption = {
    title: {
      text: '本年累计收入分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        const value = typeof params[0].value === 'number' ? params[0].value : parseFloat(params[0].value) || 0;
        return params[0].name + ': ' + value.toFixed(2) + ' 万元';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.businessSegment),
      axisLabel: {
        rotate: 45,
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      name: '收入 (万元)',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [{
      data: data.map(item => parseFloat(item.yearToDateRevenue.toFixed(2))),
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#52c41a' },
            { offset: 1, color: '#389e0d' }
          ]
        }
      }
    }]
  };

  // 预算完成率仪表板配置
  const completionRateOption = {
    title: {
      text: '预算完成率',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 10,
      itemStyle: {
        color: '#58D9F9',
        shadowColor: 'rgba(0,138,255,0.45)',
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      progress: {
        show: true,
        roundCap: true,
        width: 18
      },
      pointer: {
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '75%',
        width: 16,
        offsetCenter: [0, '5%']
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        length: 12,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 30,
        color: '#999',
        fontSize: 12
      },
      title: {
        offsetCenter: [0, '30%'],
        fontSize: 14
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '70%'],
        valueAnimation: true,
        formatter: function (value: number) {
          return Math.round(value) + '%';
        },
        color: 'auto'
      },
      data: [{
        value: overallCompletionRate,
        name: '整体完成率'
      }]
    }]
  };

  // 部门收入占比饼图配置
  const departmentOption = {
    title: {
      text: '部门收入占比',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 万元 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      data: Object.entries(
        data.reduce((acc, item) => {
          acc[item.department] = (acc[item.department] || 0) + item.yearToDateRevenue;
          return acc;
        }, {} as Record<string, number>)
      ).map(([name, value]) => ({ name, value })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <div>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="当月总收入"
              value={totalCurrentMonth}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              suffix="万元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本年累计收入"
              value={totalYearToDate}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
              suffix="万元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="年度预算总额"
              value={totalBudget}
              precision={2}
              valueStyle={{ color: '#faad14' }}
              suffix="万元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="整体完成率"
              value={overallCompletionRate}
              precision={2}
              valueStyle={{ color: '#f5222d' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={16}>
        <Col span={12}>
          <ChartComponent
            title=""
            option={currentMonthOption}
            height={350}
          />
        </Col>
        <Col span={12}>
          <ChartComponent
            title=""
            option={yearToDateOption}
            height={350}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ChartComponent
            title=""
            option={completionRateOption}
            height={350}
          />
        </Col>
        <Col span={12}>
          <ChartComponent
            title=""
            option={departmentOption}
            height={350}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RevenueCharts; 