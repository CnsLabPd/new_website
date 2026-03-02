/**
 * Cache Manager for Mandala Painting App
 * Handles efficient storage and retrieval of templates, designs, and undo/redo states
 */

class CacheManager {
    constructor() {
        this.cacheKey = 'mandala-cache';
        this.undoRedoKey = 'mandala-undo-redo';
        this.maxUndoStates = 20; // Reduced from 50 for better memory management
        this.maxCacheSize = 50 * 1024 * 1024; // 50MB cache limit
        
        this.initializeCache();
    }

    initializeCache() {
        try {
            // Initialize main cache structure
            if (!localStorage.getItem(this.cacheKey)) {
                const initialCache = {
                    templates: [],
                    designs: [],
                    settings: {
                        lastUpdated: Date.now(),
                        version: '1.0'
                    }
                };
                localStorage.setItem(this.cacheKey, JSON.stringify(initialCache));
            }

            // Initialize undo/redo cache
            if (!localStorage.getItem(this.undoRedoKey)) {
                const initialUndoRedo = {
                    states: [],
                    currentIndex: -1,
                    lastUpdated: Date.now()
                };
                localStorage.setItem(this.undoRedoKey, JSON.stringify(initialUndoRedo));
            }

            console.log('🗄️ CACHE: Cache manager initialized');
        } catch (error) {
            console.error('❌ CACHE: Failed to initialize cache:', error);
        }
    }

    // Undo/Redo State Management
    saveUndoState(canvasData) {
        try {
            const undoRedoCache = this.getUndoRedoCache();
            
            // Remove future states if we're not at the end
            if (undoRedoCache.currentIndex < undoRedoCache.states.length - 1) {
                undoRedoCache.states = undoRedoCache.states.slice(0, undoRedoCache.currentIndex + 1);
            }

            // Add new state
            undoRedoCache.states.push({
                data: canvasData,
                timestamp: Date.now()
            });

            // Limit number of undo states
            if (undoRedoCache.states.length > this.maxUndoStates) {
                undoRedoCache.states.shift();
            } else {
                undoRedoCache.currentIndex++;
            }

            undoRedoCache.currentIndex = undoRedoCache.states.length - 1;
            undoRedoCache.lastUpdated = Date.now();

            this.setUndoRedoCache(undoRedoCache);
            
            console.log('💾 CACHE: Undo state saved', {
                currentIndex: undoRedoCache.currentIndex,
                totalStates: undoRedoCache.states.length
            });

            return true;
        } catch (error) {
            console.error('❌ CACHE: Failed to save undo state:', error);
            return false;
        }
    }

    canUndo() {
        const undoRedoCache = this.getUndoRedoCache();
        return undoRedoCache.currentIndex > 0;
    }

    canRedo() {
        const undoRedoCache = this.getUndoRedoCache();
        return undoRedoCache.currentIndex < undoRedoCache.states.length - 1;
    }

    undo() {
        try {
            const undoRedoCache = this.getUndoRedoCache();
            
            if (undoRedoCache.currentIndex > 0) {
                undoRedoCache.currentIndex--;
                undoRedoCache.lastUpdated = Date.now();
                this.setUndoRedoCache(undoRedoCache);
                
                const state = undoRedoCache.states[undoRedoCache.currentIndex];
                console.log('↶ CACHE: Undo performed', {
                    currentIndex: undoRedoCache.currentIndex,
                    totalStates: undoRedoCache.states.length
                });
                
                return state.data;
            }
            
            return null;
        } catch (error) {
            console.error('❌ CACHE: Undo failed:', error);
            return null;
        }
    }

    redo() {
        try {
            const undoRedoCache = this.getUndoRedoCache();
            
            if (undoRedoCache.currentIndex < undoRedoCache.states.length - 1) {
                undoRedoCache.currentIndex++;
                undoRedoCache.lastUpdated = Date.now();
                this.setUndoRedoCache(undoRedoCache);
                
                const state = undoRedoCache.states[undoRedoCache.currentIndex];
                console.log('↷ CACHE: Redo performed', {
                    currentIndex: undoRedoCache.currentIndex,
                    totalStates: undoRedoCache.states.length
                });
                
                return state.data;
            }
            
            return null;
        } catch (error) {
            console.error('❌ CACHE: Redo failed:', error);
            return null;
        }
    }

    clearUndoHistory() {
        try {
            const initialUndoRedo = {
                states: [],
                currentIndex: -1,
                lastUpdated: Date.now()
            };
            localStorage.setItem(this.undoRedoKey, JSON.stringify(initialUndoRedo));
            console.log('🔄 CACHE: Undo history cleared');
        } catch (error) {
            console.error('❌ CACHE: Failed to clear undo history:', error);
        }
    }

    // Template Management
    saveTemplate(template) {
        try {
            const cache = this.getCache();
            template.id = template.id || 'template_' + Date.now();
            template.created = template.created || Date.now();
            
            cache.templates.push(template);
            cache.settings.lastUpdated = Date.now();
            
            this.setCache(cache);
            console.log('📁 CACHE: Template saved:', template.id);
            return template.id;
        } catch (error) {
            console.error('❌ CACHE: Failed to save template:', error);
            return null;
        }
    }

    getTemplates() {
        try {
            const cache = this.getCache();
            return cache.templates || [];
        } catch (error) {
            console.error('❌ CACHE: Failed to get templates:', error);
            return [];
        }
    }

    deleteTemplate(templateId) {
        try {
            const cache = this.getCache();
            cache.templates = cache.templates.filter(t => t.id !== templateId);
            cache.settings.lastUpdated = Date.now();
            
            this.setCache(cache);
            console.log('🗑️ CACHE: Template deleted:', templateId);
            return true;
        } catch (error) {
            console.error('❌ CACHE: Failed to delete template:', error);
            return false;
        }
    }

    // Design Management
    saveDesign(design) {
        try {
            const cache = this.getCache();
            design.id = design.id || 'design_' + Date.now();
            design.created = design.created || Date.now();
            
            cache.designs.push(design);
            cache.settings.lastUpdated = Date.now();
            
            this.setCache(cache);
            console.log('🎨 CACHE: Design saved:', design.id);
            return design.id;
        } catch (error) {
            console.error('❌ CACHE: Failed to save design:', error);
            return null;
        }
    }

    getDesigns() {
        try {
            const cache = this.getCache();
            return cache.designs || [];
        } catch (error) {
            console.error('❌ CACHE: Failed to get designs:', error);
            return [];
        }
    }

    deleteDesign(designId) {
        try {
            const cache = this.getCache();
            cache.designs = cache.designs.filter(d => d.id !== designId);
            cache.settings.lastUpdated = Date.now();
            
            this.setCache(cache);
            console.log('🗑️ CACHE: Design deleted:', designId);
            return true;
        } catch (error) {
            console.error('❌ CACHE: Failed to delete design:', error);
            return false;
        }
    }

    // Cache utilities
    getCache() {
        try {
            const cached = localStorage.getItem(this.cacheKey);
            return cached ? JSON.parse(cached) : { templates: [], designs: [], settings: {} };
        } catch (error) {
            console.error('❌ CACHE: Failed to get cache:', error);
            return { templates: [], designs: [], settings: {} };
        }
    }

    setCache(cache) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(cache));
        } catch (error) {
            console.error('❌ CACHE: Failed to set cache:', error);
            // Handle storage quota exceeded
            if (error.name === 'QuotaExceededError') {
                this.cleanupCache();
                localStorage.setItem(this.cacheKey, JSON.stringify(cache));
            }
        }
    }

    getUndoRedoCache() {
        try {
            const cached = localStorage.getItem(this.undoRedoKey);
            return cached ? JSON.parse(cached) : { states: [], currentIndex: -1, lastUpdated: Date.now() };
        } catch (error) {
            console.error('❌ CACHE: Failed to get undo/redo cache:', error);
            return { states: [], currentIndex: -1, lastUpdated: Date.now() };
        }
    }

    setUndoRedoCache(undoRedoCache) {
        try {
            localStorage.setItem(this.undoRedoKey, JSON.stringify(undoRedoCache));
        } catch (error) {
            console.error('❌ CACHE: Failed to set undo/redo cache:', error);
            if (error.name === 'QuotaExceededError') {
                // Reduce undo states if quota exceeded
                undoRedoCache.states = undoRedoCache.states.slice(-this.maxUndoStates / 2);
                undoRedoCache.currentIndex = Math.min(undoRedoCache.currentIndex, undoRedoCache.states.length - 1);
                localStorage.setItem(this.undoRedoKey, JSON.stringify(undoRedoCache));
            }
        }
    }

    cleanupCache() {
        try {
            console.log('🧹 CACHE: Cleaning up cache due to quota exceeded');
            
            // Clean up old undo states
            const undoRedoCache = this.getUndoRedoCache();
            if (undoRedoCache.states.length > this.maxUndoStates / 2) {
                undoRedoCache.states = undoRedoCache.states.slice(-this.maxUndoStates / 2);
                undoRedoCache.currentIndex = Math.min(undoRedoCache.currentIndex, undoRedoCache.states.length - 1);
                this.setUndoRedoCache(undoRedoCache);
            }

            // Clean up old designs (keep only last 20)
            const cache = this.getCache();
            if (cache.designs.length > 20) {
                cache.designs.sort((a, b) => b.created - a.created);
                cache.designs = cache.designs.slice(0, 20);
                this.setCache(cache);
            }

            console.log('✅ CACHE: Cleanup completed');
        } catch (error) {
            console.error('❌ CACHE: Cleanup failed:', error);
        }
    }

    getCacheStats() {
        try {
            const cache = this.getCache();
            const undoRedoCache = this.getUndoRedoCache();
            
            const mainCacheSize = new Blob([localStorage.getItem(this.cacheKey)]).size;
            const undoRedoCacheSize = new Blob([localStorage.getItem(this.undoRedoKey)]).size;
            
            return {
                templates: cache.templates.length,
                designs: cache.designs.length,
                undoStates: undoRedoCache.states.length,
                currentUndoIndex: undoRedoCache.currentIndex,
                mainCacheSize: Math.round(mainCacheSize / 1024) + ' KB',
                undoRedoCacheSize: Math.round(undoRedoCacheSize / 1024) + ' KB',
                totalSize: Math.round((mainCacheSize + undoRedoCacheSize) / 1024) + ' KB'
            };
        } catch (error) {
            console.error('❌ CACHE: Failed to get cache stats:', error);
            return {};
        }
    }

    clearAllCache() {
        try {
            localStorage.removeItem(this.cacheKey);
            localStorage.removeItem(this.undoRedoKey);
            this.initializeCache();
            console.log('🗑️ CACHE: All cache cleared');
        } catch (error) {
            console.error('❌ CACHE: Failed to clear cache:', error);
        }
    }
}

// Export for use in HTML
window.CacheManager = CacheManager;