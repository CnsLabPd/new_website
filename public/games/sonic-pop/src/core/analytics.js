/*
 * Sonic Pop Analytics
 * Aggregated metrics at 15 FPS sampling (no raw points stored)
 */

class StreamingStats {
    constructor(trackMinMax = false) {
        this.n = 0;
        this.mean = 0;
        this.m2 = 0;
        this.trackMinMax = trackMinMax;
        this.min = Infinity;
        this.max = -Infinity;
    }

    add(value) {
        if (value === null || value === undefined || !Number.isFinite(value)) return;
        this.n += 1;
        const delta = value - this.mean;
        this.mean += delta / this.n;
        const delta2 = value - this.mean;
        this.m2 += delta * delta2;
        if (this.trackMinMax) {
            if (value < this.min) this.min = value;
            if (value > this.max) this.max = value;
        }
    }

    variance() {
        if (this.n < 2) return 0;
        return this.m2 / (this.n - 1);
    }

    std() {
        return Math.sqrt(this.variance());
    }

    minValue() {
        return this.trackMinMax && this.n > 0 ? this.min : null;
    }

    maxValue() {
        return this.trackMinMax && this.n > 0 ? this.max : null;
    }

    toSummary(includeMinMax = false) {
        const summary = {
            mean: this.n > 0 ? this.mean : null,
            var: this.n > 1 ? this.variance() : null,
            std: this.n > 1 ? this.std() : null
        };
        if (includeMinMax) {
            summary.min = this.minValue();
            summary.max = this.maxValue();
        }
        return summary;
    }
}

class SonicPopAnalytics {
    constructor() {
        this.sampleIntervalMs = 1000 / 15;
        this.lastSampleTs = 0;

        this.sessionId = this.generateUUID();
        this.sessionStartedAt = null;
        this.sessionRowCreated = false;

        this.levelAttemptId = null;
        this.levelStartedAt = null;
        this.levelNumber = null;
        this.moduleNumber = null;

        this.userId = null;
        this.handedness = null;

        this.bombsShown = 0;
        this.bombsHit = 0;

        this.attentionSamples = 0;
        this.attentionFacingSamples = 0;

        this.elbowStats = new StreamingStats(true);
        this.accelStats = new StreamingStats(false);
        this.jerkStats = new StreamingStats(false);

        this.handPosition = null;
        this.lastHandSample = null;
        this.lastVelocity = null;
        this.lastAcceleration = null;

        this.trajectorySamples = [];
        this.trajectorySampleIntervalMs = 1000 / 15;
        this.lastTrajectoryTs = 0;
        this.levelStartPerf = null;
        this.canvasWidth = null;
        this.canvasHeight = null;

        this.supabase = this.initSupabaseClient();
        this.initAuthSession();
    }

    initSupabaseClient() {
        if (!window.supabase || !window.supabase.createClient) {
            console.warn('Supabase client not available for analytics');
            return null;
        }

        const url =
            window.NEUROGATI_SUPABASE_URL ||
            window.NEXT_PUBLIC_SUPABASE_URL ||
            'https://yourttiykfslostesqjp.supabase.co';

        const key =
            window.NEUROGATI_SUPABASE_ANON_KEY ||
            window.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXJ0dGl5a2ZzbG9zdGVzcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzY1NjgsImV4cCI6MjA4NzE1MjU2OH0.R-spS9GY6AXA5cwytwW2KIxDd1F0ryqb84d8C_wwIGc';

        return window.supabase.createClient(url, key, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
                storageKey: 'sonic-pop-analytics'
            }
        });
    }

    initAuthSession() {
        if (!this.supabase || !this.supabase.auth) return;
        try {
            const key = 'sb-yourttiykfslostesqjp-auth-token';
            const raw = localStorage.getItem(key);
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data && data.access_token && data.refresh_token) {
                this.supabase.auth.setSession({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token
                }).catch(() => {});
            }
        } catch (_) {
            // Ignore auth session errors
        }
    }

    async ensureAuthSession() {
        if (!this.supabase || !this.supabase.auth) return;
        try {
            const { data } = await this.supabase.auth.getSession();
            if (data && data.session) return;
            this.initAuthSession();
        } catch (_) {
            this.initAuthSession();
        }
    }

    generateUUID() {
        if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    setHandedness(label) {
        if (!label) return;
        const normalized = label.toLowerCase();
        if (normalized === 'left' || normalized === 'right') {
            this.handedness = normalized;
        }
    }

    setHandPosition(pos) {
        if (!pos) return;
        this.handPosition = { x: pos.x, y: pos.y };
    }

    onBombShown(isTraining = false) {
        if (isTraining) return;
        this.bombsShown += 1;
    }

    onBombHit(isTraining = false) {
        if (isTraining) return;
        this.bombsHit += 1;
    }

    async startSessionIfNeeded(userId) {
        if (this.sessionRowCreated) return;
        this.userId = userId || null;
        this.sessionStartedAt = new Date();

        if (!this.supabase) {
            this.sessionRowCreated = true;
            return;
        }

        const { error } = await this.supabase
            .from('sonic_pop_sessions')
            .insert({
                id: this.sessionId,
                user_id: this.userId,
                started_at: this.sessionStartedAt.toISOString()
            });

        if (error) {
            console.warn('Failed to create sonic_pop_sessions row:', error);
        } else {
            this.sessionRowCreated = true;
        }
    }

    async updateSessionEnd() {
        if (!this.supabase || !this.sessionStartedAt) return;
        const endedAt = new Date();
        const durationMs = endedAt - this.sessionStartedAt;

        const { error } = await this.supabase
            .from('sonic_pop_sessions')
            .update({
                ended_at: endedAt.toISOString(),
                duration_ms: durationMs
            })
            .eq('id', this.sessionId);

        if (error) {
            console.warn('Failed to update sonic_pop_sessions row:', error);
        }
    }

    startLevel({ levelNumber, moduleNumber, userId, canvasWidth, canvasHeight }) {
        this.levelAttemptId = this.generateUUID();
        this.levelStartedAt = new Date();
        this.levelNumber = levelNumber;
        this.moduleNumber = moduleNumber;
        this.userId = userId || this.userId || null;

        this.bombsShown = 0;
        this.bombsHit = 0;
        this.attentionSamples = 0;
        this.attentionFacingSamples = 0;

        this.elbowStats = new StreamingStats(true);
        this.accelStats = new StreamingStats(false);
        this.jerkStats = new StreamingStats(false);

        this.lastHandSample = null;
        this.lastVelocity = null;
        this.lastAcceleration = null;
        this.lastSampleTs = 0;

        this.trajectorySamples = [];
        this.lastTrajectoryTs = 0;
        this.levelStartPerf = performance.now();
        this.canvasWidth = canvasWidth || this.canvasWidth;
        this.canvasHeight = canvasHeight || this.canvasHeight;
    }

    getContext() {
        return {
            sessionId: this.sessionId,
            levelAttemptId: this.levelAttemptId,
            userId: this.userId,
            handedness: this.handedness
        };
    }

    async finishLevel({ score, completed, balloonsPopped, timeLeft, endedAt: endedAtOverride }) {
        if (!this.levelStartedAt) return;
        const endedAt = endedAtOverride || new Date();
        const durationMs = endedAt - this.levelStartedAt;

        const bombsAvoided = Math.max(0, this.bombsShown - this.bombsHit);
        const totalImpacts = (this.bombsHit || 0) + (balloonsPopped || 0);
        const riskAvoidanceRate = totalImpacts > 0
            ? (this.bombsHit / totalImpacts) * 100
            : null;

        const elbow = this.elbowStats.toSummary(true);
        const accel = this.accelStats.toSummary(false);
        const jerk = this.jerkStats.toSummary(false);

        const attentionPct = this.attentionSamples > 0
            ? (this.attentionFacingSamples / this.attentionSamples) * 100
            : null;

        let analyticsOk = true;
        if (this.supabase) {
            const { error } = await this.supabase
                .from('sonic_pop_level_attempts')
                .insert({
                    id: this.levelAttemptId,
                    session_id: this.sessionId,
                    user_id: this.userId,
                    level_number: this.levelNumber,
                    module_number: this.moduleNumber,
                    started_at: this.levelStartedAt.toISOString(),
                    ended_at: endedAt.toISOString(),
                    duration_ms: durationMs,
                    score,
                    completed,
                    balloons_popped: balloonsPopped,
                    bombs_shown: this.bombsShown,
                    bombs_hit: this.bombsHit,
                    bombs_avoided: bombsAvoided,
                    risk_avoidance_rate: riskAvoidanceRate,
                    elbow_angle_mean: elbow.mean,
                    elbow_angle_var: elbow.var,
                    elbow_angle_std: elbow.std,
                    elbow_angle_min: elbow.min,
                    elbow_angle_max: elbow.max,
                    accel_mean: accel.mean,
                    accel_var: accel.var,
                    accel_std: accel.std,
                    jerk_mean: jerk.mean,
                    jerk_var: jerk.var,
                    jerk_std: jerk.std,
                    attention_pct: attentionPct,
                    handedness: this.handedness
                });

            if (error) {
                console.warn('Failed to insert sonic_pop_level_attempts:', error);
                analyticsOk = false;
            }
        }

        await this.updateSessionEnd();
        return analyticsOk;
    }

    onHolisticResults(results) {
        const now = performance.now();
        if (now - this.lastSampleTs < this.sampleIntervalMs) return;
        this.lastSampleTs = now;

        if (results && results.poseLandmarks) {
            const elbowAngle = this.calculateElbowAngle(results.poseLandmarks, this.handedness);
            if (elbowAngle !== null) this.elbowStats.add(elbowAngle);

            const facing = this.isFacingScreen(results.poseLandmarks);
            if (facing !== null) {
                this.attentionSamples += 1;
                if (facing) this.attentionFacingSamples += 1;
            }

            this.captureTrajectorySample(results.poseLandmarks, now);
        }

        this.sampleHandKinematics(now);
    }

    sampleHandKinematics(nowMs) {
        if (!this.handPosition) return;
        if (!this.lastHandSample) {
            this.lastHandSample = { x: this.handPosition.x, y: this.handPosition.y, ts: nowMs };
            return;
        }

        const dt = (nowMs - this.lastHandSample.ts) / 1000;
        if (dt <= 0) return;

        const dx = this.handPosition.x - this.lastHandSample.x;
        const dy = this.handPosition.y - this.lastHandSample.y;
        const velocity = Math.hypot(dx, dy) / dt;

        if (this.lastVelocity !== null) {
            const accel = (velocity - this.lastVelocity) / dt;
            this.accelStats.add(Math.abs(accel));

            if (this.lastAcceleration !== null) {
                const jerk = (accel - this.lastAcceleration) / dt;
                this.jerkStats.add(Math.abs(jerk));
            }

            this.lastAcceleration = accel;
        }

        this.lastVelocity = velocity;
        this.lastHandSample = { x: this.handPosition.x, y: this.handPosition.y, ts: nowMs };
    }

    getTrajectorySamples() {
        return {
            samples: this.trajectorySamples || [],
            sample_rate_hz: 15,
            coord_space: 'camera_pixels',
            handedness: this.handedness || null,
            canvas_width: this.canvasWidth || null,
            canvas_height: this.canvasHeight || null
        };
    }

    captureTrajectorySample(poseLandmarks, nowMs) {
        if (!poseLandmarks || !this.levelStartPerf) return;
        if (nowMs - this.lastTrajectoryTs < this.trajectorySampleIntervalMs) return;
        this.lastTrajectoryTs = nowMs;

        const left = { shoulder: 11, elbow: 13, wrist: 15 };
        const right = { shoulder: 12, elbow: 14, wrist: 16 };

        let side = this.handedness === 'right' ? right : left;
        if (this.handedness !== 'left' && this.handedness !== 'right') {
            const leftVis = poseLandmarks[left.elbow]?.visibility || 0;
            const rightVis = poseLandmarks[right.elbow]?.visibility || 0;
            side = rightVis >= leftVis ? right : left;
        }

        const s = poseLandmarks[side.shoulder];
        const e = poseLandmarks[side.elbow];
        const w = poseLandmarks[side.wrist];
        if (!s || !e || !w) return;

        const t = Math.max(0, Math.round(nowMs - this.levelStartPerf));
        const width = this.canvasWidth || 1;
        const height = this.canvasHeight || 1;
        this.trajectorySamples.push({
            t,
            w: [w.x * width, w.y * height],
            e: [e.x * width, e.y * height],
            s: [s.x * width, s.y * height]
        });
    }

    calculateElbowAngle(poseLandmarks, handedness) {
        const left = { shoulder: 11, elbow: 13, wrist: 15 };
        const right = { shoulder: 12, elbow: 14, wrist: 16 };

        let side = handedness === 'right' ? right : left;
        if (handedness !== 'left' && handedness !== 'right') {
            const leftVis = poseLandmarks[left.elbow]?.visibility || 0;
            const rightVis = poseLandmarks[right.elbow]?.visibility || 0;
            side = rightVis >= leftVis ? right : left;
        }

        const a = poseLandmarks[side.shoulder];
        const b = poseLandmarks[side.elbow];
        const c = poseLandmarks[side.wrist];
        if (!a || !b || !c) return null;

        const ab = { x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) };
        const cb = { x: c.x - b.x, y: c.y - b.y, z: (c.z || 0) - (b.z || 0) };

        const dot = ab.x * cb.x + ab.y * cb.y + ab.z * cb.z;
        const abMag = Math.hypot(ab.x, ab.y, ab.z);
        const cbMag = Math.hypot(cb.x, cb.y, cb.z);
        if (abMag === 0 || cbMag === 0) return null;

        const cosine = Math.max(-1, Math.min(1, dot / (abMag * cbMag)));
        const angleRad = Math.acos(cosine);
        return angleRad * (180 / Math.PI);
    }

    isFacingScreen(poseLandmarks) {
        const nose = poseLandmarks[0];
        const leftEar = poseLandmarks[7];
        const rightEar = poseLandmarks[8];
        if (!nose || !leftEar || !rightEar) return null;

        const midEarX = (leftEar.x + rightEar.x) / 2;
        const midEarY = (leftEar.y + rightEar.y) / 2;
        const earSpan = Math.hypot(rightEar.x - leftEar.x, rightEar.y - leftEar.y);
        if (earSpan < 1e-5) return null;

        const yaw = (nose.x - midEarX) / earSpan;
        const pitch = (nose.y - midEarY) / earSpan;

        const yawThreshold = 0.25;
        const pitchThreshold = 0.25;

        return Math.abs(yaw) <= yawThreshold && Math.abs(pitch) <= pitchThreshold;
    }
}

window.SonicPopAnalytics = SonicPopAnalytics;
