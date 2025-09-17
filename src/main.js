function generatePlayerData(id) {
    // durationSeconds: integer seconds between 0 and 15 minutes (0..900)
    const durationSeconds = Math.floor(Math.random() * 901);
    return {
        id: id,
        score: Math.floor(Math.random() * 100),
        durationSeconds // store numeric seconds for calculations
    };
}

const playerSessions = [];

for (let i = 1; i <= 44; i++) {
    playerSessions.push(generatePlayerData(`Player ${i}`));
}

const totalDurationSeconds = playerSessions.reduce((sum, session) => sum + session.durationSeconds, 0);
const avgDurationSeconds = totalDurationSeconds / playerSessions.length;

function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
}

const avgDuration = formatDuration(Math.round(avgDurationSeconds));

const totalScore = playerSessions.reduce((sum, session) => sum + session.score, 0);
const avgScore = (totalScore / playerSessions.length).toFixed(2);

const topPlayers = playerSessions
    .slice() 
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

document.getElementById('stats').innerHTML = `
    <h2>Stats Overview</h2>
    <p><strong>Average Duration:</strong> ${avgDuration}</p>
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
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const idx = context.dataIndex;
                        const player = playerSessions[idx];
                        // show score and formatted duration in tooltip
                        return [`Score: ${player.score}`, `Duration: ${formatDuration(player.durationSeconds)}`];
                    }
                }
            }
        }
    }
});

const leaderboardDiv = document.getElementById('leaderboard');
leaderboardDiv.innerHTML = '<h2>Leaderboard</h2>';
topPlayers.forEach((player, index) => {
    // Render leaderboard as a four-column row: rank | name | score | duration
    leaderboardDiv.innerHTML += `\n<div class="leaderboard-entry">\n  <span class="rank">${index + 1}.</span>\n  <span class="player-name">${player.id}</span>\n  <span class="player-score">${player.score}</span>\n  <span class="player-duration">${formatDuration(player.durationSeconds)}</span>\n</div>`;
});