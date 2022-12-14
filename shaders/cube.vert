#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;

    vec3 diffuseLightPosition;
    vec3 eyePos;
    float ambient;
    int ambientPerVertex;
    int specular;
} ubo;

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec2 inTexCoord;
layout(location = 3) in vec3 inNormal;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragTexCoord;
layout(location = 2) out int ambientPerVertex;
layout(location = 3) out vec3 normal;
layout(location = 4) out vec3 lightVec;
layout(location = 5) out float lightDistance;
layout(location = 6) out vec3 outPosition;
layout(location = 7) out vec3 eyePos;
layout(location = 8) out int specular;
layout(location = 9) out vec3 lightPos;

void main() {
    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);
    fragTexCoord = inTexCoord;
    lightPos = ubo.diffuseLightPosition;
    eyePos = ubo.eyePos;
    if(ubo.ambientPerVertex == 1){
        fragColor = inColor;
        normal = normalize(inNormal);
        lightVec = ubo.diffuseLightPosition - inPosition;
        ambientPerVertex = 1;
        outPosition = inPosition;
        // eyeDir = normalize(inPosition - ubo.eyePos);
        specular = ubo.specular;
    }else{
        fragColor = inColor * max(ubo.ambient, dot(inNormal, normalize(ubo.diffuseLightPosition - inPosition)));
        ambientPerVertex = 0;
        lightDistance = length(ubo.diffuseLightPosition - inPosition) * length(ubo.diffuseLightPosition - inPosition);
    }
    // normal = normalize(inNormal);
    // normal = normalize(vec3(ubo.model * ubo.view * vec4(inNormal, 0.0)));
    // lightVec = normalize(ubo.diffuseLightPosition - inPosition);
}