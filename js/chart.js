// function to toggle dropdown visibility
function toggleDropdown() {
    document.getElementById("yearDropdown").classList.toggle("show");
}

// array of all available years and initially selected years
const allYears = [2014, 2015, 2016, 2017];
let selectedYears = allYears.slice();

// fetching JSON data
fetch("superstore.json")
    .then((response) => response.json())
    .then((data) => {
        // function to filter data by selected years
        const processDataByYear = (data, years) => {
            return data.filter((item) => {
                const orderDate = new Date(item["Order Date"]);
                return years.includes(orderDate.getFullYear());
            });
        };

        // Function to update the score card values
        const updateScoreCards = (filteredData) => {
            const totalSales = filteredData.reduce(
                (acc, item) => acc + item.Sales,
                0
            );
            const uniqueOrderDates = new Set(
                filteredData.map((item) => item["Order Date"])
            );
            const totalOrder = uniqueOrderDates.size;
            const totalCustomer = new Set(
                filteredData.map((item) => item["Customer ID"])
            ).size;
            const totalProduct = new Set(
                filteredData.map((item) => item["Product ID"])
            ).size;

            const formatNumber = (num) => {
                if (num >= 1e6) {
                    return (num / 1e6).toFixed(1) + "M";
                }
                if (num >= 1e3) {
                    return (num / 1e3).toFixed(1) + "K";
                }
                return num.toString();
            };

            const roundedTotalSales = formatNumber(Math.round(totalSales));
            const roundedTotalOrder = Math.round(totalOrder).toLocaleString();
            const roundedTotalCustomer =
                Math.round(totalCustomer).toLocaleString();
            const roundedTotalProduct =
                Math.round(totalProduct).toLocaleString();

            document.getElementById("totalSales").innerText = roundedTotalSales;
            document.getElementById("totalOrder").innerText = roundedTotalOrder;
            document.getElementById("totalCustomer").innerText =
                roundedTotalCustomer;
            document.getElementById("totalProduct").innerText =
                roundedTotalProduct;
        };

        // Initial update with all data
        updateScoreCards(data);

        // function to create line chart 1
        const createLineChart1 = (ctx, data, years) => {
            // filtering data by selected years
            const filteredData = processDataByYear(data, years);

            // processing data to group sales by month
            const salesByMonth = filteredData.reduce((acc, item) => {
                const orderDate = new Date(item["Order Date"]);
                const month = orderDate.toLocaleString("default", {
                    month: "long",
                });

                if (!acc[month]) acc[month] = 0;
                acc[month] += item.Sales;
                return acc;
            }, {});

            // sorting labels (months) in chronological order
            const labels = Object.keys(salesByMonth).sort(
                (a, b) => new Date("2000 " + a) - new Date("2000 " + b)
            );
            const sales = labels.map((month) => salesByMonth[month]);

            // creating and returning line chart 1
            return new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Sales",
                            data: sales,
                            borderWidth: 2,
                            backgroundColor: "#555555",
                            borderColor: "#B88E2F",
                            lineTension: 0.3,
                        },
                    ],
                },
                options: { responsive: true },
            });
        };

        // line chart 2
        const createLineChart2 = (ctx, data, years) => {
            const filteredData = processDataByYear(data, years);
            const salesByYear = filteredData.reduce((acc, item) => {
                const orderDate = new Date(item["Order Date"]);
                const year = orderDate.getFullYear();

                if (!acc[year]) acc[year] = 0;
                acc[year] += item.Sales;
                return acc;
            }, {});

            const labels = Object.keys(salesByYear);
            const sales = Object.values(salesByYear);

            return new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Sales",
                            data: sales,
                            borderWidth: 2,
                            backgroundColor: "#555555",
                            borderColor: "#B88E2F",
                            lineTension: 0.3,
                        },
                    ],
                },
                options: { responsive: true },
            });
        };

        // pie chart 3 dan 4
        const createPieChart = (ctx, data, years, key) => {
            const filteredData = processDataByYear(data, years);
            const categorySales = filteredData.reduce((acc, item) => {
                const category = item[key];
                const sales = item.Sales;

                if (!acc[category]) acc[category] = 0;
                acc[category] += sales;
                return acc;
            }, {});

            const labels = Object.keys(categorySales);
            const sales = Object.values(categorySales);

            return new Chart(ctx, {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Sales",
                            data: sales,
                            borderWidth: 1,
                            backgroundColor: ["#B88E2F", "#D4BB82", "#EADDC1"],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                            labels: { boxWidth: 10 },
                        },
                        datalabels: {
                            formatter: (value, context) => {
                                let sum =
                                    context.chart.data.datasets[0].data.reduce(
                                        (a, b) => a + b,
                                        0
                                    );
                                let percentage =
                                    ((value / sum) * 100).toFixed(2) + "%";
                                return percentage;
                            },
                            color: "#000",
                            font: { weight: "semi bold" },
                        },
                    },
                },
                plugins: [ChartDataLabels],
            });
        };

        // bar chart 5
        const createBarChart = (ctx, data, years) => {
            const filteredData = processDataByYear(data, years);
            const salesData = filteredData.reduce((acc, item) => {
                const subCategory = item["Sub-Category"];
                const sales = item.Sales;

                if (!acc[subCategory]) acc[subCategory] = 0;
                acc[subCategory] += sales;
                return acc;
            }, {});

            const sortedSalesData = Object.entries(salesData)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
            const labels = sortedSalesData.map((item) => item[0]);
            const sales = sortedSalesData.map((item) => item[1]);

            return new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Sales",
                            data: sales,
                            borderWidth: 2,
                            backgroundColor: "#F8F4EA",
                            borderColor: "#B88E2F",
                            barThickness: 50,
                            maxBarThickness: 50,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: { beginAtZero: true },
                    },
                },
            });
        };

        // variable declaration for chart contexts
        var ctx1 = document.getElementById("lineChart1").getContext("2d");
        var ctx2 = document.getElementById("lineChart2").getContext("2d");
        var ctx3 = document.getElementById("pie1").getContext("2d");
        var ctx4 = document.getElementById("pie2").getContext("2d");
        var ctx5 = document.getElementById("bar").getContext("2d");

        // creating initial charts
        var lineChart1 = createLineChart1(ctx1, data, allYears);
        var lineChart2 = createLineChart2(ctx2, data, allYears);
        var pieChart1 = createPieChart(ctx3, data, allYears, "Segment");
        var pieChart2 = createPieChart(ctx4, data, allYears, "Category");
        var barChart = createBarChart(ctx5, data, allYears);

        // function to update charts based on selected years
        const updateCharts = (years) => {
            // Updating score card with the filtered data
            const filteredData = processDataByYear(data, years);
            updateScoreCards(filteredData);

            // destroying existing charts
            lineChart1.destroy();
            lineChart2.destroy();
            pieChart1.destroy();
            pieChart2.destroy();
            barChart.destroy();

            // creating and assigning new charts based on selected years
            lineChart1 = createLineChart1(ctx1, data, years);
            lineChart2 = createLineChart2(ctx2, data, years);
            pieChart1 = createPieChart(ctx3, data, years, "Segment");
            pieChart2 = createPieChart(ctx4, data, years, "Category");
            barChart = createBarChart(ctx5, data, years);
        };

        // event listener for dropdown change
        document
            .getElementById("yearDropdown")
            .addEventListener("change", (event) => {
                // get selected years from dropdown checkbox
                const checkboxes = document.querySelectorAll(
                    "#yearDropdown input[type=checkbox]"
                );
                selectedYears = Array.from(checkboxes)
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => parseInt(checkbox.value));

                // update charts based on selected years
                updateCharts(selectedYears);
            });
    })
    .catch((error) => console.error("Error fetching the data:", error));

// window onclick function to close dropdown if clicked outside
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
