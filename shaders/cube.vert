#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;

    vec3 diffuseLightPosition;
    float ambient;
    int ambientPerVertex;
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

void main() {
    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);
    fragColor = inColor * ubo.ambientPerVertex * max(ubo.ambient, dot(inNormal, normalize(ubo.diffuseLightPosition - inPosition))) + inColor * ((ubo.ambientPerVertex > 0) ? 0 : 1);
    fragTexCoord = inTexCoord;
    ambientPerVertex = ubo.ambientPerVertex;
    normal = normalize(inNormal);
    lightVec = normalize(ubo.diffuseLightPosition - inPosition);
}