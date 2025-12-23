import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AIDashboardScreen() {
  const [aiInsights, setAiInsights] = useState({
    salesAccuracy: 94.7,
    inventorySavings: 23,
    fraudDetection: 99.1,
    efficiencyGain: 34,
  });

  const [predictions, setPredictions] = useState([
    { id: 1, category: 'Electronics', predicted: 12500, change: '+12%' },
    { id: 2, category: 'Clothing', predicted: 8900, change: '+8%' },
    { id: 3, category: 'Home & Garden', predicted: 6700, change: '+15%' },
    { id: 4, category: 'Books', predicted: 3200, change: '+5%' },
  ]);

  const [anomalies, setAnomalies] = useState([
    { id: 1, type: 'High Amount', count: 3, risk: 'High' },
    { id: 2, type: 'Unusual Time', count: 5, risk: 'Medium' },
    { id: 3, type: 'New Location', count: 2, risk: 'High' },
  ]);

  const progressData = {
    labels: ["Sales", "Inventory", "Fraud"],
    data: [0.947, 0.23, 0.991]
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const AICard = ({ title, value, subtitle, icon, color }: any) => (
    <View style={styles.aiCard}>
      <View style={[styles.aiIconContainer, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.aiValue}>{value}</Text>
      <Text style={styles.aiTitle}>{title}</Text>
      <Text style={styles.aiSubtitle}>{subtitle}</Text>
    </View>
  );

  const PredictionItem = ({ category, predicted, change }: any) => (
    <View style={styles.predictionItem}>
      <View style={styles.predictionLeft}>
        <View style={styles.categoryDot} />
        <View>
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.predictedText}>${predicted.toLocaleString()}</Text>
        </View>
      </View>
      <View style={[styles.changeBadge, { backgroundColor: change.includes('+') ? '#10b98120' : '#ef444420' }]}>
        <Text style={[styles.changeText, { color: change.includes('+') ? '#10b981' : '#ef4444' }]}>
          {change}
        </Text>
      </View>
    </View>
  );

  const AnomalyItem = ({ type, count, risk }: any) => {
    const getRiskColor = (risk: string) => {
      switch(risk) {
        case 'High': return '#ef4444';
        case 'Medium': return '#f59e0b';
        case 'Low': return '#10b981';
        default: return '#64748b';
      }
    };

    return (
      <View style={styles.anomalyItem}>
        <View>
          <Text style={styles.anomalyType}>{type}</Text>
          <Text style={styles.anomalyCount}>{count} detected</Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: `${getRiskColor(risk)}20` }]}>
          <Text style={[styles.riskText, { color: getRiskColor(risk) }]}>{risk}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>AI Business Intelligence</Text>
            <Text style={styles.subtitle}>Powered by Machine Learning</Text>
          </View>
          <View style={styles.aiBadge}>
            <Icon name="robot" size={20} color="#3b82f6" />
            <Text style={styles.aiBadgeText}>AI Active</Text>
          </View>
        </View>

        {/* AI Performance Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>AI Performance</Text>
            <Text style={styles.chartSubtitle}>Model Accuracy Metrics</Text>
          </View>
          <ProgressChart
            data={progressData}
            width={screenWidth - 48}
            height={160}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.progressChart}
          />
        </View>

        {/* AI Impact Cards */}
        <View style={styles.aiGrid}>
          <AICard 
            title="Sales Prediction" 
            value="94.7%" 
            subtitle="Accuracy" 
            icon="chart-line" 
            color="#3b82f6" 
          />
          <AICard 
            title="Cost Savings" 
            value="23%" 
            subtitle="Inventory" 
            icon="currency-usd" 
            color="#10b981" 
          />
          <AICard 
            title="Fraud Detection" 
            value="99.1%" 
            subtitle="Accuracy" 
            icon="shield-check" 
            color="#ef4444" 
          />
          <AICard 
            title="Efficiency" 
            value="34%" 
            subtitle="Improvement" 
            icon="rocket-launch" 
            color="#8b5cf6" 
          />
        </View>

        {/* Sales Predictions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sales Predictions (Next 30d)</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.predictionsList}>
            {predictions.map((item) => (
              <PredictionItem key={item.id} {...item} />
            ))}
          </View>
        </View>

        {/* Anomaly Detection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Anomaly Detection</Text>
            <TouchableOpacity style={styles.refreshButton}>
              <Icon name="refresh" size={20} color="#3b82f6" />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.anomaliesList}>
            {anomalies.map((item) => (
              <AnomalyItem key={item.id} {...item} />
            ))}
          </View>
        </View>

        {/* AI Recommendations */}
        <View style={[styles.section, styles.recommendationsSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Recommendations</Text>
            <Icon name="lightbulb-on" size={24} color="#f59e0b" />
          </View>
          <View style={styles.recommendationsList}>
            <View style={styles.recommendationItem}>
              <Icon name="check-circle" size={20} color="#10b981" />
              <Text style={styles.recommendationText}>Increase Electronics stock by 15% for Q1</Text>
            </View>
            <View style={styles.recommendationItem}>
              <Icon name="alert-circle" size={20} color="#f59e0b" />
              <Text style={styles.recommendationText}>Review 3 high-risk transactions from yesterday</Text>
            </View>
            <View style={styles.recommendationItem}>
              <Icon name="trending-up" size={20} color="#3b82f6" />
              <Text style={styles.recommendationText}>Optimize marketing spend for highest ROI channels</Text>
            </View>
          </View>
        </View>

        {/* Business Impact */}
        <View style={styles.impactSection}>
          <View style={styles.impactCard}>
            <Icon name="chart-bar" size={32} color="#3b82f6" />
            <Text style={styles.impactValue}>$12,540</Text>
            <Text style={styles.impactLabel}>Monthly Savings</Text>
          </View>
          <View style={styles.impactCard}>
            <Icon name="shield-check" size={32} color="#10b981" />
            <Text style={styles.impactValue}>45%</Text>
            <Text style={styles.impactLabel}>Risk Reduction</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    marginLeft: 4,
  },
  chartContainer: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  progressChart: {
    marginVertical: 8,
  },
  aiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  aiCard: {
    width: '50%',
    padding: 12,
    alignItems: 'center',
  },
  aiIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  aiSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
    marginLeft: 4,
  },
  predictionsList: {
    marginTop: 8,
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  predictionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  predictedText: {
    fontSize: 12,
    color: '#64748b',
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  anomaliesList: {
    marginTop: 8,
  },
  anomalyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  anomalyType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  anomalyCount: {
    fontSize: 12,
    color: '#64748b',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recommendationsSection: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
    borderWidth: 1,
  },
  recommendationsList: {
    marginTop: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fde68a',
  },
  recommendationText: {
    fontSize: 14,
    color: '#92400e',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  impactSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  impactCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 6,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
});
