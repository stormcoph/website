document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network');
    const ctx = canvas.getContext('2d');
    const snowflakes = document.querySelectorAll('.snow');
    const nodes = [];
    let mouseX = 0;
    let mouseY = 0;

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

    // Add mouse position as a special node
    nodes.push({
        x: mouseX,
        y: mouseY,
        isCursor: true
    });

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = nodes[i].isCursor || nodes[j].isCursor ? 200 : 150;

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    
                    // Use a different color for cursor connections
                    if (nodes[i].isCursor || nodes[j].isCursor) {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / maxDistance + 0.1})`;
                    } else {
                        ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / maxDistance})`;
                    }
                    
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function update() {
        nodes.forEach((node, index) => {
            if (node.isCursor) {
                node.x = mouseX;
                node.y = mouseY;
            } else {
                const rect = node.element.getBoundingClientRect();
                node.x = rect.left + rect.width / 7.5;
                node.y = rect.top + rect.height / 7.5;
            }
        });
        drawConnections();
        requestAnimationFrame(update);
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    update();
});