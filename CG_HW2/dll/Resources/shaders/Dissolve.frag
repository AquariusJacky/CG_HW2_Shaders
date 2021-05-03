#version 330 core

//////////////////// TODO /////////////////////
/*
* Hint:
* 1. Receive mainTex, noiseTex, and other variables passed from uniform
* 2. Recieve texcoord from vertex shader
* 3. Calculate and return final color to opengl
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
uniform sampler2D noiseTex;
uniform vec3 WorldLightPos;
uniform vec3 WorldCamPos;

uniform float _Threshold;
uniform float _EdgeLength;
uniform vec4 _EdgeColor;

vec3 N;
vec3 L;
vec3 V;
vec3 R;

vec4 albedo;

vec3 ambient;
vec3 diffuse;

vec3 specularPhong;
vec3 specularBlinn;
vec3 specular;

float noise;
float flag;

out vec4 color;

void main() {
	
	N = normalize(normal);
	L = normalize(WorldLightPos - worldPos);
	V = normalize(WorldCamPos   - worldPos);
	R = 2 * dot(L, N) * N - L;
	
	albedo = texture2D(mainTex, texCoord);
	
	ambient = La * Ka * vec3(albedo);
	diffuse = Ld * Kd * vec3(albedo) * dot(L, N); // must > 0
	
	specularPhong = Ls * Ks * pow(dot(V, R), gloss / 4.0);
	specular = mix(specularPhong, specularBlinn, 0);
	
	albedo = vec4(ambient + diffuse + specular, 1.0);
	
	noise = texture(noiseTex, texCoord).x;
	
	if(noise - _Threshold < 0.0) {
		discard;
	}
	
	// use EdgeLength / 2 as threshold to prevent
	// exactly _Threshold + _EdgeLength - noise is 0
	flag = step(_EdgeLength / 2, _Threshold + _EdgeLength - noise);
	
	color = mix(albedo, _EdgeColor, flag);
	// out color must be vec4
}