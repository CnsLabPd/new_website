/**
 * Analytics Report Generator
 * Creates beautiful HTML reports from session analytics data
 *
 * Created: 2026-03-30
 */

/**
 * Generate complete analytics report HTML
 * @param {Object} sessionData - Session data from AnalyticsCollector
 * @param {string[]} userRoles - User's selected roles
 * @returns {string} HTML string
 */
export function generateAnalyticsReport(sessionData, userRoles) {
  const isBlind = userRoles.includes('blind');
  const isADHD = userRoles.includes('adhd');

  let html = '';

  // Header section with overall performance
  html += generateOverallPerformance(sessionData);

  // Blind-specific section
  if (isBlind && sessionData.blind_sound_localization_accuracy !== null) {
    html += generateBlindMetrics(sessionData);
  }

  // ADHD-specific section
  if (isADHD && sessionData.adhd_sustained_attention_duration_sec !== null) {
    html += generateADHDMetrics(sessionData);
  }

  // Universal metrics (reaction time, etc.)
  html += generateUniversalMetrics(sessionData);

  // Gesture metrics (if using gesture control)
  if (sessionData.control_method === 'gesture' && sessionData.gesture_accuracy_rate !== null) {
    html += generateGestureMetrics(sessionData);
  }

  return html;
}

/**
 * Generate overall performance section
 */
function generateOverallPerformance(data) {
  const performanceScore = calculateOverallPerformanceScore(data);
  const badge = getPerformanceBadge(performanceScore);

  return `
    <div class="analytics-section">
      <h3>
        🎮 Overall Performance
        <span class="performance-badge ${badge.class}">${badge.label}</span>
      </h3>

      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Final Score</div>
          <div class="metric-value">${data.final_score}</div>
          <div class="metric-unit">points</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Distance</div>
          <div class="metric-value">${Math.round(data.distance_traveled)}</div>
          <div class="metric-unit">meters</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Duration</div>
          <div class="metric-value">${Math.floor(data.duration_seconds / 60)}:${String(data.duration_seconds % 60).padStart(2, '0')}</div>
          <div class="metric-unit">minutes</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Collisions</div>
          <div class="metric-value">${data.collisions}</div>
          <div class="metric-unit">crashes</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Successful Dodges</div>
          <div class="metric-value">${data.successful_dodges}</div>
          <div class="metric-unit">cars avoided</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Near Misses</div>
          <div class="metric-value">${data.near_misses}</div>
          <div class="metric-unit">close calls</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate blind-specific metrics
 */
function generateBlindMetrics(data) {
  return `
    <div class="analytics-section">
      <h3>👁️ Audio Navigation Performance</h3>
      <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
        Metrics for visually impaired navigation training
      </p>

      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Sound Localization</div>
          <div class="metric-value">${data.blind_sound_localization_accuracy?.toFixed(1) || 0}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.blind_sound_localization_accuracy || 0}%"></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Navigation Efficiency</div>
          <div class="metric-value">${data.blind_navigation_efficiency?.toFixed(1) || 0}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.blind_navigation_efficiency || 0}%"></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Collision Avoidance</div>
          <div class="metric-value">${data.blind_collision_avoidance_rate?.toFixed(1) || 0}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.blind_collision_avoidance_rate || 0}%"></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Stereo Awareness</div>
          <div class="metric-value">${data.blind_stereo_awareness_score?.toFixed(1) || 0}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.blind_stereo_awareness_score || 0}%"></div>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: rgba(0,255,136,0.1); border-radius: 8px; border-left: 3px solid #00ff88;">
        <strong style="color: #00ff88;">💡 Training Insights:</strong>
        <ul style="margin: 10px 0 0 20px; color: rgba(255,255,255,0.8); line-height: 1.8;">
          ${generateBlindInsights(data)}
        </ul>
      </div>
    </div>
  `;
}

/**
 * Generate ADHD-specific metrics
 */
function generateADHDMetrics(data) {
  return `
    <div class="analytics-section">
      <h3>🧠 Attention & Focus Performance</h3>
      <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
        Metrics for ADHD therapy and attention training
      </p>

      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Sustained Attention</div>
          <div class="metric-value">${data.adhd_sustained_attention_duration_sec?.toFixed(1) || 0}s</div>
          <div class="metric-unit">average duration</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Impulsivity Index</div>
          <div class="metric-value">${data.adhd_impulsivity_index?.toFixed(1) || 0}%</div>
          <div class="metric-unit">lower is better</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${Math.max(0, 100 - (data.adhd_impulsivity_index || 0))}%; background: linear-gradient(90deg, #ff0055, #ffaa00);"></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Attention Consistency</div>
          <div class="metric-value">${data.adhd_attention_consistency?.toFixed(1) || 0}%</div>
          <div class="metric-unit">focus stability</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.adhd_attention_consistency || 0}%"></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Premature Responses</div>
          <div class="metric-value">${data.adhd_premature_response_rate?.toFixed(1) || 0}%</div>
          <div class="metric-unit">impulsive actions</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Task Quality</div>
          <div class="metric-value">${data.adhd_task_completion_quality?.toFixed(1) || 0}%</div>
          <div class="metric-unit">accuracy + speed</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.adhd_task_completion_quality || 0}%"></div>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: rgba(0,255,255,0.1); border-radius: 8px; border-left: 3px solid #00ffff;">
        <strong style="color: #00ffff;">💡 Attention Insights:</strong>
        <ul style="margin: 10px 0 0 20px; color: rgba(255,255,255,0.8); line-height: 1.8;">
          ${generateADHDInsights(data)}
        </ul>
      </div>
    </div>
  `;
}

/**
 * Generate universal metrics
 */
function generateUniversalMetrics(data) {
  return `
    <div class="analytics-section">
      <h3>⚡ Reaction Time Analysis</h3>

      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Average RT</div>
          <div class="metric-value">${data.mean_reaction_time_ms || 0}</div>
          <div class="metric-unit">milliseconds</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Median RT</div>
          <div class="metric-value">${data.median_reaction_time_ms || 0}</div>
          <div class="metric-unit">milliseconds</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Fastest RT</div>
          <div class="metric-value">${data.min_reaction_time_ms || 0}</div>
          <div class="metric-unit">milliseconds</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">RT Variability</div>
          <div class="metric-value">${data.reaction_time_sd_ms || 0}</div>
          <div class="metric-unit">SD (ms)</div>
        </div>
      </div>

      ${generateRTInterpretation(data)}
    </div>
  `;
}

/**
 * Generate gesture metrics
 */
function generateGestureMetrics(data) {
  return `
    <div class="analytics-section">
      <h3>✋ Gesture Recognition Performance</h3>

      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Recognition Accuracy</div>
          <div class="metric-value">${data.gesture_accuracy_rate?.toFixed(1) || 0}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.gesture_accuracy_rate || 0}%"></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Avg Latency</div>
          <div class="metric-value">${data.gesture_recognition_latency_ms || 0}</div>
          <div class="metric-unit">milliseconds</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Total Gestures</div>
          <div class="metric-value">${data.total_gestures_detected || 0}</div>
          <div class="metric-unit">detected</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Left / Right</div>
          <div class="metric-value">${data.left_gesture_count || 0} / ${data.right_gesture_count || 0}</div>
          <div class="metric-unit">gestures</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate insights for blind users
 */
function generateBlindInsights(data) {
  const insights = [];

  if (data.blind_sound_localization_accuracy >= 80) {
    insights.push('<li>✅ Excellent sound localization! You accurately identified car positions.</li>');
  } else if (data.blind_sound_localization_accuracy >= 60) {
    insights.push('<li>📈 Good progress with sound localization. Keep practicing spatial audio awareness.</li>');
  } else {
    insights.push('<li>💪 Focus on distinguishing left/center/right audio cues. Use headphones for better spatial awareness.</li>');
  }

  if (data.blind_collision_avoidance_rate >= 70) {
    insights.push('<li>✅ Strong collision avoidance! You respond well to audio warnings.</li>');
  } else {
    insights.push('<li>📊 Practice reacting faster to horn sounds. Early response is key to avoidance.</li>');
  }

  if (data.blind_stereo_awareness_score >= 75) {
    insights.push('<li>✅ Excellent stereo awareness! You understand directional audio very well.</li>');
  }

  return insights.join('');
}

/**
 * Generate insights for ADHD users
 */
function generateADHDInsights(data) {
  const insights = [];

  if (data.adhd_sustained_attention_duration_sec >= 30) {
    insights.push('<li>✅ Strong sustained attention! You maintained focus effectively.</li>');
  } else if (data.adhd_sustained_attention_duration_sec >= 15) {
    insights.push('<li>📈 Good attention duration. Try to extend your focus periods gradually.</li>');
  } else {
    insights.push('<li>💪 Work on maintaining focus for longer periods. Short breaks can help.</li>');
  }

  if (data.adhd_impulsivity_index <= 20) {
    insights.push('<li>✅ Low impulsivity! You think before acting.</li>');
  } else if (data.adhd_impulsivity_index >= 50) {
    insights.push('<li>📊 High impulsivity detected. Practice pausing before responding to stimuli.</li>');
  }

  if (data.adhd_attention_consistency >= 70) {
    insights.push('<li>✅ Excellent consistency! Your reaction times are stable.</li>');
  } else {
    insights.push('<li>💪 Work on maintaining consistent performance throughout the session.</li>');
  }

  return insights.join('');
}

/**
 * Generate RT interpretation
 */
function generateRTInterpretation(data) {
  const meanRT = data.mean_reaction_time_ms;
  let interpretation = '';

  if (meanRT < 200) {
    interpretation = '<span style="color: #00ff88;">⚡ Excellent reflexes! Your reaction time is in the top tier.</span>';
  } else if (meanRT < 300) {
    interpretation = '<span style="color: #00ffff;">✅ Good reaction time! You respond quickly to stimuli.</span>';
  } else if (meanRT < 400) {
    interpretation = '<span style="color: #ffaa00;">📊 Average reaction time. Practice can improve this.</span>';
  } else {
    interpretation = '<span style="color: #ff0055;">💪 Slower reaction time. Focus on responding quickly to audio cues.</span>';
  }

  return `
    <div style="margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px; text-align: center;">
      ${interpretation}
    </div>
  `;
}

/**
 * Calculate overall performance score
 */
function calculateOverallPerformanceScore(data) {
  let score = 0;
  let count = 0;

  // Score components
  if (data.blind_sound_localization_accuracy !== null) {
    score += data.blind_sound_localization_accuracy;
    count++;
  }

  if (data.adhd_attention_consistency !== null) {
    score += data.adhd_attention_consistency;
    count++;
  }

  if (data.mean_reaction_time_ms !== null) {
    // Convert RT to score (lower is better, normalize to 0-100)
    const rtScore = Math.max(0, 100 - (data.mean_reaction_time_ms - 200) / 3);
    score += rtScore;
    count++;
  }

  // Average collision avoidance
  const avoidanceRate = data.successful_dodges / (data.successful_dodges + data.collisions + 0.001);
  score += avoidanceRate * 100;
  count++;

  return count > 0 ? score / count : 50;
}

/**
 * Get performance badge
 */
function getPerformanceBadge(score) {
  if (score >= 80) {
    return { class: 'excellent', label: 'Excellent' };
  } else if (score >= 60) {
    return { class: 'good', label: 'Good' };
  } else if (score >= 40) {
    return { class: 'average', label: 'Average' };
  } else {
    return { class: 'needs-improvement', label: 'Keep Practicing' };
  }
}
