import { StaticRenderer } from '@connectv/sdh';
import register from 'jsdom-global';
import { ConfigOverride } from "@codedoc/core";

const renderer = new StaticRenderer();
register();

export interface ColorOptions {
    primaryColor: string,
    secondaryColor?: string
}

export interface ReadingProgressOptions {
    height?: number,
    lightMode?: ColorOptions,
    darkMode?: ColorOptions
}

export function readingProgressPlugin(config?: ReadingProgressOptions) {
    return function(): ConfigOverride {
        const opts = {
            height: config?.height || 3,
            lightMode: {
                primaryColor: config?.lightMode?.primaryColor || '#1eb2a6',
                secondaryColor: config?.lightMode?.secondaryColor || config?.lightMode?.primaryColor || '#1eb2a6'
            },
            darkMode: {
                primaryColor: config?.darkMode?.primaryColor || '#1eb2a6',
                secondaryColor: config?.darkMode?.secondaryColor || config?.darkMode?.primaryColor || '#1eb2a6'
            }
        };

        return {
            page: {
                scripts: [
                    <style>
                        {`body.dark div#reading-progress {
                            --progress-pri-color: ${opts.darkMode.primaryColor};
                            --progress-sec-color: ${opts.darkMode.secondaryColor};
                        }
                        
                        body div#reading-progress {
                            --progress-amount: 0%;
                            --progress-pri-color: ${opts.lightMode.primaryColor};
                            --progress-sec-color: ${opts.lightMode.secondaryColor};

                            background: linear-gradient(90deg, var(--progress-pri-color) 0%, var(--progress-sec-color) 100%);
                            width: var(--progress-amount);
                            
                            height: ${opts.height}px;
                            position: fixed;
                            top: 0;
                            pointer-events: none;
                            border: 0;
                            z-index: 999;
                        }`}
                    </style>,
                    <script>
                        {`window.onload = () => {
                            let elem = document.createElement('div');
                            elem.id = 'reading-progress';
                            document.body.appendChild(elem);
                            
                            let processScroll = () => {
                                let docElem = document.documentElement,
                                docBody = document.body,
                                scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
                                scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
                                scrollPercent = scrollTop / scrollBottom * 100 + '%';
                            
                                document.querySelector("div#reading-progress").style.setProperty("--progress-amount", scrollPercent);
                            }
                        
                            document.addEventListener('scroll', processScroll);
                        }`}
                    </script>
                ]
            }
        }
    }
}
