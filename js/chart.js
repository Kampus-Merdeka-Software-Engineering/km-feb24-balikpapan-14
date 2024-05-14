// chart 1
var ctx = document.getElementById('lineChart1');
var lineChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Sales',
            data: [94000, 58000, 205000, 137000, 155000, 152000, 147000, 159000, 307000, 200000, 352000, 325000],
            borderWidth: 2,
            backgroundColor: '#555555',
            borderColor: '#B88E2F',
            lineTension: 0.3
        }]
        },
    options: {
        responsive: true
    }
});


// chart 2
var ctx = document.getElementById('lineChart2');
var lineChart2 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2014', '2015', '2016', '2017'],
        datasets: [{
            label: 'Sales',
            data: [484000, 470000, 609000, 733000],
            borderWidth: 2,
            backgroundColor: '#555555',
            borderColor: '#B88E2F',
            lineTension: 0.3
        }]
        },
    options: {
        responsive: true
    }
});

// chart 3
var ctx = document.getElementById('pie1');
var pie1 = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Consumer', 'Corporate', 'Home Office'],
        datasets: [{
            label: 'Segment',
            data: [1161401,706146,429653],
            borderWidth: 1,
            backgroundColor: ['#B88E2F','#D4BB82','#EADDC1']
        }]
        },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 10
                }
            }
        }
    }
});

// chart 4
var ctx = document.getElementById('pie2');
var pie2 = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Technology', 'Furniture', 'Office Supplies'],
        datasets: [{
            label: 'Sales',
            data: [836154,741999,719047],
            borderWidth: 1,
            backgroundColor: ['#B88E2F','#D4BB82','#EADDC1']
        }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 10
                    }
                }
            }
        }
});

// chart 5
var ctx = document.getElementById('bar');
var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Phones', 'Chairs', 'Storage', 'Tables', 'Binders'],
        datasets: [{
            label: 'Segment',
            data: [330007,328449,223843,206965,203412],
            borderWidth: 2,
            backgroundColor: '#F8F4EA',
            borderColor: '#B88E2F',
            barThickness: 50, 
            maxBarThickness: 50 
        }]
        },
    options: {
        responsive: true
    }
});