#version 330 core

//////////////////// TODO /////////////////////
/*
* Hint:
* 1. Receive mainTex, WorldLightPos and WorldCamPos from uniform
* 2. Recieve all light color you defined in opengl from uniform
* 3. Recieve texcoord, worldPos and Normal from vertex shader
* 4. Calculate and return final color to opengl
*/

in vec2 texCoord;
in vec3 worldPos;
in vec3 normal;

uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform vec3 La;
uniform vec3 Ld;
uniform vec3 Ls;
uniform float gloss;

uniform sampler2D mainTex;
uniform vec3 WorldLightPos;
uniform vec3 WorldCamPos;
	
vec3 N;
vec3 L;
vec3 V;
vec3 R;
vec3 H;

vec4 albedo;

vec3 ambient;
vec3 diffuse;

vec3 specularPhong;
vec3 specularBlinn;
vec3 specular;

out vec4 color;

void main() {
	
	N = normalize(normal);
	L = normalize(WorldLightPos - worldPos);
	V = normalize(WorldCamPos   - worldPos);
	R = 2 * dot(L, N) * N - L;
	H = (L + V) / abs(L + V);
	
	albedo = texture2D(mainTex, texCoord);
	
	ambient = La * Ka * vec3(albedo);
	diffuse = Ld * Kd * vec3(albedo) * dot(L, N); // must > 0
	
	specularPhong = Ls * Ks * pow(dot(V, R), gloss / 4.0);
	specularBlinn = Ls * Ks * pow(dot(N, H), gloss);
	specular = mix(specularPhong, specularBlinn, 0);
	// change to 1 to see the difference between phong and blinn
	
	color = vec4(ambient + diffuse + specular, 1.0);
	// out color must be vec4
}