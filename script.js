const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});

// Generate frame path
const currentFrame = (index) => {
    return `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
};

const images = [];
const imageSeq = { frame: 1 };

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame once loaded
images[0].onload = render;

// Render frame
function render() {
    const img = images[imageSeq.frame - 1];
    if (!img) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Maintain aspect ratio
    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * scale,
        img.height * scale
    );
}

// Scroll event
window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScrollTop;

    const frameIndex = Math.min(
        frameCount,
        Math.ceil(scrollFraction * frameCount)
    );

    imageSeq.frame = frameIndex;

    requestAnimationFrame(render);
});
