/**
 * Design Data Manager for Mandala Painting App
 * Handles saving and loading of design data with color mapping
 */

class DesignDataManager {
    constructor() {
        this.designsFolder = './my-designs';
        this.currentDesign = null;
        this.colorMap = new Map(); // regionId -> color mapping
        this.regionCounter = 0;
        this.filenameRegistry = new Map(); // Cache for efficient filename checking
    }

    // Clear all designs from IndexedDB
    async clearAllDesigns() {
        try {
            console.log('🗑️ DESIGN MANAGER: Clearing all designs from IndexedDB...');

            // Open IndexedDB and clear the designs store
            const request = indexedDB.open('MandalaDesigns', 1);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const transaction = db.transaction(['designs'], 'readwrite');
                    const store = transaction.objectStore('designs');

                    const clearRequest = store.clear();

                    clearRequest.onsuccess = () => {
                        console.log('✅ DESIGN MANAGER: All designs cleared from IndexedDB');
                        resolve();
                    };

                    clearRequest.onerror = () => {
                        console.error('❌ DESIGN MANAGER: Failed to clear designs from IndexedDB');
                        reject(clearRequest.error);
                    };
                };

                request.onerror = () => {
                    console.error('❌ DESIGN MANAGER: Failed to open IndexedDB for clearing');
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error('❌ DESIGN MANAGER: Error clearing designs:', error);
            throw error;
        }
    }

    // Build and refresh the filename registry for efficient duplicate checking
    async buildFilenameRegistry() {
        try {
            console.log('🗂️ REGISTRY: Building filename registry...');
            this.filenameRegistry.clear();

            const designs = await this.getAllFromIndexedDB();
            console.log('🗂️ REGISTRY: Processing', designs.length, 'designs');

            designs.forEach(design => {
                const filenames = [
                    design.metadata?.customFileName,
                    design.metadata?.name,
                    design.name,
                    design.metadata?.originalTemplateName
                ].filter(name => name && name.trim() !== '');

                filenames.forEach(filename => {
                    if (!this.filenameRegistry.has(filename.toLowerCase())) {
                        this.filenameRegistry.set(filename.toLowerCase(), []);
                    }
                    this.filenameRegistry.get(filename.toLowerCase()).push({
                        designId: design.id,
                        actualName: filename,
                        designData: design
                    });
                });
            });

            console.log('✅ REGISTRY: Built registry with', this.filenameRegistry.size, 'unique filenames');
            return this.filenameRegistry.size;
        } catch (error) {
            console.error('❌ REGISTRY: Failed to build filename registry:', error);
            return 0;
        }
    }

    // Fast filename check using registry
    async checkNameExistsInRegistry(designName) {
        try {
            // Ensure registry is built
            if (this.filenameRegistry.size === 0) {
                await this.buildFilenameRegistry();
            }

            const lowerCaseName = designName.toLowerCase();
            const matches = this.filenameRegistry.get(lowerCaseName) || [];

            if (matches.length > 0) {
                console.log('⚠️ REGISTRY CHECK: Found', matches.length, 'matches for:', designName);
                return {
                    exists: true,
                    existingDesign: matches[0].designData,
                    allMatches: matches
                };
            } else {
                console.log('✅ REGISTRY CHECK: Name is available:', designName);
                return {
                    exists: false,
                    existingDesign: null,
                    allMatches: []
                };
            }
        } catch (error) {
            console.error('❌ REGISTRY CHECK: Error:', error);
            // Fallback to normal check
            return await this.checkNameExists(designName);
        }
    }

    // Update registry when a design is saved or deleted
    updateFilenameRegistry(action, designData) {
        try {
            if (action === 'add' && designData) {
                console.log('🗂️ REGISTRY: Adding design to registry:', designData.id);
                const filenames = [
                    designData.metadata?.customFileName,
                    designData.metadata?.name,
                    designData.name,
                    designData.metadata?.originalTemplateName
                ].filter(name => name && name.trim() !== '');

                filenames.forEach(filename => {
                    const lowerCaseName = filename.toLowerCase();
                    if (!this.filenameRegistry.has(lowerCaseName)) {
                        this.filenameRegistry.set(lowerCaseName, []);
                    }
                    // Remove any existing entries for this design first
                    const existing = this.filenameRegistry.get(lowerCaseName);
                    const filtered = existing.filter(entry => entry.designId !== designData.id);
                    filtered.push({
                        designId: designData.id,
                        actualName: filename,
                        designData: designData
                    });
                    this.filenameRegistry.set(lowerCaseName, filtered);
                });
            } else if (action === 'remove' && designData) {
                console.log('🗂️ REGISTRY: Removing design from registry:', designData.id);
                // Remove all entries for this design ID
                for (const [filename, entries] of this.filenameRegistry.entries()) {
                    const filtered = entries.filter(entry => entry.designId !== designData.id);
                    if (filtered.length === 0) {
                        this.filenameRegistry.delete(filename);
                    } else {
                        this.filenameRegistry.set(filename, filtered);
                    }
                }
            }
        } catch (error) {
            console.error('❌ REGISTRY: Failed to update registry:', error);
        }
    }

    // Test filename checking system
    async testFilenameChecking() {
        try {
            console.log('🧪 TESTING: Filename checking system...');

            // Build registry
            await this.buildFilenameRegistry();

            // Get all designs
            const designs = await this.getAllDesigns();
            console.log('🧪 TESTING: Found', designs.length, 'existing designs');

            if (designs.length > 0) {
                // Test with existing name
                const testName = designs[0].customFileName || designs[0].name;
                console.log('🧪 TESTING: Testing with existing name:', testName);

                const registryCheck = await this.checkNameExistsInRegistry(testName);
                const normalCheck = await this.checkNameExists(testName);

                console.log('🧪 TESTING: Registry check result:', registryCheck.exists);
                console.log('🧪 TESTING: Normal check result:', normalCheck.exists);

                // Test with new name
                const newName = 'test_unique_name_' + Date.now();
                console.log('🧪 TESTING: Testing with new name:', newName);

                const registryCheckNew = await this.checkNameExistsInRegistry(newName);
                const normalCheckNew = await this.checkNameExists(newName);

                console.log('🧪 TESTING: Registry check (new):', registryCheckNew.exists);
                console.log('🧪 TESTING: Normal check (new):', normalCheckNew.exists);

                return {
                    existingNameTest: registryCheck.exists === normalCheck.exists,
                    newNameTest: registryCheckNew.exists === normalCheckNew.exists,
                    registrySize: this.filenameRegistry.size
                };
            } else {
                console.log('🧪 TESTING: No designs found for testing');
                return { message: 'No designs to test with' };
            }
        } catch (error) {
            console.error('❌ TESTING: Error testing filename checking:', error);
            return { error: error.message };
        }
    }

    // Check if a design name already exists
    async checkNameExists(designName) {
        try {
            console.log('🔍 NAME CHECK: Checking if design name exists:', designName);

            const designs = await this.getAllDesigns();
            console.log('🔍 NAME CHECK: Retrieved', designs.length, 'designs for comparison');

            // Create a comprehensive list of all existing filenames for debugging
            const existingNames = designs.map(design => ({
                id: design.id,
                name: design.name,
                customFileName: design.customFileName,
                originalTemplateName: design.originalTemplateName
            }));
            console.log('📋 NAME CHECK: Existing design names:', existingNames);

            const existingDesign = designs.find(design => {
                const matches = [
                    design.customFileName === designName,
                    design.name === designName,
                    design.metadata?.customFileName === designName,
                    design.metadata?.name === designName,
                    design.originalTemplateName === designName
                ];

                const hasMatch = matches.some(match => match);
                if (hasMatch) {
                    console.log('🎯 NAME CHECK: Match found for design:', design.id, 'with fields:', {
                        customFileName: design.customFileName,
                        name: design.name,
                        'metadata.customFileName': design.metadata?.customFileName,
                        'metadata.name': design.metadata?.name
                    });
                }
                return hasMatch;
            });

            if (existingDesign) {
                console.log('⚠️ NAME CHECK: Found existing design with same name:', existingDesign.id);
                return {
                    exists: true,
                    existingDesign: existingDesign
                };
            } else {
                console.log('✅ NAME CHECK: Name is available');
                return {
                    exists: false,
                    existingDesign: null
                };
            }
        } catch (error) {
            console.error('❌ NAME CHECK: Error checking name:', error);
            return {
                exists: false,
                existingDesign: null
            };
        }
    }

    // Create a design data structure with enhanced region-based color mapping
    createDesignData(templateData, canvasData, paintedRegions, templateManagerData, accurateDisplayImage, customFileName, saveAction, currentLoadedDesign) {
        try {
            console.log('📦 DESIGN: Creating design data with:', {
                templateData: templateData ? 'exists' : 'null',
                canvasData: canvasData ? 'exists' : 'null',
                paintedRegions: paintedRegions ? paintedRegions.length : 'null/undefined',
                templateManagerData: templateManagerData ? 'exists' : 'null',
                accurateDisplayImage: accurateDisplayImage ? 'exists' : 'null',
                customFileName: customFileName || 'not provided',
                saveAction: saveAction || 'new',
                isUpdate: saveAction === 'update'
            });

            let designId;
            let versionInfo = {};

            if (saveAction === 'update' && currentLoadedDesign) {
                // UPDATE MODE: Preserve original design ID but update version
                designId = currentLoadedDesign.id;
                const originalData = currentLoadedDesign.originalDesignData;

                versionInfo = {
                    isUpdate: true,
                    originalId: designId,
                    previousVersion: originalData.metadata?.version || '1.0',
                    updatedAt: new Date().toISOString(),
                    updateCount: (originalData.metadata?.updateCount || 0) + 1
                };

                console.log('🔄 UPDATE MODE: Preserving design ID and adding version info:', designId, versionInfo);
            } else {
                // NEW SAVE MODE: Create new design ID
                const sanitizedFileName = customFileName ? customFileName.replace(/[^a-zA-Z0-9_-]/g, '_') : 'unnamed_design';
                designId = `${sanitizedFileName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

                versionInfo = {
                    isUpdate: false,
                    version: '1.0',
                    createdAt: new Date().toISOString(),
                    updateCount: 0
                };

                console.log('🆕 NEW SAVE MODE: Creating new design ID:', designId);
            }

            // Process painted regions to create comprehensive region mapping
            const regionMappings = new Map();
            const colorRegions = [];

            if (paintedRegions && Array.isArray(paintedRegions) && paintedRegions.length > 0) {
                console.log('📦 DESIGN: Processing', paintedRegions.length, 'painted regions');

                paintedRegions.forEach((region, index) => {
                    try {
                        if (!region) {
                            console.warn('⚠️ DESIGN: Skipping null region at index', index);
                            return;
                        }

                        const regionId = region.regionId || ('fallback_region_' + index);
                        const regionColor = region.color || '#000000';
                        const regionCoords = region.coordinates || { x: 0, y: 0 };
                        const regionPoints = region.regionPoints || [];
                        const regionTimestamp = region.timestamp || Date.now();

                        regionMappings.set(regionId, {
                            color: regionColor,
                            coordinates: regionCoords,
                            timestamp: regionTimestamp,
                            points: regionPoints
                        });

                        colorRegions.push({
                            regionId: regionId,
                            color: regionColor,
                            centerPoint: regionCoords,
                            pointCount: Array.isArray(regionPoints) ? regionPoints.length : 0,
                            timestamp: regionTimestamp
                        });

                        console.log('✅ DESIGN: Processed region:', regionId);

                    } catch (regionError) {
                        console.error('❌ DESIGN: Error processing region at index', index, ':', regionError);
                    }
                });
            } else {
                console.log('📦 DESIGN: No painted regions to process');
            }

        const designData = {
            id: designId,
            metadata: {
                name: customFileName || templateData.name || 'Untitled Design', // Use custom file name as primary name
                originalTemplateName: templateData.name, // Keep original template name for reference
                customFileName: customFileName, // Store custom file name separately
                createdAt: versionInfo.isUpdate ? (currentLoadedDesign.originalDesignData.metadata?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: versionInfo.isUpdate ? versionInfo.updatedAt : undefined,
                templateId: templateData.id,
                version: '2.0', // Enhanced version with region mapping
                updateCount: versionInfo.updateCount,
                isUpdate: versionInfo.isUpdate,
                coloredRegionCount: colorRegions.length,
                totalRegionsAvailable: this.countAvailableRegions(templateData.boundaryMap),
                // VERSION TRACKING
                versionHistory: versionInfo
            },
            template: {
                id: templateData.id,
                name: templateData.name,
                originalImage: templateData.originalImage,
                processedImage: templateData.processedImage,
                boundaryMap: templateData.boundaryMap,
                width: canvasData.width,
                height: canvasData.height
            },
            colorMapping: {
                version: '2.0',
                regions: colorRegions,
                regionData: Array.from(regionMappings.entries()).map(([regionId, data]) => ({
                    regionId,
                    color: data.color,
                    centerPoint: data.coordinates,
                    timestamp: data.timestamp,
                    pointCount: (data.points && Array.isArray(data.points)) ? data.points.length : 0
                })),
                colorPalette: this.extractColorPalette(colorRegions),
                statistics: {
                    totalColoredRegions: colorRegions.length,
                    uniqueColors: new Set(colorRegions.map(r => r.color).filter(c => c)).size,
                    lastModified: new Date().toISOString()
                }
            },
            // Enhanced template manager data for complete region mapping
            templateManagerData: templateManagerData ? {
                template: templateManagerData.template,
                colorSchema: templateManagerData.colorSchema,
                regionMapping: templateManagerData.regionMapping,
                exportedAt: templateManagerData.exportedAt
            } : null,
            // Store accurate display image for later use in save process
            accurateDisplayImage: accurateDisplayImage || null,
            canvasData: {
                paintedImageURL: canvasData.toDataURL('image/png'),
                originalTemplateURL: templateData.processedImage,
                width: canvasData.width,
                height: canvasData.height
            },
            // Store original template separately for reconstruction
            originalTemplate: {
                image: templateData.originalImage,
                boundaries: templateData.boundaryMap
            }
        };

            console.log('📦 DESIGN: Created enhanced design data:', {
                id: designId,
                regions: colorRegions.length,
                colors: designData.colorMapping.statistics.uniqueColors
            });

            return designData;

        } catch (error) {
            console.error('❌ DESIGN: Error in createDesignData:', error);
            console.error('❌ DESIGN: Stack trace:', error.stack);

            // Return a minimal safe design data structure
            const safeDesignId = 'safe_design_' + Date.now();
            return {
                id: safeDesignId,
                metadata: {
                    name: (templateData && templateData.name) || 'Safe Design',
                    createdAt: new Date().toISOString(),
                    templateId: (templateData && templateData.id) || safeDesignId,
                    version: '2.0-safe',
                    coloredRegionCount: 0,
                    totalRegionsAvailable: 10
                },
                template: {
                    id: (templateData && templateData.id) || safeDesignId,
                    name: (templateData && templateData.name) || 'Safe Template',
                    originalImage: (templateData && templateData.originalImage) || '',
                    processedImage: (templateData && templateData.processedImage) || '',
                    boundaryMap: null,
                    width: (canvasData && canvasData.width) || 500,
                    height: (canvasData && canvasData.height) || 500
                },
                colorMapping: {
                    version: '2.0',
                    regions: [],
                    regionData: [],
                    colorPalette: [],
                    statistics: {
                        totalColoredRegions: 0,
                        uniqueColors: 0,
                        lastModified: new Date().toISOString()
                    }
                },
                canvasData: {
                    paintedImageURL: (canvasData && canvasData.toDataURL) ? canvasData.toDataURL('image/png') : '',
                    originalTemplateURL: (templateData && templateData.processedImage) || '',
                    width: (canvasData && canvasData.width) || 500,
                    height: (canvasData && canvasData.height) || 500
                },
                originalTemplate: {
                    image: (templateData && templateData.originalImage) || '',
                    boundaries: null
                }
            };
        }
    }

    // Count available regions in boundary map
    countAvailableRegions(boundaryMap) {
        if (!boundaryMap || !Array.isArray(boundaryMap) || boundaryMap.length === 0) {
            console.warn('⚠️ DESIGN: No boundary map available, returning default region count');
            return 10; // Default estimate for templates without boundary maps
        }

        try {
            // This is a simplified count - in a real implementation you'd do flood-fill
            // to count distinct regions
            const height = boundaryMap.length;
            const width = boundaryMap[0]?.length || 0;

            if (width === 0) {
                console.warn('⚠️ DESIGN: Invalid boundary map structure');
                return 10;
            }

            let fillablePixels = 0;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (boundaryMap[y] && boundaryMap[y][x] === 0) {
                        fillablePixels++;
                    }
                }
            }

            // Rough estimate: assume average region size of 100 pixels
            const estimatedRegions = Math.max(1, Math.floor(fillablePixels / 100));
            console.log('🗺️ DESIGN: Estimated available regions:', estimatedRegions, 'from', fillablePixels, 'fillable pixels');
            return estimatedRegions;

        } catch (error) {
            console.error('❌ DESIGN: Error counting available regions:', error);
            return 10; // Safe fallback
        }
    }

    // Extract color palette from regions
    extractColorPalette(regions) {
        if (!regions || !Array.isArray(regions) || regions.length === 0) {
            return [];
        }

        try {
            const colorSet = new Set(regions.map(r => r.color).filter(c => c)); // Filter out null/undefined colors
            return Array.from(colorSet).map(color => {
                const colorRegions = regions.filter(r => r.color === color);
                return {
                    color,
                    usage: colorRegions.length,
                    firstUsed: colorRegions.length > 0 ? Math.min(...colorRegions.map(r => r.timestamp || Date.now())) : Date.now()
                };
            });
        } catch (error) {
            console.error('❌ DESIGN: Error extracting color palette:', error);
            return [];
        }
    }

    // Save design to file system (browser compatible)
    async saveDesign(designData) {
        try {
            console.log('💾 DESIGN: Starting enhanced save process...');
            console.log('🔍 SAVE STEP A: Received design data:', {
                hasDesignData: !!designData,
                hasMetadata: !!designData?.metadata,
                hasColorMapping: !!designData?.colorMapping,
                hasTemplate: !!designData?.template
            });

            // Check if we need to replace an existing design with the same name using registry
            const nameCheck = await this.checkNameExistsInRegistry(designData.metadata.customFileName || designData.metadata.name);
            if (nameCheck.exists && nameCheck.existingDesign.id !== designData.id) {
                console.log('🔄 REPLACING: Deleting existing design before saving replacement:', nameCheck.existingDesign.id);
                await this.deleteDesign(nameCheck.existingDesign.id);
            }

            console.log('🔍 SAVE STEP B: Creating filename...');
            // Create filename with better formatting
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').substring(0, 19);
            const baseFilename = `${designData.metadata.name.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}`;
            console.log('✅ SAVE STEP B: Filename created:', baseFilename);

            console.log('🔍 SAVE STEP C: Using display image...');
            // Use accurate display image if it was stored in designData, otherwise generate legacy reconstruction
            let reconstructedTemplate = null;
            if (designData.accurateDisplayImage && typeof designData.accurateDisplayImage === 'string') {
                console.log('✅ SAVE STEP C: Using accurate TemplateManager display image from designData');
                reconstructedTemplate = designData.accurateDisplayImage;
            } else {
                // Fallback to legacy reconstruction
                try {
                    reconstructedTemplate = await this.reconstructColoredTemplate(designData);
                    console.log('✅ SAVE STEP C: Legacy template reconstruction successful');
                } catch (error) {
                    console.warn('⚠️ DESIGN: Failed to reconstruct template, using painted canvas:', error);
                    reconstructedTemplate = designData.canvasData.paintedImageURL;
                    console.log('✅ SAVE STEP C: Using fallback painted image');
                }
            }

            console.log('🔍 SAVE STEP D: Creating file structure...');
            // Enhanced file structure for my-designs folder
            const designFiles = {
                // Main design metadata and mapping
                [`${baseFilename}.json`]: JSON.stringify({
                    ...designData,
                    reconstructedTemplate // Include for easy loading
                }, null, 2),

                // Original template for reference
                [`${baseFilename}_original.png`]: designData.template.processedImage,

                // Painted/colored version
                [`${baseFilename}_painted.png`]: designData.canvasData.paintedImageURL,

                // Reconstructed template from regions (for My Designs display)
                [`${baseFilename}_display.png`]: reconstructedTemplate || designData.canvasData.paintedImageURL,

                // Region mapping data (for developers/debugging)
                [`${baseFilename}_regions.json`]: JSON.stringify({
                    designId: designData.id,
                    templateInfo: {
                        id: designData.template.id,
                        name: designData.template.name,
                        dimensions: {
                            width: designData.template.width,
                            height: designData.template.height
                        }
                    },
                    colorMapping: designData.colorMapping,
                    statistics: {
                        totalRegions: (designData.colorMapping.regions && Array.isArray(designData.colorMapping.regions)) ?
                            designData.colorMapping.regions.length : 0,
                        uniqueColors: designData.colorMapping.statistics?.uniqueColors || 0,
                        completionPercent: (designData.metadata.totalRegionsAvailable > 0 && designData.colorMapping.regions) ?
                            Math.round((designData.colorMapping.regions.length / designData.metadata.totalRegionsAvailable) * 100) : 0
                    }
                }, null, 2)
            };

            // Save to IndexedDB for immediate access
            const dataToSave = {
                ...designData,
                files: designFiles,
                displayImage: reconstructedTemplate || designData.canvasData.paintedImageURL
            };
            
            // Validate data size before saving
            const dataSize = this.estimateDataSize(dataToSave);
            console.log('📊 DESIGN: Estimated data size:', this.formatBytes(dataSize));
            
            if (dataSize > 100 * 1024 * 1024) { // 100MB limit
                console.warn('⚠️ DESIGN: Data size is very large, attempting to compress...');
                // Remove some non-essential data to reduce size
                delete dataToSave.files;
                console.log('📊 DESIGN: Compressed data size:', this.formatBytes(this.estimateDataSize(dataToSave)));
            }
            
            // Initialize database first to ensure object store exists
            await this.initializeIndexedDB();
            
            // Now save the data
            await this.saveToIndexedDB(designData.id, dataToSave);

            // Update filename registry with the new design
            this.updateFilenameRegistry('add', dataToSave);

            // NOTE: Downloads removed - only saving to IndexedDB for My Designs section
            console.log('💾 DESIGN: Saved to IndexedDB only (no downloads triggered)');

            console.log('✅ DESIGN: Enhanced design saved successfully:', {
                id: designData.id,
                name: designData.metadata.name,
                customFileName: designData.metadata.customFileName,
                regions: (designData.colorMapping.regions && Array.isArray(designData.colorMapping.regions)) ?
                    designData.colorMapping.regions.length : 0,
                files: Object.keys(designFiles).length
            });

            return designData.id;

        } catch (error) {
            console.error('❌ DESIGN: Failed to save design:', error);
            throw error;
        }
    }

    // Load design from storage
    async loadDesign(designId) {
        try {
            // Initialize database first
            await this.initializeIndexedDB();
            const designData = await this.loadFromIndexedDB(designId);
            if (!designData) {
                throw new Error('Design not found');
            }

            // Restore color mapping
            this.colorMap.clear();
            if (designData.colorMapping && designData.colorMapping.colors) {
                designData.colorMapping.colors.forEach(({ regionId, color }) => {
                    this.colorMap.set(regionId, color);
                });
            }

            this.currentDesign = designData;
            console.log('✅ DESIGN: Design loaded successfully:', designId);
            return designData;
            
        } catch (error) {
            console.error('❌ DESIGN: Failed to load design:', error);
            throw error;
        }
    }

    // Get all saved designs
    async getAllDesigns() {
        try {
            console.log('🔍 DESIGN: Getting all designs from IndexedDB...');
            // Initialize database first
            await this.initializeIndexedDB();
            const designs = await this.getAllFromIndexedDB();
            console.log('📋 DESIGN: Raw designs from IndexedDB:', designs.length);

            // Process designs and create thumbnails asynchronously
            const processedDesigns = await Promise.all(designs.map(async (design) => {
                let thumbnail = null;

                try {
                    // Try to get thumbnail from saved data first
                    if (design.displayImage) {
                        thumbnail = design.displayImage;
                    } else if (design.canvasData?.paintedImageURL) {
                        thumbnail = await this.createThumbnailFromCanvas(design.canvasData.paintedImageURL);
                    } else if (design.canvasData?.imageDataURL) {
                        thumbnail = await this.createThumbnailFromCanvas(design.canvasData.imageDataURL);
                    }
                } catch (thumbError) {
                    console.warn('⚠️ DESIGN: Failed to create thumbnail for design:', design.id, thumbError);
                    thumbnail = design.canvasData?.paintedImageURL || design.canvasData?.imageDataURL || null;
                }

                return {
                    id: design.id,
                    name: design.metadata?.name || 'Untitled',
                    customFileName: design.metadata?.customFileName || design.metadata?.name || 'Untitled',
                    originalTemplateName: design.metadata?.originalTemplateName,
                    createdAt: design.metadata?.createdAt,
                    thumbnail: thumbnail,
                    colorCount: design.colorMapping?.regions?.length || 0,
                    metadata: design.metadata // Include full metadata for filename checking
                };
            }));

            console.log('✅ DESIGN: Processed designs with thumbnails:', processedDesigns.length);
            return processedDesigns;

        } catch (error) {
            console.error('❌ DESIGN: Failed to get all designs:', error);
            return [];
        }
    }

    // Delete design
    async deleteDesign(designId) {
        try {
            // Get design data first for registry cleanup
            let designData = null;
            try {
                designData = await this.loadFromIndexedDB(designId);
            } catch (loadError) {
                console.warn('⚠️ DESIGN: Could not load design for registry cleanup:', loadError);
            }

            // Initialize database first
            await this.initializeIndexedDB();
            await this.deleteFromIndexedDB(designId);

            // Update filename registry by removing the deleted design
            if (designData) {
                this.updateFilenameRegistry('remove', designData);
            }

            console.log('🗑️ DESIGN: Design deleted and registry updated:', designId);
            return true;
        } catch (error) {
            console.error('❌ DESIGN: Failed to delete design:', error);
            return false;
        }
    }

    // Record a painted region for color mapping
    recordPaintedRegion(x, y, color, boundaryData) {
        const regionId = this.generateRegionId(x, y, boundaryData);
        this.colorMap.set(regionId, color);

        console.log('🎨 REGION: Recording painted region:', { regionId, x, y, color });

        return {
            regionId,
            coordinates: { x, y },
            color,
            timestamp: Date.now(),
            regionPoints: this.getBoundaryEnclosedArea(x, y, boundaryData)
        };
    }

    // Generate unique region ID based on boundary-enclosed area
    generateRegionId(x, y, boundaryData) {
        // Use flood-fill to identify the unique region and create a stable hash
        const regionPoints = this.getBoundaryEnclosedArea(x, y, boundaryData);
        const regionHash = this.hashRegionPoints(regionPoints);
        return `region_${regionHash}`;
    }

    // Create a stable hash for region points
    hashRegionPoints(points) {
        // Sort points to ensure consistent hashing regardless of fill order
        const sortedPoints = points.sort((a, b) => a.x - b.x || a.y - b.y);

        let hash = 0;
        for (let i = 0; i < Math.min(sortedPoints.length, 50); i++) { // Use first 50 points for efficiency
            const point = sortedPoints[i];
            hash = ((hash << 5) - hash + point.x + point.y * 1000) & 0xffffffff;
        }

        // Include region size in hash for uniqueness
        hash = ((hash << 5) - hash + sortedPoints.length) & 0xffffffff;

        return Math.abs(hash).toString(36);
    }

    // Reconstruct colored template from region mappings
    async reconstructColoredTemplate(designData) {
        console.log('🔍 RECONSTRUCT STEP 1: Checking required data...');

        if (!designData.originalTemplate || !designData.colorMapping) {
            console.warn('⚠️ DESIGN: Cannot reconstruct - missing template or mapping data');
            return null;
        }

        console.log('🔍 RECONSTRUCT STEP 2: Starting reconstruction...', {
            hasRegions: !!designData.colorMapping.regions,
            regionsCount: designData.colorMapping.regions ? designData.colorMapping.regions.length : 0
        });

        // Create canvas to reconstruct the design
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = designData.template.width;
        canvas.height = designData.template.height;

        // Load and draw the original template
        const templateImg = new Image();

        return new Promise((resolve, reject) => {
            templateImg.onload = () => {
                // Draw the base template
                ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

                // Apply color mappings region by region
                const boundaryMap = designData.originalTemplate.boundaries;

                if (designData.colorMapping.regions && designData.colorMapping.regions.length > 0) {
                    designData.colorMapping.regions.forEach(region => {
                        this.paintRegionOnCanvas(ctx, region, boundaryMap);
                    });
                }

                console.log('✅ DESIGN: Template reconstruction complete');
                resolve(canvas.toDataURL('image/png'));
            };

            templateImg.onerror = () => {
                console.error('❌ DESIGN: Failed to load template image');
                reject(new Error('Failed to load template image'));
            };

            templateImg.src = designData.template.processedImage;
        });
    }

    // Paint a specific region on canvas using stored region data
    paintRegionOnCanvas(ctx, regionData, boundaryMap) {
        if (!regionData.centerPoint) return;

        const { x, y } = regionData.centerPoint;
        const color = regionData.color;

        // Use flood fill to paint the region
        this.floodFillCanvas(ctx, Math.floor(x), Math.floor(y), color, boundaryMap);
    }

    // Canvas flood fill implementation
    floodFillCanvas(ctx, startX, startY, fillColor, boundaryMap) {
        const canvas = ctx.canvas;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert fill color to RGB
        const fillRGB = this.hexToRgb(fillColor);
        if (!fillRGB) return;

        // Get original pixel color
        const pixelIndex = (startY * canvas.width + startX) * 4;
        const originalR = data[pixelIndex];
        const originalG = data[pixelIndex + 1];
        const originalB = data[pixelIndex + 2];

        // Don't fill if already the target color
        if (originalR === fillRGB.r && originalG === fillRGB.g && originalB === fillRGB.b) {
            return;
        }

        const stack = [{ x: startX, y: startY }];
        const visited = new Set();

        while (stack.length > 0) {
            const { x, y } = stack.pop();

            if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

            const key = `${x},${y}`;
            if (visited.has(key)) continue;

            // Check boundary map if available
            if (boundaryMap && boundaryMap[y] && boundaryMap[y][x] === 1) continue;

            const index = (y * canvas.width + x) * 4;

            // Check if pixel matches original color
            if (data[index] !== originalR || data[index + 1] !== originalG || data[index + 2] !== originalB) {
                continue;
            }

            visited.add(key);

            // Set new color
            data[index] = fillRGB.r;
            data[index + 1] = fillRGB.g;
            data[index + 2] = fillRGB.b;
            data[index + 3] = 255; // Alpha

            // Add neighbors
            stack.push({ x: x + 1, y });
            stack.push({ x: x - 1, y });
            stack.push({ x, y: y + 1 });
            stack.push({ x, y: y - 1 });

            // Prevent infinite loops
            if (visited.size > 50000) {
                console.warn('⚠️ DESIGN: Large region flood fill truncated');
                break;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // Convert hex color to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Get all points within a boundary-enclosed area using flood-fill algorithm
    getBoundaryEnclosedArea(startX, startY, boundaryData) {
        if (!boundaryData || !Array.isArray(boundaryData) || boundaryData.length === 0) {
            console.warn('⚠️ REGION: No boundary data available, returning single point');
            return [{ x: Math.floor(startX), y: Math.floor(startY) }];
        }

        try {
            const visited = new Set();
            const regionPoints = [];
            const stack = [{ x: Math.floor(startX), y: Math.floor(startY) }];
            const height = boundaryData.length;
            const width = boundaryData[0]?.length || 0;

            if (width === 0) {
                console.warn('⚠️ REGION: Invalid boundary data structure');
                return [{ x: Math.floor(startX), y: Math.floor(startY) }];
            }

            while (stack.length > 0) {
                const { x, y } = stack.pop();

                // Check bounds
                if (x < 0 || x >= width || y < 0 || y >= height) continue;

                const key = `${x},${y}`;
                if (visited.has(key)) continue;

                // Check if this is a boundary pixel (assuming 0 = fillable, 1 = boundary)
                if (boundaryData[y] && boundaryData[y][x] === 1) continue;

                visited.add(key);
                regionPoints.push({ x, y });

                // Add neighboring pixels to stack (4-connectivity)
                stack.push({ x: x + 1, y });
                stack.push({ x: x - 1, y });
                stack.push({ x, y: y + 1 });
                stack.push({ x, y: y - 1 });

                // Allow large regions for proper background handling
                if (regionPoints.length > 500000) { // Much higher limit for background areas
                    console.warn('⚠️ REGION: Extremely large region detected, may be entire canvas');
                    break;
                }
            }

            console.log(`🗺️ REGION: Found ${regionPoints.length} points in region at (${startX}, ${startY})`);
            return regionPoints;

        } catch (error) {
            console.error('❌ REGION: Error during boundary flood-fill:', error);
            return [{ x: Math.floor(startX), y: Math.floor(startY) }];
        }
    }

    // Create thumbnail from canvas data URL
    createThumbnailFromCanvas(dataURL, maxSize = 150) {
        return new Promise((resolve) => {
            if (!dataURL) {
                resolve(null);
                return;
            }

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Calculate thumbnail size
                const ratio = Math.min(maxSize / img.width, maxSize / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                
                // Draw thumbnail
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png', 0.8));
            };
            img.onerror = () => resolve(null);
            img.src = dataURL;
        });
    }

    // Download design files (for my-designs folder)
    downloadDesignFiles(files) {
        console.log('📥 DESIGN: Preparing to download files for my-designs folder...');

        // Create a slight delay between downloads to prevent browser blocking
        let delay = 0;

        Object.entries(files).forEach(([filename, content]) => {
            setTimeout(() => {
                let blob;

                if (filename.endsWith('.json')) {
                    blob = new Blob([content], { type: 'application/json' });
                } else if (content.startsWith('data:image/')) {
                    // Handle data URLs
                    const response = fetch(content);
                    response.then(res => res.blob()).then(blobData => {
                        const url = URL.createObjectURL(blobData);
                        this.triggerDownload(url, filename);
                        URL.revokeObjectURL(url);
                    });
                    return; // Don't proceed with regular blob creation
                } else {
                    blob = new Blob([content], { type: 'text/plain' });
                }

                const url = URL.createObjectURL(blob);
                this.triggerDownload(url, filename);
                URL.revokeObjectURL(url);
            }, delay);

            delay += 200; // 200ms delay between each download
        });

        console.log('📁 DESIGN: All files prepared for download. Save them in your my-designs folder!');
    }

    // Helper to trigger file download
    triggerDownload(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    // Estimate data size for IndexedDB storage limits
    estimateDataSize(obj) {
        try {
            const jsonString = JSON.stringify(obj);
            // Rough estimate: each character is approximately 2 bytes in UTF-16
            return jsonString.length * 2;
        } catch (error) {
            console.warn('⚠️ DESIGN: Could not estimate data size:', error);
            return 0;
        }
    }
    
    // Format bytes for display
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Initialize IndexedDB with proper object store creation
    async initializeIndexedDB() {
        return new Promise((resolve, reject) => {
            console.log('🔧 INDEXEDDB: Initializing database...');
            
            // First, try to open the database to check if it exists and has the right structure
            const checkRequest = indexedDB.open('MandalaDesigns');
            
            checkRequest.onsuccess = (event) => {
                const db = event.target.result;
                const hasDesignsStore = db.objectStoreNames.contains('designs');
                db.close();
                
                if (hasDesignsStore) {
                    console.log('✅ INDEXEDDB: Database already properly initialized');
                    resolve();
                    return;
                }
                
                // If the object store doesn't exist, delete the database and recreate it
                console.log('🔧 INDEXEDDB: Object store missing, recreating database...');
                const deleteRequest = indexedDB.deleteDatabase('MandalaDesigns');
                
                deleteRequest.onsuccess = () => {
                    console.log('✅ INDEXEDDB: Old database deleted, creating new one...');
                    this.createFreshDatabase().then(resolve).catch(reject);
                };
                
                deleteRequest.onerror = (event) => {
                    console.error('❌ INDEXEDDB: Failed to delete old database:', event.target.error);
                    reject(new Error(`Failed to delete old database: ${event.target.error?.message}`));
                };
            };
            
            checkRequest.onerror = (event) => {
                console.log('🔧 INDEXEDDB: Database does not exist, creating new one...');
                this.createFreshDatabase().then(resolve).catch(reject);
            };
        });
    }
    
    // Create a fresh database with proper object stores
    async createFreshDatabase() {
        return new Promise((resolve, reject) => {
            console.log('🏗️ INDEXEDDB: Creating fresh database...');
            
            // Open with version 1 to ensure onupgradeneeded fires
            const request = indexedDB.open('MandalaDesigns', 1);
            
            request.onerror = (event) => {
                console.error('❌ INDEXEDDB: Failed to create fresh database:', event.target.error);
                reject(new Error(`Failed to create database: ${event.target.error?.message}`));
            };
            
            request.onupgradeneeded = (event) => {
                console.log('🔧 INDEXEDDB: Creating object stores...');
                const db = event.target.result;
                
                try {
                    if (!db.objectStoreNames.contains('designs')) {
                        const store = db.createObjectStore('designs', { keyPath: 'id' });
                        console.log('✅ INDEXEDDB: Created "designs" object store');
                    }
                } catch (error) {
                    console.error('❌ INDEXEDDB: Failed to create object stores:', error);
                    reject(new Error(`Failed to create object stores: ${error.message}`));
                }
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                console.log('✅ INDEXEDDB: Fresh database created successfully');
                db.close();
                resolve();
            };
        });
    }

    // IndexedDB operations
    async saveToIndexedDB(designId, designData) {
        return new Promise((resolve, reject) => {
            console.log('🔍 INDEXEDDB: Starting save operation for:', designId);
            
            const request = indexedDB.open('MandalaDesigns', 1);
            
            request.onerror = (event) => {
                console.error('❌ INDEXEDDB: Failed to open database:', event.target.error);
                reject(new Error(`IndexedDB open failed: ${event.target.error?.message || 'Unknown error'}`));
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                console.log('✅ INDEXEDDB: Database opened successfully');
                
                try {
                    // Check if object store exists before creating transaction
                    if (!db.objectStoreNames.contains('designs')) {
                        console.error('❌ INDEXEDDB: Object store "designs" does not exist');
                        db.close();
                        reject(new Error('Object store "designs" not found. Database may need to be recreated.'));
                        return;
                    }
                    
                    const transaction = db.transaction(['designs'], 'readwrite');
                    
                    transaction.onerror = (event) => {
                        console.error('❌ INDEXEDDB: Transaction failed:', event.target.error);
                        db.close();
                        reject(new Error(`Transaction failed: ${event.target.error?.message || 'Unknown transaction error'}`));
                    };
                    
                    transaction.onabort = (event) => {
                        console.error('❌ INDEXEDDB: Transaction aborted:', event.target.error);
                        db.close();
                        reject(new Error(`Transaction aborted: ${event.target.error?.message || 'Transaction was aborted'}`));
                    };
                    
                    const store = transaction.objectStore('designs');
                    const putRequest = store.put(designData);
                    
                    putRequest.onsuccess = () => {
                        console.log('✅ INDEXEDDB: Design saved successfully:', designId);
                        db.close();
                        resolve(designId);
                    };
                    
                    putRequest.onerror = (event) => {
                        console.error('❌ INDEXEDDB: Put operation failed:', event.target.error);
                        db.close();
                        reject(new Error(`Put operation failed: ${event.target.error?.message || 'Failed to save design'}`));
                    };
                    
                } catch (error) {
                    console.error('❌ INDEXEDDB: Error setting up transaction:', error);
                    db.close();
                    reject(new Error(`Transaction setup failed: ${error.message}`));
                }
            };
        });
    }

    async loadFromIndexedDB(designId) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaDesigns', 1);
            
            request.onerror = (event) => {
                console.error('❌ INDEXEDDB LOAD: Failed to open database:', event.target.error);
                reject(new Error(`IndexedDB open failed: ${event.target.error?.message || 'Unknown error'}`));
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                try {
                    const transaction = db.transaction(['designs'], 'readonly');
                    
                    transaction.onerror = (event) => {
                        console.error('❌ INDEXEDDB LOAD: Transaction failed:', event.target.error);
                        db.close();
                        reject(new Error(`Transaction failed: ${event.target.error?.message || 'Unknown transaction error'}`));
                    };
                    
                    const store = transaction.objectStore('designs');
                    const getRequest = store.get(designId);
                    
                    getRequest.onsuccess = () => {
                        db.close();
                        resolve(getRequest.result);
                    };
                    
                    getRequest.onerror = (event) => {
                        console.error('❌ INDEXEDDB LOAD: Get operation failed:', event.target.error);
                        db.close();
                        reject(new Error(`Get operation failed: ${event.target.error?.message || 'Failed to load design'}`));
                    };
                } catch (error) {
                    console.error('❌ INDEXEDDB LOAD: Error setting up transaction:', error);
                    db.close();
                    reject(new Error(`Transaction setup failed: ${error.message}`));
                }
            };
        });
    }

    async getAllFromIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaDesigns', 1);
            
            request.onerror = (event) => {
                console.error('❌ INDEXEDDB GETALL: Failed to open database:', event.target.error);
                reject(new Error(`IndexedDB open failed: ${event.target.error?.message || 'Unknown error'}`));
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                try {
                    const transaction = db.transaction(['designs'], 'readonly');
                    
                    transaction.onerror = (event) => {
                        console.error('❌ INDEXEDDB GETALL: Transaction failed:', event.target.error);
                        db.close();
                        reject(new Error(`Transaction failed: ${event.target.error?.message || 'Unknown transaction error'}`));
                    };
                    
                    const store = transaction.objectStore('designs');
                    const getAllRequest = store.getAll();
                    
                    getAllRequest.onsuccess = () => {
                        const results = getAllRequest.result || [];
                        results.sort((a, b) => new Date(b.metadata?.createdAt || 0) - new Date(a.metadata?.createdAt || 0));
                        db.close();
                        resolve(results);
                    };
                    
                    getAllRequest.onerror = (event) => {
                        console.error('❌ INDEXEDDB GETALL: GetAll operation failed:', event.target.error);
                        db.close();
                        reject(new Error(`GetAll operation failed: ${event.target.error?.message || 'Failed to get all designs'}`));
                    };
                } catch (error) {
                    console.error('❌ INDEXEDDB GETALL: Error setting up transaction:', error);
                    db.close();
                    reject(new Error(`Transaction setup failed: ${error.message}`));
                }
            };
        });
    }

    async deleteFromIndexedDB(designId) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MandalaDesigns', 1);
            
            request.onerror = (event) => {
                console.error('❌ INDEXEDDB DELETE: Failed to open database:', event.target.error);
                reject(new Error(`IndexedDB open failed: ${event.target.error?.message || 'Unknown error'}`));
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                try {
                    const transaction = db.transaction(['designs'], 'readwrite');
                    
                    transaction.onerror = (event) => {
                        console.error('❌ INDEXEDDB DELETE: Transaction failed:', event.target.error);
                        db.close();
                        reject(new Error(`Transaction failed: ${event.target.error?.message || 'Unknown transaction error'}`));
                    };
                    
                    const store = transaction.objectStore('designs');
                    const deleteRequest = store.delete(designId);
                    
                    deleteRequest.onsuccess = () => {
                        console.log('✅ INDEXEDDB DELETE: Design deleted successfully:', designId);
                        db.close();
                        resolve();
                    };
                    
                    deleteRequest.onerror = (event) => {
                        console.error('❌ INDEXEDDB DELETE: Delete operation failed:', event.target.error);
                        db.close();
                        reject(new Error(`Delete operation failed: ${event.target.error?.message || 'Failed to delete design'}`));
                    };
                } catch (error) {
                    console.error('❌ INDEXEDDB DELETE: Error setting up transaction:', error);
                    db.close();
                    reject(new Error(`Transaction setup failed: ${error.message}`));
                }
            };
        });
    }
}

// Export for use in HTML
window.DesignDataManager = DesignDataManager;