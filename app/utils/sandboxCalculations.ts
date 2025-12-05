// Sandbox Simulation Calculation Engine
// Generates risks, opportunities, and impact metrics based on configured scenarios

export interface ConfiguredScenario {
  id: string;
  facility: string;
  category: string;
  variable: string;
  parameters: { [key: string]: number };
}

export interface Risk {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  mitigation: string;
  impact: string;
}

export interface Opportunity {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  savings: string;
  link: string;
  type: 'cost_saving' | 'risk_mitigation' | 'efficiency' | 'capacity';
}

export interface ImpactMetric {
  label: string;
  before: number;
  after: number;
  change: number;
  color: string;
  unit: string;
}

export interface SimulationResults {
  risks: Risk[];
  opportunities: Opportunity[];
  impactMetrics: {
    cost: ImpactMetric;
    inventory: ImpactMetric;
    serviceLevel: ImpactMetric;
    capacity: ImpactMetric;
  };
  keyTakeaway: string;
  totalScenarios: number;
  scenarioType?: string; // Track the primary scenario type
  additionalCost?: string; // For Planned Shutdown: Additional cost during shutdown
  bestMonth?: string; // For Planned Shutdown: Recommendation for best month
  canMeetDemand?: boolean; // For Peak Demand: Can demand be met?
  plantsAtCapacity?: string[]; // For Peak Demand: Plants hitting capacity limits
}

// Base metrics (before simulation)
const BASE_METRICS = {
  totalCost: 3850000,
  inventoryLevel: 85,
  serviceLevel: 94,
  capacityUtilization: 78,
};

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return `$${Math.abs(value).toLocaleString()}`;
};

// Helper function to format percentage
const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Calculate risks and opportunities for Supplier Failure
const calculateSupplierFailure = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const severity = scenario.parameters.severity || 50;

  // Generate risk
  if (severity > 30) {
    results.risks.push({
      severity: severity > 70 ? 'CRITICAL' : severity > 50 ? 'HIGH' : 'MEDIUM',
      title: 'Supply Chain Disruption',
      description: `${severity}% supplier failure rate poses significant risk to material availability and production continuity.`,
      mitigation: 'Diversify supplier base across multiple regions. Establish backup suppliers with pre-negotiated contracts.',
      impact: 'Cost Impact: +$85,000 | Service Level: -8%',
    });
  }

  // Generate opportunity
  results.opportunities.push({
    severity: 'HIGH',
    title: 'Multi-Source Procurement Strategy',
    description: 'Implement dual-sourcing for critical materials to reduce dependency on single suppliers.',
    savings: '$42,000 annual risk mitigation',
    link: 'Supplier Management',
    type: 'risk_mitigation',
  });

  // Update impact metrics
  const costImpact = severity > 30 ? 175000 : 0;
  const serviceLevelImpact = severity > 30 ? -8 : 0;

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.serviceLevel.after += serviceLevelImpact;
};

// Calculate risks and opportunities for Material Flow Disruption
const calculateMaterialFlowDisruption = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const downtime = scenario.parameters.downtimeHours || 24;
  const affectedRoutes = scenario.parameters.affectedRoutes || 2;

  // Generate risk
  results.risks.push({
    severity: downtime > 48 ? 'CRITICAL' : downtime > 24 ? 'HIGH' : 'MEDIUM',
    title: 'Production Halt Risk',
    description: `${downtime} hours of material flow disruption across ${affectedRoutes} routes will halt production lines.`,
    mitigation: 'Maintain buffer inventory at production facilities. Establish alternative routing protocols.',
    impact: `Cost Impact: +${formatCurrency(downtime * 1850)} | Inventory: +12%`,
  });

  // Generate opportunity
  results.opportunities.push({
    severity: 'MEDIUM',
    title: 'Buffer Stock Optimization',
    description: 'Right-size safety stock levels to handle short-term disruptions without excess holding costs.',
    savings: `${formatCurrency(affectedRoutes * 15000)} annual savings`,
    link: 'Inventory Planning',
    type: 'efficiency',
  });

  // Update impact metrics
  const costImpact = downtime * 3800;
  const inventoryImpact = 12;

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.inventory.after += inventoryImpact;
};

// Calculate risks and opportunities for Planned Maintenance
const calculatePlannedMaintenance = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const maintenanceDays = scenario.parameters.maintenanceDays || 3;
  const capacityReduction = scenario.parameters.capacityReduction || 40;

  // Generate risk
  results.risks.push({
    severity: capacityReduction > 60 ? 'CRITICAL' : 'HIGH',
    title: 'Capacity Constraint During Maintenance',
    description: `${capacityReduction}% capacity reduction for ${maintenanceDays} days may create fulfillment backlogs.`,
    mitigation: 'Schedule maintenance during low-demand periods. Build inventory buffer 2 weeks prior.',
    impact: `Service Level: -${Math.round(capacityReduction / 8)}% | Inventory: +${Math.round(maintenanceDays * 3)}%`,
  });

  // Generate opportunity
  results.opportunities.push({
    severity: 'LOW',
    title: 'Preventive Maintenance Scheduling',
    description: 'Optimize maintenance windows to align with demand troughs and maximize uptime.',
    savings: `${formatCurrency(maintenanceDays * 8500)} opportunity cost avoided`,
    link: 'Production Planning',
    type: 'efficiency',
  });

  // Update impact metrics
  const serviceLevelImpact = -Math.round(capacityReduction / 8);
  const inventoryImpact = Math.round(maintenanceDays * 3);

  results.impactMetrics.serviceLevel.after += serviceLevelImpact;
  results.impactMetrics.inventory.after += inventoryImpact;
};

// Calculate risks and opportunities for Capacity Adjustment
const calculateCapacityAdjustment = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const newCapacity = scenario.parameters.newCapacity || 100;
  const rampUpTime = scenario.parameters.rampUpTime || 30;

  const isExpansion = newCapacity > 100;

  // Generate risk
  if (isExpansion) {
    results.risks.push({
      severity: rampUpTime > 45 ? 'HIGH' : 'MEDIUM',
      title: 'Capacity Expansion Risk',
      description: `${rampUpTime}-day ramp-up period creates transition risk and potential quality issues.`,
      mitigation: 'Phase expansion in 3 stages. Implement quality gates at each phase. Train workforce in advance.',
      impact: `Cost Impact: +${formatCurrency((newCapacity - 100) * 1200)} | Capacity: +${newCapacity - 100}%`,
    });
  }

  // Generate opportunity
  results.opportunities.push({
    severity: isExpansion ? 'HIGH' : 'MEDIUM',
    title: isExpansion ? 'Scale Production to Meet Demand' : 'Right-Size Production Capacity',
    description: isExpansion
      ? 'Leverage increased capacity to capture unmet demand and improve service levels.'
      : 'Reduce excess capacity costs by matching production to actual demand patterns.',
    savings: isExpansion
      ? `${formatCurrency((newCapacity - 100) * 3200)} revenue opportunity`
      : `${formatCurrency((100 - newCapacity) * 1800)} cost reduction`,
    link: 'Capacity Planning',
    type: isExpansion ? 'capacity' : 'cost_saving',
  });

  // Update impact metrics
  const costImpact = (newCapacity - 100) * (isExpansion ? 2500 : -3500);
  const capacityImpact = newCapacity - 100;

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.capacity.after += capacityImpact;
};

// Calculate risks and opportunities for Seasonal Spike
const calculateSeasonalSpike = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const demandIncrease = scenario.parameters.demandIncrease || 30;
  const duration = scenario.parameters.duration || 45;

  // Determine if demand can be met (mock logic - in real implementation this would be calculated)
  const canMeetDemand = demandIncrease <= 50; // If increase is <= 50%, we can meet demand
  results.canMeetDemand = canMeetDemand;

  // Identify plants that will hit capacity limits
  const plantsAtCapacity: string[] = [];
  if (demandIncrease > 20) {
    plantsAtCapacity.push('Phoenix, AZ');
  }
  if (demandIncrease > 30) {
    plantsAtCapacity.push('Chicago, IL');
  }
  if (demandIncrease > 40) {
    plantsAtCapacity.push('Atlanta, GA');
  }
  if (demandIncrease > 50) {
    plantsAtCapacity.push('Dallas, TX');
  }
  if (demandIncrease > 60) {
    plantsAtCapacity.push('Seattle, WA');
  }
  if (demandIncrease > 70) {
    plantsAtCapacity.push('Miami, FL');
  }
  results.plantsAtCapacity = plantsAtCapacity;

  // Generate risk
  results.risks.push({
    severity: demandIncrease > 40 ? 'CRITICAL' : 'HIGH',
    title: 'Seasonal Demand Surge',
    description: `${demandIncrease}% demand spike over ${duration} days will strain capacity and inventory levels.`,
    mitigation: 'Pre-build inventory 60 days ahead. Arrange temporary capacity through co-packers if needed.',
    impact: `Cost Impact: +${formatCurrency(demandIncrease * 2800)} | Inventory: +${Math.round(demandIncrease * 0.8)}%`,
  });

  // Generate opportunity
  results.opportunities.push({
    severity: 'HIGH',
    title: 'Seasonal Inventory Pre-Positioning',
    description: 'Build strategic inventory reserves ahead of peak season to maximize revenue capture and avoid stockouts.',
    savings: `${formatCurrency(demandIncrease * 4200)} revenue protection`,
    link: 'Demand Planning',
    type: 'risk_mitigation',
  });

  // Update impact metrics
  const costImpact = demandIncrease * 5500;
  const inventoryImpact = Math.round(demandIncrease * 0.8);
  const serviceLevelImpact = demandIncrease > 40 ? -6 : 0;

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.inventory.after += inventoryImpact;
  results.impactMetrics.serviceLevel.after += serviceLevelImpact;
};

// Calculate risks and opportunities for Regional Demand Drop
const calculateRegionalDemandDrop = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const demandDrop = scenario.parameters.demandDrop || 25;
  const affectedRegions = scenario.parameters.affectedRegions || 2;

  // Generate risk
  results.risks.push({
    severity: demandDrop > 35 ? 'HIGH' : 'MEDIUM',
    title: 'Excess Inventory Accumulation',
    description: `${demandDrop}% demand drop across ${affectedRegions} regions will create surplus inventory and holding costs.`,
    mitigation: 'Redirect inventory to high-demand regions. Implement promotional pricing to clear excess stock.',
    impact: `Cost Impact: +${formatCurrency(demandDrop * 1200 * affectedRegions)} | Inventory: +${Math.round(demandDrop * 1.2)}%`,
  });

  // Generate opportunity
  results.opportunities.push({
    severity: 'MEDIUM',
    title: 'Dynamic Inventory Rebalancing',
    description: 'Leverage distribution network to reallocate inventory from low-demand to high-demand regions.',
    savings: `${formatCurrency(affectedRegions * 18000)} holding cost avoided`,
    link: 'Distribution Planning',
    type: 'cost_saving',
  });

  // Update impact metrics
  const costImpact = demandDrop * 2400 * affectedRegions;
  const inventoryImpact = Math.round(demandDrop * 1.2);

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.inventory.after += inventoryImpact;
};

// Calculate risks and opportunities for Safety Stock Adjustment
const calculateSafetyStockAdjustment = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const stockLevel = scenario.parameters.stockLevel || 15;

  const isIncrease = stockLevel > 15;

  // Generate risk based on direction
  if (!isIncrease && stockLevel < 10) {
    results.risks.push({
      severity: stockLevel < 7 ? 'HIGH' : 'MEDIUM',
      title: 'Stockout Risk',
      description: `Safety stock reduction to ${stockLevel} days increases vulnerability to demand variability.`,
      mitigation: 'Improve demand forecasting accuracy. Implement dynamic safety stock based on volatility.',
      impact: `Service Level: -${Math.round((15 - stockLevel) * 0.6)}% | Cost: -${formatCurrency((15 - stockLevel) * 3200)}`,
    });
  }

  // Generate opportunity
  results.opportunities.push({
    severity: isIncrease ? 'LOW' : 'MEDIUM',
    title: isIncrease ? 'Enhanced Service Reliability' : 'Working Capital Optimization',
    description: isIncrease
      ? 'Higher safety stock buffers against demand variability and supplier delays.'
      : 'Reduce holding costs while maintaining acceptable service levels through better forecasting.',
    savings: isIncrease
      ? 'Service level improvement: +3%'
      : `${formatCurrency((15 - stockLevel) * 3200)} annual savings`,
    link: 'Inventory Planning',
    type: isIncrease ? 'risk_mitigation' : 'cost_saving',
  });

  // Update impact metrics
  const costImpact = (stockLevel - 15) * 6000;
  const inventoryImpact = (stockLevel - 15) * 2;
  const serviceLevelImpact = isIncrease ? 3 : (stockLevel < 10 ? -Math.round((15 - stockLevel) * 0.6) : 0);

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.inventory.after += inventoryImpact;
  results.impactMetrics.serviceLevel.after += serviceLevelImpact;
};

// Calculate risks and opportunities for Carrier Capacity
const calculateCarrierCapacity = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const capacityReduction = scenario.parameters.capacityReduction || 30;
  const duration = scenario.parameters.duration || 14;

  // Generate risk
  results.risks.push({
    severity: capacityReduction > 40 ? 'CRITICAL' : 'HIGH',
    title: 'Transportation Bottleneck',
    description: `${capacityReduction}% carrier capacity reduction for ${duration} days will delay shipments and impact service levels.`,
    mitigation: 'Activate backup carrier contracts. Consider premium freight options for critical orders.',
    impact: `Cost Impact: +${formatCurrency(capacityReduction * 950)} | Service Level: -${Math.round(capacityReduction / 6)}%`,
  });

  // Generate opportunity
  results.opportunities.push({
    severity: 'MEDIUM',
    title: 'Multi-Carrier Network Strategy',
    description: 'Diversify carrier portfolio to reduce dependency and negotiate better rates through volume distribution.',
    savings: `${formatCurrency(duration * 2400)} cost avoidance`,
    link: 'Transportation Planning',
    type: 'risk_mitigation',
  });

  // Update impact metrics
  const costImpact = capacityReduction * 2000;
  const serviceLevelImpact = -Math.round(capacityReduction / 6);

  results.impactMetrics.cost.after += costImpact;
  results.impactMetrics.serviceLevel.after += serviceLevelImpact;
};

// Calculate risks and opportunities for Freight Cost Variation
const calculateFreightCostVariation = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const costIncrease = scenario.parameters.costIncrease || 20;

  // Generate risk
  results.risks.push({
    severity: costIncrease > 30 ? 'HIGH' : 'MEDIUM',
    title: 'Freight Cost Inflation',
    description: `${costIncrease}% freight rate increase will significantly impact total logistics costs.`,
    mitigation: 'Lock in rates with annual contracts. Optimize load consolidation to reduce shipment frequency.',
    impact: `Cost Impact: +${formatCurrency(costIncrease * 3800)}`,
  });

  // Generate opportunity
  results.opportunities.push({
    severity: costIncrease > 25 ? 'HIGH' : 'MEDIUM',
    title: 'Freight Cost Optimization',
    description: 'Implement zone skipping and direct-to-customer shipping to bypass intermediate handling.',
    savings: `${formatCurrency(costIncrease * 1900)} potential savings`,
    link: 'Transportation Planning',
    type: 'cost_saving',
  });

  // Update impact metrics
  const costImpact = costIncrease * 7500;

  results.impactMetrics.cost.after += costImpact;
};

// Calculate risks and opportunities for Multi-Stop Optimization
const calculateMultiStopOptimization = (
  scenario: ConfiguredScenario,
  results: SimulationResults
): void => {
  const consolidationLevel = scenario.parameters.consolidationLevel || 3;

  // No significant risks for optimization scenarios
  results.risks.push({
    severity: 'LOW',
    title: 'Route Complexity Management',
    description: `Multi-stop consolidation requires careful route planning to maintain delivery windows.`,
    mitigation: 'Use route optimization software. Monitor on-time delivery metrics closely.',
    impact: 'Minimal service impact with proper planning',
  });

  // Generate opportunity
  results.opportunities.push({
    severity: 'HIGH',
    title: 'Route Consolidation Savings',
    description: `Consolidate deliveries into ${consolidationLevel}-stop routes to reduce total transportation costs.`,
    savings: `${formatCurrency(consolidationLevel * 280)} monthly savings`,
    link: 'Transportation Planning',
    type: 'cost_saving',
  });

  // Update impact metrics (cost savings)
  const costSavings = -Math.abs(consolidationLevel * 850);

  results.impactMetrics.cost.after += costSavings;
};

// Main calculation function
export const calculateSimulationResults = (
  scenarios: ConfiguredScenario[]
): SimulationResults => {
  // Determine primary scenario type
  const primaryScenarioType = scenarios.length > 0 ? scenarios[0].variable : '';

  // Initialize results with base metrics
  const results: SimulationResults = {
    risks: [],
    opportunities: [],
    impactMetrics: {
      cost: {
        label: 'Total Cost',
        before: BASE_METRICS.totalCost,
        after: BASE_METRICS.totalCost,
        change: 0,
        color: '#EF4444',
        unit: '$',
      },
      inventory: {
        label: 'Inventory Level',
        before: BASE_METRICS.inventoryLevel,
        after: BASE_METRICS.inventoryLevel,
        change: 0,
        color: '#F59E0B',
        unit: '%',
      },
      serviceLevel: {
        label: 'Service Level',
        before: BASE_METRICS.serviceLevel,
        after: BASE_METRICS.serviceLevel,
        change: 0,
        color: '#10B981',
        unit: '%',
      },
      capacity: {
        label: 'Capacity Utilization',
        before: BASE_METRICS.capacityUtilization,
        after: BASE_METRICS.capacityUtilization,
        change: 0,
        color: '#6366F1',
        unit: '%',
      },
    },
    keyTakeaway: '',
    totalScenarios: scenarios.length,
    scenarioType: primaryScenarioType,
  };

  // Process each scenario
  scenarios.forEach((scenario) => {
    switch (scenario.variable) {
      case 'Supplier Failure':
        calculateSupplierFailure(scenario, results);
        break;
      case 'Material Flow Disruption':
        calculateMaterialFlowDisruption(scenario, results);
        break;
      case 'Planned Maintenance':
      case 'Planned Shutdown':
        calculatePlannedMaintenance(scenario, results);
        break;
      case 'Capacity Adjustment':
        calculateCapacityAdjustment(scenario, results);
        break;
      case 'Seasonal Spike':
      case 'Peak Demand':
        calculateSeasonalSpike(scenario, results);
        break;
      case 'Regional Demand Drop':
        calculateRegionalDemandDrop(scenario, results);
        break;
      case 'Safety Stock Adjustment':
        calculateSafetyStockAdjustment(scenario, results);
        break;
      case 'Carrier Capacity':
        calculateCarrierCapacity(scenario, results);
        break;
      case 'Freight Cost Variation':
        calculateFreightCostVariation(scenario, results);
        break;
      case 'Multi-Stop Optimization':
        calculateMultiStopOptimization(scenario, results);
        break;
    }
  });

  // Calculate final changes
  results.impactMetrics.cost.change =
    ((results.impactMetrics.cost.after - results.impactMetrics.cost.before) /
      results.impactMetrics.cost.before) *
    100;

  results.impactMetrics.inventory.change =
    results.impactMetrics.inventory.after - results.impactMetrics.inventory.before;

  results.impactMetrics.serviceLevel.change =
    results.impactMetrics.serviceLevel.after - results.impactMetrics.serviceLevel.before;

  results.impactMetrics.capacity.change =
    results.impactMetrics.capacity.after - results.impactMetrics.capacity.before;

  // Generate key takeaway
  const criticalRisks = results.risks.filter((r) => r.severity === 'CRITICAL').length;
  const highOpportunities = results.opportunities.filter((o) => o.severity === 'HIGH').length;

  if (criticalRisks > 0) {
    results.keyTakeaway = `Critical attention needed: ${criticalRisks} critical risk${
      criticalRisks > 1 ? 's' : ''
    } identified. Immediate mitigation actions required to prevent service disruption.`;
  } else if (results.impactMetrics.cost.change > 5) {
    results.keyTakeaway = `Cost impact warning: ${formatPercent(
      results.impactMetrics.cost.change
    )} increase projected. Evaluate ${highOpportunities} optimization opportunities to offset costs.`;
  } else if (highOpportunities > 0) {
    results.keyTakeaway = `Optimization potential: ${highOpportunities} high-value opportunities identified. Implementing these could generate significant cost savings and efficiency gains.`;
  } else {
    results.keyTakeaway = `Balanced scenario: Moderate impacts detected across ${scenarios.length} configurations. Focus on ${results.opportunities.length} opportunities to improve resilience.`;
  }

  // Add Planned Shutdown specific metrics
  if (primaryScenarioType === 'Planned Shutdown' || primaryScenarioType === 'Planned Maintenance') {
    const costIncrease = results.impactMetrics.cost.after - results.impactMetrics.cost.before;
    results.additionalCost = formatCurrency(costIncrease);
    results.bestMonth = 'July 2025'; // Mock recommendation - in real implementation this would be calculated

    // Add production reallocation opportunity
    results.opportunities.unshift({
      severity: 'HIGH',
      title: 'Production Reallocation Strategy',
      description: 'Other plants can absorb the production volume during shutdown. Phoenix (+35%), Chicago (+30%), Atlanta (+25%).',
      savings: `${formatCurrency(costIncrease * 0.15)} cost optimization potential`,
      link: 'Distribution Planning',
      type: 'efficiency',
    });
  }

  // Add Peak Demand specific opportunities
  if (primaryScenarioType === 'Peak Demand' || primaryScenarioType === 'Seasonal Spike') {
    // Add capacity utilization opportunity showing plants at max capacity
    if (results.plantsAtCapacity && results.plantsAtCapacity.length > 0) {
      results.opportunities.unshift({
        severity: 'CRITICAL',
        title: 'Capacity Constraint Alert',
        description: `The following plants will hit maximum capacity: ${results.plantsAtCapacity.join(', ')}. Consider overflow routing or co-manufacturing.`,
        savings: `Avoid ${formatCurrency(results.plantsAtCapacity.length * 75000)} in lost revenue`,
        link: 'Production Planning',
        type: 'capacity',
      });
    }

    // Add additional opportunity for demand management
    results.opportunities.unshift({
      severity: 'HIGH',
      title: 'Demand Management Strategy',
      description: 'Optimize production scheduling and inventory positioning to handle peak demand surge across all facilities.',
      savings: `${formatCurrency(45000)} efficiency gains`,
      link: 'Distribution Planning',
      type: 'efficiency',
    });
  }

  return results;
};
