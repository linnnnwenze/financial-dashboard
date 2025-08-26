import React, { useState } from 'react';
import { Upload, Button, message, Card, Space, Typography, Alert } from 'antd';
import { UploadOutlined, ReloadOutlined } from '@ant-design/icons';
import { FinancialData, CostData } from '../types';

// 动态导入xlsx以避免类型错误
const XLSX = require('xlsx');

const { Title, Text } = Typography;

interface DataUploadProps {
  onRevenueDataUpload: (data: FinancialData[]) => void;
  onCostDataUpload: (data: CostData[]) => void;
  onResetData: () => void;
  hasData: boolean;
}

const DataUpload: React.FC<DataUploadProps> = ({
  onRevenueDataUpload,
  onCostDataUpload,
  onResetData,
  hasData
}) => {
  const [revenueFileList, setRevenueFileList] = useState<any[]>([]);
  const [costFileList, setCostFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // 解析Excel文件
  const parseExcelFile = (file: File, type: 'revenue' | 'cost'): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // 跳过表头，从第二行开始处理数据
          const processedData = jsonData.slice(1).map((row: any) => {
            if (type === 'revenue') {
              return {
                businessSegment: row[0] || '',
                currentMonthRevenue: (parseFloat(row[1]) || 0) / 10000, // 转换为万元
                yearToDateRevenue: (parseFloat(row[2]) || 0) / 10000, // 转换为万元
                budgetAmount: (parseFloat(row[3]) || 0) / 10000, // 转换为万元
                completionRate: parseFloat(row[4]) || 0,
                department: row[5] || ''
              } as FinancialData;
            } else {
              return {
                costCategory: row[0] || '',
                currentMonthCost: (parseFloat(row[1]) || 0) / 10000, // 转换为万元
                yearToDateCost: (parseFloat(row[2]) || 0) / 10000, // 转换为万元
                budgetAmount: (parseFloat(row[3]) || 0) / 10000, // 转换为万元
                costRate: parseFloat(row[4]) || 0,
                department: row[5] || ''
              } as CostData;
            }
          }).filter((item: any) => item.businessSegment || item.costCategory); // 过滤空行

          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // 处理收入数据上传
  const handleRevenueUpload = async (file: File) => {
    setUploading(true);
    try {
      const data = await parseExcelFile(file, 'revenue');
      onRevenueDataUpload(data);
      message.success('收入数据上传成功！');
      setRevenueFileList([file]);
    } catch (error) {
      message.error('收入数据解析失败，请检查文件格式！');
    } finally {
      setUploading(false);
    }
    return false; // 阻止默认上传行为
  };

  // 处理成本数据上传
  const handleCostUpload = async (file: File) => {
    setUploading(true);
    try {
      const data = await parseExcelFile(file, 'cost');
      onCostDataUpload(data);
      message.success('成本数据上传成功！');
      setCostFileList([file]);
    } catch (error) {
      message.error('成本数据解析失败，请检查文件格式！');
    } finally {
      setUploading(false);
    }
    return false; // 阻止默认上传行为
  };

  // 重置数据
  const handleReset = () => {
    onResetData();
    setRevenueFileList([]);
    setCostFileList([]);
    message.success('数据已重置！');
  };

  return (
    <Card title="数据上传管理" style={{ marginBottom: 24 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="数据上传说明"
          description="请上传Excel格式的财务数据文件。收入数据应包含：业务板块、当月收入(元)、本年累计(元)、预算额(元)、完成率(%)、部门等列。成本数据应包含：成本类别、当月成本(元)、本年累计成本(元)、预算额(元)、成本率(%)、部门等列。系统会自动将元转换为万元显示。"
          type="info"
          showIcon
        />

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* 收入数据上传 */}
          <Card 
            title="收入数据上传" 
            size="small" 
            style={{ flex: 1, minWidth: 300 }}
            extra={
              revenueFileList.length > 0 && (
                <Text type="success">✓ 已上传</Text>
              )
            }
          >
            <Upload
              accept=".xlsx,.xls"
              beforeUpload={handleRevenueUpload}
              fileList={revenueFileList}
              onRemove={() => setRevenueFileList([])}
              disabled={uploading}
            >
              <Button 
                icon={<UploadOutlined />} 
                loading={uploading}
                disabled={uploading}
              >
                选择收入数据文件
              </Button>
            </Upload>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
              支持 .xlsx 和 .xls 格式
            </Text>
          </Card>

          {/* 成本数据上传 */}
          <Card 
            title="成本数据上传" 
            size="small" 
            style={{ flex: 1, minWidth: 300 }}
            extra={
              costFileList.length > 0 && (
                <Text type="success">✓ 已上传</Text>
              )
            }
          >
            <Upload
              accept=".xlsx,.xls"
              beforeUpload={handleCostUpload}
              fileList={costFileList}
              onRemove={() => setCostFileList([])}
              disabled={uploading}
            >
              <Button 
                icon={<UploadOutlined />} 
                loading={uploading}
                disabled={uploading}
              >
                选择成本数据文件
              </Button>
            </Upload>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
              支持 .xlsx 和 .xls 格式
            </Text>
          </Card>
        </div>

        {/* 数据重置按钮 */}
        {hasData && (
          <div style={{ textAlign: 'center' }}>
            <Button 
              type="default" 
              icon={<ReloadOutlined />} 
              onClick={handleReset}
              danger
            >
              重置所有数据
            </Button>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default DataUpload; 