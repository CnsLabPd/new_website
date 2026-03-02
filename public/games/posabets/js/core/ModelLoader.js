// Model Loader - Loads and manages the trained AI model
import { CONFIG } from '../../config.js';
import { Events } from '../utils/constants.js';

export class ModelLoader extends EventTarget {
    constructor() {
        super();
        this.modelData = null;
        this.trainedModel = null;
        this.scaler = null;
        this.isLoaded = false;
    }

    async loadModel(modelPath = CONFIG.MODEL_PATH) {
        try {
            console.log('Loading model from:', modelPath);

            const response = await fetch(modelPath);
            if (!response.ok) {
                throw new Error(`Failed to load model: ${response.statusText}`);
            }

            this.modelData = await response.json();
            console.log('Model data loaded:', this.modelData);

            // Load scaler if available
            if (this.modelData.scalerMean && this.modelData.scalerScale) {
                this.scaler = {
                    mean: this.modelData.scalerMean,
                    scale: this.modelData.scalerScale
                };
                console.log('Scaler loaded with', this.scaler.mean.length, 'features');
            }

            // Initialize the model based on type
            const modelType = this.modelData.modelType || 'neural_network';

            if (modelType === 'neural_network') {
                await this.loadNeuralNetwork();
            } else {
                throw new Error(`Unsupported model type: ${modelType}`);
            }

            this.isLoaded = true;
            this.dispatchEvent(new CustomEvent(Events.MODEL_LOADED, {
                detail: { modelData: this.modelData }
            }));

            return true;

        } catch (error) {
            console.error('Model loading error:', error);
            this.dispatchEvent(new CustomEvent(Events.MODEL_ERROR, {
                detail: { error }
            }));
            throw error;
        }
    }

    async loadNeuralNetwork() {
        console.log('Loading Neural Network model...');

        if (!this.modelData.weights || !this.modelData.architecture) {
            throw new Error('Invalid Neural Network model - missing weights or architecture');
        }

        const numFeatures = this.modelData.numFeatures;
        const numClasses = this.modelData.numClasses;

        this.trainedModel = new NeuralNetworkClassifier(
            numFeatures,
            numClasses,
            this.modelData.weights,
            this.modelData.architecture || {}
        );

        await this.trainedModel.setWeights(this.modelData.weights);
        console.log('Neural Network model loaded successfully');
    }

    predict(features) {
        if (!this.isLoaded || !this.trainedModel) {
            throw new Error('Model not loaded');
        }

        // Apply scaling if available
        const scaledFeatures = this.applyScaling(features);
        const modelInput = scaledFeatures || features;

        // Validate feature count
        if (modelInput.length !== this.modelData.numFeatures) {
            throw new Error(
                `Feature count mismatch: got ${modelInput.length}, expected ${this.modelData.numFeatures}`
            );
        }

        return this.trainedModel.predictWithConfidence(modelInput);
    }

    applyScaling(features) {
        if (!this.scaler) return null;
        if (!this.scaler.mean || !this.scaler.scale) return null;
        if (this.scaler.mean.length !== features.length) {
            console.warn('Scaler shape mismatch; skipping scaling');
            return null;
        }

        const scaled = new Array(features.length);
        for (let i = 0; i < features.length; i++) {
            const denom = this.scaler.scale[i] === 0 ? 1 : this.scaler.scale[i];
            scaled[i] = (features[i] - this.scaler.mean[i]) / denom;
        }
        return scaled;
    }

    getLabelName(labelIndex) {
        return this.modelData.labelDecoder?.[labelIndex] ||
               this.modelData.gestureNames?.[labelIndex] ||
               String.fromCharCode(97 + labelIndex); // fallback to 'a', 'b', 'c'...
    }

    getModelInfo() {
        if (!this.modelData) return null;

        return {
            name: this.modelData.modelName,
            type: this.modelData.modelType,
            poseType: this.modelData.poseType,
            gestures: this.modelData.gestureNames,
            numFeatures: this.modelData.numFeatures,
            numClasses: this.modelData.numClasses,
            accuracy: this.modelData.accuracy
        };
    }

    dispose() {
        if (this.trainedModel && this.trainedModel.dispose) {
            this.trainedModel.dispose();
        }
        this.trainedModel = null;
        this.modelData = null;
        this.isLoaded = false;
    }
}

// Neural Network Classifier using TensorFlow.js (same as in your testing UI)
class NeuralNetworkClassifier {
    constructor(numFeatures, numClasses, weightsData, config = {}) {
        this.numFeatures = numFeatures;
        this.numClasses = numClasses;
        this.model = null;
        this.config = config;
        this.buildModelFromWeights(weightsData);
    }

    buildModelFromWeights(weightsData) {
        const layers = [];

        weightsData.forEach((layerData, idx) => {
            const isLast = idx === weightsData.length - 1;
            const name = (layerData.name || '').toLowerCase();

            if (name.includes('batch')) {
                layers.push(tf.layers.batchNormalization());
                return;
            }

            const weightShape = layerData.weights[0].shape;
            const units = layerData.weights[1]
                ? layerData.weights[1].shape[0] || layerData.weights[1].shape
                : weightShape[1];

            const denseConfig = {
                units,
                activation: isLast ? 'softmax' : 'relu',
                kernelInitializer: 'heNormal',
            };

            if (layers.length === 0) {
                denseConfig.inputShape = [this.numFeatures];
            }

            layers.push(tf.layers.dense(denseConfig));
        });

        this.model = tf.sequential({ layers });

        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
    }

    predictWithConfidence(sample) {
        return tf.tidy(() => {
            const input = tf.tensor2d([sample]);
            const predictions = this.model.predict(input);
            const probabilities = predictions.dataSync();
            const predictedClass = predictions.argMax(-1).dataSync()[0];
            const confidence = probabilities[predictedClass];

            return {
                prediction: predictedClass,
                confidence: confidence,
                probabilities: Array.from(probabilities)
            };
        });
    }

    async setWeights(weightsData) {
        const weightLayers = this.model.layers.filter(l => l.getWeights().length > 0);
        const count = Math.min(weightsData.length, weightLayers.length);

        for (let idx = 0; idx < count; idx++) {
            const layerData = weightsData[idx];
            const layer = weightLayers[idx];

            // Create tensors, set weights, then dispose tensors to prevent memory leak
            const weights = layerData.weights.map(w =>
                tf.tensor(w.data, w.shape)
            );
            layer.setWeights(weights);

            // Dispose of temporary tensors after setting weights
            // The layer now owns copies of these tensors
            weights.forEach(tensor => tensor.dispose());
        }
    }

    dispose() {
        if (this.model) {
            this.model.dispose();
        }
    }
}
