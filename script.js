const sizeCharts = {
    dresses: {
        EU: ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        IL: ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54"],
        US: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
        UK: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"],
        IT: ["36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        AU: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"],
        DIP : ["5", "7", "9", "11", "13", "15", "17", "19", "21", "23", "25"],
    },
    pants: {
        EU: ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        IL: ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54"],
        US: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
        UK: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"],
        IT: ["36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        AU: ["4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"],
        JP: ["5", "7", "9", "11", "13", "15", "17", "19", "21", "23", "25"],
    },
    shirts: {
        EU: ["34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        IL: ["36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        US: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
        UK: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
        IT: ["38", "40", "42", "44", "46", "48", "50", "52", "54", "56"],
        AU: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
        JP: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
    },
    shoes: {
        EU: ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
        IL: ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
        US: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        UK: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
        IT: ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
        AU: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        JP: ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    },
};

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const converters = document.querySelectorAll('.converter');
    
    // הסרת הכיתה 'active' מכל הכפתורים והכרטיסים
    tabs.forEach(tab => tab.classList.remove('active'));
    converters.forEach(converter => converter.classList.remove('active'));
    
    // הוספת הכיתה 'active' לכרטיס ולכפתור הנבחר
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function convertTime() {
    const amount = parseFloat(document.getElementById('timeAmount').value);
    const from = document.getElementById('timeFrom').value;
    const to = document.getElementById('timeTo').value;

    if (isNaN(amount) || amount < 0) {
        alert('אנא הזן כמות חוקית');
        return;
    }

    let amountInSeconds;
    switch (from) {
        case 'seconds': amountInSeconds = amount; break;
        case 'minutes': amountInSeconds = amount * 60; break;
        case 'hours': amountInSeconds = amount * 3600; break;
        case 'days': amountInSeconds = amount * 86400; break;
    }

    let convertedAmount;
    switch (to) {
        case 'seconds': convertedAmount = amountInSeconds; break;
        case 'minutes': convertedAmount = amountInSeconds / 60; break;
        case 'hours': convertedAmount = amountInSeconds / 3600; break;
        case 'days': convertedAmount = amountInSeconds / 86400; break;
    }

    document.getElementById('timeResult').innerText = `${amount} ${from === 'seconds' ? 'שניות' : from === 'minutes' ? 'דקות' : from === 'hours' ? 'שעות' : 'ימים'} שווה ל-${convertedAmount.toFixed(2)} ${to === 'seconds' ? 'שניות' : to === 'minutes' ? 'דקות' : to === 'hours' ? 'שעות' : 'ימים'}`;
    document.getElementById('timeResult').classList.add('show');
}

function convertAmPm() {
    const time = document.getElementById('ampmInput').value.trim();
    const format = document.getElementById('ampmFormat').value;
    let result = '';

    try {
        if (format === '24to12') {
            const [hours, minutes] = time.split(':');
            const period = hours >= 12 ? 'אחר הצהריים' : 'בוקר';
            const adjustedHours = hours % 12 || 12;
            result = `${adjustedHours}:${minutes} ${period}`;
        } else if (format === '12to24') {
            const [timePart, period] = time.split(' ');
            let [hours, minutes] = timePart.split(':').map(Number);
            if (period.toUpperCase() === 'PM' && hours !== 12) {
                hours += 12;
            } else if (period.toUpperCase() === 'AM' && hours === 12) {
                hours = 0;
            }
            result = `${hours.toString().padStart(2, '0')}:${minutes}`;
        }
    } catch (e) {
        result = 'פורמט שגוי, נסה שוב';
    }

    document.getElementById('ampmResult').innerText = result;
    document.getElementById('ampmResult').classList.add('show');
}

function convertSize() {
    const clothingType = document.getElementById('clothingType').value;
    const sizeInput = document.getElementById('sizeInput').value.trim();
    const fromCountry = document.getElementById('fromCountry').value;
    const toCountry = document.getElementById('toCountry').value;

    const chart = sizeCharts[clothingType];
    const fromIndex = chart[fromCountry].indexOf(sizeInput);

    if (fromIndex === -1) {
        document.getElementById('sizeResult').innerText = 'המידה אינה קיימת בטבלת ההמרות.';
    } else {
        const convertedSize = chart[toCountry][fromIndex];
        document.getElementById('sizeResult').innerText = `המידה ${sizeInput} ב-${fromCountry} שווה למידה ${convertedSize} ב-${toCountry}`;
    }

    document.getElementById('sizeResult').classList.add('show');
}

function copyResult(resultId) {
    const result = document.getElementById(resultId).innerText;
    const input = document.createElement('input');
    input.value = result;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('הטקסט הועתק בהצלחה');
} 
