document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("camera-feed");
    const captureBtn = document.getElementById("capture-btn");
    const canvas = document.getElementById("canvas");
    const submitBtn = document.getElementById("submit-btn");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia is not supported on your browser");
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera:", error.name, error.message);
        });

    captureBtn.addEventListener("click", () => {
        if (!video.srcObject) {
            console.error("Camera not accessible or stream not available");
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

        submitBtn.style.display = "block";
    });

    submitBtn.addEventListener("click", () => {
        if (!canvas.toDataURL) {
            console.error("Canvas data not available");
            return;
        }

        const imageData = canvas.toDataURL("image/png");

        fetch("/submit-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageData }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Image submitted successfully:", data);
        })
        .catch((error) => {
            console.error("Error submitting image:", error);
        });
    });
});
