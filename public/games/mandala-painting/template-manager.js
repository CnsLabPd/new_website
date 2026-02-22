/**
 * Template Manager - Handles template loading, region mapping, and color schemes
 */

class TemplateManager {
    constructor() {
        this.templates = new Map(); // templateId -> template data
        this.regionMappings = new Map(); // templateId -> region hash map
        this.colorSchemas = new Map(); // templateId -> color mapping schema
        console.log('🎯 TEMPLATE: Template Manager initialized');
    }

    /**
     * Auto-load templates from templates folder
     */
    async loadTemplatesFromFolder() {
        console.log('📁 TEMPLATE: Auto-loading templates from templates folder...');

        const templateFolder = './templates/';
        const commonExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

        try {
            // Get list of template files (this would need to be populated from server or manually)
            const templateFiles = [
                'LORD GANESHA.jpg',
                'simple_mandala.jpg'
            ];

            console.log('📂 TEMPLATE: Found template files:', templateFiles);

            for (const filename of templateFiles) {
                try {
                    const templatePath = templateFolder + filename;
                    const templateName = filename.replace(/\.[^/.]+$/, ""); // Remove extension
                    const templateId = 'template_' + templateName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

                    console.log(`📋 TEMPLATE: Processing ${filename}...`);

                    // Create template object
                    const template = {
                        id: templateId,
                        name: templateName,
                        originalPath: templatePath,
                        source: 'auto-loaded',
                        createdAt: new Date().toISOString(),
                        processed: false
                    };

                    // Process the template to create boundary map and regions
                    await this.processTemplate(template);

                    console.log(`✅ TEMPLATE: Successfully processed ${templateName}`);

                } catch (templateError) {
                    console.error(`❌ TEMPLATE: Failed to process ${filename}:`, templateError);
                }
            }

            console.log(`✅ TEMPLATE: Auto-loaded ${this.templates.size} templates`);

        } catch (error) {
            console.error('❌ TEMPLATE: Failed to auto-load templates:', error);
        }
    }

    /**
     * Process template to create boundary map and region hash map
     */
    async processTemplate(template) {
        return new Promise((resolve, reject) => {
            console.log('🔄 TEMPLATE: Processing template for regions...', template.name);

            const img = new Image();
            img.onload = () => {
                try {
                    // Create canvas for processing
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // Draw image
                    ctx.drawImage(img, 0, 0);

                    // Extract image data for boundary detection
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    // Generate boundary map and region hash map
                    const { boundaryMap, regionHashMap } = this.generateRegionHashMap(imageData, canvas.width, canvas.height);

                    // Update template with processed data
                    template.originalImage = img.src;
                    template.processedImage = canvas.toDataURL();
                    template.width = canvas.width;
                    template.height = canvas.height;
                    template.boundaryMap = boundaryMap;
                    template.processed = true;

                    // Store template and mappings
                    this.templates.set(template.id, template);
                    this.regionMappings.set(template.id, regionHashMap);
                    this.initializeColorSchema(template.id, regionHashMap);

                    console.log(`✅ TEMPLATE: Processed with ${Object.keys(regionHashMap).length} regions`);
                    resolve(template);

                } catch (processError) {
                    console.error('❌ TEMPLATE: Processing error:', processError);
                    reject(processError);
                }
            };

            img.onerror = () => {
                const error = new Error(`Failed to load template image: ${template.originalPath}`);
                console.error('❌ TEMPLATE: Image load error:', error);
                reject(error);
            };

            img.src = template.originalPath;
        });
    }

    /**
     * Generate region hash map for a template
     */
    generateRegionHashMap(imageData, width, height) {
        console.log('🗺️ TEMPLATE: Generating region hash map...');

        const data = imageData.data;
        const boundaryMap = [];
        const regionHashMap = {};
        const visited = new Set();
        let regionCounter = 0;

        // Initialize boundary map
        for (let y = 0; y < height; y++) {
            boundaryMap[y] = [];
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];

                // Detect boundaries (dark pixels)
                const brightness = (r + g + b) / 3;
                const isBoundary = brightness < 80;

                boundaryMap[y][x] = isBoundary ? 1 : 0;
            }
        }

        // Find all fillable regions using flood fill
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const key = `${x},${y}`;

                if (!visited.has(key) && boundaryMap[y][x] === 0) {
                    // Found a new fillable region
                    const regionId = `region_${regionCounter}`;
                    const regionPixels = this.floodFillRegion(boundaryMap, x, y, width, height, visited);

                    if (regionPixels.length > 10) { // Ignore very small regions
                        // Calculate region center
                        const centerX = Math.round(regionPixels.reduce((sum, p) => sum + p.x, 0) / regionPixels.length);
                        const centerY = Math.round(regionPixels.reduce((sum, p) => sum + p.y, 0) / regionPixels.length);

                        regionHashMap[regionId] = {
                            id: regionId,
                            pixels: regionPixels,
                            center: { x: centerX, y: centerY },
                            size: regionPixels.length,
                            defaultColor: '#ffffff', // Default white
                            currentColor: '#ffffff'
                        };

                        regionCounter++;
                    }
                }
            }
        }

        console.log(`🎯 TEMPLATE: Generated ${Object.keys(regionHashMap).length} regions`);
        return { boundaryMap, regionHashMap };
    }

    /**
     * Flood fill to find all pixels in a region
     */
    floodFillRegion(boundaryMap, startX, startY, width, height, visited) {
        const stack = [{ x: startX, y: startY }];
        const regionPixels = [];

        while (stack.length > 0) {
            const { x, y } = stack.pop();
            const key = `${x},${y}`;

            if (x < 0 || x >= width || y < 0 || y >= height || visited.has(key) || boundaryMap[y][x] === 1) {
                continue;
            }

            visited.add(key);
            regionPixels.push({ x, y });

            // Add neighbors
            stack.push({ x: x + 1, y });
            stack.push({ x: x - 1, y });
            stack.push({ x, y: y + 1 });
            stack.push({ x, y: y - 1 });
        }

        return regionPixels;
    }

    /**
     * Initialize color schema for a template
     */
    initializeColorSchema(templateId, regionHashMap) {
        const colorSchema = {
            templateId,
            regions: {},
            lastModified: new Date().toISOString(),
            version: '1.0'
        };

        // Initialize each region with default white color
        for (const regionId in regionHashMap) {
            colorSchema.regions[regionId] = '#ffffff';
        }

        this.colorSchemas.set(templateId, colorSchema);
        console.log(`🎨 TEMPLATE: Initialized color schema with ${Object.keys(colorSchema.regions).length} regions`);
    }

    /**
     * Update region color in schema
     */
    updateRegionColor(templateId, regionId, color) {
        const colorSchema = this.colorSchemas.get(templateId);
        if (!colorSchema) {
            console.error('❌ TEMPLATE: No color schema found for template:', templateId);
            return false;
        }

        colorSchema.regions[regionId] = color;
        colorSchema.lastModified = new Date().toISOString();

        // Also update region mapping
        const regionMapping = this.regionMappings.get(templateId);
        if (regionMapping && regionMapping[regionId]) {
            regionMapping[regionId].currentColor = color;
        }

        console.log('🎨 TEMPLATE: Updated region color:', regionId, '→', color);
        return true;
    }

    /**
     * Get region ID at coordinates
     */
    getRegionAtCoordinates(templateId, x, y) {
        const regionMapping = this.regionMappings.get(templateId);
        if (!regionMapping) {
            return null;
        }

        // Find region that contains this exact coordinate
        for (const regionId in regionMapping) {
            const region = regionMapping[regionId];

            // Check if coordinate is within any pixel of this region
            const pixelExists = region.pixels.some(pixel => pixel.x === x && pixel.y === y);
            if (pixelExists) {
                return regionId;
            }
        }

        // Fallback: Find closest region within reasonable distance
        let closestRegion = null;
        let closestDistance = Infinity;

        for (const regionId in regionMapping) {
            const region = regionMapping[regionId];
            const distance = Math.sqrt(
                Math.pow(region.center.x - x, 2) + Math.pow(region.center.y - y, 2)
            );

            // Check if coordinate is within reasonable distance of region center
            if (distance < Math.sqrt(region.size) / 3 && distance < closestDistance) {
                closestDistance = distance;
                closestRegion = regionId;
            }
        }

        return closestRegion;
    }

    /**
     * Get all templates
     */
    getAllTemplates() {
        return Array.from(this.templates.values());
    }

    /**
     * Get template by ID
     */
    getTemplate(templateId) {
        return this.templates.get(templateId);
    }

    /**
     * Get color schema for template
     */
    getColorSchema(templateId) {
        return this.colorSchemas.get(templateId);
    }

    /**
     * Get region mapping for template
     */
    getRegionMapping(templateId) {
        return this.regionMappings.get(templateId);
    }

    /**
     * Export template data for saving
     */
    exportTemplateData(templateId) {
        const template = this.templates.get(templateId);
        const colorSchema = this.colorSchemas.get(templateId);
        const regionMapping = this.regionMappings.get(templateId);

        if (!template || !colorSchema || !regionMapping) {
            console.error('❌ TEMPLATE: Missing data for export:', templateId);
            return null;
        }

        return {
            template,
            colorSchema,
            regionMapping,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Import template data from saved design
     */
    importTemplateData(templateData) {
        if (!templateData.template || !templateData.colorSchema || !templateData.regionMapping) {
            console.error('❌ TEMPLATE: Invalid import data');
            return false;
        }

        const templateId = templateData.template.id;

        this.templates.set(templateId, templateData.template);
        this.colorSchemas.set(templateId, templateData.colorSchema);
        this.regionMappings.set(templateId, templateData.regionMapping);

        console.log('✅ TEMPLATE: Imported template data:', templateId);
        return true;
    }
}

// Make it globally available
window.TemplateManager = TemplateManager;