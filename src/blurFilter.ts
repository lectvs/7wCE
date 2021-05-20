class BlurFilter extends PIXI.Filter {
    constructor() {
        super(undefined, `
            varying vec2 vTextureCoord;

            uniform sampler2D uSampler;

            vec4 getColor(float xi, float yi) {
                float wi = 1.0 / 100.0;
                float hi = 1.0 / 100.0;
                vec2 coord = vTextureCoord + vec2(xi*wi + yi*hi);
                if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0) {
                    return vec4(0.0, 0.0, 0.0, 0.0);
                }
                return texture2D(uSampler, coord);
            }

            void main(void){
                gl_FragColor = getColor(0.0, 0.0);

                const float PI = 3.14159;

                for (float angle = 0.0; angle < 2.0*PI; angle += PI/8.0) {
                    for (float dist = 1.0; dist <= 4.0; dist += 1.0) {
                        gl_FragColor += getColor(dist * cos(angle), dist * sin(angle));
                    }
                }
                gl_FragColor /= 1.0 + 16.0 * 4.0;
            }
        `, {});
    }
}