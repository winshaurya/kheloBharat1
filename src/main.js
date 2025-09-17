function generatePlayerData(id) {
    return {
        id: id,
        score: Math.floor(Math.random() * 1000),
        duration: (Math.floor(Math.random() * 86400) / 3600).toFixed(2)
    };
}

const playerSessions = [];

for (let i = 1; i <= 44; i++) {
    playerSessions.push(generatePlayerData(`Player ${i}`));
}

const totalDuration = playerSessions.reduce((sum, session) => sum + parseFloat(session.duration), 0);
const avgDuration = (totalDuration / playerSessions.length).toFixed(2);

const totalScore = playerSessions.reduce((sum, session) => sum + session.score, 0);
const avgScore = (totalScore / playerSessions.length).toFixed(2);

const topPlayers = playerSessions
    .slice() 
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

document.getElementById('stats').innerHTML = `
    <h2>Stats Overview</h2>
    <p><strong>Average Duration:</strong> ${avgDuration} hours</p>
    <p><strong>Average Score:</strong> ${avgScore}</p>
`;


const ctx = document.getElementById('scoreChart').getContext('2d');
const scoreChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: playerSessions.map(session => session.id),
        datasets: [{
            label: 'Scores',
            data: playerSessions.map(session => session.score),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const leaderboardDiv = document.getElementById('leaderboard');
leaderboardDiv.innerHTML = '<h2>Leaderboard</h2>';
topPlayers.forEach((player, index) => {
    leaderboardDiv.innerHTML += `<p>${index + 1}. ${player.id} - Score: ${player.score}</p>`;
});

