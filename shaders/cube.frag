#version 450

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) flat in int ambientPerVertex;
layout(location = 3) in vec3 normal;
layout(location = 4) in vec3 lightVector;
layout(location = 5) in float lightDistance;
layout(location = 6) in vec3 inPosition;
layout(location = 7) in flat vec3 eyeDir;
layout(location = 8) in flat int specular_enable;

layout(location = 0) out vec4 outColor;

void main(){
    // outColor = vec4(fragColor, 1);
    if(ambientPerVertex == 1){
        float specular;
        // if(specular_enable == 1) specular = pow((dot(normal, normalize(normalize(lightVector) + normalize(eyeDir)))+1)/2, 16/*hardness*/);
        if(specular_enable == 1) specular = max(0, pow(dot(normalize(lightVector) - 2*dot(normalize(lightVector), normal)*normal, normalize(eyeDir)), 64));
        else specular = 0;//hi
        outColor = specular * vec4(1.0, 1.0, 1.0, 1.0) + 1000 * vec4(fragColor, 1.0) * max(dot(normalize(lightVector), normal), 0.2) * texture(texSampler, fragTexCoord) / (length(lightVector)*length(lightVector));
    }else{
        outColor =  1000 * vec4(fragColor, 1.0) * texture(texSampler, fragTexCoord) / lightDistance;
    }
}