const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user;

// IMPORTANT: Niche wo link dalna jo Ngrok se milega
const API_URL = "https://pally-unrefractively-shanell.ngrok-free.dev -> http://localhost:8000; 

async function loadUserData() {
    if(!user) return;
    
    document.getElementById('user-name').innerText = user.first_name;
    document.getElementById('user-initial').innerText = user.first_name.charAt(0);

    try {
        const res = await fetch(`${API_URL}/api/user/${user.id}`);
        const data = await res.json();
        
        document.getElementById('balance-amount').innerText = `$${data.balance.toFixed(2)}`;
        document.getElementById('user-level').innerText = `Level ${data.level} • ${data.active ? 'Pro' : 'Free'}`;
        
        if(data.active) {
            const pill = document.getElementById('status-pill');
            pill.innerText = "Active";
            pill.style.background = "#00ff88";
            pill.style.color = "black";
        }
    } catch (e) {
        console.log("Error loading data from server");
    }
}

async function askAI() {
    const msg = document.getElementById('ai-msg').value;
    const responseField = document.getElementById('ai-response');
    
    responseField.innerText = "CyberX AI is thinking...";
    
    try {
        const res = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: msg})
        });
        const data = await res.json();
        responseField.innerText = data.reply;
    } catch (e) {
        responseField.innerText = "Error: Server not connected.";
    }
}

loadUserData();
