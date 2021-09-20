class RainbowFilter extends PIXI.Filter {
    constructor() {
        super(undefined, `
            varying vec2 vTextureCoord;

            uniform sampler2D uSampler;

            // Source: https://stackoverflow.com/a/17897228
            // All components are in the range [0,1], including hue.
            vec3 hsv2rgb(vec3 c) {
                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }

            void main(void){
                gl_FragColor = texture2D(uSampler, vTextureCoord);
                if (gl_FragColor.a > 0.0) {
                    float dx = vTextureCoord.x - 0.5;
                    float dy = vTextureCoord.y - 0.5;
                    float angle = atan(dy, dx);

                    gl_FragColor.rgb = hsv2rgb(vec3(angle/2.0, 0.6, 0.9));
                }
            }
        `, {});
    }
}