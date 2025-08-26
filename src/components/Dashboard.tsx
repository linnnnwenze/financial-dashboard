import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Tabs, Card, Space, Tag, Row, Col, Statistic, message } from 'antd';
import { 
  DashboardOutlined, 
  BarChartOutlined, 
  PieChartOutlined, 
  LineChartOutlined,
  UploadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { FinancialData, CostData } from '../types';
import DataUpload from './DataUpload';
import RevenueCharts from './RevenueCharts';
import CostCharts from './CostCharts';
import ComparisonCharts from './ComparisonCharts';
import FinancialTable from './FinancialTable';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<FinancialData[]>([]);
  const [costData, setCostData] = useState<CostData[]>([]);
  const [selectedKey, setSelectedKey] = useState('overview');

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedRevenueData = localStorage.getItem('financialDashboard_revenueData');
    const savedCostData = localStorage.getItem('financialDashboard_costData');
    
    if (savedRevenueData) {
      try {
        setRevenueData(JSON.parse(savedRevenueData));
      } catch (error) {
        console.error('加载收入数据失败:', error);
      }
    }
    
    if (savedCostData) {
      try {
        setCostData(JSON.parse(savedCostData));
      } catch (error) {
        console.error('加载成本数据失败:', error);
      }
    }
  }, []);

  // 保存数据到 localStorage
  const saveDataToStorage = (revenue: FinancialData[], cost: CostData[]) => {
    try {
      localStorage.setItem('financialDashboard_revenueData', JSON.stringify(revenue));
      localStorage.setItem('financialDashboard_costData', JSON.stringify(cost));
    } catch (error) {
      console.error('保存数据失败:', error);
    }
  };

  // 处理收入数据上传
  const handleRevenueDataUpload = (data: FinancialData[]) => {
    setRevenueData(data);
    saveDataToStorage(data, costData);
    message.success('收入数据上传成功！');
  };

  // 处理成本数据上传
  const handleCostDataUpload = (data: CostData[]) => {
    setCostData(data);
    saveDataToStorage(revenueData, data);
    message.success('成本数据上传成功！');
  };

  // 重置数据
  const handleResetData = () => {
    setRevenueData([]);
    setCostData([]);
    localStorage.removeItem('financialDashboard_revenueData');
    localStorage.removeItem('financialDashboard_costData');
    message.success('数据已重置！');
  };

  // 检查是否有数据
  const hasData = revenueData.length > 0 || costData.length > 0;

  // 计算全局统计数据
  const getGlobalStats = () => {
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.yearToDateRevenue, 0);
    const totalCost = costData.reduce((sum, item) => sum + item.yearToDateCost, 0);
    const netProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const totalBudget = revenueData.reduce((sum, item) => sum + item.budgetAmount, 0);
    const completionRate = totalBudget > 0 ? (totalRevenue / totalBudget) * 100 : 0;

    return {
      totalRevenue,
      totalCost,
      netProfit,
      profitMargin,
      completionRate,
      revenueCount: revenueData.length,
      costCount: costData.length
    };
  };

  const stats = getGlobalStats();

  // 菜单项配置
  const menuItems = [
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: '全局数据看板',
    },
    {
      key: 'revenue',
      icon: <BarChartOutlined />,
      label: '收入分析',
      disabled: revenueData.length === 0,
    },
    {
      key: 'cost',
      icon: <PieChartOutlined />,
      label: '成本分析',
      disabled: costData.length === 0,
    },
    {
      key: 'comparison',
      icon: <LineChartOutlined />,
      label: '对比分析',
      disabled: revenueData.length === 0,
    },
    {
      key: 'data-overview',
      icon: <FileTextOutlined />,
      label: '数据概览',
    },
    {
      key: 'upload',
      icon: <UploadOutlined />,
      label: '数据上传',
    },
  ];

  // 渲染内容区域
  const renderContent = () => {
    switch (selectedKey) {
      case 'overview':
        return (
          <div>
            {/* 全局数据看板 - 首页 */}
            <Card title="财务数据全局看板" style={{ marginBottom: 24 }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* 核心指标统计卡片 */}
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="总收入"
                        value={stats.totalRevenue}
                        precision={2}
                        valueStyle={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold' }}
                        suffix="万元"
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="总成本"
                        value={stats.totalCost}
                        precision={2}
                        valueStyle={{ color: '#ff4d4f', fontSize: '20px', fontWeight: 'bold' }}
                        suffix="万元"
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="净利润"
                        value={stats.netProfit}
                        precision={2}
                        valueStyle={{ color: stats.netProfit >= 0 ? '#52c41a' : '#ff4d4f', fontSize: '20px', fontWeight: 'bold' }}
                        suffix="万元"
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="利润率"
                        value={stats.profitMargin}
                        precision={2}
                        valueStyle={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold' }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                </Row>

                {/* 次要指标 */}
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="预算完成率"
                        value={stats.completionRate}
                        precision={2}
                        valueStyle={{ color: '#faad14', fontSize: '18px', fontWeight: 'bold' }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="收入数据条数"
                        value={stats.revenueCount}
                        valueStyle={{ color: '#722ed1', fontSize: '18px', fontWeight: 'bold' }}
                        suffix="条"
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Statistic
                        title="成本数据条数"
                        value={stats.costCount}
                        valueStyle={{ color: '#13c2c2', fontSize: '18px', fontWeight: 'bold' }}
                        suffix="条"
                      />
                    </Card>
                  </Col>
                </Row>

                {/* 快速操作提示 */}
                {!hasData && (
                  <Card>
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <UploadOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                      <div style={{ fontSize: '16px', color: '#1890ff', marginBottom: 8 }}>
                        欢迎使用财务数据看板系统
                      </div>
                      <div style={{ color: '#666' }}>
                        请先上传财务数据文件以查看详细分析
                      </div>
                    </div>
                  </Card>
                )}


              </Space>
            </Card>

            {/* 快速图表预览 */}
            {hasData && (
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="部门收入分布" size="small">
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        {(() => {
                          const deptRevenue = revenueData.reduce((acc, item) => {
                            acc[item.department] = (acc[item.department] || 0) + item.yearToDateRevenue;
                            return acc;
                          }, {} as { [key: string]: number });
                          
                          const sortedDepts = Object.entries(deptRevenue).sort((a, b) => b[1] - a[1]);
                          
                          return (
                            <div>
                              {sortedDepts.slice(0, 3).map(([dept, revenue], index) => (
                                <div key={dept} style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  marginBottom: 8,
                                  padding: '4px 0'
                                }}>
                                  <span style={{ color: '#666', fontSize: '14px' }}>{dept}</span>
                                  <span style={{ 
                                    color: ['#1890ff', '#52c41a', '#faad14'][index], 
                                    fontSize: '16px', 
                                    fontWeight: 'bold' 
                                  }}>
                                    {revenue.toFixed(2)} 万元
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="预算完成率排名" size="small">
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        {(() => {
                          const sortedByCompletion = [...revenueData]
                            .sort((a, b) => b.completionRate - a.completionRate)
                            .slice(0, 3);
                          
                          return (
                            <div>
                              {sortedByCompletion.map((item, index) => (
                                <div key={item.businessSegment} style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  marginBottom: 8,
                                  padding: '4px 0'
                                }}>
                                  <span style={{ 
                                    color: '#666', 
                                    fontSize: '12px',
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
                                    fontSize: '16px', 
                                    fontWeight: 'bold' 
                                  }}>
                                    {item.completionRate.toFixed(1)}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            )}

            {hasData && (
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Card title="数据更新状态" size="small">
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>收入数据</div>
                          <div style={{ fontSize: '18px', color: '#52c41a', fontWeight: 'bold' }}>
                            {revenueData.length} 条记录
                          </div>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>成本数据</div>
                          <div style={{ fontSize: '18px', color: '#ff4d4f', fontWeight: 'bold' }}>
                            {costData.length} 条记录
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>数据完整性</div>
                          <div style={{ fontSize: '18px', color: '#1890ff', fontWeight: 'bold' }}>
                            {((revenueData.length + costData.length) / 52 * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        );

      case 'revenue':
        return <RevenueCharts data={revenueData} />;

      case 'cost':
        return <CostCharts data={costData} />;

      case 'comparison':
        return <ComparisonCharts revenueData={revenueData} costData={costData} />;

      case 'upload':
        return (
          <DataUpload
            onRevenueDataUpload={handleRevenueDataUpload}
            onCostDataUpload={handleCostDataUpload}
            onResetData={handleResetData}
            hasData={hasData}
          />
        );

      case 'data-overview':
        return (
          <div>
            <Card title="数据概览" style={{ marginBottom: 24 }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Card size="small" style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                        {revenueData.length}
                      </div>
                      <div style={{ color: '#666' }}>收入数据条数</div>
                    </div>
                  </Card>
                  <Card size="small" style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 'bold', color: '#ff4d4f' }}>
                        {costData.length}
                      </div>
                      <div style={{ color: '#666' }}>成本数据条数</div>
                    </div>
                  </Card>
                  <Card size="small" style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                        {revenueData.length + costData.length}
                      </div>
                      <div style={{ color: '#666' }}>总数据条数</div>
                    </div>
                  </Card>
                </div>
                
                <div>
                  <Text strong>数据状态：</Text>
                  <Space style={{ marginLeft: 16 }}>
                    <Tag color={revenueData.length > 0 ? 'green' : 'red'}>
                      {revenueData.length > 0 ? '✓ 收入数据已加载' : '✗ 收入数据未加载'}
                    </Tag>
                    <Tag color={costData.length > 0 ? 'green' : 'red'}>
                      {costData.length > 0 ? '✓ 成本数据已加载' : '✗ 成本数据未加载'}
                    </Tag>
                  </Space>
                </div>

                {hasData && (
                  <div>
                    <Text strong>数据摘要：</Text>
                    <div style={{ marginTop: 8 }}>
                      {revenueData.length > 0 && (
                        <div style={{ marginBottom: 8 }}>
                          <Text>收入数据：</Text>
                          <Text type="secondary">
                            总收入 {revenueData.reduce((sum, item) => sum + item.yearToDateRevenue, 0).toLocaleString()} 万元，
                            预算总额 {revenueData.reduce((sum, item) => sum + item.budgetAmount, 0).toLocaleString()} 万元
                          </Text>
                        </div>
                      )}
                      {costData.length > 0 && (
                        <div>
                          <Text>成本数据：</Text>
                          <Text type="secondary">
                            总成本 {costData.reduce((sum, item) => sum + item.yearToDateCost, 0).toLocaleString()} 万元，
                            预算总额 {costData.reduce((sum, item) => sum + item.budgetAmount, 0).toLocaleString()} 万元
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!hasData && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    <UploadOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                    <div>暂无数据，请先上传财务数据文件</div>
                  </div>
                )}
              </Space>
            </Card>

            {hasData && (
              <Card title="数据表格" style={{ marginBottom: 24 }}>
                <Tabs defaultActiveKey="revenue">
                  {revenueData.length > 0 && (
                    <TabPane tab="收入数据" key="revenue">
                      <FinancialTable data={revenueData} type="revenue" />
                    </TabPane>
                  )}
                  {costData.length > 0 && (
                    <TabPane tab="成本数据" key="cost">
                      <FinancialTable data={costData} type="cost" />
                    </TabPane>
                  )}
                </Tabs>
              </Card>
            )}
          </div>
        );

      default:
        return <div>请选择功能模块</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#001529', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          财务数据看板系统
        </Title>
      </Header>
      
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        
        <Layout style={{ padding: '24px' }}>
          <Content style={{ 
            background: '#fff', 
            padding: 24, 
            margin: 0, 
            minHeight: 280,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
