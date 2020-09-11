﻿<script type="module" src="https://unpkg.com/@google/model-viewer"></script>
<script src="https://unpkg.com/focus-visible/dist/focus-visible.js" defer></script>

<model-viewer camera-controls src="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/street.glb"
    alt="A 3D model of a shoe" ar camera-orbit="33deg 67deg auto"
    poster="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/shoePoster.png"
    ios-src="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/street.usdz" shadow-intensity="1">
    <button slot="ar-button" class="ar-button">View in your space</button>
    <div id="ar-prompt">
        <img src="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/hand.png">
    </div>
    <div id="controls">
        <label for="diffuse">Style: </label>
        <select id="diffuse">
            <option value="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/street-basecolor.jpg">Street
            </option>
            <option value="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/midnight-basecolor.jpg">
                Midnight</option>
            <option value="https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/beach-basecolor.jpg">Beach
            </option>
        </select>
    </div>
</model-viewer>

<script type="module">
    const modelViewerTexture = document.querySelector("model-viewer");

    modelViewerTexture.addEventListener("scene-graph-ready", (ev) => {

        let material = modelViewerTexture.model.materials[0];

        document.querySelector('#diffuse').addEventListener('input', (event) => {
            material.pbrMetallicRoughness.baseColorTexture.texture.source.setURI(event.target.value);
        });

        document.querySelector("#controls").addEventListener('beforexrselect', (ev) => {
            ev.preventDefault();
        });
    })
</script>

<style>
    model-viewer {
        width: 100%;
        height: 400px;
    }

    /* This keeps child nodes hidden while the element loads */
    :not(:defined)>* {
        display: none;
    }

    .ar-button {
        background-image: url(https://cdn.khronos.org/assets/blog/live-gltf-asset-editing-in-your-browsereven-in-ar/ic_view_in_ar_new_googblue_48dp.png);
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 12px 50%;
        background-color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        bottom: 16px;
        padding: 0px 16px 0px 40px;
        font-family: Roboto Regular, Helvetica Neue, sans-serif;
        font-size: 14px;
        color: #4285f4;
        height: 36px;
        line-height: 36px;
        border-radius: 18px;
        border: 1px solid #DADCE0;
    }

    .ar-button:active {
        background-color: #E8EAED;
    }

    .ar-button:focus {
        outline: none;
    }

    .ar-button:focus-visible {
        outline: 1px solid #4285f4;
    }

    @keyframes circle {
        from {
            transform: translateX(-50%) rotate(0deg) translateX(50px) rotate(0deg);
        }

        to {
            transform: translateX(-50%) rotate(360deg) translateX(50px) rotate(-360deg);
        }
    }

    @keyframes elongate {
        from {
            transform: translateX(100px);
        }

        to {
            transform: translateX(-100px);
        }
    }

    model-viewer>#ar-prompt {
        position: absolute;
        left: 50%;
        bottom: 75px;
        animation: elongate 2s infinite ease-in-out alternate;
        display: none;
    }

    model-viewer[ar-status="session-started"]>#ar-prompt {
        display: block;
    }

    model-viewer>#ar-prompt>img {
        animation: circle 4s linear infinite;
    }

    #controls {
        position: absolute;
        top: 16px;
        right: 16px;
        font-family: Roboto Regular, Helvetica Neue, sans-serif;
        font-size: 16px;
        background-color: #fff8;
        padding: 16px;
        border-radius: 16px;
    }

    select {
        font-size: 16px;
    }
</style>
