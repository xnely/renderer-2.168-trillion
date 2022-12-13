#version 450

layout(binding = 2) uniform sampler2D blurSampler;

layout(location = 0) in vec2 UV;

layout(location = 0) out vec4 outColor;

void main(){
    // outColor = texture(blurSampler, UV);

    float focus = texture(blurSampler, vec2(0.5, 0.5)).a;
    float depth = texture(blurSampler, UV).a;
    float diff  =( depth - focus)*1.1;

    #define samples 32

    outColor = vec4(0,0,0,1);

    if(texture(blurSampler, UV) == outColor) return;

	for (int i = 0; i < samples; i++) 
	{
		float scale = 0.1 * (float(i) / float(samples-1));
        if(abs((texture(blurSampler, UV + (vec2(0.5, 0.5)) * scale * diff).a - focus)*1.1 - diff) < .1)
		    outColor += texture(blurSampler, UV + (vec2(0.5, 0.5)) * scale * diff);
	}

    outColor += texture(blurSampler, UV);

    // outColor = vec4(diff, diff, diff, 1.0);
}