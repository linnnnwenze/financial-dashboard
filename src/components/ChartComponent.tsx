import React from 'react';
import { Card, Typography } from 'antd';

// 动态导入ECharts组件
const ReactECharts = require('echarts-for-react').default;

const { Title } = Typography;

interface ChartComponentProps {
  title: string;
  option: any;
  style?: React.CSSProperties;
  height?: number | string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  title,
  option,
  style = {},
  height = 400
}) => {
  return (
    <Card 
      title={title} 
      style={{ 
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 8,
        ...style
      }}
      bodyStyle={{ padding: '16px 24px' }}
    >
      <ReactECharts
        option={option}
        style={{ height, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </Card>
  );
};

export default ChartComponent; 