from flask import Flask, request, redirect
from flask_cors import CORS

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


if __name__ == "__main__":
    app.run(debug=True)
