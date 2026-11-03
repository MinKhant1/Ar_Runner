# Soda Rush

Run `npm install` then `npm run dev`. Build with `npm run build`.

A/D or arrows change lanes; Escape pauses; Enter starts/restarts. Webcam requires localhost/HTTPS and permission. Model files download from Google; inference stays local. Calibrate shoulders or palm, move sideways, return to center to rearm.

Assets: original models preserved. Missing road/building sibling textures restored from existing atlas. Building H lacks a GLTF and is unused. Character has 17 animations; Run is used. Runtime bounding boxes normalize models. One complete building is reused. Roads and cars use fixed pools.

Verified: TypeScript and production build; Vite server starts. Browser visuals, collision feel, and physical webcam tracking still need manual testing. Inference is rate limited on the main thread. No automated browser test performed.
