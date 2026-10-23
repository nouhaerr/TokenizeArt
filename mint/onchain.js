// A self-contained image: no fonts, scripts, or external image dependencies.
const ONCHAIN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" rx="32" fill="#171126"/><ellipse cx="200" cy="330" rx="150" ry="18" fill="#62506e"/><path d="M80 225h240v90q-120 40-240 0z" fill="#f6a6bf"/><ellipse cx="200" cy="225" rx="120" ry="32" fill="#fff0cf"/><path d="M80 225v30q15 30 30 0q15-25 30 0q15 30 30 0q15-25 30 0q15 30 30 0q15-25 30 0q15 30 30 0q15-25 30 0v-30" fill="#fff0cf"/><g fill="#f0c040"><path d="M170 120h15v80h-15v-25h-40v-15l35-40h20l-35 40h20z"/><path d="M210 125q55-25 60 15q0 15-25 30l-15 15h40v15h-65v-15l30-30q25-20-20-15z"/><path d="M173 108q-15-15 0-30q15 15 0 30m62 0q-15-15 0-30q15 15 0 30"/></g></svg>';

function base64Utf8(text) {
    return btoa(Array.from(new TextEncoder().encode(text), byte => String.fromCharCode(byte)).join(''));
}

const ONCHAIN_IMAGE_URI = 'data:image/svg+xml;base64,' + base64Utf8(ONCHAIN_SVG);
const ONCHAIN_METADATA = {
    name: 'NFT42 — On-chain Cake',
    description: 'A cake celebrating 42. The image and metadata are stored entirely on-chain.',
    image: ONCHAIN_IMAGE_URI,
    artist: 'nerrakeb',
    attributes: [
        { trait_type: 'Number', value: '42' },
        { trait_type: 'Type', value: 'Cake' },
        { trait_type: 'Storage', value: 'On-chain' }
    ]
};
const ONCHAIN_TOKEN_URI = 'data:application/json;base64,' + base64Utf8(JSON.stringify(ONCHAIN_METADATA));
