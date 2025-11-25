/**
 * WalletLoader - Pure CSS/SVG Animated Wallet Loader
 *
 * A lightweight, customizable wallet loading animation
 * built entirely with code - no external images or dependencies.
 *
 * Usage:
 *   const loader = new WalletLoader({
 *     container: document.getElementById('my-container'),
 *     size: 120,
 *     duration: 1.4
 *   });
 *
 *   loader.start();
 *   loader.stop();
 *   loader.destroy();
 *
 * @author Generated with Pure Code
 * @version 1.0.0
 */

class WalletLoader {
    constructor(options = {}) {
        this.options = {
            container: options.container || document.body,
            size: options.size || 120,
            duration: options.duration || 1.4,
            primaryColor: options.primaryColor || '#3B82F6',
            primaryDark: options.primaryDark || '#1E40AF',
            primaryLight: options.primaryLight || '#60A5FA',
            coinColor: options.coinColor || '#F59E0B',
            coinLight: options.coinLight || '#FBBF24',
            backgroundColor: options.backgroundColor || 'transparent',
            showRainbow: options.showRainbow !== false,
            showSparkles: options.showSparkles !== false,
            ...options
        };

        this.element = null;
        this.styleElement = null;
        this.uniqueId = 'wl_' + Math.random().toString(36).substr(2, 9);

        this._injectStyles();
        this._createLoader();
    }

    _injectStyles() {
        const { duration, uniqueId } = this;
        const id = this.uniqueId;

        const css = `
            .wallet-loader-${id} {
                display: inline-block;
                position: relative;
            }

            .wallet-loader-${id} svg {
                width: 100%;
                height: 100%;
                overflow: visible;
            }

            .wallet-loader-${id} .wallet-half-left {
                transform-origin: 60px 60px;
                animation: splitLeft-${id} ${this.options.duration}s ease-in-out infinite;
            }

            .wallet-loader-${id} .wallet-half-right {
                transform-origin: 60px 60px;
                animation: splitRight-${id} ${this.options.duration}s ease-in-out infinite;
            }

            .wallet-loader-${id} .wallet-coin {
                animation: coinPop-${id} ${this.options.duration}s ease-in-out infinite;
                transform-origin: 60px 60px;
            }

            .wallet-loader-${id} .rainbow-left {
                opacity: 0;
                animation: rainbowLeft-${id} ${this.options.duration}s ease-in-out infinite;
                transform-origin: 60px 60px;
            }

            .wallet-loader-${id} .rainbow-right {
                opacity: 0;
                animation: rainbowRight-${id} ${this.options.duration}s ease-in-out infinite;
                transform-origin: 60px 60px;
            }

            .wallet-loader-${id} .center-glow {
                opacity: 0;
                animation: centerGlow-${id} ${this.options.duration}s ease-in-out infinite;
            }

            .wallet-loader-${id} .sparkle-particle {
                opacity: 0;
                animation: sparkle-${id} ${this.options.duration}s ease-out infinite;
            }

            .wallet-loader-${id} .sparkle-particle:nth-child(1) { animation-delay: 0.1s; }
            .wallet-loader-${id} .sparkle-particle:nth-child(2) { animation-delay: 0.15s; }
            .wallet-loader-${id} .sparkle-particle:nth-child(3) { animation-delay: 0.2s; }
            .wallet-loader-${id} .sparkle-particle:nth-child(4) { animation-delay: 0.25s; }

            @keyframes splitLeft-${id} {
                0%, 10% { transform: translateX(0) scale(1); }
                25%, 55% { transform: translateX(-12px) scale(1.02); }
                70%, 100% { transform: translateX(0) scale(1); }
            }

            @keyframes splitRight-${id} {
                0%, 10% { transform: translateX(0) scale(1); }
                25%, 55% { transform: translateX(12px) scale(1.02); }
                70%, 100% { transform: translateX(0) scale(1); }
            }

            @keyframes coinPop-${id} {
                0%, 10% { transform: scale(1) translateY(0); }
                25%, 35% { transform: scale(1.15) translateY(-3px); }
                55% { transform: scale(1.1) translateY(-2px); }
                70%, 100% { transform: scale(1) translateY(0); }
            }

            @keyframes rainbowLeft-${id} {
                0%, 10% { opacity: 0; transform: translateX(0); }
                20%, 60% { opacity: 1; transform: translateX(-10px); }
                75%, 100% { opacity: 0; transform: translateX(0); }
            }

            @keyframes rainbowRight-${id} {
                0%, 10% { opacity: 0; transform: translateX(0); }
                20%, 60% { opacity: 1; transform: translateX(10px); }
                75%, 100% { opacity: 0; transform: translateX(0); }
            }

            @keyframes centerGlow-${id} {
                0%, 15% { opacity: 0; }
                25%, 55% { opacity: 1; }
                70%, 100% { opacity: 0; }
            }

            @keyframes sparkle-${id} {
                0%, 15% { opacity: 0; transform: scale(0); }
                25% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.2); }
                65%, 100% { opacity: 0; transform: scale(0); }
            }

            .wallet-loader-${id}.paused .wallet-half-left,
            .wallet-loader-${id}.paused .wallet-half-right,
            .wallet-loader-${id}.paused .wallet-coin,
            .wallet-loader-${id}.paused .rainbow-left,
            .wallet-loader-${id}.paused .rainbow-right,
            .wallet-loader-${id}.paused .center-glow,
            .wallet-loader-${id}.paused .sparkle-particle {
                animation-play-state: paused;
            }
        `;

        this.styleElement = document.createElement('style');
        this.styleElement.textContent = css;
        document.head.appendChild(this.styleElement);
    }

    _createLoader() {
        const { size, primaryColor, primaryDark, primaryLight, coinColor, coinLight, backgroundColor, showRainbow, showSparkles } = this.options;
        const id = this.uniqueId;

        const wrapper = document.createElement('div');
        wrapper.className = `wallet-loader-${id}`;
        wrapper.style.width = `${size}px`;
        wrapper.style.height = `${size}px`;
        wrapper.style.background = backgroundColor;

        wrapper.innerHTML = `
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <!-- Wallet Gradient -->
                    <linearGradient id="walletGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${primaryLight}"/>
                        <stop offset="50%" style="stop-color:${primaryColor}"/>
                        <stop offset="100%" style="stop-color:${primaryDark}"/>
                    </linearGradient>

                    <!-- Coin Gradient -->
                    <linearGradient id="coinGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${coinLight}"/>
                        <stop offset="100%" style="stop-color:${coinColor}"/>
                    </linearGradient>

                    <!-- Rainbow Gradients -->
                    <linearGradient id="rainbowL-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#FF6B9D"/>
                        <stop offset="25%" style="stop-color:#C44AFF"/>
                        <stop offset="50%" style="stop-color:#44D7FF"/>
                        <stop offset="75%" style="stop-color:#44FF88"/>
                        <stop offset="100%" style="stop-color:#FFDD44"/>
                    </linearGradient>
                    <linearGradient id="rainbowR-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#44FF88"/>
                        <stop offset="25%" style="stop-color:#44D7FF"/>
                        <stop offset="50%" style="stop-color:#C44AFF"/>
                        <stop offset="75%" style="stop-color:#FF6B9D"/>
                        <stop offset="100%" style="stop-color:#FFDD44"/>
                    </linearGradient>

                    <!-- Filters -->
                    <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${primaryColor}" flood-opacity="0.3"/>
                    </filter>
                    <filter id="glow-${id}" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                <!-- Left Half -->
                <g class="wallet-half-left" filter="url(#shadow-${id})">
                    <path d="M30 40 C30 34 34 30 40 30 L58 30 L58 90 L40 90 C34 90 30 86 30 80 Z" fill="url(#walletGrad-${id})"/>
                    <path d="M30 45 C30 37 36 32 44 32 L55 32 L55 36 L44 36 C40 36 34 40 34 46 L34 74 C34 80 40 84 44 84 L55 84 L55 88 L44 88 C36 88 30 82 30 74 Z" fill="rgba(255,255,255,0.1)"/>
                </g>

                <!-- Right Half -->
                <g class="wallet-half-right" filter="url(#shadow-${id})">
                    <path d="M62 30 L80 30 C86 30 90 34 90 40 L90 80 C90 86 86 90 80 90 L62 90 Z" fill="url(#walletGrad-${id})"/>
                    <circle cx="62" cy="60" r="12" fill="${backgroundColor === 'transparent' ? '#0f0f1a' : backgroundColor}"/>
                    <path d="M65 32 L76 32 C82 32 86 36 86 42 L86 78 C86 84 82 88 76 88 L65 88 L65 84 L74 84 C78 84 82 80 82 76 L82 44 C82 40 78 36 74 36 L65 36 Z" fill="rgba(255,255,255,0.1)"/>
                </g>

                ${showRainbow ? `
                <!-- Rainbow Effect Left -->
                <g class="rainbow-left" filter="url(#glow-${id})">
                    <path d="M32 42 C32 36 36 32 42 32 L56 32 L56 88 L42 88 C36 88 32 84 32 78 Z" fill="url(#rainbowL-${id})" opacity="0.6"/>
                </g>

                <!-- Rainbow Effect Right -->
                <g class="rainbow-right" filter="url(#glow-${id})">
                    <path d="M64 32 L78 32 C84 32 88 36 88 42 L88 78 C88 84 84 88 78 88 L64 88 Z" fill="url(#rainbowR-${id})" opacity="0.6"/>
                </g>

                <!-- Center Glow Line -->
                <g class="center-glow">
                    <line x1="60" y1="35" x2="60" y2="85" stroke="#FF6B9D" stroke-width="2" opacity="0.8"/>
                    <line x1="60" y1="35" x2="60" y2="85" stroke="#fff" stroke-width="1" opacity="0.5"/>
                </g>
                ` : ''}

                <!-- Coin -->
                <g class="wallet-coin">
                    <circle cx="60" cy="60" r="10" fill="url(#coinGrad-${id})" filter="url(#shadow-${id})"/>
                    <circle cx="58" cy="58" r="4" fill="rgba(255,255,255,0.3)"/>
                </g>

                ${showSparkles ? `
                <!-- Sparkles -->
                <circle class="sparkle-particle" cx="45" cy="45" r="2" fill="#fff"/>
                <circle class="sparkle-particle" cx="75" cy="45" r="2" fill="#fff"/>
                <circle class="sparkle-particle" cx="45" cy="75" r="2" fill="#fff"/>
                <circle class="sparkle-particle" cx="75" cy="75" r="2" fill="#fff"/>
                ` : ''}
            </svg>
        `;

        this.element = wrapper;
        this.options.container.appendChild(wrapper);
    }

    /**
     * Start the animation
     */
    start() {
        if (this.element) {
            this.element.classList.remove('paused');
        }
        return this;
    }

    /**
     * Stop/pause the animation
     */
    stop() {
        if (this.element) {
            this.element.classList.add('paused');
        }
        return this;
    }

    /**
     * Toggle animation state
     */
    toggle() {
        if (this.element) {
            this.element.classList.toggle('paused');
        }
        return this;
    }

    /**
     * Update loader size
     * @param {number} size - New size in pixels
     */
    setSize(size) {
        if (this.element) {
            this.element.style.width = `${size}px`;
            this.element.style.height = `${size}px`;
        }
        return this;
    }

    /**
     * Completely remove the loader from DOM
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
        }
        this.element = null;
        this.styleElement = null;
    }

    /**
     * Get the DOM element
     */
    getElement() {
        return this.element;
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WalletLoader;
}

if (typeof window !== 'undefined') {
    window.WalletLoader = WalletLoader;
}

// ES Module export
export default WalletLoader;
