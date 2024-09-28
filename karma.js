let karmaBalance = parseInt(localStorage.getItem('karmaBalance')) || 0;

async function updateKarmaOnServer(username, amount) {
    const response = await fetch(`/karma/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    return data.karma;
}

async function updateKarma(amount) {
    if (karmaBalance + amount < 0) {
        console.error('Карма не может быть отрицательной.');
        return;
    }
    karmaBalance += amount;
    document.getElementById('karma-balance').innerText = karmaBalance + '$';
    localStorage.setItem('karmaBalance', karmaBalance);

    const username = 'имя_пользователя'; // Замените на фактическое имя пользователя
    const newKarma = await updateKarmaOnServer(username, amount);
    document.getElementById('karma-balance').innerText = newKarma + '$';
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
