/**
 * Mandala Painting Game API
 * Handles all database operations for the Mandala Painting game
 * Integrates with Neurogati Auth and Supabase
 */

class MandalaPaintingAPI {
    constructor() {
        if (!window.NeurogatiAuth) {
            console.error('❌ MANDALA API: NeurogatiAuth not found!');
            return;
        }

        this.auth = window.NeurogatiAuth;
        this.supabase = this.auth.supabase;
        console.log('✅ MANDALA API: Initialized');
    }

    /**
     * Save a design to the database
     * @param {Object} designData - The design data to save
     * @returns {Promise<Object>} Saved design with ID
     */
    async saveDesign(designData) {
        try {
            if (!this.auth.isAuthenticated()) {
                console.warn('⚠️ MANDALA API: User not authenticated, cannot save design');
                return null;
            }

            const userId = this.auth.getUserId();
            console.log('💾 MANDALA API: Saving design for user:', userId);

            const dataToSave = {
                user_id: userId,
                design_id: designData.id || `design_${Date.now()}`,
                design_name: designData.metadata?.customFileName || designData.metadata?.name || 'Untitled Design',
                template_name: designData.metadata?.originalTemplateName || null,
                color_map: JSON.stringify(designData.colorMap || {}),
                region_count: designData.regionCounter || 0,
                image_data: designData.imageData || null,
                metadata: JSON.stringify(designData.metadata || {}),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await this.supabase
                .from('mandala_designs')
                .upsert(dataToSave, {
                    onConflict: 'user_id,design_id'
                })
                .select()
                .single();

            if (error) {
                console.error('❌ MANDALA API: Error saving design:', error);
                throw error;
            }

            console.log('✅ MANDALA API: Design saved successfully:', data);
            return data;
        } catch (error) {
            console.error('❌ MANDALA API: Save design failed:', error);
            throw error;
        }
    }

    /**
     * Load all designs for the current user
     * @returns {Promise<Array>} Array of user's designs
     */
    async loadAllDesigns() {
        try {
            if (!this.auth.isAuthenticated()) {
                console.warn('⚠️ MANDALA API: User not authenticated');
                return [];
            }

            const userId = this.auth.getUserId();
            console.log('📂 MANDALA API: Loading designs for user:', userId);

            const { data, error } = await this.supabase
                .from('mandala_designs')
                .select('*')
                .eq('user_id', userId)
                .order('updated_at', { ascending: false });

            if (error) {
                console.error('❌ MANDALA API: Error loading designs:', error);
                throw error;
            }

            console.log(`✅ MANDALA API: Loaded ${data.length} designs`);

            // Parse JSON fields
            return data.map(design => ({
                ...design,
                colorMap: JSON.parse(design.color_map || '{}'),
                metadata: JSON.parse(design.metadata || '{}')
            }));
        } catch (error) {
            console.error('❌ MANDALA API: Load designs failed:', error);
            return [];
        }
    }

    /**
     * Load a specific design by ID
     * @param {string} designId - The design ID to load
     * @returns {Promise<Object>} Design data
     */
    async loadDesign(designId) {
        try {
            if (!this.auth.isAuthenticated()) {
                console.warn('⚠️ MANDALA API: User not authenticated');
                return null;
            }

            const userId = this.auth.getUserId();
            console.log('📂 MANDALA API: Loading design:', designId);

            const { data, error } = await this.supabase
                .from('mandala_designs')
                .select('*')
                .eq('user_id', userId)
                .eq('design_id', designId)
                .single();

            if (error) {
                console.error('❌ MANDALA API: Error loading design:', error);
                throw error;
            }

            console.log('✅ MANDALA API: Design loaded successfully');

            // Parse JSON fields
            return {
                ...data,
                colorMap: JSON.parse(data.color_map || '{}'),
                metadata: JSON.parse(data.metadata || '{}')
            };
        } catch (error) {
            console.error('❌ MANDALA API: Load design failed:', error);
            return null;
        }
    }

    /**
     * Delete a design
     * @param {string} designId - The design ID to delete
     * @returns {Promise<boolean>} Success status
     */
    async deleteDesign(designId) {
        try {
            if (!this.auth.isAuthenticated()) {
                console.warn('⚠️ MANDALA API: User not authenticated');
                return false;
            }

            const userId = this.auth.getUserId();
            console.log('🗑️ MANDALA API: Deleting design:', designId);

            const { error } = await this.supabase
                .from('mandala_designs')
                .delete()
                .eq('user_id', userId)
                .eq('design_id', designId);

            if (error) {
                console.error('❌ MANDALA API: Error deleting design:', error);
                throw error;
            }

            console.log('✅ MANDALA API: Design deleted successfully');
            return true;
        } catch (error) {
            console.error('❌ MANDALA API: Delete design failed:', error);
            return false;
        }
    }

    /**
     * Save game session statistics
     * @param {Object} sessionData - Session statistics
     * @returns {Promise<Object>} Saved session data
     */
    async saveGameSession(sessionData) {
        try {
            if (!this.auth.isAuthenticated()) {
                console.warn('⚠️ MANDALA API: User not authenticated');
                return null;
            }

            const userId = this.auth.getUserId();
            console.log('📊 MANDALA API: Saving game session for user:', userId);

            const dataToSave = {
                user_id: userId,
                started_at: sessionData.startedAt || new Date().toISOString(),
                completed_at: sessionData.completedAt || new Date().toISOString(),
                duration_seconds: sessionData.durationSeconds || 0,
                regions_painted: sessionData.regionsPainted || 0,
                completion_percentage: sessionData.completionPercentage || 0.0
            };

            const { data, error } = await this.supabase
                .from('mandala_game_sessions')
                .insert(dataToSave)
                .select()
                .single();

            if (error) {
                console.error('❌ MANDALA API: Error saving session:', error);
                throw error;
            }

            console.log('✅ MANDALA API: Session saved successfully');
            return data;
        } catch (error) {
            console.error('❌ MANDALA API: Save session failed:', error);
            return null;
        }
    }

    /**
     * Get user statistics
     * @returns {Promise<Object>} User statistics
     */
    async getUserStatistics() {
        try {
            if (!this.auth.isAuthenticated()) {
                console.warn('⚠️ MANDALA API: User not authenticated');
                return null;
            }

            const userId = this.auth.getUserId();
            console.log('📊 MANDALA API: Getting user statistics for:', userId);

            // Get total sessions count
            const { count: totalGames } = await this.supabase
                .from('mandala_game_sessions')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            // Get total designs count
            const { count: totalDesigns } = await this.supabase
                .from('mandala_designs')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            // Get aggregate statistics
            const { data: sessions } = await this.supabase
                .from('mandala_game_sessions')
                .select('duration_seconds, regions_painted, completion_percentage')
                .eq('user_id', userId);

            let totalPlayTime = 0;
            let totalRegionsPainted = 0;
            let avgCompletionPercentage = 0;

            if (sessions && sessions.length > 0) {
                totalPlayTime = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
                totalRegionsPainted = sessions.reduce((sum, s) => sum + (s.regions_painted || 0), 0);
                avgCompletionPercentage = sessions.reduce((sum, s) => sum + (s.completion_percentage || 0), 0) / sessions.length;
            }

            const statistics = {
                userId,
                totalGamesPlayed: totalGames || 0,
                totalDesigns: totalDesigns || 0,
                totalPlayTimeSeconds: totalPlayTime,
                totalRegionsPainted,
                averageCompletionPercentage: avgCompletionPercentage
            };

            console.log('✅ MANDALA API: User statistics:', statistics);
            return statistics;
        } catch (error) {
            console.error('❌ MANDALA API: Get statistics failed:', error);
            return null;
        }
    }
}

// Make it available globally
window.MandalaPaintingAPI = MandalaPaintingAPI;
console.log('✅ Mandala Painting API SDK loaded');
