document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network');
    const ctx = canvas.getContext('2d');
    const snowflakes = document.querySelectorAll('.snow');
    const nodes = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    snowflakes.forEach((flake, index) => {
        const rect = flake.getBoundingClientRect();
        nodes.push({
            x: rect.left + rect.width / 7.5,
            y: rect.top + rect.height / 7.5,
            element: flake
        });
    });

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / 3000})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function update() {
        nodes.forEach(node => {
            const rect = node.element.getBoundingClientRect();
            node.x = rect.left + rect.width / 7.5;
            node.y = rect.top + rect.height / 7.5;
        });
        drawConnections();
        requestAnimationFrame(update);
    }

    update();
});
