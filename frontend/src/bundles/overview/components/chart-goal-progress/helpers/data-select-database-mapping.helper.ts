import { type BarChartData } from '../components/bar-chart/types/types.js';
import {
    monthlyData,
    weeklyData,
    yearlyData,
} from '../mock-database/mock-database-goal.js';

const dataMappingSelectDatabase: Record<string, BarChartData> = {
    'weekly': weeklyData,
    'monthly': monthlyData,
    'yearly': yearlyData,
};

export { dataMappingSelectDatabase };
