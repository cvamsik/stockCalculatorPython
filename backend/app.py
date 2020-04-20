from flask import Flask, Response, request, redirect
from flask_cors import CORS
import yfinance as yf
from yahoofinancials import YahooFinancials
from datetime import datetime
import pytz


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World'


@app.route('/getStock', methods=['GET', 'POST'])
def calc():

    if request.method == 'POST':
        stockData = request.json
        print(request.json)
        proceeds = float(stockData['allotment'])*float(stockData['finalPrice'])
        totalPurchasePrice = float(
            stockData['allotment'])*float(stockData['initialPrice'])
        cost = totalPurchasePrice + \
            float(stockData['buyCommission']) + \
            float(stockData['sellCommission'])
        tax = float(stockData['capitalGainTaxRate'])*(proceeds - totalPurchasePrice-float(
            stockData['buyCommission'])-float(stockData['sellCommission']))/100
        cost = cost+tax
        netProfit = proceeds-cost

        roi = float((netProfit/cost)*100)
        roi = round(roi, 2)
        breakEven = (totalPurchasePrice+float(stockData['buyCommission'])+float(
            stockData['sellCommission']))/float(stockData['allotment'])
        responseData = {
            'proceeds': proceeds,
            'totalPurchasePrice': totalPurchasePrice,
            'cost': cost,
            'tax': tax,
            'netProfit': netProfit,
            'roi': roi,
            'breakEven': breakEven
        }
        try:
            return responseData
        except:
            return 'There was an issue updating your task'

    else:
        return 'else case'


@app.route('/getDetails', methods=['POST'])
def fetch():
    if request.method == 'POST':
        # yahoo_financials = YahooFinancials('AAPL')
        # print(yahoo_financials.get_stock_price_data(reformat=True))
        try:
            msft = yf.Ticker(request.json['ticker'])
            tz_NY = pytz.timezone('America/Los_Angeles') 
            now = datetime.now(tz_NY)
            # time = now.strftime("%H:%M:%S")
            hist = msft.history(period="1d")
            # print(msft.info)
            # print(hist)
            price = msft.info['regularMarketPrice']
            prevavg = (hist.iloc[0]['High']+hist.iloc[0]
                    ['Close']+hist.iloc[0]['Low'])/3
            prevavg=round(prevavg,2)
            valueChange = price-prevavg
            valueChange=round(valueChange,2)
            percentageChange = ((price-prevavg)/prevavg)*100
            percentageChange=round(percentageChange, 2)
            responseData = {
                'time':now,
                'name': msft.info['longName'],
                'price': price,
                'valueChange': valueChange,
                'percentageChange': percentageChange,
                'prevavg':prevavg
            }
            return responseData
        except :
            status_code = Response(status=500)
            return status_code



if __name__ == "__main__":
    app.run(debug=True)
