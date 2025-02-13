const API_URL = "https://api.exchangerate-api.com/v4/latest/KZT";

async function fetchExchangeRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const rates = {
      USD: {
        sell: ((1 / data.rates.USD) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.USD) * data.rates.KZT * 1.015).toFixed(2),
      },
      EUR: {
        sell: ((1 / data.rates.EUR) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.EUR) * data.rates.KZT * 1.015).toFixed(2),
      },
      RUB: {
        sell: ((1 / data.rates.RUB) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.RUB) * data.rates.KZT * 1.015).toFixed(2),
      },
      CNY: {
        sell: ((1 / data.rates.CNY) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.CNY) * data.rates.KZT * 1.015).toFixed(2),
      },
      DKK: {
        sell: ((1 / data.rates.DKK) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.DKK) * data.rates.KZT * 1.015).toFixed(2),
      },
      AED: {
        sell: ((1 / data.rates.AED) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.AED) * data.rates.KZT * 1.015).toFixed(2),
      },
      GBP: {
        sell: ((1 / data.rates.GBP) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.GBP) * data.rates.KZT * 1.015).toFixed(2),
      },
      HKD: {
        sell: ((1 / data.rates.HKD) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.HKD) * data.rates.KZT * 1.015).toFixed(2),
      },
      SEK: {
        sell: ((1 / data.rates.SEK) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.SEK) * data.rates.KZT * 1.015).toFixed(2),
      },
      CAD: {
        sell: ((1 / data.rates.CAD) * data.rates.KZT).toFixed(2),
        buy: ((1 / data.rates.CAD) * data.rates.KZT * 1.015).toFixed(2),
      },
    };

    const tableBody = document.getElementById("exchange-rates");
    tableBody.innerHTML = "";

    Object.keys(rates).forEach((currency) => {
      const row = `
                <tr>
                    <td>${currency}</td>
                    <td>${rates[currency].sell}</td>
                    <td>${rates[currency].buy}</td>
                </tr>
            `;
      tableBody.innerHTML += row;
    });

    const updateTime = document.getElementById("update-time");
    updateTime.innerHTML = `Жаңарған уақыты: ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`;
  } catch (error) {
    console.error("Қате:", error);
    document.getElementById("update-time").innerText =
      "Қатае!";
  }
}

fetchExchangeRates();

const apiKey = "d0fcf5b268299099f528b994";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

let history = JSON.parse(localStorage.getItem("history")) || [];

document
  .getElementById("convertBtn")
  .addEventListener("click", async function () {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount || isNaN(amount)) {
      alert("Қате енгзілді!");
      return;
    }

    try {
      const response = await fetch(apiUrl + fromCurrency);
      const data = await response.json();

      if (data.result === "success") {
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        const resultText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        document.getElementById(
          "resultText"
        ).innerText = `Нәтиже: ${resultText}`;

        history.push(resultText);
        localStorage.setItem("history", JSON.stringify(history));
        updateHistory();
      } else {
        alert("Валюта алынбайд!");
      }
    } catch (error) {
      console.error("kate", error);
      alert("API kate!");
    }
  });

document
  .getElementById("showHistoryBtn")
  .addEventListener("click", function () {
    updateHistory();
  });

function updateHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = history
    .map(
      (item, index) => `
    <li>${item} <button onclick="deleteHistory(${index})">Өшіру</button></li>
  `
    )
    .join("");
}

function deleteHistory(index) {
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  updateHistory();
}


updateHistory();
