#version 330 core

//////////////////// TODO /////////////////////
/*
* Hint:
* 1. Receive mainTex, rampTex and WorldLightPos from uniform
* 2. Recieve texcoord, worldPos and Normal from vertex shader
* 3. Calculate and return final color to opengl
*/

in vec2 texCoord;
in vec3 worldPos;
in vec3 normal;

uniform vec3 Kd;
uniform vec3 Ld;

uniform sampler2D mainTex;
uniform sampler2D rampTex;
uniform vec3 WorldLightPos;
	
vec3 N;
vec3 L;

vec4 albedo;
float rampCoord;
vec3 diffuse;

out vec4 color;

void main() {

	N = normalize(normal);
	L = normalize(WorldLightPos - worldPos);
	
	albedo = texture2D(mainTex, texCoord);
	rampCoord = dot(N, L) * 0.5 + 0.5; // must between (0,1)
	diffuse = Kd * Ld * vec3(texture(rampTex, vec2(rampCoord, rampCoord))) * vec3(albedo);
	
	color = vec4(diffuse, 1.0);
	// out color must be vec4
}