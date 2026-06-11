<!DOCTYPE html>
            // Define dificuldade (Nível 12 com cerca reduz a velocidade do esgotamento)
            qte.maxClicks = Math.floor(Math.random() * (12 - 7) + 7);
            qte.timeLeft = 100;

            // Sorteia uma tecla física aleatória para o QTE (A, S, D, W, E)
            const keys = ['A', 'S', 'D', 'W', 'E'];
            qte.key = keys[Math.floor(Math.random() * keys.length)];

            // Mostra tela do QTE
            document.getElementById('qte-key-display').innerText = qte.key;
            document.getElementById('qte-clicks-needed').innerText = qte.maxClicks - qte.clicks;
            document.getElementById('qte-screen').style.display = 'flex';

            // Velocidade com que o tempo drena
            let drainSpeed = UPGRADES[3].active ? 1.5 : 2.5; 

            qte.timer = setInterval(() => {
                qte.timeLeft -= drainSpeed;
                document.getElementById('qte-timer-fill').style.width = `${qte.timeLeft}%`;

                if (qte.timeLeft <= 0) {
                    // JOGADOR PERDEU O EVENTO (ROUBADO)
                    clearInterval(qte.timer);
                    document.getElementById('qte-screen').style.display = 'none';
                    qte.active = false;
                    
                    // Consequência do roubo
                    state.money = Math.max(0, state.money - 50);
                    state.sustainability = Math.max(0, state.sustainability - 10);
                    log("⚠️ Fracasso! Invasores roubaram $50 moedas e violaram a segurança biológica da fazenda.");
                    updateUI();
                }
            }, 100);
        }

        // CAPTURA DOS CLIQUES NO TECLADO PARA O EVENTO QTE
        window.addEventListener('keydown', (e) => {
            if (!qte.active) return;

            if (e.key.toUpperCase() === qte.key) {
                qte.clicks++;
                document.getElementById('qte-clicks-needed').innerText = qte.maxClicks - qte.clicks;

                if (qte.clicks >= qte.maxClicks) {
                    // JOGADOR DEFNDEU COM SUCESSO
                    clearInterval(qte.timer);
                    document.getElementById('qte-screen').style.display = 'none';
                    qte.active = false;
                    
                    state.sustainability = Math.min(100, state.sustainability + 5);
                    log("🛡️ Sucesso! Você agiu com precisão e afastou os invasores sem usar violência, mantendo a ordem ecológica.");
                    gainXP(30);
                    updateUI();
                }
            }
        });

        function log(msg) {
            const box = document.getElementById('log-box');
            box.innerHTML += `<br>👉 ${msg}`;
            box.scrollTop = box.scrollHeight;
        }

        window.onload = init;
    </script>
</body>
</html>
