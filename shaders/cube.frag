#version 450

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) flat in int ambientPerVertex;
layout(location = 3) in vec3 normal;
layout(location = 4) in vec3 lightVector;

layout(location = 0) out vec4 outColor;

void main(){
    if(ambientPerVertex == 0)
        // outColor = vec4(fragColor * max(0.1, dot(normal, normalize(diffuseLightPosition - pos))), 1.f) * texture(texSampler, fragTexCoord);
        outColor = max(dot(lightVector, normal), 0.1) * texture(texSampler, fragTexCoord);
    else
        outColor = vec4(fragColor, 1.0) * texture(texSampler, fragTexCoord);
}