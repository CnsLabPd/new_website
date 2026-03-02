// Pose Detector - MediaPipe integration and feature extraction
import { CONFIG } from '../../config.js';
import { Events, PoseResult } from '../utils/constants.js';

export class PoseDetector extends EventTarget {
    constructor() {
        super();
        this.detector = null;
        this.camera = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.isRunning = false;
        this.currentLandmarks = null;
        this.poseType = CONFIG.POSE_TYPE;
    }

    async initialize(videoElement, canvasElement) {
        try {
            if (!videoElement) {
                throw new Error('Video element is required');
            }
            if (!canvasElement) {
                throw new Error('Canvas element is required');
            }

            this.videoElement = videoElement;
            this.canvasElement = canvasElement;

            console.log('Initializing MediaPipe Pose...');

            // Wait for MediaPipe libraries to load
            await this.waitForMediaPipeLibraries();

            // Initialize MediaPipe Pose
            this.detector = new Pose({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
                }
            });

            this.detector.setOptions(CONFIG.MEDIAPIPE);

            this.detector.onResults((results) => {
                this.onResults(results);
            });

            // Wait a bit for MediaPipe to fully initialize
            await new Promise(resolve => setTimeout(resolve, 100));

            console.log('MediaPipe Pose initialized');
            return true;

        } catch (error) {
            console.error('Pose detector initialization error:', error);
            throw error;
        }
    }

    async waitForMediaPipeLibraries() {
        // Wait for MediaPipe global objects to be available
        const maxWait = 10000; // 10 seconds max
        const startTime = Date.now();

        while (!window.Pose || !window.Camera || !window.drawConnectors) {
            if (Date.now() - startTime > maxWait) {
                throw new Error('MediaPipe libraries failed to load');
            }
            console.log('Waiting for MediaPipe libraries...');
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log('MediaPipe libraries loaded successfully');
    }

    async startCamera() {
        try {
            console.log('Starting camera...');

            this.camera = new Camera(this.videoElement, {
                onFrame: async () => {
                    if (this.detector && this.isRunning) {
                        await this.detector.send({ image: this.videoElement });
                    }
                },
                width: CONFIG.CAMERA.width,
                height: CONFIG.CAMERA.height
            });

            await this.camera.start();

            // Wait for video metadata to load (critical for canvas sizing)
            await this.waitForVideoReady();

            this.isRunning = true;

            // Set canvas dimensions once when camera starts
            if (this.canvasElement) {
                this.canvasElement.width = this.videoElement.videoWidth || CONFIG.CAMERA.width;
                this.canvasElement.height = this.videoElement.videoHeight || CONFIG.CAMERA.height;
                console.log(`Canvas dimensions set: ${this.canvasElement.width}x${this.canvasElement.height}`);
            }

            this.dispatchEvent(new CustomEvent(Events.CAMERA_STARTED));
            console.log('Camera started');

            return true;

        } catch (error) {
            console.error('Camera start error:', error);
            this.dispatchEvent(new CustomEvent(Events.CAMERA_ERROR, {
                detail: { error }
            }));
            throw error;
        }
    }

    async waitForVideoReady() {
        // Wait for video metadata to load
        return new Promise((resolve, reject) => {
            if (this.videoElement.videoWidth > 0 && this.videoElement.videoHeight > 0) {
                // Already ready
                resolve();
                return;
            }

            // Set timeout to prevent infinite wait
            const timeout = setTimeout(() => {
                console.warn('Video metadata load timeout, using default dimensions');
                resolve();
            }, 5000);

            // Wait for loadedmetadata event
            const onMetadataLoaded = () => {
                clearTimeout(timeout);
                console.log(`Video metadata loaded: ${this.videoElement.videoWidth}x${this.videoElement.videoHeight}`);
                resolve();
            };

            this.videoElement.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
        });
    }

    stopCamera() {
        this.isRunning = false;

        if (this.camera) {
            this.camera.stop();
            this.camera = null;
        }

        // Clear canvas
        if (this.canvasElement) {
            const ctx = this.canvasElement.getContext('2d');
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }

        console.log('Camera stopped');
    }

    onResults(results) {
        if (!this.canvasElement || !this.isRunning) return;

        // Safety check: Ensure canvas has proper dimensions
        if (this.canvasElement.width === 0 || this.canvasElement.height === 0) {
            if (this.videoElement.videoWidth > 0 && this.videoElement.videoHeight > 0) {
                this.canvasElement.width = this.videoElement.videoWidth;
                this.canvasElement.height = this.videoElement.videoHeight;
                console.log('Canvas resized in onResults:', this.canvasElement.width, 'x', this.canvasElement.height);
            } else {
                // Still no dimensions, skip this frame
                return;
            }
        }

        // Draw on canvas
        const canvasCtx = this.canvasElement.getContext('2d');
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

        // Process pose landmarks
        if (results.poseLandmarks) {
            this.currentLandmarks = results.poseLandmarks;

            // Draw landmarks
            this.drawPoseLandmarks(canvasCtx, results.poseLandmarks);

            // Emit pose detected event with features
            const features = this.extractFeatures(results.poseLandmarks);
            this.dispatchEvent(new CustomEvent(Events.POSE_DETECTED, {
                detail: {
                    landmarks: results.poseLandmarks,
                    features: features
                }
            }));
        } else {
            this.currentLandmarks = null;
        }

        canvasCtx.restore();
    }

    drawPoseLandmarks(ctx, landmarks) {
        // Draw connections
        drawConnectors(ctx, landmarks, POSE_CONNECTIONS, {
            color: '#00FF88',
            lineWidth: 4
        });

        // Draw landmarks with color coding
        for (let i = 0; i < landmarks.length; i++) {
            const landmark = landmarks[i];
            const x = landmark.x * this.canvasElement.width;
            const y = landmark.y * this.canvasElement.height;

            // Color by body part
            if (i <= 10) ctx.fillStyle = '#FF6B9D'; // Face/head - pink
            else if (i <= 16) ctx.fillStyle = '#4ECDC4'; // Arms - cyan
            else if (i <= 22) ctx.fillStyle = '#FFE66D'; // Core - yellow
            else ctx.fillStyle = '#95E1D3'; // Legs - mint

            // Draw circle
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fill();

            // Draw white border
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    extractFeatures(landmarks) {
        // Normalize landmarks first
        const normalized = this.normalizePoseLandmarks(landmarks);

        // Extract comprehensive features
        const features = [];

        // 1. Raw normalized coordinates
        normalized.forEach(landmark => {
            features.push(landmark.x, landmark.y, landmark.z);
        });

        // 2. Distances between key body joints
        const keyPoints = [0, 11, 12, 13, 14, 15, 16, 23, 24];
        for (let i = 0; i < keyPoints.length; i++) {
            for (let j = i + 1; j < keyPoints.length; j++) {
                if (normalized[keyPoints[i]] && normalized[keyPoints[j]]) {
                    const p1 = normalized[keyPoints[i]];
                    const p2 = normalized[keyPoints[j]];
                    const distance = Math.sqrt(
                        Math.pow(p1.x - p2.x, 2) +
                        Math.pow(p1.y - p2.y, 2) +
                        Math.pow(p1.z - p2.z, 2)
                    );
                    features.push(distance);
                }
            }
        }

        // 3. Joint angles
        const bodyChains = [
            [11, 13, 15], // Left arm
            [12, 14, 16], // Right arm
            [23, 25, 27], // Left leg
            [24, 26, 28], // Right leg
        ];

        bodyChains.forEach(chain => {
            if (normalized[chain[0]] && normalized[chain[1]] && normalized[chain[2]]) {
                const angle = this.calculateAngle(
                    normalized[chain[0]],
                    normalized[chain[1]],
                    normalized[chain[2]]
                );
                features.push(angle);
            }
        });

        return features;
    }

    normalizePoseLandmarks(landmarks) {
        if (!landmarks || landmarks.length === 0) return landmarks;

        const pts = landmarks.map(l => ({ ...l }));

        // Find reference point (hips center or shoulders center)
        let ref;
        if (pts[23] && pts[24]) {
            ref = {
                x: (pts[23].x + pts[24].x) / 2,
                y: (pts[23].y + pts[24].y) / 2,
                z: (pts[23].z + pts[24].z) / 2
            };
        } else if (pts[11] && pts[12]) {
            ref = {
                x: (pts[11].x + pts[12].x) / 2,
                y: (pts[11].y + pts[12].y) / 2,
                z: (pts[11].z + pts[12].z) / 2
            };
        } else {
            ref = { ...pts[0] };
        }

        // Calculate scale (shoulder width or hip width)
        let scale = 0;
        if (pts[11] && pts[12]) {
            scale = Math.sqrt(
                Math.pow(pts[11].x - pts[12].x, 2) +
                Math.pow(pts[11].y - pts[12].y, 2) +
                Math.pow(pts[11].z - pts[12].z, 2)
            );
        }

        if (scale < 1e-6) {
            // Fallback: use bounding box
            let minx = Infinity, miny = Infinity, minz = Infinity;
            let maxx = -Infinity, maxy = -Infinity, maxz = -Infinity;
            pts.forEach(p => {
                minx = Math.min(minx, p.x);
                maxx = Math.max(maxx, p.x);
                miny = Math.min(miny, p.y);
                maxy = Math.max(maxy, p.y);
                minz = Math.min(minz, p.z);
                maxz = Math.max(maxz, p.z);
            });
            scale = Math.max(maxx - minx, maxy - miny, maxz - minz);
            if (scale < 1e-6) scale = 1.0;
        }

        // Normalize all points
        pts.forEach(p => {
            p.x = (p.x - ref.x) / scale;
            p.y = (p.y - ref.y) / scale;
            p.z = (p.z - ref.z) / scale;
        });

        return pts;
    }

    calculateAngle(p1, p2, p3) {
        const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

        const dot = v1.x * v2.x + v1.y * v2.y;
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        if (mag1 === 0 || mag2 === 0) return 0;

        return Math.acos(dot / (mag1 * mag2));
    }

    getCurrentLandmarks() {
        return this.currentLandmarks;
    }

    dispose() {
        this.stopCamera();

        if (this.detector) {
            if (typeof this.detector.close === 'function') {
                this.detector.close();
            }
            this.detector = null;
        }
    }
}
