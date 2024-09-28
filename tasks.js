let karmaBalance = localStorage.getItem('karmaBalance') ? parseInt(localStorage.getItem('karmaBalance')) : 0;

function updateKarma(amount) {
    karmaBalance += amount;
    document.getElementById('karma-balance').innerText = karmaBalance + '$';
    localStorage.setItem('karmaBalance', karmaBalance);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('karma-balance').innerText = karmaBalance + '$';
});

window.update = function(amount) {
    if (typeof amount === 'number') {
        updateKarma(amount);
    } else {
        console.error('Пожалуйста, введите число для добавления к карме.');
    }
};
