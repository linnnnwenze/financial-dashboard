import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { FinancialData, CostData } from '../types';
import ChartComponent from './ChartComponent';

interface ComparisonChartsProps {
  revenueData: FinancialData[];
  costData: CostData[];
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ revenueData, costData }) => {
  if (!revenueData || revenueData.length === 0) {
    return (
      <Card title="收入成本对比分析" style={{ marginBottom: 16 }}>
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          暂无收入数据，无法进行对比分析
        </div>
      </Card>
    );
  }

  // 计算汇总数据
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.yearToDateRevenue, 0);
  const totalCost = costData.reduce((sum, item) => sum + item.yearToDateCost, 0);
  const netProfit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  // 收入成本对比柱状图
  const comparisonOption = {
    title: {
      text: '收入成本对比',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        let result = params[0].name + '<br/>';
        params.forEach((param: any) => {
          const value = typeof param.value === 'number' ? param.value : parseFloat(param.value) || 0;
          result += param.marker + param.seriesName + ': ' + value.toFixed(2) + ' 万元<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['收入', '成本'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['总收入', '总成本', '净利润'],
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '金额 (万元)',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '收入',
        type: 'bar',
        data: [parseFloat(totalRevenue.toFixed(2)), 0, 0],
        itemStyle: {
          color: '#52c41a'
        }
      },
      {
        name: '成本',
        type: 'bar',
        data: [0, parseFloat(totalCost.toFixed(2)), 0],
        itemStyle: {
          color: '#ff7875'
        }
      },
      {
        name: '净利润',
        type: 'bar',
        data: [0, 0, parseFloat(netProfit.toFixed(2))],
        itemStyle: {
          color: netProfit >= 0 ? '#1890ff' : '#f5222d'
        }
      }
    ]
  };

  // 利润率仪表板
  const profitMarginOption = {
    title: {
      text: '利润率监控',
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
      min: -50,
      max: 50,
      splitNumber: 10,
      itemStyle: {
        color: profitMargin >= 0 ? '#52c41a' : '#ff7875',
        shadowColor: profitMargin >= 0 ? 'rgba(82,196,26,0.45)' : 'rgba(255,120,117,0.45)',
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
          return Math.round(value * 100) / 100 + '%';
        },
        color: 'auto'
      },
      data: [{
        value: profitMargin,
        name: '利润率'
      }]
    }]
  };

  // 预算完成率雷达图
  const budgetCompletionOption = {
    title: {
      text: '预算完成率雷达图',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    radar: {
      indicator: [
        { name: '基础物业服务', max: 100 },
        { name: '食堂服务', max: 100 },
        { name: '档案整理', max: 100 },
        { name: '基础信息化', max: 100 },
        { name: '业务区服务', max: 100 },
        { name: '呼叫中心', max: 100 }
      ],
      radius: '60%'
    },
    series: [{
      type: 'radar',
      data: [{
        value: [55.20, 52.37, 50.70, 24.31, 46.52, 35.26],
        name: '完成率',
        itemStyle: {
          color: '#1890ff'
        },
        areaStyle: {
          color: 'rgba(24, 144, 255, 0.3)'
        }
      }]
    }]
  };

  // 收入分布饼图
  const revenueDistributionOption = {
    title: {
      text: '收入分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        const value = typeof params.value === 'number' ? params.value : parseFloat(params.value) || 0;
        const percent = typeof params.percent === 'number' ? params.percent : parseFloat(params.percent) || 0;
        return params.name + ': ' + value.toFixed(2) + ' 万元 (' + percent.toFixed(2) + '%)';
      }
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
      data: revenueData.slice(0, 8).map((item, index) => ({
        name: item.businessSegment.length > 10 ? item.businessSegment.substring(0, 10) + '...' : item.businessSegment,
        value: parseFloat(item.yearToDateRevenue.toFixed(2)),
        itemStyle: {
          color: ['#52c41a', '#1890ff', '#722ed1', '#13c2c2', '#faad14', '#f5222d', '#eb2f96', '#fa8c16'][index % 8]
        }
      })),
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
              title="总收入"
              value={parseFloat(totalRevenue.toFixed(2))}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
              suffix="万元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总成本"
              value={parseFloat(totalCost.toFixed(2))}
              precision={2}
              valueStyle={{ color: '#ff7875' }}
              suffix="万元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="净利润"
              value={parseFloat(netProfit.toFixed(2))}
              precision={2}
              valueStyle={{ color: netProfit >= 0 ? '#1890ff' : '#f5222d' }}
              suffix="万元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="利润率"
              value={parseFloat(profitMargin.toFixed(2))}
              precision={2}
              valueStyle={{ color: profitMargin >= 0 ? '#52c41a' : '#f5222d' }}
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
            option={comparisonOption}
            height={350}
          />
        </Col>
        <Col span={12}>
          <ChartComponent
            title=""
            option={profitMarginOption}
            height={350}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="预算完成率雷达图" size="small">
            <div style={{ display: 'flex', height: 350 }}>
              <div style={{ flex: 1 }}>
                <ChartComponent
                  title=""
                  option={budgetCompletionOption}
                  height={350}
                />
              </div>
              <div style={{ width: 200, padding: '10px', fontSize: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
                  完成率详情
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {revenueData.slice(0, 6).map((item, index) => (
                    <div key={item.businessSegment} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                      padding: '4px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <span style={{
                        color: '#666',
                        fontSize: '11px',
                        maxWidth: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.businessSegment}
                      </span>
                      <span style={{
                        color: item.completionRate >= 80 ? '#52c41a' :
                               item.completionRate >= 60 ? '#faad14' : '#ff4d4f',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {item.completionRate.toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <ChartComponent
            title="收入分布"
            option={revenueDistributionOption}
            height={350}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ComparisonCharts; 