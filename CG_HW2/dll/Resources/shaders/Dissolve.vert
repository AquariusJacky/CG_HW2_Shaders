#version 330 core

//////////////////// TODO /////////////////////
/*
* Hint:
* 1. Receive Position, Normal, TexCoord from bind buffer
* 2. Receive Model matrix, View matrix, and Projection matrix from uniform
* 3. Pass texCoord and normal to fragment shader
* 4. Calculate view space by gl_Position (must be vec4)
*/

layout (location = 0) in vec3 Position;
layout (location = 1) in vec3 Normal;
layout (location = 2) in vec2 TexCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;

out vec2 texCoord;
out vec3 worldPos;
out vec3 normal;

void main() {
	texCoord = TexCoord;
	worldPos = vec3(modelMatrix * vec4(Position, 1.0));
	normal = vec3(transpose(inverse(viewMatrix * modelMatrix)) * vec4(Normal, 1.0));
	
	gl_Position = projMatrix * (viewMatrix * (modelMatrix * vec4(Position, 1.0)));
}