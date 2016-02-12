import { capitalize } from './index';


export function calcExpensesEvolution(expenses) {
  // TODO: Control when two expenses happens in the same day
  const expensesEvolution = expenses.map(expense => [expense.created_at.getTime(), expense.amount]);

  let total = 0.0;
  const totalAmount = expenses.map(expense => [
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
    tooltip: {
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} €</b><br/>'
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
  const expensesByCategory = expenses.reduce((data, expense) => {
    data[expense.category.name] = data[expense.category.name] ||  0.0;
    data[expense.category.name] += expense.amount;
    return data;
  }, {});

  const data = Object.keys(expensesByCategory).map(key => {
    return {
      name: capitalize(key),
      y: Number(expensesByCategory[key].toFixed(2))
    };
  });

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
    tooltip: {
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} €</b><br/>'
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
      name: 'Expenses By Category',
      colorByPoint: true,
      data: data
    }]
  };
}
