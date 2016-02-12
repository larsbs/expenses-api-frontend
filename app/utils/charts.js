function getExpensesInRange(expenses, from, to) {
  return expenses.slice(0, 10).sort((a, b) => {
    if (a.created_at === b.created_at) {
      return 0;
    }
    return a.created_at > b.created_at ? 1 : -1;
  });  // TODO: Use real date range
}


export function calcExpensesEvolution(expenses) {
  const expensesInRange = getExpensesInRange(expenses);

  const expensesEvolution = expensesInRange.map(expense => [expense.created_at.getTime(), expense.amount]);

  let total = 0.0;
  const totalAmount = expensesInRange.map(expense => [
    expense.created_at.getTime(),
    Number((total += expense.amount).toFixed(2))
  ]);

  return {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: [{
      type: 'line',
      name: 'Expenses',
      data: expensesEvolution
    }, {
      type: 'line',
      name: 'Total Expense',
      data: totalAmount
    }]
  };
}

export function calcExpensesByCategory(expenses) {
  return {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginBottom: 10,
      padding: 50
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Microsoft Internet Explorer',
        y: 56.33
      }, {
        name: 'Chrome',
        y: 24.03,
        sliced: true,
        selected: true
      }, {
        name: 'Firefox',
        y: 10.38
      }, {
        name: 'Safari',
        y: 4.77
      }, {
        name: 'Opera',
        y: 0.91
      }, {
        name: 'Proprietary or Undetectable',
        y: 0.2
      }]
    }]
  };
}
