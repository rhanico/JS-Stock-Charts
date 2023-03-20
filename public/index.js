async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


let fetchLink = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=1eacbf9d29904da28fab05f30582ecb3`)
        
        let myLink = await fetchLink.json()
        console.log(myLink);
 
        /*
        let GME = result.GME
        let MSFT = result.MSFT
        let DIS = result.DIS
        let BTNX = result.BTNX
        
        const stocks = [GME, MSFT, DIS, BNTX];
        */
        // Bonus Note: 
        // Another way to write the above lines would to refactor it as:
           // const {GME, MSFT, DIS, BTNX} = result 
        // This is an example of "destructuring" an object
        // "Destructuring" creates new variables from an object or an array
        
        const { GME, MSFT, DIS, BNTX } = mockData;

        const stocks = [GME, MSFT, DIS, BNTX];

        function getColor(stock){
            if(stock === "GME"){
                return 'rgba(61, 161, 61, 0.7)'
            }
            if(stock === "MSFT"){
                return 'rgba(209, 4, 25, 0.7)'
            }
            if(stock === "DIS"){
                return 'rgba(18, 4, 209, 0.7)'
            }
            if(stock === "BNTX"){
                return 'rgba(166, 43, 158, 0.7)'
            }
        }

        stocks.forEach( stock => stock.values.reverse())

        // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });
    //second chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });
    //third chart
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    




}

main()