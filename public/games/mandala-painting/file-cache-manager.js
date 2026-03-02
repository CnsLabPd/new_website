/**
 * File-Based Cache Manager for Mandala Painting App
 * Saves painting progress to actual files in a cache folder
 */

class FileCacheManager {
    constructor() {
        this.cacheDir = './cache';
        this.progressDir = './cache/progress';
        this.templatesDir = './cache/templates';
        this.maxUndoStates = 20;
        
        this.initializeDirectories();
    }

    // Initialize cache directories
    initializeDirectories() {
        try {
            // Create directories if they don't exist
            this.ensureDirectoryExists(this.cacheDir);
            this.ensureDirectoryExists(this.progressDir);
            this.ensureDirectoryExists(this.templatesDir);
            
            console.log('🗄️ FILE CACHE: Directories initialized');
        } catch (error) {
            console.error('❌ FILE CACHE: Failed to initialize directories:', error);
        }
    }

    ensureDirectoryExists(dirPath) {
        // For web applications, we'll use a virtual file system approach
        // In a real file system environment, you would use fs.mkdirSync
        console.log('📁 FILE CACHE: Ensuring directory exists:', dirPath);
    }

    // Save painting progress to file
    async savePaintingProgress(designData) {
        try {
            const designId = 'design_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            console.log('💾 FILE CACHE: Starting save process for design:', designId);
            console.log('💾 FILE CACHE: Design data received:', {
                templateName: designData.templateName,
                canvasSize: { width: designData.canvasWidth, height: designData.canvasHeight },
                hasCanvasData: !!designData.paintedCanvasData,
                dataLength: designData.paintedCanvasData ? designData.paintedCanvasData.length : 0
            });
            
            // Convert canvas data URL to blob for file saving
            const paintedImageBlob = this.dataURLToBlob(designData.paintedCanvasData);
            
            // Create metadata object
            const metadata = {
                id: designId,
                templateId: designData.templateId,
                templateName: designData.templateName,
                originalTemplateImage: designData.originalTemplateImage,
                processedTemplateImage: designData.processedTemplateImage,
                boundaryMap: designData.boundaryMap,
                canvasWidth: designData.canvasWidth,
                canvasHeight: designData.canvasHeight,
                savedAt: new Date().toISOString(),
                version: '3.0'
            };
            
            console.log('💾 FILE CACHE: Prepared metadata:', metadata);
            
            // Save to IndexedDB
            const savedId = await this.saveToIndexedDB(designId, {
                paintedImageBlob: paintedImageBlob,
                metadata: metadata
            });
            
            console.log('✅ FILE CACHE: Painting progress saved successfully:', {
                designId: savedId,
                templateName: metadata.templateName,
                timestamp: metadata.savedAt
            });
            
            // Verify save by trying to retrieve
            const verification = await this.loadFromIndexedDB(savedId);
            console.log('🔍 FILE CACHE: Save verification:', {
                exists: !!verification,
                hasMetadata: !!(verification && verification.metadata),
                hasBlob: !!(verification && verification.paintedImageBlob)
            });
            
            return savedId;
            
        } catch (error) {
            console.error('❌ FILE CACHE: Failed to save painting progress:', error);
            console.error('❌ FILE CACHE: Error details:', error.stack);
            return null;
        }
    }

    // Load painting progress from file
    async loadPaintingProgress(designId) {
        try {
            const savedData = await this.loadFromIndexedDB(designId);
            if (!savedData) {
                throw new Error('Design not found in cache');
            }
            
            // Convert blob back to data URL
            const paintedCanvasData = await this.blobToDataURL(savedData.paintedImageBlob);
            
            return {
                ...savedData.metadata,
                paintedCanvasData: paintedCanvasData
            };
            
        } catch (error) {
            console.error('❌ FILE CACHE: Failed to load painting progress:', error);
            return null;
        }
    }

    // Get all saved designs
    async getAllSavedDesigns() {
        try {
            const designs = await this.getAllFromIndexedDB();
            console.log('📁 FILE CACHE: Raw designs from IndexedDB:', designs);
            
            // Filter out undo/redo data and return only actual designs
            const actualDesigns = designs.filter(item => !item.id.startsWith('undo_'));
            
            console.log('📁 FILE CACHE: Filtered actual designs:', actualDesigns.length);
            
            return actualDesigns.map(design => {
                if (design.metadata) {
                    return {
                        ...design.metadata,
                        thumbnailBlob: design.thumbnailBlob // Include thumbnail blob for display
                    };
                } else {
                    // Handle legacy format or direct storage
                    return {
                        id: design.id,
                        templateName: design.templateName || 'Unknown Design',
                        savedAt: design.savedAt || Date.now(),
                        thumbnailBlob: design.thumbnailBlob
                    };
                }
            });
        } catch (error) {
            console.error('❌ FILE CACHE: Failed to get all saved designs:', error);
            return [];
        }
    }

    // Delete saved design
    async deleteSavedDesign(designId) {
        try {
            await this.deleteFromIndexedDB(designId);
            console.log('🗑️ FILE CACHE: Design deleted:', designId);
            return true;
        } catch (error) {
            console.error('❌ FILE CACHE: Failed to delete design:', error);
            return false;
        }
    }

    // IndexedDB operations for web environment
    async saveToIndexedDB(designId, data) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaCache', 1);
            
            request.onerror = () => reject(request.error);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('designs')) {
                    db.createObjectStore('designs', { keyPath: 'id' });
                }
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['designs'], 'readwrite');
                const store = transaction.objectStore('designs');
                
                // Create thumbnail
                this.createThumbnail(data.paintedImageBlob).then(thumbnailBlob => {
                    const designData = {
                        id: designId,
                        paintedImageBlob: data.paintedImageBlob,
                        thumbnailBlob: thumbnailBlob,
                        metadata: data.metadata,
                        savedAt: Date.now()
                    };
                    
                    const putRequest = store.put(designData);
                    putRequest.onsuccess = () => resolve(designId);
                    putRequest.onerror = () => reject(putRequest.error);
                }).catch(reject);
            };
        });
    }

    async loadFromIndexedDB(designId) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaCache', 1);
            
            request.onerror = () => reject(request.error);
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['designs'], 'readonly');
                const store = transaction.objectStore('designs');
                
                const getRequest = store.get(designId);
                getRequest.onsuccess = () => {
                    const result = getRequest.result;
                    if (result) {
                        resolve(result);
                    } else {
                        reject(new Error('Design not found'));
                    }
                };
                getRequest.onerror = () => reject(getRequest.error);
            };
        });
    }

    async getAllFromIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaCache', 1);
            
            request.onerror = () => reject(request.error);
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['designs'], 'readonly');
                const store = transaction.objectStore('designs');
                
                const getAllRequest = store.getAll();
                getAllRequest.onsuccess = () => {
                    const results = getAllRequest.result || [];
                    // Sort by savedAt timestamp, newest first
                    results.sort((a, b) => b.savedAt - a.savedAt);
                    resolve(results);
                };
                getAllRequest.onerror = () => reject(getAllRequest.error);
            };
        });
    }

    async deleteFromIndexedDB(designId) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaCache', 1);
            
            request.onerror = () => reject(request.error);
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['designs'], 'readwrite');
                const store = transaction.objectStore('designs');
                
                const deleteRequest = store.delete(designId);
                deleteRequest.onsuccess = () => resolve();
                deleteRequest.onerror = () => reject(deleteRequest.error);
            };
        });
    }

    // Utility functions
    dataURLToBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    async blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    async createThumbnail(imageBlob, maxSize = 150) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculate thumbnail dimensions
                const ratio = Math.min(maxSize / img.width, maxSize / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                
                // Draw thumbnail
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(resolve, 'image/png', 0.8);
            };
            
            img.onerror = reject;
            img.src = URL.createObjectURL(imageBlob);
        });
    }

    // Undo/Redo system using IndexedDB
    async saveUndoState(canvasData, sessionId = 'current') {
        try {
            const undoData = await this.getUndoData(sessionId);
            
            // Remove future states if we're not at the end
            if (undoData.currentIndex < undoData.states.length - 1) {
                undoData.states = undoData.states.slice(0, undoData.currentIndex + 1);
            }

            // Add new state
            undoData.states.push({
                data: canvasData,
                timestamp: Date.now()
            });

            // Limit number of undo states
            if (undoData.states.length > this.maxUndoStates) {
                undoData.states.shift();
            } else {
                undoData.currentIndex++;
            }

            undoData.currentIndex = undoData.states.length - 1;
            
            await this.saveUndoData(sessionId, undoData);
            return true;
            
        } catch (error) {
            console.error('❌ FILE CACHE: Failed to save undo state:', error);
            return false;
        }
    }

    async undo(sessionId = 'current') {
        try {
            const undoData = await this.getUndoData(sessionId);
            
            if (undoData.currentIndex > 0) {
                undoData.currentIndex--;
                await this.saveUndoData(sessionId, undoData);
                return undoData.states[undoData.currentIndex].data;
            }
            
            return null;
        } catch (error) {
            console.error('❌ FILE CACHE: Undo failed:', error);
            return null;
        }
    }

    async redo(sessionId = 'current') {
        try {
            const undoData = await this.getUndoData(sessionId);
            
            if (undoData.currentIndex < undoData.states.length - 1) {
                undoData.currentIndex++;
                await this.saveUndoData(sessionId, undoData);
                return undoData.states[undoData.currentIndex].data;
            }
            
            return null;
        } catch (error) {
            console.error('❌ FILE CACHE: Redo failed:', error);
            return null;
        }
    }

    async canUndo(sessionId = 'current') {
        const undoData = await this.getUndoData(sessionId);
        return undoData.currentIndex > 0;
    }

    async canRedo(sessionId = 'current') {
        const undoData = await this.getUndoData(sessionId);
        return undoData.currentIndex < undoData.states.length - 1;
    }

    async clearUndoHistory(sessionId = 'current') {
        const undoData = { states: [], currentIndex: -1, lastUpdated: Date.now() };
        await this.saveUndoData(sessionId, undoData);
    }

    async getUndoData(sessionId) {
        try {
            const data = await this.loadFromIndexedDB('undo_' + sessionId);
            return data ? data.undoData : { states: [], currentIndex: -1, lastUpdated: Date.now() };
        } catch (error) {
            return { states: [], currentIndex: -1, lastUpdated: Date.now() };
        }
    }

    async saveUndoData(sessionId, undoData) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaCache', 1);
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['designs'], 'readwrite');
                const store = transaction.objectStore('designs');
                
                const data = {
                    id: 'undo_' + sessionId,
                    undoData: undoData,
                    savedAt: Date.now()
                };
                
                const putRequest = store.put(data);
                putRequest.onsuccess = () => resolve();
                putRequest.onerror = () => reject(putRequest.error);
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    // Get cache statistics
    async getCacheStats() {
        try {
            const designs = await this.getAllFromIndexedDB();
            return {
                totalDesigns: designs.length,
                storageType: 'IndexedDB',
                lastUpdated: designs.length > 0 ? new Date(Math.max(...designs.map(d => d.savedAt))) : null
            };
        } catch (error) {
            return { totalDesigns: 0, storageType: 'IndexedDB', error: error.message };
        }
    }
}

// Export for use in HTML
window.FileCacheManager = FileCacheManager;