#version 450

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 normal;
layout(location = 3) in vec3 lightVector;
layout(location = 4) in vec3 inPosition;
layout(location = 5) in flat vec3 eyePos;
layout(location = 6) in flat int specular_enable;
layout(location = 7) in flat vec3 lightPos;

layout(location = 0) out vec4 outColor;

void main(){
    float specular;
    // if(specular_enable == 1) specular = -(min(length(inPosition.xy-eyePos.xy), 1)-1);
    if(specular_enable == 1) specular = (4/4) * pow(max(0.0, dot(reflect(-normalize(inPosition - lightPos), normal), normalize(inPosition - eyePos))), 32) / length(lightPos-eyePos);
    else specular = 0;
    outColor = specular * vec4(0.5, 0.5, 1.0, 1.0) + 1000 * vec4(fragColor, 1.0) * max(dot(normalize(lightVector), normal), 0.2) * texture(texSampler, fragTexCoord) / (length(lightVector)*length(lightVector));

}