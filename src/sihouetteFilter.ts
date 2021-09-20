class SilhouetteFilter extends PIXI.Filter {
    constructor(type: 'light' | 'dark') {
        super(VERTEX_FILTER, FRAG_SHADER_SILHOUETTE(type));
    }
}

const VERTEX_FILTER = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    varying vec2 vTextureCoord;

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition(void) {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord(void) {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void) {
        gl_Position = filterVertexPosition();
        vTextureCoord = filterTextureCoord();
    }
`;

function FRAG_SHADER_SILHOUETTE(type: 'light' | 'dark') {
    let value = type === 'dark' ? 0.0 : 1.0;
    return `
        varying vec2 vTextureCoord;

        uniform sampler2D uSampler;

        void main(void) {
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            if (gl_FragColor.a > 0.0) {
                gl_FragColor.rgb = vec3(${value}, ${value}, ${value});
            }
        }
    `;
}