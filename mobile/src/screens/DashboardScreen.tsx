import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    revenue: 125430,
    customers: 156,
    orders: 892,
    inventory: 84500,
  });

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [65000, 72000, 85000, 92000, 98000, 125000],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simular atualização de dados
      setStats({
        revenue: stats.revenue + 1000,
        customers: stats.customers + 2,
        orders: stats.orders + 5,
        inventory: stats.inventory - 500,
      });
      setRefreshing(false);
    }, 1500);
  };

  const StatCard = ({ title, value, change, icon, color }: any) => (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>${value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <View style={styles.changeContainer}>
        <Icon 
          name={change >= 0 ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={change >= 0 ? '#10b981' : '#ef4444'} 
        />
        <Text style={[styles.changeText, { color: change >= 0 ? '#10b981' : '#ef4444' }]}>
          {change >= 0 ? '+' : ''}{change}%
        </Text>
      </View>
    </View>
  );

  const QuickAction = ({ title, icon, color, onPress }: any) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="white" />
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>Alex Johnson</Text>
            <Text style={styles.date}>Tuesday, December 23, 2024</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={24} color="#64748b" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard 
            title="Total Revenue" 
            value={stats.revenue} 
            change={12.5} 
            icon="currency-usd" 
            color="#3b82f6" 
          />
          <StatCard 
            title="Total Customers" 
            value={stats.customers} 
            change={8.2} 
            icon="account-group" 
            color="#10b981" 
          />
          <StatCard 
            title="Total Orders" 
            value={stats.orders} 
            change={5.7} 
            icon="package-variant" 
            color="#f59e0b" 
          />
          <StatCard 
            title="Inventory Value" 
            value={stats.inventory} 
            change={-3.1} 
            icon="warehouse" 
            color="#8b5cf6" 
          />
        </View>

        {/* Revenue Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Revenue Overview</Text>
            <Text style={styles.chartSubtitle}>Last 6 months</Text>
          </View>
          <LineChart
            data={salesData}
            width={screenWidth - 48}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#3b82f6',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <QuickAction 
              title="AI Insights" 
              icon="robot" 
              color="#3b82f6"
              onPress={() => navigation.navigate('AIDashboard')}
            />
            <QuickAction 
              title="New Sale" 
              icon="plus-circle" 
              color="#10b981"
              onPress={() => navigation.navigate('Sales')}
            />
            <QuickAction 
              title="Predictions" 
              icon="chart-line" 
              color="#f59e0b"
              onPress={() => navigation.navigate('Predictions')}
            />
            <QuickAction 
              title="Inventory" 
              icon="package-variant" 
              color="#8b5cf6"
              onPress={() => navigation.navigate('Inventory')}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {[
              { id: 1, title: 'New sale completed', time: '2 min ago', icon: 'currency-usd', color: '#10b981' },
              { id: 2, title: 'Customer registered', time: '15 min ago', icon: 'account-plus', color: '#3b82f6' },
              { id: 3, title: 'Inventory updated', time: '30 min ago', icon: 'package-variant', color: '#f59e0b' },
              { id: 4, title: 'AI prediction ready', time: '1 hour ago', icon: 'robot', color: '#8b5cf6' },
            ].map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: `${item.color}20` }]}>
                  <Icon name={item.icon} size={20} color={item.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#cbd5e1" />
              </View>
            ))}
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
  greeting: {
    fontSize: 14,
    color: '#64748b',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '50%',
    padding: 12,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
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
  chart: {
    borderRadius: 16,
    marginLeft: -20,
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionCard: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
  },
  activitySection: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 32,
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
  seeAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  activityList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
